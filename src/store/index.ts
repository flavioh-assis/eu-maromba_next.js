import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import workoutSheetReducer from './reducers/workout-sheet';

export const store = configureStore({
	reducer: {
		workoutSheet: workoutSheetReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
