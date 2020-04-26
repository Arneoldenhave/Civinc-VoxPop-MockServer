export default class ResultsSchema 
{
    _id: string;
    userId: string;
    eventId: string;
    groupId: string;
    thesisId: string;
    answer: string;
    result: number;

    constructor
    (    
        _id: string,
        userId: string,
        eventId: string,
        groupId: string,
        thesisId: string,
        answer: string,
        result: number
    ) 
    {
        this._id = _id;
        this.userId = userId;
        this.eventId = eventId;
        this.groupId = groupId;
        this.thesisId = thesisId;
        this.answer = answer;
        this.result = result;
    }
}