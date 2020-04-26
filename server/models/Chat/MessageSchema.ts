export default interface MessageSchema 
{
    _id: string,
    text: string,

    userId: string,
    chatId: string,
    eventId: string,

    created: Date,
    liked: boolean,
}