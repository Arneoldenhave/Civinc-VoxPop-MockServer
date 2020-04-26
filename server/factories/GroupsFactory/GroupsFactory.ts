import GroupSetup from './GroupSetup';
import IGroups from './../../models/Events/IGroups';

export default class GroupsFactory {

    create(setup: GroupSetup[] ) : IGroups[] {
        return setup.map((data, i) => {
            let schema : IGroups = {
                _id : `group_${i}`,
                name : data.name,
                amount : data.amount,
            }
            return schema;
        });
    };
};