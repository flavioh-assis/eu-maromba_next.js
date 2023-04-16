import { useMutation, useQuery } from 'react-query';
import api from '@/services/api';
import { WorkoutSheet } from './workout-sheet.types';

const workoutSheetUrl = 'workout-sheets';
const fiveSeconds = 5000;

const getAllWorkoutSheets = async () => {
	const { data } = await api.get(workoutSheetUrl);

	return data as WorkoutSheet[];
};

export const UseQueryAllWorkoutSheets = () => {
	return useQuery({
		queryKey: 'getAllWorkoutSheets',
		queryFn: getAllWorkoutSheets,
		enabled: true,
		retryDelay: fiveSeconds,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});
};

// const createFruit = async (fruit: FruitDto) => {
// 	return await api.post(fruitsUrl, fruit);
// };

// const updateFruit = async (fruit: Fruit) => {
// 	const url = `${fruitsUrl}/${fruit.id}`;

// 	return await api.put(url, fruit);
// };

// const deleteFruit = async (id: number) => {
// 	const url = `${fruitsUrl}/${id}`;

// 	return await api.delete(url);
// };

// export const MutationCreate = () => useMutation(createFruit);

// export const MutationUpdate = () => useMutation(updateFruit);

// export const MutationDelete = () => useMutation(deleteFruit);
