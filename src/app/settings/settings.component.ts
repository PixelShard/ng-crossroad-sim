import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SimulationService } from "../simulation/simulation.service";
import { catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { ISimulationStatus } from "../simulation/interfaces/simulation-status";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {

  simulationSettings = new FormGroup({
    simulationDuration: new FormControl(45 ,[Validators.required]),
    northSouthLightsDuration: new FormControl(2, [Validators.required]),
    eastWestLightsDuration: new FormControl(4, [Validators.required]),
    northQueueInterval: new FormControl(1, [Validators.required]),
    southQueueInterval: new FormControl(3, [Validators.required]),
    eastQueueInterval: new FormControl(5, [Validators.required]),
    westQueueInterval: new FormControl(2, [Validators.required]),
    carLeavingTime: new FormControl(10, [Validators.required])
  });

  public simulationStatus$: Observable<ISimulationStatus | null> = this.simulationService.$simulationStatus.pipe(
    catchError(error => {
      console.error(error);
      return of(null);
    })
  )

  constructor(private simulationService: SimulationService) { }

  async startSimulation() {
    if (!this.simulationService.isSimulationInProgress()) {
      await this.simulationService.setSimulationSettings(this.simulationSettings)
    }
    this.simulationService.onStartSimulation();
  }
}
