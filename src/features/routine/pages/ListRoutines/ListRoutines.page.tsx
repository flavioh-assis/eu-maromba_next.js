import { CardRoutine } from '@/features/routine/components';
import { ModalCreate } from '@/features/routine/components';
import { useEffect, useState } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import { Button } from '@/shared/components/Button/Button';
import {
	useGetAllRoutines,
	useReorderRoutines,
} from '@/features/routine/routine.service';
import { ReorderRoutineDto, Routine } from '@/features/routine/routine.types';

export const ListRoutines = () => {
	const { data: apiData, refetch } = useGetAllRoutines();
	const { mutate } = useReorderRoutines();

	const [routines, setRoutines] = useState<Routine[]>([]);
	const [routinesCopy, setRoutinesCopy] = useState<Routine[]>([]);

	const [openModal, setOpenModal] = useState(false);
	const [isDraggable, setIsDraggable] = useState(false);

	const toggleModal = () => setOpenModal(open => !open);

	const toggleIsDraggable = () => setIsDraggable(state => !state);

	const refetchAllRoutines = () => {
		refetch();
	};

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
			onSuccess: () => {
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
		apiData && setRoutines(apiData);
	}, [apiData]);

	return (
		<>
			<main className='page'>
				<h1 className='page-title'>Minhas Fichas</h1>

				{routines?.length ? (
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId='droppable'>
							{(provided, _) => (
								<div
									className='custom-flex-col'
									ref={provided.innerRef}
									{...provided.droppableProps}
								>
									<div className='custom-flex-col'>
										{routines?.map((sheet, index) => (
											<CardRoutine
												key={sheet.id}
												id={sheet.id}
												cardIndex={index}
												name={sheet.name}
												trainingCount={sheet.trainingCount || 0}
												isDraggable={isDraggable}
												refetch={refetchAllRoutines}
											/>
										))}
									</div>
									{provided.placeholder}

									<div className='justify-center gap-4 mt-4 custom-flex-row'>
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
									</div>
								</div>
							)}
						</Droppable>
					</DragDropContext>
				) : (
					<p>Você não possui ficha :(</p>
				)}
			</main>

			<ModalCreate
				open={openModal}
				toggleModal={toggleModal}
				refetch={refetchAllRoutines}
			/>
		</>
	);
};
