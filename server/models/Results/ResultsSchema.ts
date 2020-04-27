import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ResultsSchema = new Schema({

    userId: {
        type: String,
        required: true,
    },
    eventId: {
        type: String,
        required: true,
    },
    groupId: {
        type: String,
        required: true,
    },
    thesisId: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    result: {
        type: Number,
        required: true,
    },
});

export default ResultsSchema;
