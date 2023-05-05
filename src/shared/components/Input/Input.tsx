type Props = {
	value: string;
	setValue: (newTitle: string) => void;
};

export const Input = ({ value, setValue }: Props) => {
	return (
		<input
			className='w-full px-4 py-2 transition duration-300 border rounded-md appearance-none focus:border-blue-500 focus:outline-none focus:border-1 hover:border-blue-500'
			type='text'
			placeholder='Input'
			value={value}
			onChange={({ target }) => setValue(target.value)}
		/>
	);
};
