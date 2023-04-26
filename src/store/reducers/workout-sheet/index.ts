import { createSlice, PayloadAction, CaseReducer, Slice } from '@reduxjs/toolkit';
import { WorkoutSheet } from '@/workout-sheet/workout-sheet.types';
// import { RootState } from '@/store';

const initialState: WorkoutSheet[] = [];

export const workoutSheetSlicer = createSlice({
	name: 'workoutSheet',
	initialState,
	reducers: {
		add: (state, { payload }: PayloadAction<WorkoutSheet>) => {
			state.push(payload);
		},
		populate: (state, { payload }: PayloadAction<WorkoutSheet[]>) => {
			state.push(...payload);
		},
	},
});

export const { add, populate } = workoutSheetSlicer.actions;

// export const getAll = (state: RootState) => state.workoutSheet;

export default workoutSheetSlicer.reducer;
