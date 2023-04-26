import { WorkoutSheet } from '@/workout-sheet/workout-sheet.types';
import { createAction } from '@reduxjs/toolkit';

export const add = createAction<WorkoutSheet>('workoutSheet/add');
export const populate = createAction<WorkoutSheet[]>('workoutSheet/populate');
export const reorder = createAction<WorkoutSheet[]>('workoutSheet/reorder');
export const update = createAction<WorkoutSheet>('workoutSheet/update');
export const remove = createAction<number>('workoutSheet/remove');
