import { CardWorkoutSheet } from '@/workout-sheet/components';
import { UseQueryAllWorkoutSheets } from '@/workout-sheet/workout-sheet.service';

export default function Home() {
	const { data } = UseQueryAllWorkoutSheets();
	const workoutSheets = data || [];

	return (
		<main className='flex flex-col items-center min-h-screen gap-2 p-2 sm:gap-6 sm:p-6'>
			<h1 className='text-lg font-bold sm:text-2xl'>Minhas fichas</h1>

			<div className='flex flex-col w-full gap-3'>
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
