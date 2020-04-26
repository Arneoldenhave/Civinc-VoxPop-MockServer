/**
 * Accessors hold the indexPath of resources in a matchmaking raster
 * 
 * @RoundIndex refers to the first dimension of the raster
 * @GroupNumber refers to the second dimension in the raster
 * @Ansewers hold an array of indexes of the third dimension in in the raster
 * @Total refers to the total amount of asners in the group
 * 
 * This in turn is an abstraction of the values in the raster. 
 * The algorithm usese these values to efficiently fix the matches. 
 * Once a math has been made the Accessor returns an indexPath to that type of 
 * resource in the raster
 * 
 * If a match is to be made the accessor first tries to find a resource
 * with an opposing asnwer then one with a neutral asnwer and lastly one 
 * with the same answer.
 * 
 * It decrements the respctive numeber in the answer array and the total number. 
 * It then returns the indexPath to that resource in the matchmaking raster:
 * 
 * [ round ] [ group ] [ answer ] = indexPath
 * 
 */

class Accessor {


    total = null;
    groupIndex = null;
    roundNumber = null;
    answers = [];

    constructor(group, groupIndex, roundNumber) {
        this.answers = group.map(answers => answers.length);
        this.groupIndex = groupIndex;
        this.roundNumber = roundNumber;
        const add = (a, b) => { return a + b };
        this.total =  this.answers.reduce(add, 0);
    };

    dequeue() {

        var answer; 
        if (this.onlyOnesRemaining() === true) {
            answer = 1;
        } else {
            answer = this.takeFromLargest();
        };
        this.decrement(answer);
        const indexPath = this.indexPath(answer);
        return { answer, indexPath };
    };

    onlyOnesRemaining() {
        const zeros = this.answers[0];
        const twos = this.answers[2];
        return zeros === twos && zeros === 0;
    };

    takeFromLargest () {
        const zeros = this.answers[0];
        const twos = this.answers[2];
        return zeros > twos ? 0 : 2;
    };

    match(num) {
        const totalAnsers = this.answers.length - 1;
        var answerMatch = null;
        var indexPathMatch = null;

        if (num < 1) 
        {   // end to start

            for (var i = totalAnsers; i >= 0 ; i--) 
            {   
                var total = this.answers[i];
                if (total > 0) 
                {
                    answerMatch = i;
                }
            }
        } else  if (num > 1) 
        {   // start to end

            for (var i = 0; i <= totalAnsers; i++) 
            {
                var total = this.answers[i];

                if (total > 0) {
                    answerMatch = i;
                }
            }
        } else if (num === 1) 
        {
            
            if (this.onlyOnesRemaining() === true) 
            {
                answerMatch = 1;
            } else  // take largest
            {  
                answerMatch = this.takeFromLargest();
            };
        };
        // update state
        indexPathMatch = this.indexPath(answerMatch);
        this.decrement(answerMatch);
        return { answerMatch, indexPathMatch };
    };

    decrement(answer) {
        this.answers[answer]--;
        this.total--;
    };

    indexPath(answer) {
        return [this.roundNumber, this.groupIndex, answer];
    };

    // empty anser bins
    matchWithGroup() {
       
        var matchedIndexPaths = [];

        while (this.answers[0] > 1 ) {

            this.decrement(0);
            const indexPath = this.indexPath(0);
            const { _, indexPathMatch } = this.match(0);
            matchedIndexPaths.push([indexPath, indexPathMatch])
        };

        while (this.answers[1] > 1) {

            this.decrement(1);
            const indexPath = this.indexPath(1);
            const { _, indexPathMatch } = this.match(1);
            matchedIndexPaths.push([indexPath, indexPathMatch])
        };

        while (this.answers[2] > 1) {
            
            this.decrement(2);
            const indexPath = this.indexPath(2);
            const { _, indexPathMatch } = this.match(2);
            matchedIndexPaths.push([indexPath, indexPathMatch]);
        };

        const last = this.answers.indexOf(1);
        const indexPathOfRemaining = last > -1 ? this.indexPath(last) : null;
        
        return { indexPathOfRemaining, matchedIndexPaths };
    };
};


module.exports = Accessor; 
