import { HiPencil } from 'react-icons/hi';
import { TbMenuOrder } from 'react-icons/tb';
import { IoTrash } from 'react-icons/io5';
import { WorkoutSheet } from '@/workout-sheet/workout-sheet.types';

type Props = WorkoutSheet;

export const CardWorkoutSheet = ({ id, name, position, trainingCount }: Props) => {
	return (
		<a
			className='flex justify-between items-center p-6 rounded-md w-full bg-white shadow-md transition duration-300 ease-in-out transform-gpu hover:shadow-xl hover:-translate-y-1'
			role='button'
		>
			<div className='flex flex-1'>
				<span className='font-semibold text-xl leading-10'>{name}</span>
			</div>

			<div className='flex flex-1 justify-between'>
				<span className='text-xl leading-10'>{trainingCount} treinos</span>

				<div className='flex gap-2 items-center'>
					<a
						role='button'
						title='Editar nome da ficha'
					>
						<HiPencil className='text-3xl hover:text-green-500 transition duration-300 ease-in-out' />
					</a>

					<a role='button'>
						<TbMenuOrder className='text-3xl hover:text-blue-500 transition duration-300 ease-in-out' />
					</a>

					<a role='button'>
						<IoTrash className='text-3xl hover:text-red-500 transition duration-300 ease-in-out' />
					</a>
				</div>
			</div>
		</a>
	);
};
