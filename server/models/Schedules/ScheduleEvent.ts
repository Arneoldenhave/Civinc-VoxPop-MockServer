import SchedulesSchema from "./SchedulesShema";
import ScheduleStates from "../../../utils/ScheduleStates";

export default interface ScheduleEvent 
{
    start: number,
    end: number,
    eventId: string,
    status: ScheduleStates,
    schedules: SchedulesSchema[]
}