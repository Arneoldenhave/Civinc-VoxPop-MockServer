import TestSetupFactoryData from './TestSetupFactoryData';

import utils from './../../../utils/index';
import ResultsModel from '../../models/Results/ResultsModel';
import ResultType from './../../../utils/ResultType';

export default class TestSetupFactory {
    
    create(setup: any) : ResultType<Error,TestSetupFactoryData> {
        console.log(setup)
        const { name, start, end, processingTime, onboardingTime, thesesTime, theses, rounds, groups, realUsers } = setup;
        var result : ResultType<Error,TestSetupFactoryData> = {};
        
        try {
            let setup : TestSetupFactoryData = {
                name: name,
                start: start,
                end: end,
                processingTime: processingTime,
                onboardingTime: onboardingTime,
                thesesTime: thesesTime,
                rounds: rounds,
                theses: theses, 
                groups: groups,
                realUsers: realUsers,
            };
            result.result = setup;
            return result
        } catch(err) {
            console.log(err)
            result.error = err;
            return result;
        };
    };
};