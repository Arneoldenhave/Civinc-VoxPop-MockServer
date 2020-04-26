
interface ScheduleSchema 
{
    _id: string,
    type: string,
    start: Date, 
    end: Date,
    redirect?: object,
    meta?: object,
}

export default ScheduleSchema

