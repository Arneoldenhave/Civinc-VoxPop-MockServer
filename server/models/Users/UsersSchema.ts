import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    created: {
        type: Number,
        default: Date.now()
    },
    groupId: {
        type: String,
        required: true,
    },
    eventId: {
        type: String,
        required: true,
    },
    image:  {
        type: String,
        required: true,
    },
    feedBack : {
        type: [String],
        default: []
    },
})

export default UsersSchema;