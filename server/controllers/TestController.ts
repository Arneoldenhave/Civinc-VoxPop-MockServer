import utils from '../../utils/index';
import EventsFactory from './../factories/EventsFactory/EventsFactory';
import ResultsFactory from './../factories/ResultsFactory/ResultsFactory';
import UsersFactory from './../factories/UsersFactory/UsersFactory';
import ThesesFactory from './../factories/ThesesFactory/ThesesFactory';
import ChatsFactory from './../factories/ChatsFactory/ChatsFactory';
import TestSetupFactory from './../factories/TestSetupFactory/TestSetupFactory';
import TestSetupFactoryData from '../factories/TestSetupFactory/TestSetupFactoryData';



export default class TestController {

    private reponseHandler = utils.ResponseHandler;
    private answerOptions = ["Helemaal oneens","Oneens", "Neutraal", "Eens","Helmaal eens"];

    private eventFactory      = new EventsFactory();
    private resultsFactory    = new ResultsFactory(this.answerOptions);
    private thesesFavtory     = new ThesesFactory(this.answerOptions);
    private chatsFactory      = new ChatsFactory();
    private userFacotory      = new UsersFactory();
    private testSetupFactory  = new TestSetupFactory();


    async start(req: any, res: any, next: any) {

        const setup = req.body;
        if (!setup) {

            return this.reponseHandler.badRequest(res);
        };

        const result = this.testSetupFactory.create(setup);
        if (result.error || !result.result ) {
            return this.reponseHandler.badRequest(res);
        };

        const testSetup : TestSetupFactoryData = result.result!; 
        console.log(testSetup)
        this.reponseHandler.ok(res, testSetup);

    };

};
