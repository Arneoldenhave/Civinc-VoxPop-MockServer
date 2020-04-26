const SocketEvent = require('./SocketEvent');

/**
 * Model that manages all Socket events 
 */
class SocketModule {

    constructor() {}

    /**
     * Key value store of SocketEvents by eventid
     */
    events = {};

    /**
     * Set matches in event
     * @param {*} eventId 
     * @param {*} matches 
     */
    setMatches(eventId: string, matches : any[]) {
        const event = this.events[eventId];
        if (!event) {
            return null;
        };
        const updated = event.setMatches(matches);
        return updated;
    };

    /**
     * Get all ids where socket is active
     * @param {*} eventId 
     */
    getConnected(eventId: string) {
        const event = this.events[eventId];
        if (!event) {
            return null;
        };
        const active = event.getConnected();
    };

    /**
     * get diconnected
     * @param {*} eventId 
     */
    getDisconnected(eventId: string) {
        const event = this.events[eventId];
        if (!event) {
            return null;
        };
        const diconnected = event.getDisconnected();
        return diconnected;
    };

    /**
     * On user connected
     * @param {*} socket 
     */
    onConnection(connection) {
        const { eventId, userId, socket} = connection;
        if (!this.events[eventId])  {
            this.events[eventId] = new SocketEvent(eventId);
        };
        this.events[eventId].addConnection(userId, socket);
    };

    /**
     * Brooadcast message to array of ueserIds
     * @param {} eventId 
     * @param {*} ids 
     * @param {*} type 
     * @param {*} data 
     */
    broadcastToSpecific(eventId: string, ids: string[], type: string, data: any) {
       // console.log(eventId, ids, type, data);
        const event = this.events[eventId];
        if (!event) {
            console.log(`\n broadcastToSpecific event ${eventId} not founc \n`)
            return null;
        }

        const result = event.broadCastToSelected(ids, type, data);
        console.log(result);
        return result;
    };

    /**
     * Broadcast message to all in event
     * @param {} eventId 
     * @param {*} type 
     * @param {*} data 
     */
    broadcastToAll(eventId: string, type: string, data: any) {

        const event = this.events[eventId];
        if (!event) {
            console.log("NO EVENET          " + eventId);
             return null;
        };
        return event.broadcastToAll(type, data);
    };

    /**
     * Get event by id
     * @param {*} eventId 
     */
    getEventById(eventId: string) {
        return this.events[eventId];
    };

    /**
     * Get al events
    */
    getEvents() {
        return this.events;
    };
};

export default SocketModule;



