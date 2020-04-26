export default interface ResultsSetup 
{
    thesisIds: [string],
    eventId: string,
    groups: [groupSetup],
}

interface groupSetup 
{
    realUsers:[string],
    groupId: string,
    eventId: string,
    number: number,
}