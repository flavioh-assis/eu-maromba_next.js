import { useState } from 'react';
import { useCreateRoutine } from '@/features/routine/routine.service';
import { toast } from 'react-toastify';
import { InputModal, Modal } from '@/features/routine/components';
import { useAppDispatch } from '@/store/hooks';
import { add } from '@/store/routine/actions';
import { CreateRoutineDto } from '@/features/routine/routine.types';

type Props = {
	open: boolean;
	toggleModal: VoidFunction;
};

export const ModalCreate = ({ open, toggleModal }: Props) => {
	const dispatch = useAppDispatch();

	const { mutate } = useCreateRoutine();

	const [title, setTitle] = useState('');

	const handleSetTitle = (newTitle: string) => {
		setTitle(newTitle);
	};

	const handleCreate = () => {
		if (title === '') {
			toast.error('O texto não pode ser vazio.');
			return;
		}

		const dto = {
			name: title,
		} as CreateRoutineDto;

		mutate(dto, {
			onError: () => {
				toast.error('Algo deu errado.');
			},
			onSuccess: response => {
				dispatch(add(response));
				toast.success('Ficha criada!');
				handleClose();
			},
		});
	};

	const handleClose = () => {
		setTitle('');
		toggleModal();
	};

	return (
		<Modal
			open={open}
			title='Criar ficha'
			handleConfirm={handleCreate}
			toggleModal={handleClose}
		>
			<InputModal
				setTitle={handleSetTitle}
				routineTitle={title}
			/>
		</Modal>
	);
};
