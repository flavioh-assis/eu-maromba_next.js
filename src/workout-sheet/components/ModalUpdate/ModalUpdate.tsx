import { useUpdateWorkoutSheet } from '@/workout-sheet/workout-sheet.service';
import { Modal } from '@/workout-sheet/components';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/store/hooks';
import * as store from '@/store/workout-sheet/actions';

type Props = {
	id: number;
	open: boolean;
	currentName: string;
	toggleModal: VoidFunction;
};

export const ModalUpdate = ({ id, open, currentName, toggleModal }: Props) => {
	const dispatch = useAppDispatch();

	const { mutate } = useUpdateWorkoutSheet();

	const [name, setName] = useState(currentName);

	const handleUpdate = () => {
		if (name === '') {
			toast.error('O texto não pode ser vazio.');
			return;
		}

		const dto = {
			id,
			name,
		};

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
			<div>
				<label
					className='block mb-2 text-sm font-bold text-gray-700'
					htmlFor='name'
				>
					Nome da ficha
				</label>

				<input
					id='name'
					type='text'
					placeholder='Inferiores'
					value={name}
					onChange={t => setName(t.target.value)}
					className='w-full p-3 leading-tight text-gray-700 border rounded shadow focus:outline-none'
				/>
			</div>
		</Modal>
	);
};
