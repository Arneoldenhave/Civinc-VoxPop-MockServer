import UserSchema from "../../models/Users/UserSchema";

export default interface ResultsSetup 
{
    thesisIds: string[],
    eventId: string,
    users: UserSchema[],
}

interface groupSetup 
{
    realUsers:[string],
    groupId: string,
    eventId: string,
    number: number,
}