import { TbMenuOrder, TbCheck } from 'react-icons/tb';
import { IoSaveOutline } from 'react-icons/io5';
import { CgClose } from 'react-icons/cg';

type Props = {
	onClick: VoidFunction;
	name?: string;
	disabled?: boolean;
	icon?: 'save' | 'cancel' | 'reorder' | 'add' | 'confirm';
	type?: 'primary' | 'default' | 'text';
};

export const Button = ({
	disabled = false,
	icon,
	name,
	onClick,
	type = 'default',
}: Props) => {
	const defaultClass =
		'flex items-center px-4 py-2 w-full sm:w-fit transition duration-300 rounded-md border justify-center text-md';

	const disabledClass = 'text-black text-opacity-25 ';

	const classByType = {
		disabled: {
			default:
				disabledClass + 'bg-black border border-black border-opacity-10 bg-opacity-5',
			primary:
				disabledClass + 'bg-black border border-black border-opacity-10 bg-opacity-5',
			text: disabledClass + 'text-black bg-transparent border-transparent',
		},
		enabled: {
			default:
				'text-black text-opacity-80 hover:text-blue-500 bg-white border-gray-200 hover:border-blue-500',
			primary: 'text-white bg-blue-600 hover:bg-blue-500',
			text: 'text-black bg-transparent hover:bg-gray-200 border-transparent',
		},
	};

	const buttonClass = `${defaultClass} ${
		disabled ? classByType.disabled[type] : classByType.enabled[type]
	} ${name ? 'min-w-[8rem]' : ''}`;

	const iconComponent = {
		save: <IoSaveOutline className={`text-lg ${name ? 'mr-2' : ''}`} />,
		cancel: <CgClose className={`text-xl ${name ? 'mr-1' : ''}`} />,
		reorder: <TbMenuOrder className={`text-xl ${name ? 'mr-2' : ''}`} />,
		add: <CgClose className={`text-xl rotate-45 ${name ? 'mr-2' : ''}`} />,
		confirm: <TbCheck className={`text-xl ${name ? 'mr-1' : ''}`} />,
	};

	return (
		<button
			onClick={onClick}
			className={buttonClass}
			disabled={disabled}
		>
			{icon && iconComponent[icon]}
			{name}
		</button>
	);
};
