import mongoose from 'mongoose';
import UserSchema from './UsersSchema';

UserSchema.statics.postFeedBack = async function(userId: string, feedBack: string) {
    mongoose.model('Users').update({_id: userId }, { $push: { feedback: feedBack } } );
};

export default mongoose.model('Users', UserSchema);