export type Routine = {
	id: number;
	name: string;
	position: number;
	trainingCount: number;
};

export type UpdateRoutineDto = {
	id: number;
	name: string;
	position?: number;
};

export type CreateRoutineDto = {
	name: string;
};

export type ReorderRoutineDto = {
	id: number;
	position: number;
};
