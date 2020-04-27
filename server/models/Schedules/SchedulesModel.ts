import ISchedule from './ISchedule';
import IScheduleEvent from './IScheduleEvent';

import mongoose, { Model } from 'mongoose';
import ScheduleStates from '../../../utils/ScheduleStates';

import ScheduleTypes from '../../../utils/ScheduleTypes';
import ScheduleSchema from './ScheduleSchema';
import IEvents from '../Events/IEvents';

const Schema = mongoose.Schema;

const ScheduleEventSchema = new Schema<IScheduleEvent>({

    start: {
        type: Number,
        required: true
    },
    end: {
        type: Number,
        required: true
    },
    eventId: {
        type: String,
        required: true,
    },
    meta: {
        type: Object,
        default: null
    },
    type: {
        type: ScheduleTypes,
        default: ScheduleTypes.Event
    },
    state : {
        type: ScheduleStates,
        default: ScheduleStates.Inactive,
    },
    schedules: {
        type: [ScheduleSchema],
        required: [],
    }
});

ScheduleEventSchema.statics.findAboutToStart = async function (time: number) 
{
    const nowIsh = Date.now() + time
    const nextMinute = nowIsh + 1000 * 60;
    const inactiveQuery = { state: "INACTIVE" }
    const upcomingQuery = { start : { $gte: nowIsh, $lte: nextMinute }, state: "INACTIVE" };
    const found = await mongoose.model('ScheduleEvent').find(inactiveQuery);
    const ids = found.map(f => f._id);
    const updateQuery =  { _id: { $in: ids}, state : { $ne: 'ACTIVE' } };
    await mongoose.model('ScheduleEvent').updateMany(updateQuery, { state: 'ACTIVE' });
    return found
};

export interface IScheduleEventsModel extends Model<IScheduleEvent> {
    findAboutToStart(time: number) : Promise<IScheduleEvent[]>
}

export default mongoose.model<IScheduleEvent, IScheduleEventsModel >('ScheduleEvent', ScheduleEventSchema);
