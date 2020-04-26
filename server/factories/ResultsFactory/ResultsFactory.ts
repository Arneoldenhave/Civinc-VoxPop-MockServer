import ResultsFactoryData from './ResultsFactoryData';
import ResultsSchema from '../../models/Results/ResultsSchema';


export default class ResultsFactory {

    answers : string[];

    constructor(answers: string[]) {
        this.answers = answers;
    };

    create(data: ResultsFactoryData) : ResultsSchema[] {

        let results = [];
        for (const thesisId of data.thesisIds) 
        {    
            for (const group of data.groups) 
            {
                for (var i = 0; i < group.number; i++) 
                {
                    const result = this._randomIndex();
                    const answer = this.answers[result];
                    var userId = '';

                    if (group.realUsers[i]) 
                    {
                        userId = group.realUsers[i];
                    } else 
                    {
                        userId = `user_${i}`; 
                    }
                    results.push
                    (
                        new ResultsSchema(`result_${i}`, userId, data.eventId, group.groupId, thesisId, answer, result)
                    );
                };
            };
        };
        return results;
    };

    _randomIndex() : number {
        return Math.floor(Math.random() * 5);
     };
    
};