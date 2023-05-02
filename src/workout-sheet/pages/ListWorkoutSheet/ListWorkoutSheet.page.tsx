import * as storeWS from '@/store/workout-sheet/actions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { CardWorkoutSheet } from '@/workout-sheet/components';
import { ModalCreate } from '@/workout-sheet/components';
import { useGetAllWorkoutSheets } from '@/workout-sheet/workout-sheet.service';
import { useEffect, useState } from 'react';
import { Page, Title } from '@/styles/styled';

export const ListWorkoutSheet = () => {
	const dispatch = useAppDispatch();
	const workoutSheets = useAppSelector(state => state.workoutSheet);

	const { data: apiData } = useGetAllWorkoutSheets();

	const [openModal, setOpenModal] = useState(false);

	const toggleModal = () => setOpenModal(open => !open);

	useEffect(() => {
		apiData && dispatch(storeWS.populate(apiData));
	}, [apiData]);

	return (
		<Page>
			<Title>Minhas Fichas</Title>

			<div className='flex flex-col items-center w-full gap-2 sm:gap-3'>
				{workoutSheets?.length ? (
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
					<p>Você não possui ficha :(</p>
				)}

				<button
					onClick={toggleModal}
					className='px-4 py-2 my-3 text-white transition duration-300 bg-blue-600 rounded-md shadow-md hover:bg-blue-500'
				>
					Criar Ficha
				</button>
			</div>

			<ModalCreate
				open={openModal}
				toggleModal={toggleModal}
			/>
		</Page>
	);
};
