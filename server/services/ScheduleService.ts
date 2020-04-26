import SchdulesModel from './../models/Schedules/SchedulesModel';
import ScheduleEvent from '../models/Schedules/ScheduleEvent';
import ScheduleStates from '../../utils/ScheduleStates';
import { EventEmitter } from 'events';
import ScheduleEmitter from './ScheduleEmitter';


class ScheduleService {

    schedulesModel : SchdulesModel
    // eventId: ScheduleEvent 
    activeEvents : Map<string, ScheduleEvent> = new Map();
    emitter : EventEmitter;
 
    private async poller() {

       let aboutToStart : ScheduleEvent[] = await this.schedulesModel.findAboutToStart(3)
        aboutToStart.forEach(se => {
            this.activeEvents.set(se.eventId, se);
        });
    };
    
    private startPoller(interval: number) {
        setInterval(() => {
            this.poller();
        }, interval);
    };

    private startScheduleWorker(interval: number) {
        setInterval(() => {
            this.checkActiveEvents();
        }, interval);
    };

    private checkActiveEvents() {
        this.emitter.emit("SCHEDULE", "schedule");
        for (const id in this.activeEvents) {
            const scheduledEvent = this.activeEvents.get(id)!
        
            for (const schedule of scheduledEvent.schedules) {

                if (schedule.state === ScheduleStates.Inactive && 
                    schedule.start > Date.now() && schedule.end < Date.now())
                {
                    schedule.state = ScheduleStates.Active;
                    this.emitter.emit("SCHEDULE", schedule);
                }
            };
        };
    };

    constructor(model: SchdulesModel, emitter: EventEmitter) {
        console.log("ScheduleService itnialized")
        this.schedulesModel = model;
        this.emitter = emitter
        this.startPoller(1000);
        this.startScheduleWorker(1000);
  
    };
};


export default new ScheduleService( new SchdulesModel,ScheduleEmitter);