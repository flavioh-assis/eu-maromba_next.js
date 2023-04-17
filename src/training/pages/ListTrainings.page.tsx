import { useRouter } from 'next/router';
import { useQueryTrainings } from '../training.service';

export const ListTrainings = () => {
	const router = useRouter();
	const query = router.query;
	const workoutSheetId = Number(query.workoutSheetId);

	if (workoutSheetId) {
		const { data } = useQueryTrainings(workoutSheetId);
		const trainings = data || [];

		return (
			<main className='flex flex-col min-h-screen items-center p-6 gap-6'>
				{trainings.length ? (
					trainings.map(t => <p key={t.id}>{t.exercise.name}</p>)
				) : (
					<p>Sem treinos</p>
				)}
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
