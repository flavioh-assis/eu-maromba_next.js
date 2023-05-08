import Image from 'next/image';
import placeholder from './placeholder.png';

type TrainingProps = {
	id: number;
	routineId: number;
	exerciseId: number;
	exerciseName: string;
	obs: string;
	position: number;
	reps: number;
	restTime: number;
	sets: number;
};

export const CardTraining = ({
	id,
	routineId,
	exerciseId,
	exerciseName,
	obs,
	position,
	reps,
	restTime,
	sets,
}: TrainingProps) => {
	return (
		<div className='flex flex-row w-full gap-4 p-4 bg-white rounded-md shadow-md'>
			<div className='flex p-2 bg-white rounded-md h-30'>
				<Image
					className='object-contain h-full aspect-square'
					src={placeholder}
					alt=''
				/>
			</div>

			<div className='flex flex-col flex-1 w-full h-full gap-2'>
				<strong className='text-xl text-gray-800 '>{exerciseName}</strong>

				<div className='flex flex-col'>
					<span className='font-normal text-gray-700'>
						{sets} {sets === 1 ? 'série' : 'séries'} de {reps}{' '}
						{reps === 1 ? 'repetição' : 'repetições'}
					</span>

					<span className='font-normal text-gray-700'>
						{restTime} segundos de descanso
					</span>

					<span className='mt-2 font-normal text-gray-700'>
						Observação: {obs || 'nenhuma'}
					</span>
				</div>
			</div>
		</div>
	);
};
