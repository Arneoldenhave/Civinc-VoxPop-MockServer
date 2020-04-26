import ResultsSchema from './ResultsSchema';
import { rejects } from 'assert';

export default class ResultsModel {
    
    results : ResultsSchema[] = [];

    timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async findByEvent(id: string):  Promise<ResultsSchema[]> {
        await this.timeout(10);
        const found = this.results.filter(r => r._id === id);
        return found;
    }


    async save(results: ResultsSchema[]) : Promise<ResultsSchema[]> {
        await this.timeout(10);
        return this.results.concat(this.results, results)
    }

}