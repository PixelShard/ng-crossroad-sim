import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SimulationService } from "../simulation/simulation.service";
import { Observable, of } from "rxjs";
import { ISimulationStatus } from "../simulation/interfaces/simulation-status";
import { catchError } from "rxjs/operators";
import { TrafficLightColorEnum } from "../simulation/enums/traffic-light-color.enum";
import { CardinalDirectionsEnum } from "../simulation/enums/cardinal-directions.enum";

@Component({
  selector: 'app-crossroad',
  templateUrl: './crossroad.component.html',
  styleUrls: ['./crossroad.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrossroadComponent implements OnInit {

  simulationStatus$: Observable<ISimulationStatus | null> = this.simulationService.$simulationStatus.pipe(
    catchError(error => {
      console.error(error);
      return of(null);
    })
  )

  public TrafficLightColor = TrafficLightColorEnum;
  public CardinalDirectionsEnum = CardinalDirectionsEnum;

  constructor(private simulationService: SimulationService) { }

  ngOnInit(): void {
  }

}
