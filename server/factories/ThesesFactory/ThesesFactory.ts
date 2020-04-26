import ThesesSchema from '../../models/Theses/ThesesSchema';


export default class ThesesFactory {

    answerOptions : string[];

    constructor(ansers: string[]) {
        this.answerOptions = ansers;
    }
    
    create(amount: number) : ThesesSchema[] {
        var theses : ThesesSchema[] = [];
        for (var i = 0; i < amount; i++) {
            const _id = `thesisId_${i}`;
            const text = "Inmenging in de verkiezingen in een ander land is een daad van oorlog";
            theses.push( new ThesesSchema(_id,text,this.answerOptions));
        }
        return theses;
    };
};