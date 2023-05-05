import { useUpdateRoutine } from '@/routine/routine.service';
import { InputModal, Modal } from '@/routine/components';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/store/hooks';
import * as store from '@/store/routine/actions';
import { UpdateRoutineDto } from '@/routine/routine.types';

type Props = {
	id: number;
	open: boolean;
	currentRoutineTitle: string;
	toggleModal: VoidFunction;
};

export const ModalUpdate = ({ id, open, currentRoutineTitle, toggleModal }: Props) => {
	const dispatch = useAppDispatch();

	const { mutate } = useUpdateRoutine();

	const [title, setTitle] = useState(currentRoutineTitle);

	const handleSetTitle = (newTitle: string) => {
		setTitle(newTitle);
	};

	const handleUpdate = () => {
		if (title === '') {
			toast.error('O texto não pode ser vazio.');
			return;
		}

		const dto = {
			id,
			name: title,
		} as UpdateRoutineDto;

		mutate(dto, {
			onError: () => {
				toast.error('Algo deu errado.');
			},
			onSuccess: response => {
				dispatch(store.update(response));
				toast.success('Ficha atualizada!');
				toggleModal();
			},
		});
	};

	return (
		<Modal
			open={open}
			title='Alterar ficha'
			handleConfirm={handleUpdate}
			toggleModal={toggleModal}
		>
			<InputModal
				setTitle={handleSetTitle}
				title={title}
			/>
		</Modal>
	);
};
