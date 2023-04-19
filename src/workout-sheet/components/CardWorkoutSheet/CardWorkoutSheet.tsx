import { useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { TbMenuOrder } from 'react-icons/tb';
import { IoTrash } from 'react-icons/io5';
import { WorkoutSheet } from '@/workout-sheet/workout-sheet.types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Modal } from '../Modal/Modal';

type Props = WorkoutSheet;

export const CardWorkoutSheet = ({ id, name, position, trainingCount }: Props) => {
	const router = useRouter();

	const [open, setOpen] = useState(false);

	const handleListTrainings = () => {
		router.push({
			pathname: '/trainings',
			query: { workoutSheetId: id },
		});
	};

	const toggleModal = () => setOpen(prev => !prev);

	return (
		<>
			<div className='flex items-center justify-between w-full px-4 transition duration-300 bg-white rounded-md shadow-md hover:shadow-xl hover:-translate-y-1 sm:text-sm'>
				<button
					className='flex w-1/2 items-center min-h-[4rem] sm:min-h-[8rem] text-left mr-1 bg-red-0'
					onClick={handleListTrainings}
					title='Visualizar os treinos'
				>
					<span className='text-sm font-semibold sm:text-xl'>{name}</span>
				</button>

				<div className='flex justify-between w-1/2'>
					<button
						onClick={handleListTrainings}
						title='Visualizar os treinos'
						className='flex w-1/2 items-center min-h-[4rem] mr-1 sm:min-h-[8rem] bg-blue-0'
					>
						<span className='text-sm sm:text-xl'>{trainingCount} treinos</span>
					</button>

					<div className='flex items-center gap-2'>
						<Link
							role='button'
							href='#'
							title='Editar nome da ficha'
						>
							<HiPencil className='text-xl transition duration-300 ease-in-out sm:text-3xl hover:text-green-500' />
						</Link>

						<Link
							role='button'
							href='#'
							title='Reordenar fichas'
						>
							<TbMenuOrder className='text-xl transition duration-300 ease-in-out sm:text-3xl hover:text-blue-500' />
						</Link>

						<a
							role='button'
							title='Excluir ficha'
							onClick={toggleModal}
						>
							<IoTrash className='text-xl transition duration-300 ease-in-out sm:text-3xl hover:text-red-500' />
						</a>
					</div>
				</div>
			</div>

			<Modal
				id={id}
				open={open}
				toggleModal={toggleModal}
				trainingCount={trainingCount}
				workoutSheetName={name}
			/>
		</>
	);
};
