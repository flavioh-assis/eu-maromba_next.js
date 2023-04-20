export type WorkoutSheet = {
	id: number;
	name: string;
	position: number;
	trainingCount: number;
};

export type WorkoutSheetUpdateDto = {
	id: number;
	name: string;
};
