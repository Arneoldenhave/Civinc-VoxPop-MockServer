const { Raster } =  require('./Components/Raster');
const  Indexor  = require('./Components/Indexor');
const GroupFirst = require('./Algorithms/GroupFirst');
import ResultsSchema from './../../models/Results/ResultsSchema';

class MatchMakingModel
{
    private results : ResultsSchema[] = [];
    private raster = null;
    private groupFirst = new GroupFirst();


    public match(results: ResultsSchema[], lastRounds: string[]) 
    {
        this.results = results;
        this._createRaster();   
        const mathes = this.groupFirst.getMatches(this.raster);
        const best = this._getBestRound(mathes, lastRounds);
        return best;
    };

    private _getBestRound(matchResults: any, lastRounds: string[]) 
    {
        const notIn = (num: string, array: string[]) => {
            return array.indexOf(num) === -1;
        };
        
        const filtered = matchResults.filter(result => notIn(result.thesisId, lastRounds));
        var best = filtered[0];

        for (const result of filtered) {
            if (result.sameGroup < best.sameGroup) {
                best = result;
            };
        };
        return best;
    };

    private _getMatchMap(matchesArray: ResultsSchema[][]) : Map<string, string> {
        var map : Map<string, string> = new Map();
        for (const match of matchesArray) {
            const first = match[0].userId;
            const second = match[1].userId;
            map.set(first, second);
        };
        return map;
    };
   
    private _createRaster() 
    {
        try { 
            const raster      = new Raster();
            const roundGuide  = new Indexor();
            const groupGuide  = new Indexor();

            for ( var i = 0; i < this.results.length; i++) {
                const result = this.results[i];
                const { thesisId, groupId, answer } = result;
                const roundInx  = roundGuide.getIndex(thesisId);       
                const groupInx  = groupGuide.getIndex(groupId);
                const answerInx = answer;        
                raster.add(result, roundInx, groupInx, answerInx);
            };      
            this.raster = raster;
        } 
        catch(e) 
        {
            console.log(e);
        };
    };
}


export default MatchMakingModel;
