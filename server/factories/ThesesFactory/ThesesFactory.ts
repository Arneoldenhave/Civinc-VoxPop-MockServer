import ThesesSchema from '../../models/Theses/ThesesSchema';


export default class ThesesFactory {

    answerOptions : string[];

    constructor(ansers: string[]) {
        this.answerOptions = ansers;
    }
    
    create(amount: number) {
        
        return Array(amount).map(i => {
            const _id = `thesisId_${i}`;
            const text = "Inmenging in de verkiezingen in een ander land is een daad van oorlog";
            return new ThesesSchema(_id,text,this.answerOptions);
        });
    };
};