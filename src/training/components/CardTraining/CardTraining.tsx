import Image from 'next/image';
import imageBolsoPai from './bolsopai.png';
import gifAbs from './abs.gif';

type TrainingProps = {
	id: number;
	workoutSheetId: number;
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
	workoutSheetId,
	exerciseId,
	exerciseName,
	obs,
	position,
	reps,
	restTime,
	sets,
}: TrainingProps) => {
	return (
		<div className='flex flex-col w-full p-4 gap-2 rounded-md shadow-md bg-white md:flex-row md:justify-start md:gap-4'>
			<Image
				className='object-contain h-full w-full m-auto rounded-md max-h-96  md:w-48 md:max-h-48'
				src={gifAbs}
				// src={imageBolsoPai}
				alt=''
			/>

			<div className='flex flex-col flex-1 h-full w-full gap-2'>
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

					<span className='font-normal mt-2 text-gray-700'>
						Observação: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Vestibulum sapien. Vestibulum sapien sapien.
					</span>
				</div>
			</div>
		</div>
	);
};
