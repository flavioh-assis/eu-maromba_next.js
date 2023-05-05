import { useUpdateWorkoutSheet } from '@/workout-sheet/workout-sheet.service';
import { InputModal, Modal } from '@/workout-sheet/components';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/store/hooks';
import * as store from '@/store/workout-sheet/actions';
import { UpdateWorkoutSheetDto } from '@/workout-sheet/workout-sheet.types';

type Props = {
	id: number;
	open: boolean;
	currentTitle: string;
	toggleModal: VoidFunction;
};

export const ModalUpdate = ({ id, open, currentTitle, toggleModal }: Props) => {
	const dispatch = useAppDispatch();

	const { mutate } = useUpdateWorkoutSheet();

	const [title, setTitle] = useState(currentTitle);

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
		} as UpdateWorkoutSheetDto;

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
