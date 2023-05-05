type Props = {
	title: string;
	setTitle: (newTitle: string) => void;
};

export const Input = ({ title, setTitle }: Props) => {
	return (
		<input
			className='w-full px-4 py-2 transition duration-300 border rounded-md appearance-none focus:border-blue-500 focus:outline-none focus:border-1 hover:border-blue-500'
			type='text'
			placeholder='Input'
			value={title}
			onChange={({ target }) => setTitle(target.value)}
		/>
	);
};
