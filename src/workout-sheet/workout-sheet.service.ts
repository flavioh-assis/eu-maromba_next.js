import { useMutation, useQuery } from 'react-query';
import api from '@/services/api';
import { WorkoutSheet, WorkoutSheetUpdateDto } from './workout-sheet.types';

const workoutSheetUrl = 'workout-sheets';
const fiveSeconds = 5000;

const getAll = async () => {
	const { data } = await api.get(workoutSheetUrl);

	return data as WorkoutSheet[];
};

const update = async (dto: WorkoutSheetUpdateDto) => {
	const url = `${workoutSheetUrl}/${dto.id}`;

	const { data } = await api.patch(url, dto);

	return data as WorkoutSheet;
};

const remove = async (id: number) => {
	const url = `${workoutSheetUrl}/${id}`;

	return await api.delete(url);
};

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

export const useMutationUpdateWorkoutSheet = () => useMutation(update);

export const useMutationDeleteWorkoutSheet = () => useMutation(remove);

// const createFruit = async (fruit: FruitDto) => {
// 	return await api.post(fruitsUrl, fruit);
// };

// export const MutationCreate = () => useMutation(createFruit);
