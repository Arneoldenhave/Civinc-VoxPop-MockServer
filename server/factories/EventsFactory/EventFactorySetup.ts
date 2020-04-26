import GroupsSchema from "../../models/Events/GroupsSchema";

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
	groups: GroupsSchema[], 
	realUsers: number
};
