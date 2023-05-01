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
	// const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
	// 	const grid = 28;

	// 	return {
	// 		// some basic styles to make the items look a bit nicer
	// 		userSelect: 'none',
	// 		// padding: grid * 2,
	// 		// marginBottom: `12px`,

	// 		// change background colour if dragging
	// 		background: isDragging ? 'lightgreen' : 'white',

	// 		// styles we need to apply on draggables
	// 		...draggableStyle,
	// 	};
	// };

	return (
		<Draggable
			key={id}
			draggableId={String(id)}
			index={cardIndex}
		>
			{(provided, snapshot) => (
				<div
					className='flex items-center justify-between w-full px-2 m-3 transition-all duration-500 bg-white rounded-md shadow-sm sm:px-4 hover:shadow-card sm:text-sm'
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					// style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
				>
					<div className='flex w-1/2 items-center min-h-[4rem] sm:min-h-[8rem] text-left mr-1 bg-red-0'>
						<span className='text-sm font-semibold sm:text-xl'>{name}</span>
					</div>

					<div className='flex w-1/2 gap-2'>
						<div className='flex w-full items-center min-h-[4rem] sm:min-h-[8rem]'>
							<span className='text-sm sm:text-xl'>
								{trainingCount} {trainingCount != 1 ? 'treinos' : 'treino'}
							</span>
						</div>

						<div className='flex items-center scale-150'>
							<MdDragIndicator />
						</div>
					</div>
				</div>
			)}
		</Draggable>
	);
};
