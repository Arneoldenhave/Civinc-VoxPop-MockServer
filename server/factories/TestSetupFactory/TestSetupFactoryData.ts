export default interface TestSetupFactoryData {

    "name": string,
    "start": number,
    "end": number,
    "processingTime": number,
    "onboardingTime": number,
    "thesesTime": number,
    "theses" : string[],
    "rounds": number,
    "groups": number[]
    "realUsers": number,
}