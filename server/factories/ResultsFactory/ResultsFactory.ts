import ResultsFactoryData from './ResultsFactoryData';
import ResultsSchema from '../../models/Results/ResultsSchema';
import UserSchema from '../../models/Users/UserSchema';


export default class ResultsFactory {

    answers : string[];

    constructor(answers: string[]) {
        this.answers = answers;
    };

    create(users: UserSchema[], thesisIds: string[]) {
        let results : ResultsSchema[] = [];
        var i = 0;
        for (const thesisId of thesisIds) 
        {    
            for (const user of users) 
            {
                const resultIndex = this._randomIndex();
                const anwser = this.answers[resultIndex];
                const _id = `result_${i}`;

                let result : ResultsSchema = 
                {
                    _id: _id,
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