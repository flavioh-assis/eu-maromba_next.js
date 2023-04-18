import { CardWorkoutSheet } from '@/workout-sheet/components';
import { UseQueryAllWorkoutSheets } from '@/workout-sheet/workout-sheet.service';
// import Image from 'next/image';

export default function Home() {
	const { data } = UseQueryAllWorkoutSheets();
	const workoutSheets = data || [];

	return (
		<main className='flex flex-col min-h-screen items-center p-6 gap-6'>
			<h1 className='text-2xl font-bold'>Minhas fichas</h1>

			<div className='flex flex-col gap-3 w-full font'>
				{workoutSheets.length ? (
					workoutSheets?.map(sheet => (
						<CardWorkoutSheet
							key={sheet.id}
							id={sheet.id}
							name={sheet.name}
							position={sheet.position}
							trainingCount={sheet.trainingCount}
						/>
					))
				) : (
					<p className='self-center'>Você não criou nenhuma ficha :(</p>
				)}
			</div>
		</main>
	);
}
