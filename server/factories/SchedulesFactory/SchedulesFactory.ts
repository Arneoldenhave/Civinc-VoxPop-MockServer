import ScheduleTypes from '../../../utils/ScheduleTypes';
import ScheduleStates from '../../../utils/ScheduleStates';
import ScheduleSchema from './../../models/Schedules/SchedulesShema';
import ScheduleEvent from './../../models/Schedules/ScheduleEvent';


export default class SchedulesFactory {

    create(eventId: string, start: number, end: number, onboardingTime: number, thesisTime: number, rounds: number) : ScheduleEvent {
        var schedules : ScheduleSchema[] = [];
        
        let event : ScheduleSchema = {
            start: start,
            end: end,
            _id: "onboarding_0",
            eventId: eventId,
            type: ScheduleTypes.Event,
            state : ScheduleStates.Inactive,
        }

        schedules.push(event);

        const onboardingEnd = end + onboardingTime;
        let onboarding : ScheduleSchema = {
            start: start,
            end: onboardingEnd,
            _id: "onboarding_0",
            eventId: eventId,
            type: ScheduleTypes.Onboarding,
            state : ScheduleStates.Inactive,
            redirect : {
                to: "THESIS"
            }
        };
        schedules.push(onboarding);

        const thesisStart = onboardingEnd;
        const thesisEnd = thesisStart + thesisTime;

        let thesis : ScheduleSchema = {
            start: thesisStart ,
            end: thesisEnd,
            _id: "onboarding_0",
            eventId: eventId,
            type: ScheduleTypes.Onboarding,
            state : ScheduleStates.Inactive,
            redirect : {
                to: "SEARCHING"
            }
        };
        schedules.push(thesis);
    

        const totalDuration = end - start;
        const timeLeft = totalDuration - thesisTime - onboardingTime;
        const chatDuration = timeLeft / rounds;       
        var chatStart = thesisEnd;
        var chatEnd = chatStart + chatDuration;
        
        for (var i = 0; i < rounds; i++) {

            let chat : ScheduleSchema = {
                start: chatStart ,
                end: chatEnd,
                _id: "onboarding_0",
                eventId: eventId,
                type: ScheduleTypes.Onboarding,
                state : ScheduleStates.Inactive,
                redirect : {
                    to: "SEARCHING"
                }
            };
            schedules.push(chat);
            chatStart = chatEnd;
            chatEnd = chatStart + chatDuration;
        };

        let scheduleEvent : ScheduleEvent = {
            eventId: eventId,
            start: start,
            status: ScheduleStates.Inactive,
            end: end,
            schedules: schedules
        };
        
        return scheduleEvent;
    };
};