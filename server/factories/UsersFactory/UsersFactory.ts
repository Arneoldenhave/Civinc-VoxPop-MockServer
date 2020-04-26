import UserSchema from '../../models/Users/UserSchema';
import utils from '../../../utils/index';
import GroupsSchema from '../../models/Events/GroupsSchema';


export default class UsersFactory {

    create(eventId: string, groups: GroupsSchema[]) : UserSchema[] {

        return groups.map( (groupSchema, i) => 
        {
            const _id     = `user_${i}_${groupSchema._id}`;
            const groupId = `group_${groupSchema._id}`;
            const created = Date.now();
            const name = "Jan"
            const image = "img_1"
        
            let userSchema : UserSchema = {
                name,
                image,
                created,
                _id,
                groupId,
                eventId   
            };
            return userSchema;
        });
    };
};