import mongoose from 'mongoose';
import ThesesSchema from './ThesesSchema';


ThesesSchema.statics.addAnswers = async function(id: string, answers: [number]) {
    const thesis = await mongoose.model('Theses', ThesesSchema).findById(id);
}

export default mongoose.model('Theses', ThesesSchema);