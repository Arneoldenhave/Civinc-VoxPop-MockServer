import GroupSchema from './GroupSchema';
import EventsSchema from './EventsSchema';
import { rejects } from 'assert';

export default class EventsModel {

    events: EventsSchema[] = [];

    timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    async findBy(id: string) : Promise<EventsSchema> {
        await this.timeout(10);
        let found = this.events.filter(e => e._id === id )[0];
        return found;
    };

    async create(event: EventsSchema) : Promise<EventsSchema> {
        await this.timeout(10) 
        this.events.push(event)
        return event;
    };

};