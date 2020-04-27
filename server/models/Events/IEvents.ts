import IGroups from './IGroups';
import mongoose, { Document } from 'mongoose';

export default interface IEvents extends Document {
    _id : string,
    start: number,
    end: number,
    name: string,
    groups: IGroups[],
    lastRounds : string[],
    rounds: number
};

