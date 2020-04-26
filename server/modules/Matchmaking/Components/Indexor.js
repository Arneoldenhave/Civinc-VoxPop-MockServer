class Indexor 
{
    total = [];
    lastIndex = -1;
    map = {};

    constructor() {};

    getIndex = (id) => {
        const identifier = `${id}`;

        if(this.map[identifier] === undefined) 
        {
            this.lastIndex++;
            const index = this.lastIndex;
            this.map[identifier] = index;
            this.total.push(1);
        
            return index;
        } else {
            const index = this.map[identifier];
            this.total[index]++;
            return index;
        }
    };
}

module.exports = Indexor;