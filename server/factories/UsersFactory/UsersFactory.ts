import UserSchema from '../../models/Users/UserSchema';
import UserFactoryData from './UserFactoryData';
import utils from '../../../utils/index';


export default class UsersFactory {

    create(data: UserFactoryData) : UserSchema[] {
        return Array(data.amount).map(i => {
            let _id : string = utils.Crypto.UUID();
            return new UserSchema(_id,  `user_${i}`, `group_${data.groupId}`, `event_${data.eventId}`, 'image_1')
        });
    };
};