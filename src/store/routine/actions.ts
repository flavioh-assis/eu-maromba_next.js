import { Routine } from '@/routine/routine.types';
import { createAction } from '@reduxjs/toolkit';

export const add = createAction<Routine>('routine/add');
export const populate = createAction<Routine[]>('routine/populate');
export const reorder = createAction<Routine[]>('routine/reorder');
export const update = createAction<Routine>('routine/update');
export const remove = createAction<number>('routine/remove');
