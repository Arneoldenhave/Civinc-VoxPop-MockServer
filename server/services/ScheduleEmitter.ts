import { EventEmitter } from 'events';
import MatchmakingService from './MatchMakingService';
import ScheduleService from './ScheduleService'
import SocketService from './SocketService';


    // Intializer Schedue Emititer
const scheduleEmitter = new EventEmitter();

class ScheduleEmitter  {

    emitter = new EventEmitter();

    start() {
        MatchmakingService.start(scheduleEmitter);
        ScheduleService.start(scheduleEmitter);
        SocketService.start(scheduleEmitter)
    };
};

export default new ScheduleEmitter();

