import { Input } from '@/shared/components';

type Props = {
	title: string;
	setTitle: (newTitle: string) => void;
};

export const InputModal = ({ title, setTitle }: Props) => {
	return (
		<div>
			<label
				className='block mb-2 text-sm font-bold text-gray-700'
				htmlFor='name'
			>
				Título da ficha
			</label>

			<Input
				title={title}
				setTitle={setTitle}
			/>
		</div>
	);
};
