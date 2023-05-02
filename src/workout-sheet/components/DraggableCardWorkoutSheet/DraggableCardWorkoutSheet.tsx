import { MdDragIndicator } from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
	id: number;
	name: string;
	trainingCount: number;
	cardIndex: number;
};

export const DraggableCardWorkoutSheet = ({
	id,
	name,
	trainingCount,
	cardIndex,
}: Props) => {
	return (
		<Draggable
			key={id}
			draggableId={String(id)}
			index={cardIndex}
		>
			{(provided, _) => (
				<div
					className='flex items-center justify-between w-full px-2 mb-3 transition-shadow duration-500 bg-white rounded-md shadow-md sm:px-4 hover:shadow-card sm:text-sm'
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<div className='flex w-1/2 items-center min-h-[4rem] sm:min-h-[8rem] text-left mr-1 bg-red-0'>
						<span className='text-sm font-semibold sm:text-xl'>{name}</span>
					</div>

					<div className='flex items-center justify-between w-1/2'>
						<span className='text-sm sm:text-xl'>
							{trainingCount} {trainingCount === 1 ? 'treino' : 'treinos'}
						</span>

						<div className='flex items-center'>
							<MdDragIndicator className='text-xl transition duration-300 ease-in-out hover:scale-125 sm:text-3xl' />
						</div>
					</div>
				</div>
			)}
		</Draggable>
	);
};
