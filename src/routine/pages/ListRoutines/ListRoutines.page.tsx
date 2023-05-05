import * as storeWS from '@/store/routine/actions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { CardRoutine } from '@/routine/components';
import { ModalCreate } from '@/routine/components';
import { useEffect, useState } from 'react';
import { FlexCol, FlexRow, Page, Title } from '@/styles/styled';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import { Button } from '@/shared/components/Button/Button';
import { useGetAllRoutines, useReorderRoutines } from '@/routine/routine.service';
import { ReorderRoutineDto, Routine } from '@/routine/routine.types';

export const ListRoutines = () => {
	const dispatch = useAppDispatch();
	const storeRoutines = useAppSelector(state => state.routine);

	const { data: apiData } = useGetAllRoutines();
	const { mutate } = useReorderRoutines();

	const [routines, setRoutines] = useState<Routine[]>([]);
	const [routinesCopy, setRoutinesCopy] = useState<Routine[]>([]);

	const [openModal, setOpenModal] = useState(false);
	const [isDraggable, setIsDraggable] = useState(false);

	const toggleModal = () => setOpenModal(open => !open);

	const toggleIsDraggable = () => setIsDraggable(state => !state);

	const onDragEnd = ({ destination, source }: DropResult) => {
		if (!destination) return;
		if (source.index === destination.index) return;

		const items = reorder(routines, source.index, destination.index);

		setRoutines(items);
	};

	const reorder = (list: Routine[], startIndex: number, endIndex: number) => {
		const result = [...list];
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	const updatePositions = (list: Routine[]) => {
		return list.map((sheet, idx) => {
			return {
				...sheet,
				position: idx,
			} as ReorderRoutineDto;
		});
	};

	const handleSave = () => {
		const orderedList = updatePositions(routines);

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
		setRoutinesCopy(routines);
		toggleIsDraggable();
	};

	const handleCancel = () => {
		setRoutines(routinesCopy);
		toggleIsDraggable();
	};

	useEffect(() => {
		apiData && dispatch(storeWS.populate(apiData));
	}, [apiData]);

	useEffect(() => {
		storeRoutines.length && setRoutines(storeRoutines);
	}, [storeRoutines]);

	return (
		<>
			<Page>
				<Title>Minhas Fichas</Title>

				{routines?.length ? (
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId='droppable'>
							{(provided, _) => (
								<FlexCol
									ref={provided.innerRef}
									{...provided.droppableProps}
								>
									<FlexCol>
										{routines?.map((sheet, index) => (
											<CardRoutine
												key={sheet.id}
												id={sheet.id}
												cardIndex={index}
												name={sheet.name}
												trainingCount={sheet.trainingCount || 0}
												isDraggable={isDraggable}
											/>
										))}
									</FlexCol>
									{provided.placeholder}

									<FlexRow className='justify-center gap-4 mt-4'>
										{isDraggable ? (
											<Button
												onClick={handleSave}
												name='Salvar'
												type='primary'
												icon='save'
											/>
										) : (
											<Button
												onClick={toggleModal}
												name='Nova Ficha'
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
								</FlexCol>
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
