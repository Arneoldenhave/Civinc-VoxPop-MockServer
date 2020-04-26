import ISchedule from './ISchedule';
import mongoose from 'mongoose';
import ScheduleTypes from '../../../utils/ScheduleTypes';
import ScheduleStates from '../../../utils/ScheduleStates';


const Schema = mongoose.Schema;


const ScheduleSchema = new Schema<ISchedule>({

    start: {
        type: Number, 
        required: true,
    },
    end: {
        type: Number,
        required: true,
    },
    eventId: {
        type: String,
        required: true,
    },
    type: {
        type: ScheduleTypes,
        required: true
    },
    state: {
        type: ScheduleStates,
        required: true,
    },
    redirect: {
        type: Object,
        default: null
    },
    meta : {
        type: Object,
        default: null
    },
});

export default ScheduleSchema;

