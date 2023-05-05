import { useQuery } from 'react-query';
import api from '@/services/api';
import { Training } from './training.types';

const routineUrl = 'workout-sheets';
const fiveSeconds = 5000;

const getTrainingsByRoutineId = async (routineId: number) => {
	const url = `${routineUrl}/${routineId}/trainings`;
	const { data } = await api.get(url);

	return data as Training[];
};

export const useGetTrainingsFromRoutine = (routineId: number) => {
	return useQuery({
		queryKey: 'getTrainingsFromRoutine',
		queryFn: () => getTrainingsByRoutineId(routineId),
		enabled: true,
		retryDelay: fiveSeconds,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});
};
