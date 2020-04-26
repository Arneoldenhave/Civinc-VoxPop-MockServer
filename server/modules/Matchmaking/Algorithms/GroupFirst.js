const Accessor = require('../Components/Accessor');

class MatchResult {

    round = null;
    roundId = null;
    matches = [];
    notMatched = 0;
    sameOpinion = 0;
    sameGroup = 0;
    remaining = null;
    
    constructor(round, roundId) {
        this.round = round;
        this.roundId = roundId;
    };

    assessMatch(indexPathOne, indexPathTwo) 
    {
        if (indexPathOne[1] === indexPathTwo[1]) {
            this.sameGroup += 2;
        } 
        if (indexPathOne[2] === indexPathTwo[2]) {
            this.sameOpinion += 2;
        };
    };

    add(result) {
        this.matches.push(result);
    };
};

/**
 * Takes raster datasource
 * Creates array of access objects per round
 * Each accessor holds indexPaths of group to resources in raster via [round][group][answer]
 * Algorithm matches accessor objects; maximizing inter group diversion first then anser diversion
 * Stores results as MatchReuslt datastructures in results array 
 */
class GroupFirstAlgorithm {

    raster = null;
    results = [];

    constructor() {};

    getMatches(raster) 
    {   //                           1      1        0    1   2
        //                           round  group    answers
        // holds data in 3d array    [      [        [] , [] ,[] ]   ]
        this.raster = raster;
        const { data } = raster;
        const rounds = data.length;
        var round = 0;

        while (round < rounds) 
        {
            const roundId = raster.getRoundId(round);
            // result object to store matches
            let result = new MatchResult(round, roundId);
            
            
            // create data mapping objects
            const accessors = this.craeteAccessors(data[round], round);

            // while groups accessor array
            while (accessors.length > 1) {

                // get largest two groups
                const { inx1, inx2 } = this.largestIndexes(accessors);
                const accessor1 = accessors[inx1];
                const accessor2 = accessors[inx2];

                // smaller is empty
                if (accessor2.total === 0) 
                {
                    accessors.splice(inx2, 1) // remove from accessors array

                } else  // match 
                {
                    const { indexPath , indexPathMatch } = this.match(accessor1, accessor2);

                    // assess and store match in result structure
                    result = this.handleMatch(indexPath, indexPathMatch, result);
                };
            };
            // only one acccessor left 
            // match remaining within group
            const { indexPathOfRemaining, matchedIndexPaths } = accessors[0].matchWithGroup();

            // handle unmatched result due to odd number
            if (indexPathOfRemaining) {
                const remaining = this.removeFromRaster(indexPathOfRemaining);
                result.remaining = remaining;
                result.notMatched++;
            };

            // store other matches in result structure
            for (var i = 0; i < matchedIndexPaths.length; i++) {

                const indexPath = matchedIndexPaths[i][0];
                const indexPathMatch = matchedIndexPaths[i][1];
                result = this.handleMatch(indexPath, indexPathMatch, result);
            };
     
            round++;
            // console.log("ROUND : "+ round)
            this.results.push(result)
        };      
        return this.results;
    };

    // removes resource from raster structre
    // adds it to reslt structre
    // returns result structure
    handleMatch(indexPath, indexPathMatch, result) {
        const resultOne = this.removeFromRaster(indexPath);
        const resultTwo = this.removeFromRaster(indexPathMatch);
        result.assessMatch(indexPath, indexPathMatch);
        result.add([resultOne, resultTwo]);
        return result;
    };


    // removes resource from raster (3d array) 
    removeFromRaster(indexPath) {
        const round  = indexPath[0];
        const group  = indexPath[1];
        const answer = indexPath[2];
        const result = this.raster.data[round][group][answer].pop();
        return result;
    };

    // match resoruces from groups 
    match(accessor1, accessor2) 
    {
        const  { answer,      indexPath} = accessor1.dequeue();
        const  { answerMatch, indexPathMatch } = accessor2.match(answer);
        return { indexPath  , indexPathMatch };
    };

    // get the index of largest 2 groups in raster (3d array)
    largestIndexes(accessors) {
        var inx1 = null;
        var inx2 = null;

        var largest = 0;
        var secondLargest = 0;
        const total = accessors.length  -1; 

        for (var i = 0; i <= total ; i++) 
        {   
            const length = accessors[i].total;
            if (length >= largest) {
                secondLargest = largest
                largest = length;
                inx2 = inx1;
                inx1 = i;

            } else if (length >= secondLargest)
            {
              secondLargest = length;
              inx2 = i;
            }
        };
        return { inx1, inx2 };
    }; 

    // create object that store indexpath to reources in 3d array
    //
    // indexPath[ round ][ group ][ answer ]   
    craeteAccessors(round, roundNumber) {
        const groups = round.length;
        var i = 0;
        
        var accessors = [];
        while (i < groups) {
            const group = round[i];
            const accessor = new Accessor(group, i, roundNumber);
            accessors.push(accessor);
            i++
        }
        return accessors;
    }
}

module.exports = GroupFirstAlgorithm;