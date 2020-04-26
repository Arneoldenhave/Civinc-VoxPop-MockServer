import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MessagesSchema = new Schema({

    text: {
        type: String,
        requied: true
    },
    userId: {
        type: String,
        required: true,
    },
    chatId: {
        type: String,
        required: true,
    },
    eventId: {
        type: String,
        required: true,
    },
    created: {
        type: Number,
        default: Date.now(),
    },
    liked: {
        type: Boolean,
        default: false
    },
});

export default MessagesSchema;
