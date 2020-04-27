import IUsers from '../../models/Users/IUsers';
import IGroups from '../../models/Events/IGroups';

export default class UsersFactory {

    create(eventId: string, groups: IGroups[]) : any[] {

        return groups.map( (groupSchema, i) => 
        {
            const groupId = `group_${groupSchema._id}`;
            const created = Date.now();
            const name = "Jan"
            const image = "img_1"
        
            return {
                name,
                image,
                created,
                groupId,
                eventId   
            };
        });
    };
};