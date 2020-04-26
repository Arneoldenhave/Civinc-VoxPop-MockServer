import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ThesesSchema = new Schema({

    text: {
        type: [String],
        required: true,
    },
    answerOptions: {
        type: [String],
        required: true,
    },
    totalAnswers: {
        type: [Number],
        default: 0,
    },
    created: {
        type: Number,
        default: Date.now(),
    },
});

export default ThesesSchema;