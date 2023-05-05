import { Input } from '@/shared/components';

type Props = {
	routineTitle: string;
	setTitle: (newTitle: string) => void;
};

export const InputModal = ({ routineTitle, setTitle }: Props) => {
	return (
		<div>
			<label className='block mb-2 text-sm font-bold text-gray-700'>
				Título da ficha
			</label>

			<Input
				value={routineTitle}
				setValue={setTitle}
			/>
		</div>
	);
};
