import GroupsSchema from './GroupsSchema';

export default interface EventsSchema {
    _id : string,
    start: number,
    end: number,
    name: string,
    groups: GroupsSchema[],
    lastRounds : string[],
    rounds: number
};