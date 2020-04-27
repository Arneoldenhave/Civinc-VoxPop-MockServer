import mongoose, { Model } from 'mongoose';

import IChats from './IChats';
import ChatsSchema from './ChatsSchema';



ChatsSchema.statics.saveMessage = async function(message: any) {
    return mongoose.model('Chats').update({_id: message.chatId}, { $push : {messages: message} } );
};

ChatsSchema.statics.likeMessage = async function(chatId: string, messageId: string) {
    return mongoose.model('Chats').update(  {_id: chatId , messages: { $elemMatch: { _id: messageId } } },
        { $set: { 'messages.$.liked' : true } } );
};

ChatsSchema.statics.unLikeMessage = async function(chatId: string, messageId: string) {
    return mongoose.model('Chats').update(  {_id: chatId , messages: { $elemMatch: { _id: messageId } } },
        { $set: { 'messages.$.liked' : false } } );
};

ChatsSchema.statics.findByUserId = async function(userId: string) {
    return mongoose.model('Chats').find({ userIds: { $in: userId } } );
};

export interface IChatsModel extends Model<IChats> {
    saveMessage(message: any) : Promise<any>
}

export default mongoose.model<IChats, IChatsModel>('Chats', ChatsSchema);