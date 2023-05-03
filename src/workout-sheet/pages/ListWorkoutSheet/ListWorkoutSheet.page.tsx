import * as storeWS from '@/store/workout-sheet/actions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { CardWorkoutSheet } from '@/workout-sheet/components';
import { ModalCreate } from '@/workout-sheet/components';
import {
	useGetAllWorkoutSheets,
	useReorderWorkoutSheets,
} from '@/workout-sheet/workout-sheet.service';
import { useEffect, useState } from 'react';
import { FlexRow, Page, Title } from '@/styles/styled';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import {
	ReorderWorkoutSheetDto,
	WorkoutSheet,
} from '@/workout-sheet/workout-sheet.types';
import { toast } from 'react-toastify';
import { Button } from '@/shared/components/Button/Button';

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

									<FlexRow className='justify-center gap-4'>
										{isDraggable ? (
											<Button
												onClick={handleSave}
												name={'Salvar'}
												type='primary'
												icon='save'
											/>
										) : (
											<Button
												onClick={toggleModal}
												name={'Nova Ficha'}
												type='primary'
												icon='add'
											/>
										)}

										<Button
											name={isDraggable ? 'Cancelar' : 'Reordenar'}
											onClick={isDraggable ? handleCancel : handleStartDragging}
											type='default'
											icon={isDraggable ? 'cancel' : 'reorder'}
										/>
									</FlexRow>
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
