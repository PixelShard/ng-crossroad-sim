import { EventsEnum } from "../enums/events.enum";

export interface IEvent{
  eventKey: EventsEnum,
  executionTime: number
}
