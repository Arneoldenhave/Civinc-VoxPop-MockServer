export default class ThesesSchema 
{
    _id: string;
    created: number;
    text: string;
    answerOptions: string[];
    totalAnswers : number[];

    constructor
    (  
        _id: string,
        text: string,
        answerOptions: string[]
    )
    {
        this._id = _id;
        this.text = text;
        this.answerOptions = answerOptions;
        this.created = Date.now();
        this.totalAnswers = [];
    }

    timesUsed = () => {
        const add = (total: number, num: number) => total + num 
        return this.totalAnswers.reduce(add)
    }
}

