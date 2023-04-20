import { useMutationDeleteWorkoutSheet } from '@/workout-sheet/workout-sheet.service';
import { AxiosError } from 'axios';
import { IoClose } from 'react-icons/io5';

export type Props = {
	id: number;
	open: boolean;
	toggleModal: VoidFunction;
	trainingCount: number;
	workoutSheetName: string;
};

export const Modal = ({
	id,
	open,
	toggleModal,
	trainingCount,
	workoutSheetName,
}: Props) => {
	const { mutate } = useMutationDeleteWorkoutSheet();

	const handleDelete = () => {
		mutate(id, {
			onError: e => {
				const { response } = e as unknown as AxiosError;
				const { message } = response?.data as { message: string };

				alert(message);
			},
			onSuccess: () => {
				toggleModal();
			},
		});
	};

	const trainingText = () => {
		return trainingCount > 0 ? (
			<>
				A ficha <strong>possui {trainingCount} treinos. </strong>
				<span>Todos serão excluídos!</span>
			</>
		) : (
			<span>A ficha não possui treinos.</span>
		);
	};

	return (
		<>
			{open && (
				<dialog className='fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black-80'>
					<div className='z-50 flex flex-col w-11/12 gap-5 p-6 mx-auto overflow-y-auto bg-white rounded-md md:max-w-lg'>
						<div className='flex items-center justify-between'>
							<h3 className='text-2xl font-bold'>Excluir ficha</h3>

							<IoClose
								fontSize={28}
								onClick={toggleModal}
								className='transition duration-300 transform cursor-pointer hover:scale-125'
							/>
						</div>

						<div className='flex flex-col'>
							<p>
								Deseja remover a ficha <strong>{workoutSheetName}</strong>?
							</p>
							<p>{trainingText()}</p>
							<p>Essa ação não poderá ser desfeita.</p>
						</div>

						<div className='flex justify-end gap-4'>
							<button
								onClick={toggleModal}
								className='p-3 px-4 text-black transition duration-300 rounded-md hover:bg-gray-200'
							>
								Cancelar
							</button>

							<button
								onClick={handleDelete}
								className='p-3 px-4 text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-500'
							>
								Confirmar
							</button>
						</div>
					</div>
				</dialog>
			)}
		</>
	);
};
