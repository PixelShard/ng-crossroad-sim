import { Injectable } from "@angular/core";
import { EventsEnum } from "../simulation/enums/events.enum";
import { TrafficLightColorEnum } from "../simulation/enums/traffic-light-color.enum";
import { ISimulationStatus } from "../simulation/interfaces/simulation-status";
import { CardinalDirectionsEnum } from "../simulation/enums/cardinal-directions.enum";

@Injectable({
  providedIn: 'root'
})
export class EventsHelper {

  public performEvent(event: EventsEnum, status: ISimulationStatus) {
    switch (event) {
      case EventsEnum.SwitchLights:
        return this.switchLights(status);
      case EventsEnum.AddCarNorthQueue:
        return this.addCarToQueue(status, CardinalDirectionsEnum.North);
      case EventsEnum.AddCarSouthQueue:
        return this.addCarToQueue(status, CardinalDirectionsEnum.South);
      case EventsEnum.AddCarWestQueue:
        return this.addCarToQueue(status, CardinalDirectionsEnum.West);
      case EventsEnum.AddCarEastQueue:
        return this.addCarToQueue(status, CardinalDirectionsEnum.East);
      case EventsEnum.RemoveCarNorthQueue:
        return this.removeCarFromQueue(status, CardinalDirectionsEnum.North);
      case EventsEnum.RemoveCarSouthQueue:
        return this.removeCarFromQueue(status, CardinalDirectionsEnum.South);
      case EventsEnum.RemoveCarEastQueue:
        return this.removeCarFromQueue(status, CardinalDirectionsEnum.East);
      case EventsEnum.RemoveCarWestQueue:
        return this.removeCarFromQueue(status, CardinalDirectionsEnum.West);
      default:
          return;
    }
  }

  private switchLights(status: ISimulationStatus): ISimulationStatus {
    status.lights.North = status.lights.North === TrafficLightColorEnum.GREEN ? TrafficLightColorEnum.RED : TrafficLightColorEnum.GREEN;
    status.lights.South = status.lights.South === TrafficLightColorEnum.GREEN ? TrafficLightColorEnum.RED : TrafficLightColorEnum.GREEN;
    status.lights.East = status.lights.East === TrafficLightColorEnum.GREEN ? TrafficLightColorEnum.RED : TrafficLightColorEnum.GREEN;
    status.lights.West = status.lights.West === TrafficLightColorEnum.GREEN ? TrafficLightColorEnum.RED : TrafficLightColorEnum.GREEN;
    return {...status};
  }

  private addCarToQueue(status: ISimulationStatus, direction: CardinalDirectionsEnum): ISimulationStatus {
    status.carQueue[direction]++;
    return {...status};
  }

  private removeCarFromQueue(status: ISimulationStatus, direction: CardinalDirectionsEnum): ISimulationStatus {
    switch (direction) {
      case CardinalDirectionsEnum.South:
        if (this.canCarMove(status.lights.South, status.carQueue[direction])) {
          return this.moveCarToPassedQueue(status, direction);
        }
        return status;
      case CardinalDirectionsEnum.North:
        if (this.canCarMove(status.lights.North, status.carQueue[direction])) {
          return this.moveCarToPassedQueue(status, direction);
        }
        return status;
      case CardinalDirectionsEnum.East:
        if (this.canCarMove(status.lights.East, status.carQueue[direction])) {
          return this.moveCarToPassedQueue(status, direction);
        }
        return status;
      case CardinalDirectionsEnum.West:
        if (this.canCarMove(status.lights.West, status.carQueue[direction])) {
          return this.moveCarToPassedQueue(status, direction);
        }
        return status;
    }

  }

  canCarMove(lightColor: TrafficLightColorEnum, queueLength: number): boolean {
    return queueLength > 0 && lightColor === TrafficLightColorEnum.GREEN;
  }

  moveCarToPassedQueue(status: ISimulationStatus, direction: CardinalDirectionsEnum) {
    console.log('moveCarToPassedQueue: ' + direction);
    status.passedCarsQueue[direction]++;
    status.carQueue[direction]--;
    return {...status};
  }

}
