import SchedulesSchema from './SchedulesShema';
import ResultType from './../../../utils/ResultType';

export default class ScheduleModel {

    private schedules : SchedulesSchema[] = [];

    timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    async save(schedules: SchedulesSchema[], time: number) : Promise<ResultType<Error,SchedulesSchema[]>> {
        await this.timeout(time);
        this.schedules.concat(this.schedules, schedules);

        const res : ResultType<Error, SchedulesSchema[]> = 
        {
            result : []
        };
        return res;
    };

    async findBy(eventId: string, time: number) : Promise<ResultType<Error, SchedulesSchema[]>> {
        await this.timeout(time);   
        const res : ResultType<Error, SchedulesSchema[]> = 
        {
            result : this.schedules.filter(s => s._id === eventId)
        };
        return res;
    };
};