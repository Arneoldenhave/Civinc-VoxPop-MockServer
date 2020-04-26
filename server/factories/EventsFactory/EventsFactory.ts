import EventFactorySetup from './EventFactorySetup'
import EventSchema from './../../models/Events/IEvents';

export default class EventFactory {

    create(setup: EventFactorySetup) {

        let schema : EventSchema = {
            name : setup.name,
            start : setup.start,
            end : setup.end,
            _id : "event_" + 0,
            groups : setup.groups,   
            lastRounds : [],
            rounds: setup.rounds,
        };
        return schema;
    };
};


module.exports = EventFactory;