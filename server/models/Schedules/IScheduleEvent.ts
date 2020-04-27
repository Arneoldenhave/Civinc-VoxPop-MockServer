import mongoose, { Document } from 'mongoose';
import ISchedule from "./ISchedule";
import ScheduleStates from "../../../utils/ScheduleStates";

export default interface IScheduleEvent extends Document
{
    start: number,
    end: number,
    eventId: string,
    status: ScheduleStates,
    schedules: ISchedule[]
    _id: string,
}