import mongoose, {Document } from 'mongoose';

export default interface IResults extends Document
{
    _id: string;
    userId: string;
    eventId: string;
    groupId: string;
    thesisId: string;
    answer: string;
    result: number;
}