import ResultsFactoryData from './ResultsFactoryData';
import IResults from '../../models/Results/IResults';
import IUsers from '../../models/Users/IUsers';


export default class ResultsFactory {

    answers : string[];

    constructor(answers: string[]) {
        this.answers = answers;
    };

    create(users: IUsers[], thesisIds: string[]) {
        let results : any[] = [];
        var i = 0;
        for (const thesisId of thesisIds) 
        {    
            for (const user of users) 
            {
                const resultIndex = this._randomIndex();
                const anwser = this.answers[resultIndex];

                let result  = 
                {
    
                    userId: user._id,
                    groupId: user.groupId,
                    eventId: user.eventId,
                    thesisId: thesisId,
                    result: resultIndex,
                    answer: anwser,
                };
                results.push(result);
                i++
            };
        };
        return results;
    }

    _randomIndex() : number {
        return Math.floor(Math.random() * 5);
     };
    
};