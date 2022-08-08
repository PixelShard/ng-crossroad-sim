import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { FormGroup } from "@angular/forms";
import { ISimulationConfig, SIMULATION_DEFAULT_CONF } from "./interfaces/simulation-config";
import { DEFAULT_SIMULATION_STATUS, ISimulationStatus } from "./interfaces/simulation-status";
import { EventsEnum } from "./enums/events.enum";
import { EventsHelper } from "../helpers/events.helper";
import { IEvent } from "./interfaces/event";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  #simulationSettings: BehaviorSubject<ISimulationConfig> = new BehaviorSubject<ISimulationConfig>({...SIMULATION_DEFAULT_CONF});
  $simulationSettings = this.#simulationSettings.asObservable();

  #simulationStatus: BehaviorSubject<ISimulationStatus> = new BehaviorSubject<ISimulationStatus>({...DEFAULT_SIMULATION_STATUS});
  $simulationStatus = this.#simulationStatus.asObservable();

  #simulationQueue: BehaviorSubject<IEvent[]> = new BehaviorSubject<IEvent[]>([]);
  $simulationQueue = this.#simulationQueue.asObservable();

  private stepTimeout: number = 1000;

  constructor(private eventsHelper: EventsHelper) {
  }

  public isSimulationInProgress(): boolean {
    return this.#simulationStatus.getValue().inProgress;
  }

  public setSimulationSettings(form: FormGroup) {
    this.#simulationSettings.getValue().duration = form?.controls.simulationDuration.value;
    this.#simulationSettings.getValue().northSouthLightsDuration = form?.controls.northSouthLightsDuration.value;
    this.#simulationSettings.getValue().eastWestLightsDuration = form?.controls.eastWestLightsDuration.value;
    this.#simulationSettings.getValue().northQueueInterval = form?.controls.northQueueInterval.value;
    this.#simulationSettings.getValue().southQueueInterval = form?.controls.southQueueInterval.value;
    this.#simulationSettings.getValue().westQueueInterval = form?.controls.westQueueInterval.value;
    this.#simulationSettings.getValue().eastQueueInterval = form?.controls.eastQueueInterval.value;
    this.#simulationSettings.getValue().carLeavingTime = form?.controls.carLeavingTime.value;
    this.#simulationSettings.next({
      ...this.#simulationSettings.getValue()
    })
  }

  public onStartSimulation() {
    this.#simulationStatus.getValue().inProgress = !this.#simulationStatus.getValue().inProgress;
    this.#simulationStatus.next({...this.#simulationStatus.getValue()})
    this.runSimulation().then();
  }

  private initSimulation() {
    const settings = this.#simulationSettings.getValue();
    const eventsQueue: IEvent[] = [];
    this.pushEventToQueue(settings.northSouthLightsDuration, settings.duration, EventsEnum.SwitchLights, eventsQueue, settings.eastWestLightsDuration);
    this.pushEventToQueue(settings.northQueueInterval, settings.duration, EventsEnum.AddCarNorthQueue, eventsQueue);
    this.pushEventToQueue(settings.southQueueInterval, settings.duration, EventsEnum.AddCarSouthQueue, eventsQueue);
    this.pushEventToQueue(settings.eastQueueInterval, settings.duration, EventsEnum.AddCarEastQueue, eventsQueue);
    this.pushEventToQueue(settings.westQueueInterval, settings.duration, EventsEnum.AddCarWestQueue, eventsQueue);
    this.pushEventToQueue(settings.carLeavingTime / 60, settings.duration, EventsEnum.RemoveCarNorthQueue, eventsQueue);
    this.pushEventToQueue(settings.carLeavingTime / 60, settings.duration, EventsEnum.RemoveCarSouthQueue, eventsQueue);
    this.pushEventToQueue(settings.carLeavingTime / 60, settings.duration, EventsEnum.RemoveCarEastQueue, eventsQueue);
    this.pushEventToQueue(settings.carLeavingTime / 60, settings.duration, EventsEnum.RemoveCarWestQueue, eventsQueue);

    eventsQueue.sort((a, b) => a.executionTime - b.executionTime)
    this.#simulationQueue.next([...eventsQueue]);
  }

  private pushEventToQueue(startTime: number, duration: number, eventKey: EventsEnum, eventsQueue: IEvent[], altTime?: number) {
    let increaseTime = startTime;
    for (let currentTime = startTime; currentTime <= duration; currentTime = currentTime + increaseTime) {
      eventsQueue.push({eventKey: eventKey, executionTime: currentTime})
      if (altTime) {
        increaseTime = increaseTime === startTime ? altTime : startTime;
      }
    }
  }

  private async runSimulation() {
    await this.initSimulation();
    this.simulationLoop();
  }

  private simulationLoop() {
    const settings = this.#simulationSettings.getValue();
    const status = this.#simulationStatus.getValue();

    if (status.inProgress) {
      setTimeout(() => {
        status.currentTime = status.currentTime + settings.step;
        this.#simulationStatus.next({...status});
        this.popQueue(status.currentTime);
        if (status.currentTime < settings.duration) {
          this.simulationLoop();
        }
      }, this.stepTimeout)
    }
  }

  private popQueue(theTime: number) {
    let queue = this.#simulationQueue.getValue();

    if (queue.length && queue[0].executionTime <= theTime) {
      if (!environment.production) {
        console.log('PERFORMING: ' + queue[0].eventKey + ' IN:' + theTime)
      }
      this.eventsHelper.performEvent(queue[0].eventKey, this.#simulationStatus.getValue());
      queue = queue.slice(1);
      this.#simulationQueue.next([...queue]);
      this.popQueue(theTime);
    }
  }

}
