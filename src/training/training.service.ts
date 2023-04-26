import { useQuery } from 'react-query';
import api from '@/services/api';
import { Training } from './training.types';

const workoutSheetUrl = 'workout-sheets';
const fiveSeconds = 5000;

const getTrainingsByWorkoutSheetId = async (workoutSheetId: number) => {
	const url = `${workoutSheetUrl}/${workoutSheetId}/trainings`;
	const { data } = await api.get(url);

	return data as Training[];
};

export const useGetTrainingsFromSheet = (workoutSheetId: number) => {
	return useQuery({
		queryKey: 'getTrainingsFromSheet',
		queryFn: () => getTrainingsByWorkoutSheetId(workoutSheetId),
		enabled: true,
		retryDelay: fiveSeconds,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});
};
