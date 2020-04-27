import SocketModel from '../modules/SocketModule/SocketModel';
import ChatModel from '../models/Chats/ChatsModel';
import { EventEmitter } from 'events';
import ScheduleEmitter from './ScheduleEmitter';
import IScheduleEmitter from '../../utils/IScheduleEmitter';
import ISchedule from '../models/Schedules/ISchedule';
import { model } from 'mongoose';
import IResults from '../models/Results/IResults';

const MESSAGE = "message";

class SocketController implements IScheduleEmitter {

    chatModel = ChatModel;
    socketModel: SocketModel;

    // MARK: IScheduleEmitter
    scheduleEmitter? : EventEmitter 
    start(emitter: EventEmitter) : void  {
        this.scheduleEmitter = emitter;

        emitter.on('THESIS', (schedule : ISchedule ) => {
            console.log('THESIS')
            this.handleThesis(schedule)
        });

        emitter.on('ONBOARDING', (schedule : ISchedule ) => {
            console.log('ONBOARDING')
            this.handleOndboarding(schedule)
        });

        emitter.on("MATCHES", (matches : IResults[][]) => {
            
        })
    };
    

    private handleThesis(schedule: ISchedule) {
        const { eventId } = schedule;
        this.broadcast(eventId, "SCHEDULE", schedule)
    }

    private handleChat(schedule: ISchedule) {
        const state = schedule.state;
        switch (state) {
            case "DONE": 
            // post done
            case "ACTIVE":
            // post active

        };
    };

    private handleOndboarding(schedule: ISchedule) {
        const { eventId } = schedule;
        this.broadcast(eventId, "SCHEDULE", schedule)
        
    };
    
    constructor(socketModel: SocketModel) 
    {

        this.socketModel = socketModel;
    };

    onConnection(socket: any) {
        this.socketModel.onConnection(socket);
    };

    getConnected(eventId: string) {
        return this.socketModel.getConnected(eventId);
    }

    getDisconnected(eventId: string) : string[] {
        return this.socketModel.getDisconnected(eventId);
    }

    connectMatches(eventId: string, matches: any[]) {
        const result = this.socketModel.setMatches(eventId, matches);
        if (!result) {
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

    startChatSocket(io: any) {
        io.on('connection', async (socket: any) => {

            var handshakeData = socket.request;
            let userId = handshakeData._query["userId"];
            let eventId = handshakeData._query["eventId"];
    
            const connection = {userId: userId, eventId: eventId, socket: socket }
            this.socketModel.onConnection(connection);

            socket.emit(MESSAGE, "connected")

            socket.on(MESSAGE, (data: any ) => {

                const { eventId, chatId, userId, matchId, message} = data;

                this.chatModel.saveMessage(message);
                const result = this.socketModel.broadcastToSpecific(eventId, [matchId], MESSAGE, message);
            });
        });
    };
};

export default new SocketController(new SocketModel());