import SocketModel from '../modules/SocketModule/SocketModel';
import ChatModel from './../models/Chat/Model';
import { EventEmitter } from 'events';
import ScheduleEmitter from './ScheduleEmitter';

const MESSAGE = "message";

class SocketController {

    chatModel: ChatModel;
    socketModel: SocketModel;
    scheduleEmitter: EventEmitter;


    constructor(socketModel: SocketModel, chatModel: ChatModel, scheduleEmitter: EventEmitter) 
    {
        this.scheduleEmitter = scheduleEmitter;
        this.chatModel = chatModel;
        this.socketModel = socketModel;

        scheduleEmitter.on("SCHEDULE", schedule => {

            console.log("SCHEDULE");
        });
    };

    onConnection(socket: any) {
        this.socketModel.onConnection(socket);
    };

    getConnected(eventId: string) {
        return this.socketModel.getConnected(eventId);
    }

    getDisconnected(eventId: string) {
        return this.socketModel.getDisconnected(eventId);
    }

    connectMatches(eventId: string, matches: any[]) {
        const result = this.socketModel.setMatches(eventId, matches);
        if (! result) {
            console.log(`No connections for : ${eventId}`)
        } else {
            console.log("connect matches  for " + eventId)
        }
        return result;
    };

    getEvents() {
        return this.socketModel.getEvents();
    };

    broadcastToSpecific(eventId: string ,ids: string[], type: string, data: any) {
        return this.socketModel.broadcastToSpecific(eventId, ids, type, data);
    }

    broadcast(eventId: string, type: string, data: any) {
       const result =  this.socketModel.broadcastToAll(eventId, type, data);
       return result;
    };
    
    message(data: any) {
        const { eventId, chatId, userId, matchId, message} = data;
        const result = this.socketModel.broadcastToSpecific(eventId, [matchId], MESSAGE, message);
        return result
    };
    


    start(io: any) {
        io.on('connection', async (socket: any) => {

            var handshakeData = socket.request;
            let userId = handshakeData._query["userId"];
            let eventId = handshakeData._query["eventId"];
    
            const connection = {userId: userId, eventId: eventId, socket: socket }
            this.socketModel.onConnection(connection);

            socket.emit(MESSAGE, "connected")

            socket.on(MESSAGE, (data: any ) => {

                const { eventId, chatId, userId, matchId, message} = data;

                this.chatModel.updateChat(chatId, message);
                const result = this.socketModel.broadcastToSpecific(eventId, [matchId], MESSAGE, message);
            });
        });
    };
};

export default new SocketController(new SocketModel(), new ChatModel(), ScheduleEmitter);