import mongoose, { Model } from 'mongoose';
import UserSchema from './UsersSchema';
import IUsers from './IUsers';

export interface IUsersModel extends Model<IUsers> {}

UserSchema.statics.postFeedBack = async function(userId: string, feedBack: string) {
    mongoose.model('Users').update({_id: userId }, { $push: { feedback: feedBack } } );
};

export default mongoose.model<IUsers, IUsersModel>('Users', UserSchema);