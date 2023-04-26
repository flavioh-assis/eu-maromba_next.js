import { FC, ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';

export type Props = {
	open: boolean;
	title: string;
	handleConfirm: VoidFunction;
	toggleModal: VoidFunction;
	children: ReactNode;
};

export const Modal: FC<Props> = ({
	open,
	title,
	handleConfirm,
	toggleModal,
	children,
}) => {
	return (
		<>
			{open && (
				<dialog className='fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black-80'>
					<div className='flex flex-col w-11/12 gap-5 p-6 mx-auto overflow-y-auto bg-white rounded-md md:max-w-lg'>
						<div className='flex items-center justify-between'>
							<h3 className='text-2xl font-bold'>{title}</h3>

							<IoClose
								fontSize={28}
								onClick={toggleModal}
								className='transition duration-300 transform cursor-pointer hover:scale-125'
							/>
						</div>

						{children}

						<div className='flex justify-end gap-4'>
							<button
								onClick={toggleModal}
								className='px-4 py-2 text-black transition duration-300 rounded-md shadow-md hover:bg-gray-200'
							>
								Cancelar
							</button>

							<button
								onClick={handleConfirm}
								className='px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-md shadow-md hover:bg-blue-500'
							>
								Confirmar
							</button>
						</div>
					</div>
				</dialog>
			)}
		</>
	);
};
