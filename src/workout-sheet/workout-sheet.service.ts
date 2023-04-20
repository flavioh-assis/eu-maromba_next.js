import { useMutation, useQuery } from 'react-query';
import api from '@/services/api';
import { WorkoutSheet } from './workout-sheet.types';

const workoutSheetUrl = 'workout-sheets';
const fiveSeconds = 5000;

const getAll = async () => {
	const { data } = await api.get(workoutSheetUrl);

	return data as WorkoutSheet[];
};

const remove = async (id: number) => {
	const url = `${workoutSheetUrl}/${id}`;

	return await api.delete(url);
};

export const useQueryAllWorkoutSheets = () => {
	return useQuery({
		queryKey: 'getAllWorkoutSheets',
		queryFn: getAll,
		enabled: true,
		retryDelay: fiveSeconds,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});
};

export const useMutationDeleteWorkoutSheet = () => useMutation(remove);

// const createFruit = async (fruit: FruitDto) => {
// 	return await api.post(fruitsUrl, fruit);
// };

// const updateFruit = async (fruit: Fruit) => {
// 	const url = `${fruitsUrl}/${fruit.id}`;

// 	return await api.put(url, fruit);
// };

// export const MutationCreate = () => useMutation(createFruit);

// export const MutationUpdate = () => useMutation(updateFruit);
