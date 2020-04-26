import ResultsModel from '../models/Results/ResultsModel';
import ResultsSchema from './../models/Results/ResultsSchema';
import MatchingAlgorithm from '../modules/Matchmaking/index';
import EventsModel from './../models/Events/EventsModel';
import EventSchema from './../models/Events/EventsSchema';
import SocketService from './SocketService';


export default class MatchMakingService {

    private resultsModel : ResultsModel;
    private eventsModel : EventsModel;
    private matchMaking: MatchingAlgorithm;

    constructor(model: ResultsModel, matchMaking: MatchingAlgorithm, eventsModel : EventsModel) {
        this.resultsModel = model;
        this.matchMaking = matchMaking;
        this.eventsModel = eventsModel;
    };

    async matchEvent(id: string) : Promise<boolean|Error> {
        try { 

        const event : EventSchema = await this.eventsModel.findBy(id);

        if (!event) {
            return Error("MatchMakingService: Event not found")
        }

        const lastRounds = event.lastRounds;
        const results : ResultsSchema[] = await this.resultsModel.findByEvent(id);        
        const inactiveUsers : string[] = SocketService.getDisconnected(event._id);
        const active = results.filter(result => !inactiveUsers.includes(result._id));
        const matches = this.matchMaking.match(active,lastRounds);

        SocketService.connectMatches(event._id, matches);

        return true

        } catch(err) {
            console.log(err);
            return err;
        };
    };
};