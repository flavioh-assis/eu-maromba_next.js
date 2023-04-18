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
			<div className='flex justify-between items-center p-6 rounded-md w-full bg-white shadow-md transition duration-300 ease-in-out transform-gpu hover:shadow-xl hover:-translate-y-1'>
				<button
					className='flex flex-1'
					onClick={handleListTrainings}
					title='Visualizar os treinos'
				>
					<span className='font-semibold text-xl leading-10'>{name}</span>
				</button>

				<div className='flex flex-1 justify-between'>
					<button
						className='flex flex-1'
						onClick={handleListTrainings}
						title='Visualizar os treinos'
					>
						<span className='text-xl leading-10'>{trainingCount} treinos</span>
					</button>

					<div className='flex gap-2 items-center'>
						<Link
							role='button'
							href='#'
							title='Editar nome da ficha'
						>
							<HiPencil className='text-3xl hover:text-green-500 transition duration-300 ease-in-out' />
						</Link>

						<Link
							role='button'
							href='#'
							title='Reordenar fichas'
						>
							<TbMenuOrder className='text-3xl hover:text-blue-500 transition duration-300 ease-in-out' />
						</Link>

						<a
							role='button'
							href='#'
							title='Excluir ficha'
							onClick={toggleModal}
						>
							<IoTrash className='text-3xl hover:text-red-500 transition duration-300 ease-in-out' />
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
