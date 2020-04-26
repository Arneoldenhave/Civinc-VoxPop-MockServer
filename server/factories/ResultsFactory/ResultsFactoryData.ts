import IUsers from "../../models/Users/IUsers";

export default interface ResultsSetup 
{
    thesisIds: string[],
    eventId: string,
    users: IUsers[],
}

interface groupSetup 
{
    realUsers:[string],
    groupId: string,
    eventId: string,
    number: number,
}