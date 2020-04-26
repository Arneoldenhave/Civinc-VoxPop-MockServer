import ISchedule from "./ISchedule";
import ScheduleStates from "../../../utils/ScheduleStates";

export default interface IScheduleEvent 
{
    start: number,
    end: number,
    eventId: string,
    status: ScheduleStates,
    schedules: ISchedule[]
    _id: string,
}