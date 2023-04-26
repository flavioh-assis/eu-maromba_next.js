import { useMutationDeleteWorkoutSheet } from '@/workout-sheet/workout-sheet.service';
import { Modal } from '@/workout-sheet/components';
import { toast } from 'react-toastify';

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
			onError: () => {
				toast.error('Algo deu errado.');
			},
			onSuccess: () => {
				toast.success('Ficha excluída!');
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
