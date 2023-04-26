export type WorkoutSheet = {
	id: number;
	name: string;
	position: number;
	trainingCount: number;
};

export type UpdateWorkoutSheetDto = {
	id: number;
	name: string;
	position?: number;
};

export type CreateWorkoutSheetDto = {
	name: string;
};
