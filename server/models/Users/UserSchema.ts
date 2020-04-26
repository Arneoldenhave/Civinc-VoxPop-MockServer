
export default class UserSchema 
{
    _id: string;
    name: string;
    created: number;

    groupId: string;
    eventId: string;
    image: string;


    constructor(
        _id: string,
        name: string,    
        groupId: string,
        eventId: string,
        image: string) 
        {
            this._id = _id;
            this.name = name;
            this.created = Date.now();

            this.groupId = groupId;
            this.eventId = eventId;
            this.image = image;

        }
}

