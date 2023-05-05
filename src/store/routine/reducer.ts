import { createReducer } from '@reduxjs/toolkit';
import { Routine } from '@/routine/routine.types';
import { add, populate, remove, reorder, update } from './actions';

const initialState: Routine[] = [];

export const routineReducer = createReducer(initialState, builder => {
	builder
		.addCase(add, (state, { payload }) => {
			return [...state, payload];
		})
		.addCase(populate, (_, { payload }) => {
			return [...payload];
		})
		.addCase(remove, (state, { payload }) => {
			return state.filter(w => w.id !== payload);
		})
		.addCase(reorder, (state, { payload }) => {})
		.addCase(update, (state, { payload }) => {
			const index = state.findIndex(w => w.id === payload.id);
			const stateCopy = [...state];

			if (index === -1) return;

			stateCopy.splice(index, 1, payload);

			return stateCopy;
		});
});
