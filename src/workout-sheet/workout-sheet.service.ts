import { useMutation, useQuery } from 'react-query';
import api from '@/services/api';
import {
	CreateWorkoutSheetDto,
	WorkoutSheet,
	UpdateWorkoutSheetDto,
} from './workout-sheet.types';

const workoutSheetUrl = 'workout-sheets';
const fiveSeconds = 5000;

const create = async (dto: CreateWorkoutSheetDto) => {
	const { data } = await api.post(workoutSheetUrl, dto);

	return data as WorkoutSheet;
};

const getAll = async () => {
	const { data } = await api.get(workoutSheetUrl);

	return data as WorkoutSheet[];
};

const update = async (dto: UpdateWorkoutSheetDto) => {
	const url = `${workoutSheetUrl}/${dto.id}`;
	const { data } = await api.patch(url, dto);

	return data as WorkoutSheet;
};

const remove = async (id: number) => {
	const url = `${workoutSheetUrl}/${id}`;

	return await api.delete(url);
};

export const useCreateWorkoutSheet = () => useMutation(create);

export const useGetAllWorkoutSheets = () => {
	return useQuery({
		queryKey: 'getAllWorkoutSheets',
		queryFn: getAll,
		enabled: true,
		retryDelay: fiveSeconds,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});
};

export const useUpdateWorkoutSheet = () => useMutation(update);

export const useDeleteWorkoutSheet = () => useMutation(remove);
