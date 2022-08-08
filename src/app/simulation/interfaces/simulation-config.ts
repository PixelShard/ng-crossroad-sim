export interface ISimulationConfig {
  duration: number;
  step: number;
  northSouthLightsDuration: number;
  eastWestLightsDuration: number;
  northQueueInterval: number;
  southQueueInterval: number;
  westQueueInterval: number;
  eastQueueInterval: number;
  carLeavingTime: number;
}

export const SIMULATION_DEFAULT_CONF: ISimulationConfig = {
  duration: 0,
  step: 1,
  northSouthLightsDuration: 0,
  eastWestLightsDuration: 0,
  northQueueInterval: 0,
  southQueueInterval: 0,
  westQueueInterval: 0,
  eastQueueInterval: 0,
  carLeavingTime: 0
}
