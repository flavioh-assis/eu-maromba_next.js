import { useMutationDeleteWorkoutSheet } from '@/workout-sheet/workout-sheet.service';
import { Modal } from '@/workout-sheet/components';
import { AxiosError } from 'axios';

type Props = {
	id: number;
	open: boolean;
	trainingCount: number;
	workoutSheetName: string;
	toggleModal: VoidFunction;
};

export const ModalDelete = ({
	id,
	open,
	trainingCount,
	workoutSheetName,
	toggleModal,
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
		<Modal
			id={id}
			open={open}
			title='Excluir ficha'
			handleConfirm={handleDelete}
			toggleModal={toggleModal}
		>
			<div className='flex flex-col'>
				<p>
					Deseja remover a ficha <strong>{workoutSheetName}</strong>?
				</p>
				<p>{trainingText()}</p>
				<p>Essa ação não poderá ser desfeita.</p>
			</div>
		</Modal>
	);
};
