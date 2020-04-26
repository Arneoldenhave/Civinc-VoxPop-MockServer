import IGroups from "../../models/Events/IGroups";

export default interface EventFactorySetup  
{ 
	name: string,  
	start: number, 
	end: number, 
	processingTime: number, 
	onboardingTime: number, 
	thesesTime: number, 
	theses: string[], 
	rounds: number, 
	groups: IGroups[], 
	realUsers: number
};
