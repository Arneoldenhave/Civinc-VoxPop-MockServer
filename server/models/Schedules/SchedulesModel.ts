import SchedulesSchema from './SchedulesShema';
import ResultType from './../../../utils/ResultType';
import ScheduleEvent from './ScheduleEvent';
import ScheduleStates from '../../../utils/ScheduleStates';

export default class ScheduleModel {

    private scheduleEvents : ScheduleEvent[] = [];

    timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    async save(ScheduleEvent: ScheduleEvent[], time: number) : Promise<ResultType<Error,ScheduleEvent[]>> {
        await this.timeout(time);
        this.scheduleEvents.concat(this.scheduleEvents, ScheduleEvent);

        const res : ResultType<Error, ScheduleEvent[]> = 
        {
            result : []
        };
        return res;
    };

    async findAboutToStart(time: number) {
        await this.timeout(1)
        const aboutToStart = this.scheduleEvents.filter(se => se.start > time && se.status === ScheduleStates.Inactive)
        return aboutToStart;
    };

    async findBy(eventId: string, time: number) : Promise<ResultType<Error, ScheduleEvent[]>> {
        await this.timeout(time);   
        const res : ResultType<Error, ScheduleEvent[]> = 
        {
            result : this.scheduleEvents.filter(s => s.eventId === eventId)
        };
        return res;
    };
};
