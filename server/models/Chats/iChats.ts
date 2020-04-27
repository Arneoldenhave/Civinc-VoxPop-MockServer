import iMessages from './iMessages';
import mongoose, { Document } from 'mongoose';

export default interface IChats extends Document
{
    _id: string,

    start: number,
    end: number,

    userIds: string[],
    thesisId: string,
    eventId: string,

    round: number,
    messages: iMessages[];
};