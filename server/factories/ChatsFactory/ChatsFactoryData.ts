import ResultsScema from './../../models/Results/ResultsSchema';

export default interface ChatsFactoryData 
{
    eventId: string,
    thesisId: string,
    matches: ResultsScema[][],
    start: number,
    end: number,
    round: number,
}
