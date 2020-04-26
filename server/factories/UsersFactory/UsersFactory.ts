import IUsers from '../../models/Users/IUsers';
import IGroups from '../../models/Events/IGroups';

export default class UsersFactory {

    create(eventId: string, groups: IGroups[]) : IUsers[] {

        return groups.map( (groupSchema, i) => 
        {
            const _id     = `user_${i}_${groupSchema._id}`;
            const groupId = `group_${groupSchema._id}`;
            const created = Date.now();
            const name = "Jan"
            const image = "img_1"
        
            let IUsers : IUsers = {
                name,
                image,
                created,
                _id,
                groupId,
                eventId   
            };
            return IUsers;
        });
    };
};