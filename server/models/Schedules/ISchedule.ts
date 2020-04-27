import mongoose, { Document } from 'mongoose';
import ScheduleStates from '../../../utils/ScheduleStates';
import ScheduleTypes from '../../../utils/ScheduleTypes';

export default interface ISchedule extends Document
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
