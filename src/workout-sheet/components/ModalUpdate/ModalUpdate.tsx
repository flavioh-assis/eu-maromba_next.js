import { useMutationUpdateWorkoutSheet } from '@/workout-sheet/workout-sheet.service';
import { Modal } from '../Modal/Modal';
import { useState } from 'react';
import { AxiosError } from 'axios';

type Props = {
	id: number;
	open: boolean;
	currentName: string;
	toggleModal: VoidFunction;
};
export const ModalUpdate = ({ id, open, currentName, toggleModal }: Props) => {
	const { mutate } = useMutationUpdateWorkoutSheet();

	const [name, setName] = useState(currentName);

	const handleUpdate = () => {
		const dto = {
			id,
			name,
		};

		if (name === '') {
			alert('Erro! O nome da ficha não pode ser vazio!');
			return;
		}

		mutate(dto, {
			onError: e => {
				const { response } = e as AxiosError;
				const { message } = response?.data as { message: string };

				alert(message);
			},
			onSuccess: () => {
				toggleModal();
			},
		});
	};

	return (
		<Modal
			id={id}
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
