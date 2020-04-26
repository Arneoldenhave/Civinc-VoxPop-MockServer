import ITheses from '../../models/Theses/ITheses';
import Thesis from './../../models/Theses/ThesesModel';

export default class ThesesFactory {

    answerOptions : string[];

    constructor(ansers: string[]) {
        this.answerOptions = ansers;
    }
    
    create(amount: number) : any[] {
        var theses : any[] = [];
        for (var i = 0; i < amount; i++) {
            const _id = `thesisId_${i}`;
            const text = "Inmenging in de verkiezingen in een ander land is een daad van oorlog";
            theses.push( new Thesis({text: text, answerOptions: this.answerOptions}))
        }
        return theses;
    };
};