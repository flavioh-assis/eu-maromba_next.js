import Image from 'next/image';
import gifAbs from './abs.gif';

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
		<div className='flex flex-col w-full gap-2 p-4 bg-white rounded-md shadow-md sm:flex-row sm:justify-start sm:gap-10'>
			<Image
				className='object-contain w-full h-full m-auto rounded-md max-h-96 sm:w-48 sm:max-h-48'
				src={gifAbs}
				alt=''
			/>

			<div className='flex flex-col flex-1 w-full h-full gap-2'>
				<h5 className='text-xl font-bold text-gray-800'>{exerciseName}</h5>

				<div className='flex flex-col'>
					<span className='font-normal text-gray-700'>
						{sets} série{reps > 1 && 's'}
					</span>
					<span className='font-normal text-gray-700'>
						{reps} repetiç{reps > 1 ? 'ões' : 'ão'}
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
