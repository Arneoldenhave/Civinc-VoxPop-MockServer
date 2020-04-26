class Raster {

    rounds = 0;
    groupsSizes = 0;
    answers = -1;
    roundIds = [];
    data = [];
    totals = [];
    
    constructor(){};

    getRoundId(round) {
        return this.roundIds[round];
    };

    _indexOfAnswer(answer) {
        switch (answer) {
            case 0 :
                return 0;
            case 1 : 
                return 0;
            case 2 :
                return 1;
            case 3 :
                return 2;
            default :
                return 2;
        };
    };

    add(result, round, group, answer)
    {
        if (round > this.data.length - 1) 
        {            
            this.data.push([]);
            this.roundIds.push(result.thesisId);
            this.rounds++;
        };
        if (group > this.data[round].length - 1 ) {
            this.data[round].push([[],[],[]]);
        };
        const answerIndex = this._indexOfAnswer(answer)
        this.data[round][group][answerIndex].push(result);
    };
};


module.exports = 
{
    Raster,
}