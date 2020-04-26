import mongoose from 'mongoose';
const Schema = mongoose.Schema;

import MessagesSchema from './MessagesSchema';

const ChatsSchema = new Schema({
    start : {
        type: Number,
        default: Date.now(),
    },
    end : {
        type: Date,
        default: false,
    },
    userIds: {
        type: [String],
        required: true,
    },
    thesisId: {
        type: String,
        required: true
    },
    eventId: {
        type: String,
        required: true,
    },
    round: {
        type: Number,
        round: true,
    },
    messages: {
        type: [MessagesSchema],
        default : []
    },
});

export default ChatsSchema;
