import MessageSchema from './MessageSchema';

export default interface ChatsSchema 
{
    _id: string,

    start: number,
    end: number,

    userIds: string[],
    thesisId: string,
    eventId: string,

    round: number,
    messages: MessageSchema[]
}