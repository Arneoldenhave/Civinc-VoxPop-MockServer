import SchdulesModel from './../models/Schedules/SchedulesModel';
import IScheduleEvent from '../models/Schedules/IScheduleEvent';
import ScheduleStates from '../../utils/ScheduleStates';
import { EventEmitter } from 'events';
import IScheduleEmitter from './../../utils/IScheduleEmitter';
import { stringify } from 'querystring';

class ScheduleService implements IScheduleEmitter {

    schedulesModel = SchdulesModel
    // eventId: IScheduleEvent 
    activeEvents : Map<string, IScheduleEvent> = new Map();
    // MARK: IScheduleEmitter
    scheduleEmitter? : EventEmitter 


    start(emitter: EventEmitter) : void  {
        this.scheduleEmitter = emitter;
        emitter.emit("STARTED");
        emitter.on("DONE", schedule => {
            console.log(schedule)
        });
    };
 
    private async poller() {
        console.log("Poller")
        let aboutToStart : IScheduleEvent[] = await this.schedulesModel.findAboutToStart(3)
        console.log(aboutToStart)
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
        if (!this.scheduleEmitter) 
        { 
            console.log("ScheduleService: no emitter present") ;return; 
        }

        this.activeEvents.forEach((value: IScheduleEvent, key: string) => 
        {
            for (const schedule of value.schedules) {
            

                if (schedule.state == ScheduleStates.Inactive && 
                    schedule.start < Date.now() && schedule.end > Date.now() )
                {
                    console.log(schedule.type)
                    schedule.state = ScheduleStates.Active;
                    this.scheduleEmitter?.emit(schedule.type, schedule);
                }
            };
        })
    };

    constructor() {
        console.log("ScheduleService itnialized")
        this.startPoller(1000);
        this.startScheduleWorker(1000);
    };
};


export default new ScheduleService();