import ScheduleTypes from '../../../utils/ScheduleTypes';
import ScheduleStates from '../../../utils/ScheduleStates';

export default class SchedulesFactory {

    create(eventId: string, start: number, end: number, onboardingTime: number, thesisTime: number, rounds: number) : any {
        var schedules : any[] = [];
        
        let event = {
            start: start,
            end: end,
            eventId: eventId,
            type: ScheduleTypes.Event,
            state : ScheduleStates.Inactive,
        }

        schedules.push(event);

        const onboardingEnd = end + onboardingTime;
        let onboarding = {
            start: start,
            end: onboardingEnd,
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

        let thesis = {
            start: thesisStart ,
            end: thesisEnd,
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

            let chat  = {
                start: chatStart ,
                end: chatEnd,
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

        let IScheduleEvent = {
            eventId: eventId,
            start: start,
            status: ScheduleStates.Inactive,
            end: end,
            schedules: schedules
        }
        return IScheduleEvent;
    };
};
