import GroupsSchema from './GroupSchema';

export default interface EventsSchema {
    _id : string,
    start: Date,
    end: Date,
    name: string,
    groups: [GroupsSchema],
    lastRounds : [number]
}