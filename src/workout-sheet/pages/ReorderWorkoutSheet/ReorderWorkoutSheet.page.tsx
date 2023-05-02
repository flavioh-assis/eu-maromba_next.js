import { useState } from 'react';
import {
	useGetAllWorkoutSheets,
	useReorderWorkoutSheets,
} from '../../workout-sheet.service';
import { ReorderWorkoutSheetDto, WorkoutSheet } from '../../workout-sheet.types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { DropResult } from 'react-beautiful-dnd';
import { DraggableCardWorkoutSheet } from '../../components/DraggableCardWorkoutSheet/DraggableCardWorkoutSheet';
import { useAppDispatch } from '@/store/hooks';
import { toast } from 'react-toastify';
import * as storeWS from '@/store/workout-sheet/actions';
import { useRouter } from 'next/router';

export const ReorderWorkoutSheet = () => {
	const dispatch = useAppDispatch();

	const { data } = useGetAllWorkoutSheets();
	const { mutate } = useReorderWorkoutSheets();

	const router = useRouter();

	const [workoutSheets, setWorkoutSheets] = useState<WorkoutSheet[]>(data || []);

	const onDragEnd = (result: DropResult) => {
		const { destination, source } = result;

		if (!destination) return;
		if (source.index === destination.index) return;

		const items = reorder(workoutSheets, source.index, destination.index);

		setWorkoutSheets(items);
	};

	const reorder = (list: WorkoutSheet[], startIndex: number, endIndex: number) => {
		const result = [...list];
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	const updatePositions = (list: WorkoutSheet[]) => {
		return list.map((sheet, idx) => {
			return {
				...sheet,
				position: idx,
			} as ReorderWorkoutSheetDto;
		});
	};

	const handleSave = () => {
		const orderedList = updatePositions(workoutSheets);

		mutate(orderedList, {
			onError: () => {
				toast.error('Algo deu errado!');
			},
			onSuccess: response => {
				dispatch(storeWS.reorder(response));
				toast.success('Lista atualizada!');
				router.push('/');
			},
		});
	};

	return (
		<main className='flex flex-col items-center min-h-screen gap-2 p-2 sm:gap-6 sm:p-6'>
			<h1 className='text-lg font-bold sm:text-2xl'>Reordenar Fichas</h1>

			{workoutSheets?.length ? (
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId='droppable'>
						{(provided, _) => (
							<div
								className='flex flex-col items-center w-full'
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								{workoutSheets?.map((sheet, index) => (
									<DraggableCardWorkoutSheet
										key={sheet.id}
										id={sheet.id}
										cardIndex={index}
										name={sheet.name}
										trainingCount={sheet.trainingCount}
									/>
								))}
								{provided.placeholder}

								<button
									onClick={handleSave}
									className='px-4 py-2 my-3 text-white transition duration-300 bg-blue-600 rounded-md shadow-md hover:bg-blue-500'
								>
									Salvar
								</button>
							</div>
						)}
					</Droppable>
				</DragDropContext>
			) : (
				<p>Você não possui ficha :(</p>
			)}
		</main>
	);
};
