import utils from '../../utils/index';
import EventsFactory from './../factories/EventsFactory/EventsFactory';
import ResultsFactory from './../factories/ResultsFactory/ResultsFactory';
import UsersFactory from './../factories/UsersFactory/UsersFactory';
import ThesesFactory from './../factories/ThesesFactory/ThesesFactory';
import ChatsFactory from './../factories/ChatsFactory/ChatsFactory';
import TestSetupFactory from './../factories/TestSetupFactory/TestSetupFactory';
import TestSetupFactoryData from '../factories/TestSetupFactory/TestSetupFactoryData';
import GroupsFactory from './../factories/GroupsFactory/GroupsFactory';
import SchedulesFactory from './../factories/SchedulesFactory/SchedulesFactory';

import Group from '../factories/GroupsFactory/GroupSetup';
import GroupsSchema from '../models/Events/GroupsSchema';
import ThesesSchema from '../models/Theses/ThesesSchema';
import UserSchema from '../models/Users/UserSchema';
import ResultsSchema from '../models/Results/ResultsSchema';
import EventFactorySetup from '../factories/EventsFactory/EventFactorySetup';
import EventsSchema from '../models/Events/EventsSchema';



export default class TestController {

    private reponseHandler = utils.ResponseHandler;
    private answerOptions = ["Helemaal oneens","Oneens", "Neutraal", "Eens","Helmaal eens"];

    private eventFactory      = new EventsFactory();
    private resultsFactory    = new ResultsFactory(this.answerOptions);
    private thesesFavtory     = new ThesesFactory(this.answerOptions);
    private chatsFactory      = new ChatsFactory();
    private userFacotory      = new UsersFactory();
    private groupsFactory     = new GroupsFactory();
    private schedulesFactory  = new SchedulesFactory();

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

        const eventId : string = "event_0";
        const testSetup : TestSetupFactoryData = result.result!; 

        // groups
        const groupSetup : Group[] = testSetup.groups;
        const groups : GroupsSchema[] = this.groupsFactory.create(groupSetup);

        // theses 
        const thesesSetup : number = testSetup.theses.length - 1;
        const theses : ThesesSchema[] = this.thesesFavtory.create(thesesSetup);
        const thesisIds : string[] = theses.map(t => t._id);

        // users
        const users : UserSchema[] = this.userFacotory.create(eventId, groups)

        // results
        const results : ResultsSchema[] = this.resultsFactory.create(users, thesisIds);

        // event 
        const eventSetup : EventFactorySetup = {
            name : testSetup.name,
            start: testSetup.start,
            end: testSetup.end,
            groups: groups,
            processingTime: testSetup.processingTime,
            onboardingTime: testSetup.onboardingTime,
            thesesTime: testSetup.thesesTime,
            theses: thesisIds,
            rounds: testSetup.rounds,
            realUsers: testSetup.realUsers
        };

        const event  : EventsSchema = this.eventFactory.create(eventSetup);

        // schedule
        const onboardingTime : number =  eventSetup.onboardingTime;
        const thesesTime : number = eventSetup.thesesTime;
        const schedules = this.schedulesFactory.create(event._id, event.start, event.end, onboardingTime, thesesTime, event.rounds)
 
        this.reponseHandler.ok(res, schedules);


    };

};
