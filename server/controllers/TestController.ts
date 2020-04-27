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
import IGroups from '../models/Events/IGroups';
import ITheses from '../models/Theses/ITheses';
import IUsers from '../models/Users/IUsers';
import IResults from '../models/Results/IResults';
import EventFactorySetup from '../factories/EventsFactory/EventFactorySetup';
import IEvents from '../models/Events/IEvents';


import SchedulesEvent from './../models/Schedules/SchedulesModel';

import Event from './../models/Events/EventsModel';


import MatchMakingAlgorith from './../modules/Matchmaking/index';
import UsersModel from '../models/Users/UsersModel';
import ResultsModel from './../models/Results/ResultsModel';

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
        const groups : IGroups[] = this.groupsFactory.create(groupSetup);

        // theses 
        const thesesSetup : number = testSetup.theses.length - 1;
        const theses : ITheses[] = this.thesesFavtory.create(thesesSetup);
        const thesisIds : string[] = theses.map(t => t._id);

   

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

        const event = this.eventFactory.create(eventSetup);

        // schedule
        const onboardingTime : number =  eventSetup.onboardingTime;
        const thesesTime : number = eventSetup.thesesTime;

        // events
        const newEvent = new Event(testSetup);
        // users
        const users : IUsers[] = this.userFacotory.create(newEvent._id, groups)

        // schedules
        const schedulesEventSetup = this.schedulesFactory.create(newEvent._id, event.start, event.end, onboardingTime, thesesTime, event.rounds);
        const schedulesEvent = new SchedulesEvent(schedulesEventSetup);
    
        // results
        const resultsSetup : IResults[] = this.resultsFactory.create(users, thesisIds);
 

    
        const savedSchedules = await schedulesEvent.save();
        const savedResults = await ResultsModel.insertMany(resultsSetup);
        const savedEvent = await newEvent.save();

        this.reponseHandler.ok(res, savedResults);
    };

};
