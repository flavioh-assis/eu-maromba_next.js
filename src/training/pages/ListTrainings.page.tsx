import { useRouter } from 'next/router';
import { useQueryTrainings } from '../training.service';
import { CardTraining } from '../components';

export const ListTrainings = () => {
	const router = useRouter();
	const query = router.query;
	const workoutSheetId = Number(query.workoutSheetId);

	if (workoutSheetId) {
		const { data } = useQueryTrainings(workoutSheetId);
		const trainings = data || [];

		return (
			<main className='flex flex-col min-h-screen items-center p-6 gap-6'>
				<h1 className='text-2xl font-bold'>Meus treinos</h1>

				<div className='flex flex-col gap-3 w-full'>
					{trainings.length ? (
						trainings.map(t => (
							<CardTraining
								key={t.id}
								id={t.id}
								workoutSheetId={t.workoutSheet.id}
								exerciseId={t.exercise.id}
								exerciseName={t.exercise.name}
								sets={t.sets}
								reps={t.reps}
								restTime={t.restTime}
								obs={t.obs}
								position={t.position}
							/>
						))
					) : (
						<p>Sem treinos</p>
					)}
				</div>
			</main>
		);
	}

	return (
		<main className='flex flex-col min-h-screen items-center p-6 gap-6'>
			<h1 className='text-xl font-bold'>
				Nenhuma ficha selecionada para listar os treinos
			</h1>
		</main>
	);
};
