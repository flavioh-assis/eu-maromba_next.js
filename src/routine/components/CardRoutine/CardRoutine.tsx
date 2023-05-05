import { useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { IoTrash } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { ModalDelete, ModalUpdate } from '@/routine/components';
import { Card, CardTitle, FlexRow, TrainingAmount } from '@/styles/styled';
import { MdDragIndicator } from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
	id: number;
	name: string;
	trainingCount: number;
	cardIndex: number;
	isDraggable: boolean;
};

export const CardRoutine = ({
	id,
	name,
	trainingCount,
	cardIndex,
	isDraggable,
}: Props) => {
	const router = useRouter();

	const [openModalDelete, setOpenModalDelete] = useState(false);
	const [openModalUpdate, setOpenModalUpdate] = useState(false);

	const handleListTrainings = () => {
		router.push(
			{
				pathname: '/trainings',
				query: { routineId: id },
			},
			'/trainings'
		);
	};

	const toggleModalDelete = () => setOpenModalDelete(prev => !prev);

	const toggleModalUpdate = () => setOpenModalUpdate(prev => !prev);

	return (
		<>
			<Draggable
				key={id}
				draggableId={String(id)}
				index={cardIndex}
				isDragDisabled={!isDraggable}
			>
				{(provided, _) => (
					<Card
						$isDraggable={true}
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						<div
							title='Visualizar os treinos'
							onClick={!isDraggable ? handleListTrainings : () => {}}
							role={!isDraggable ? 'button' : 'contentinfo'}
							className='flex w-11/12 sm:w-10/12 items-center min-h-[4rem] sm:min-h-[8rem] text-left'
						>
							<FlexRow className='w-3/5'>
								<CardTitle>{name}</CardTitle>
							</FlexRow>

							<TrainingAmount className='w-2/5 '>
								{trainingCount} {trainingCount != 1 ? 'treinos' : 'treino'}
							</TrainingAmount>
						</div>

						<div className='flex items-center justify-end w-1/12 gap-1 sm:w-fit sm:gap-2'>
							{isDraggable ? (
								<MdDragIndicator className='text-xl transition duration-300 ease-in-out sm:text-3xl hover:scale-125' />
							) : (
								<>
									<button
										title='Editar título da ficha'
										onClick={toggleModalUpdate}
									>
										<HiPencil className='text-xl transition duration-300 ease-in-out sm:text-3xl hover:scale-125' />
									</button>

									<button
										title='Excluir ficha'
										onClick={toggleModalDelete}
									>
										<IoTrash className='text-xl transition duration-300 ease-in-out sm:text-3xl hover:scale-125' />
									</button>
								</>
							)}
						</div>
					</Card>
				)}
			</Draggable>

			<ModalDelete
				id={id}
				open={openModalDelete}
				trainingCount={trainingCount}
				routineTitle={name}
				toggleModal={toggleModalDelete}
			/>

			<ModalUpdate
				id={id}
				open={openModalUpdate}
				currentRoutineTitle={name}
				toggleModal={toggleModalUpdate}
			/>
		</>
	);
};
