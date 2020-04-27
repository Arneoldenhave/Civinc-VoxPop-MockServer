import mongoose, { Document } from 'mongoose';

export default interface IUsers extends Document
{
    _id: string;
    name: string;
    created: number;

    groupId: string;
    eventId: string;
    image: string;
}

