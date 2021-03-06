import IGroups from "./IGroups";
import IEvents from './IEvents';
import mongoose, { Model } from 'mongoose';

const Schema = mongoose.Schema;

const GroupsSchema = new Schema<IGroups>({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0,
    }
});

const EventsSchema = new Schema({
    start: {
        type: Number,
        required: true,
    },

    end: {
        type: Number,
        required : true,
    },

    name: {
        type: String,
        required: true
    },

    groups: {
        type : [GroupsSchema],
        default: [],
    },

    lastRounds: {
        type : [String],
        default: [],
    },

    rounds: {
        type: Number,
        required: 0,
    }
});


export interface IEventsModel extends Model<IEvents> {}

export default mongoose.model<IEvents, IEventsModel>('Events', EventsSchema);