import mongoose, { model } from 'mongoose';
import IResults from './IResults';
import ResultsSchema from './ResultsSchema';

ResultsSchema.statics.findByEventId = async function(id: string) {
    return mongoose.model('Results').find({eventId: id});
};

ResultsSchema.statics.find = async function(groupId: string, thesisId: string) {
    return mongoose.model('Results').find({eventId: groupId, thesisId: thesisId } );
};

export default mongoose.model('Results', ResultsSchema);