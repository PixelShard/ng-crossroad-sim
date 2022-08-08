import { TrafficLightColorEnum } from "../enums/traffic-light-color.enum";
import { CardinalDirectionsEnum } from "../enums/cardinal-directions.enum";

export interface ILightsStatus {
  North: TrafficLightColorEnum;
  South: TrafficLightColorEnum;
  East: TrafficLightColorEnum;
  West: TrafficLightColorEnum;
}

export interface ICarQueue {
  [CardinalDirectionsEnum.North]: number;
  [CardinalDirectionsEnum.South]: number;
  [CardinalDirectionsEnum.West]: number;
  [CardinalDirectionsEnum.East]: number;
}

export interface ISimulationStatus {
  inProgress: boolean,
  currentTime: number,
  lights: ILightsStatus,
  carQueue: ICarQueue,
  passedCarsQueue: ICarQueue
}

export const DEFAULT_SIMULATION_STATUS: ISimulationStatus = {
  inProgress: false,
  currentTime: 0,
  lights: {
    North: TrafficLightColorEnum.RED,
    South: TrafficLightColorEnum.RED,
    East: TrafficLightColorEnum.GREEN,
    West: TrafficLightColorEnum.GREEN
  },
  carQueue: {
    North: 0,
    South: 0,
    East: 0,
    West: 0
  },
  passedCarsQueue: {
    North: 0,
    South: 0,
    East: 0,
    West: 0
  }
}

