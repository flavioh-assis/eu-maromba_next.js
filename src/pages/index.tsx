import { CardWorkoutSheet } from '@/workout-sheet/components';
import { UseQueryAllWorkoutSheets } from '@/workout-sheet/workout-sheet.service';

import { useEffect } from 'react';
// import Image from 'next/image';

export default function Home() {
	const { data, refetch } = UseQueryAllWorkoutSheets();
	const workoutSheets = data || [];

	useEffect(() => {
		refetch();
	}, []);

	return (
		<main className='flex flex-col min-h-screen items-center p-6 gap-6'>
			<h1 className='text-2xl font-bold'>Minhas fichas</h1>

			<div className='flex flex-col gap-3 w-full font'>
				{workoutSheets?.map(sheet => (
					<CardWorkoutSheet
						id={sheet.id}
						name={sheet.name}
						amountTrainings={sheet.position | 10}
					/>
				))}
			</div>
		</main>
	);
}
