import mongoose, { Model } from 'mongoose';
import ResultsSchema from './ResultsSchema';
import IResults from './IResults';



ResultsSchema.statics.findByEventId = async function(id: string) {
    return mongoose.model('Results').find({eventId: id});
};

ResultsSchema.statics.find = async function(groupId: string, thesisId: string) {
    return mongoose.model('Results').find({eventId: groupId, thesisId: thesisId } );
};

export interface IResultsModel extends Model<IResults> {
    findByEventId(id: string) : Promise<IResults[]>
}

export default mongoose.model<IResults, IResultsModel>('Results', ResultsSchema);