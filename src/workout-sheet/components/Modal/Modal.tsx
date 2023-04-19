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
	const handleDelete = () => {
		alert(id + ' deletado');
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
				<dialog className='flex justify-center items-center absolute h-full w-full inset-0 z-50 bg-black-80'>
					<div className='flex flex-col p-6 gap-5 bg-white w-11/12 mx-auto rounded-md z-50 overflow-y-auto md:max-w-lg'>
						<div className='flex justify-between items-center'>
							<h3 className='text-2xl font-bold'>Excluir ficha</h3>

							<IoClose
								fontSize={28}
								onClick={toggleModal}
								className='cursor-pointer transform hover:scale-125 transition duration-300'
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
								className='p-3 px-4 rounded-md text-black hover:bg-gray-200 transition duration-300'
							>
								Cancelar
							</button>

							<button
								onClick={handleDelete}
								className='p-3 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-500 transition duration-300'
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
