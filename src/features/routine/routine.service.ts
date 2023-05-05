import { useMutation, useQuery } from 'react-query';
import api from '@/services/api';
import {
	CreateRoutineDto,
	Routine,
	UpdateRoutineDto,
	ReorderRoutineDto,
} from './routine.types';

const routineUrl = 'workout-sheets';
const fiveSeconds = 5000;

const create = async (dto: CreateRoutineDto) => {
	const { data } = await api.post(routineUrl, dto);

	return data as Routine;
};

const getAll = async () => {
	const { data } = await api.get(routineUrl);

	return data as Routine[];
};

const reorder = async (dto: ReorderRoutineDto[]) => {
	const { data } = await api.patch(routineUrl, dto);

	return data as Routine[];
};

const update = async (dto: UpdateRoutineDto) => {
	const url = `${routineUrl}/${dto.id}`;
	const { data } = await api.patch(url, dto);

	return data as Routine;
};

const remove = async (id: number) => {
	const url = `${routineUrl}/${id}`;

	return await api.delete(url);
};

export const useCreateRoutine = () => useMutation(create);

export const useGetAllRoutines = () => {
	return useQuery({
		queryKey: 'getAllRoutines',
		queryFn: getAll,
		enabled: true,
		retryDelay: fiveSeconds,
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	});
};

export const useReorderRoutines = () => useMutation(reorder);

export const useUpdateRoutine = () => useMutation(update);

export const useDeleteRoutine = () => useMutation(remove);
