import { CardWorkoutSheet } from '@/workout-sheet/components';
import { useQueryAllWorkoutSheets } from '@/workout-sheet/workout-sheet.service';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
	const { data } = useQueryAllWorkoutSheets();
	const workoutSheets = data || [];

	return (
		<main className='flex flex-col items-center min-h-screen gap-2 p-2 sm:gap-6 sm:p-6'>
			<h1 className='text-lg font-bold sm:text-2xl'>Minhas fichas</h1>

			<div className='flex flex-col items-center w-full gap-3'>
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
					<p>Você não criou nenhuma ficha :(</p>
				)}
			</div>
		</main>
	);
}
