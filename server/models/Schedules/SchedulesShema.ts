import ScheduleStates from '../../../utils/ScheduleStates';
import ScheduleTypes from './../../../utils/ScheduleTypes';

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
