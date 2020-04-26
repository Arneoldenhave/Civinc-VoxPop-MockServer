import ISchedule from './ISchedule';
import ResultType from './../../../utils/ResultType';
import mongoose from 'mongoose';

import IScheduleEvent from './IScheduleEvent';
import ScheduleStates from '../../../utils/ScheduleStates';

import ScheduleTypes from '../../../utils/ScheduleTypes';
import ScheduleSchema from './ScheduleSchema';

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

ScheduleEventSchema.statics.findAboutToStart = async function (time: number) {
    return mongoose.model('ScheduleEvent').find({start: { $lt: time }, status : "INACTIVE" });
};

export default mongoose.model('ScheduleEvent', ScheduleEventSchema);
