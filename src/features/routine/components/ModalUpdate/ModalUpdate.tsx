import { useUpdateRoutine } from '@/features/routine/routine.service';
import { InputModal, Modal } from '@/features/routine/components';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { UpdateRoutineDto } from '@/features/routine/routine.types';

type Props = {
	id: number;
	open: boolean;
	currentRoutineTitle: string;
	toggleModal: VoidFunction;
	refetch: VoidFunction;
};

export const ModalUpdate = ({
	id,
	open,
	currentRoutineTitle,
	toggleModal,
	refetch,
}: Props) => {
	const { mutate } = useUpdateRoutine();

	const [routineTitle, setRoutineTitle] = useState(currentRoutineTitle);

	const handleSetTitle = (newTitle: string) => {
		setRoutineTitle(newTitle);
	};

	const handleUpdate = () => {
		if (routineTitle === '') {
			toast.error('O texto não pode ser vazio.');
			return;
		}

		const dto = {
			id,
			name: routineTitle,
		} as UpdateRoutineDto;

		mutate(dto, {
			onError: () => {
				toast.error('Algo deu errado.');
			},
			onSuccess: () => {
				refetch();
				toast.success('Ficha atualizada!');
				toggleModal();
			},
		});
	};

	const handleClose = () => {
		setRoutineTitle(currentRoutineTitle);
		toggleModal();
	};

	return (
		<Modal
			open={open}
			title='Alterar ficha'
			handleConfirm={handleUpdate}
			toggleModal={handleClose}
		>
			<InputModal
				setTitle={handleSetTitle}
				routineTitle={routineTitle}
			/>
		</Modal>
	);
};
