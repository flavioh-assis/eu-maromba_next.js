import { useState } from 'react';
import { useCreateWorkoutSheet } from '@/workout-sheet/workout-sheet.service';
import { toast } from 'react-toastify';
import { Modal } from '@/workout-sheet/components';
import { useAppDispatch } from '@/store/hooks';
import { add } from '@/store/workout-sheet/actions';

type Props = {
	open: boolean;
	toggleModal: VoidFunction;
};

export const ModalCreate = ({ open, toggleModal }: Props) => {
	const dispatch = useAppDispatch();

	const { mutate } = useCreateWorkoutSheet();

	const [name, setName] = useState('');

	const handleCreate = () => {
		if (name === '') {
			toast.error('O texto não pode ser vazio.');
			return;
		}

		const dto = {
			name,
		};

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
		setName('');
		toggleModal();
	};

	return (
		<Modal
			open={open}
			title='Criar ficha'
			handleConfirm={handleCreate}
			toggleModal={handleClose}
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
					maxLength={30}
					className='w-full p-3 leading-tight text-gray-700 border rounded shadow focus:outline-none'
				/>
			</div>
		</Modal>
	);
};
