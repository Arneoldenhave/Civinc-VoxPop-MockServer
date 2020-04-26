export default interface iMessages 
{
    _id: string,
    text: string,

    userId: string,
    chatId: string,
    eventId: string,

    created: Date,
    liked: boolean,
}