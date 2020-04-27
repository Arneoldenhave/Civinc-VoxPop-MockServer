import ResultsModel from '../models/Results/ResultsModel';
import IResults from './../models/Results/IResults';
import MatchingAlgorithm from '../modules/Matchmaking/index';
import EventsModel from './../models/Events/EventsModel';
import IEvents from './../models/Events/IEvents';
import SocketService from './SocketService';
import { EventEmitter } from 'events';
import IScheduleEmitter from '../../utils/IScheduleEmitter';

class MatchMakingService implements IScheduleEmitter {

    private resultsModel = ResultsModel;
    private eventsModel = EventsModel;
    private matchMaking: MatchingAlgorithm;

    constructor( matchMaking: MatchingAlgorithm) {
        this.matchMaking = matchMaking;
    };

    // MARK: IScheduleEmitter
    scheduleEmitter? : EventEmitter 

    start(emitter: EventEmitter) : void  {
        this.scheduleEmitter = emitter;
        emitter.on("DONE", schedule => {
            console.log(schedule)
        });

        emitter.on('CHAT', async schedule => {

            if (schedule) {
                await this.matchEvent(schedule.eventId)
                console.log("MATCHONG DONE")
            }
        });
    };



    async matchEvent(id: string) : Promise<boolean|Error> {
        console.log('matchEvent')
        try { 
            const event = await this.eventsModel.findById(id);
            console.log(event)
        if (!event) {
            console.log("MatchMakingService: Event not found")
            return Error("MatchMakingService: Event not found")
        }

        console.log("penis")
        const lastRounds = event.lastRounds;
        const results : IResults[] = await this.resultsModel.findByEventId(id);        
        const inactiveUsers : string[] = SocketService.getDisconnected(event._id);
        const active = results.filter(result => !inactiveUsers.includes(result._id));
        const matches = this.matchMaking.match(active, lastRounds);
        console.log(matches)
        SocketService.connectMatches(event._id, matches);

        return true

        } catch(err) {
            console.log(err);
            return err;
        };
    };
};

export default new MatchMakingService(new MatchingAlgorithm);
