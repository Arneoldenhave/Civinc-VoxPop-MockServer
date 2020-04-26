import GroupSetup from './GroupSetup';
import GroupsSchema from './../../models/Events/GroupsSchema';

export default class GroupsFactory {

    create(setup: GroupSetup[] ) : GroupsSchema[] {
        return setup.map((data, i) => {
            let schema : GroupsSchema = {
                _id : `group_${i}`,
                name : data.name,
                amount : data.amount,
            }
            return schema;
        });
    };
};