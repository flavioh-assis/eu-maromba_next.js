import { useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { TbMenuOrder } from 'react-icons/tb';
import { IoTrash } from 'react-icons/io5';
import { WorkoutSheet } from '@/workout-sheet/workout-sheet.types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ModalDelete, ModalUpdate } from '@/workout-sheet/components';

type Props = WorkoutSheet;

export const CardWorkoutSheet = ({ id, name, position, trainingCount }: Props) => {
	const router = useRouter();

	const [openModalDelete, setOpenModalDelete] = useState(false);
	const [openModalUpdate, setOpenModalUpdate] = useState(false);

	const handleListTrainings = () => {
		router.push(
			{
				pathname: '/trainings',
				query: { workoutSheetId: id },
			},
			'/trainings'
		);
	};

	const toggleModalDelete = () => setOpenModalDelete(prev => !prev);

	const toggleModalUpdate = () => setOpenModalUpdate(prev => !prev);

	return (
		<>
			<div className='flex items-center justify-between w-full px-2 transition-all duration-500 bg-white rounded-md shadow-md sm:px-4 hover:shadow-xl sm:text-sm'>
				<button
					className='flex w-1/2 items-center min-h-[4rem] sm:min-h-[8rem] text-left mr-1 bg-red-0'
					onClick={handleListTrainings}
					title='Visualizar os treinos'
				>
					<span className='text-sm font-semibold sm:text-xl'>{name}</span>
				</button>

				<div className='flex w-1/2 gap-2'>
					<button
						onClick={handleListTrainings}
						title='Visualizar os treinos'
						className='flex w-full items-center min-h-[4rem] sm:min-h-[8rem]'
					>
						<span className='text-sm sm:text-xl'>
							{trainingCount} {trainingCount != 1 ? 'treinos' : 'treino'}
						</span>
					</button>

					<div className='flex items-center gap-1 sm:gap-2'>
						<button
							title='Editar nome da ficha'
							onClick={toggleModalUpdate}
						>
							<HiPencil className='text-xl transition duration-300 ease-in-out sm:text-3xl hover:scale-125' />
						</button>

						<Link
							role='button'
							href='/workout-sheets/reorder'
							title='Reordenar fichas'
						>
							<TbMenuOrder className='text-xl transition duration-300 ease-in-out sm:text-3xl hover:scale-125' />
						</Link>

						<button
							title='Excluir ficha'
							onClick={toggleModalDelete}
						>
							<IoTrash className='text-xl transition duration-300 ease-in-out sm:text-3xl hover:scale-125' />
						</button>
					</div>
				</div>
			</div>

			<ModalDelete
				id={id}
				open={openModalDelete}
				trainingCount={trainingCount}
				workoutSheetName={name}
				toggleModal={toggleModalDelete}
			/>

			<ModalUpdate
				id={id}
				open={openModalUpdate}
				currentName={name}
				toggleModal={toggleModalUpdate}
			/>
		</>
	);
};
