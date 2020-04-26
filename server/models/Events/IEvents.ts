import IGroups from './IGroups';

export default interface IEvents {
    _id : string,
    start: number,
    end: number,
    name: string,
    groups: IGroups[],
    lastRounds : string[],
    rounds: number
};