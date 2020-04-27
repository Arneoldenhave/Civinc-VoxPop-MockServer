import { EventEmitter } from "events";

export default interface IScheduleEmitter {

    scheduleEmitter? : EventEmitter 
    start(emitter: EventEmitter) : void 
}