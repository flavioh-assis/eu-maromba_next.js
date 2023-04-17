export type Training = {
	id: number;
	workoutSheet: {
		id: number;
	};
	exercise: {
		id: number;
		name: string;
	};
	sets: number;
	reps: number;
	restTime: number;
	obs: string;
	position: number;
};
