import ChatsFactoryData from './ChatsFactoryData';
import IChats from '../../models/Chats/IChats';

export default class ChatsFactory {

    cretate(data: ChatsFactoryData) {
        var chats : any [ ]= []; 
        
        data.matches.forEach(( results, i) => {
            const userIds = results.map(r => r._id)
        
            var chat  = 
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