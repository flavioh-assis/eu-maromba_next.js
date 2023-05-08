import { useDeleteRoutine } from '@/features/routine/routine.service';
import { Modal } from '@/features/routine/components';
import { toast } from 'react-toastify';

type Props = {
	id: number;
	open: boolean;
	trainingCount: number;
	routineTitle: string;
	toggleModal: VoidFunction;
	refetch: VoidFunction;
};

export const ModalDelete = ({
	id,
	open,
	trainingCount,
	routineTitle,
	toggleModal,
	refetch,
}: Props) => {
	const { mutate } = useDeleteRoutine();

	const handleDelete = () => {
		mutate(id, {
			onError: () => {
				toast.error('Algo deu errado.');
			},
			onSuccess: () => {
				refetch();
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
					Deseja remover a ficha{' '}
					<strong className='whitespace-nowrap'>{routineTitle}</strong>?
				</p>
				<p>{trainingText()}</p>
				<p>Essa ação não poderá ser desfeita.</p>
			</div>
		</Modal>
	);
};
