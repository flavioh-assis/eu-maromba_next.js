import { useMutationUpdateWorkoutSheet } from '@/workout-sheet/workout-sheet.service';
import { Modal } from '../Modal/Modal';
import { useState } from 'react';
import { toast } from 'react-toastify';

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
			toast.error('O texto não pode ser vazio.');
			return;
		}

		mutate(dto, {
			onError: () => {
				toast.error('Algo deu errado.');
			},
			onSuccess: () => {
				toast.success('Ficha atualizada!');
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
