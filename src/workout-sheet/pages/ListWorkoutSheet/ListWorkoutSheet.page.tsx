import * as storeWS from '@/store/workout-sheet/actions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { CardWorkoutSheet } from '@/workout-sheet/components';
import { ModalCreate } from '@/workout-sheet/components';
import {
	useGetAllWorkoutSheets,
	useReorderWorkoutSheets,
} from '@/workout-sheet/workout-sheet.service';
import { useEffect, useState } from 'react';
import { Page, Title } from '@/styles/styled';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import {
	ReorderWorkoutSheetDto,
	WorkoutSheet,
} from '@/workout-sheet/workout-sheet.types';
import { toast } from 'react-toastify';

export const ListWorkoutSheet = () => {
	const dispatch = useAppDispatch();
	const storeWorkoutSheets = useAppSelector(state => state.workoutSheet);

	const { data: apiData } = useGetAllWorkoutSheets();
	const { mutate } = useReorderWorkoutSheets();

	const [workoutSheets, setWorkoutSheets] = useState<WorkoutSheet[]>([]);
	const [workoutSheetsCopy, setWorkoutSheetsCopy] = useState<WorkoutSheet[]>([]);

	const [openModal, setOpenModal] = useState(false);
	const [isDraggable, setIsDraggable] = useState(false);

	const toggleModal = () => setOpenModal(open => !open);

	const toggleIsDraggable = () => setIsDraggable(state => !state);

	const onDragEnd = ({ destination, source }: DropResult) => {
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
				toggleIsDraggable();
			},
		});
	};

	const handleStartDragging = () => {
		setWorkoutSheetsCopy(workoutSheets);
		toggleIsDraggable();
	};

	const handleCancel = () => {
		setWorkoutSheets(workoutSheetsCopy);
		toggleIsDraggable();
	};

	useEffect(() => {
		apiData && dispatch(storeWS.populate(apiData));
	}, [apiData]);

	useEffect(() => {
		storeWorkoutSheets.length && setWorkoutSheets(storeWorkoutSheets);
	}, [storeWorkoutSheets]);

	return (
		<>
			<Page>
				<Title>Minhas Fichas</Title>

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
										<CardWorkoutSheet
											key={sheet.id}
											id={sheet.id}
											cardIndex={index}
											name={sheet.name}
											trainingCount={sheet.trainingCount}
											isDraggable={isDraggable}
										/>
									))}
									{provided.placeholder}

									{isDraggable ? (
										<button
											onClick={handleSave}
											className='px-4 py-2 my-3 text-white transition duration-300 bg-blue-600 rounded-md shadow-md hover:bg-blue-500'
										>
											Salvar
										</button>
									) : (
										<button
											onClick={toggleModal}
											className='px-4 py-2 my-3 text-white transition duration-300 bg-blue-600 rounded-md shadow-md hover:bg-blue-500'
										>
											Criar Ficha
										</button>
									)}

									<button
										onClick={isDraggable ? handleCancel : handleStartDragging}
										className='px-4 py-2 my-3 text-black transition duration-300 bg-white rounded-md shadow-md hover:bg-gray-200'
									>
										{isDraggable ? 'Cancelar' : 'Reordenar'}
									</button>
								</div>
							)}
						</Droppable>
					</DragDropContext>
				) : (
					<p>Você não possui ficha :(</p>
				)}
			</Page>

			<ModalCreate
				open={openModal}
				toggleModal={toggleModal}
			/>
		</>
	);
};
