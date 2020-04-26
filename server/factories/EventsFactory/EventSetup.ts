
interface EventSetup  
{ 
	name: string,  
	start: Date, 
	end: Date, 
	processingTime: number, 
	onboardingTime: number, 
	thesesTime: number, 
	theses: string[], 
	rounds: number, 
	groups: number[], 
	realUsers: number
};

export default EventSetup;