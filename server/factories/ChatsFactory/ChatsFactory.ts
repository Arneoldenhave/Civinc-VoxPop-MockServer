import ChatsFactoryData from './ChatsFactoryData';
import ChatsSchema from './../../models/Chat/ChatsSchema';

export default class ChatsFactory {

    cretate(data: ChatsFactoryData) {
        var chats : ChatsSchema[ ]= []; 
        
        data.matches.forEach(( results, i) => {
            const userIds = results.map(r => r._id)
        
            var chat : ChatsSchema = 
            {
                _id : `chat_${i}`,
                start : data.start,
                end : data.end,
                messages : [],
                round: data.round,
                thesisId : data.thesisId,
                userIds: userIds,
                eventId: data.eventId
            }
            chats.push(chat);
        });
    };
};