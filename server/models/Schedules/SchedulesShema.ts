import { ScheduleTypes, ScheduleStates } from '../../../utils/ScheduleStates';

export default interface SchedulesSchema 
{
    _id: string,
    end: number,
    start: number, 
    eventId: string,
    type: ScheduleTypes,
    state: ScheduleStates,
    redirect?: object,
    meta?: object,
};
