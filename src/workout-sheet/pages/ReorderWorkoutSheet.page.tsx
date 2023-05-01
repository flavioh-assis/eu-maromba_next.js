import { useEffect, useState } from 'react';
import { useGetAllWorkoutSheets } from '../workout-sheet.service';
import { WorkoutSheet } from '../workout-sheet.types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { DropResult } from 'react-beautiful-dnd';
import { DraggableCardWorkoutSheet } from '../components/DraggableCardWorkoutSheet/DraggableCardWorkoutSheet';

export const ReorderWorkoutSheet = () => {
	const { data } = useGetAllWorkoutSheets();
	const [workoutSheets, setWorkoutSheets] = useState<WorkoutSheet[]>([]);

	const onDragEnd = (result: DropResult) => {
		const { destination, source } = result;

		if (!destination) return;
		if (destination.droppableId === source.droppableId) return;
		if (source.index === destination.index) return;

		const items = reorder(workoutSheets, source.index, destination.index);

		setWorkoutSheets(items);
	};

	const reorder = (list: WorkoutSheet[], startIndex: number, endIndex: number) => {
		const result = [...list];
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	useEffect(() => {
		data && setWorkoutSheets(data);
	}, [data]);

	return (
		<main className='flex flex-col items-center min-h-screen gap-2 p-2 sm:gap-6 sm:p-6'>
			<h1 className='text-lg font-bold sm:text-2xl'>Reordenar Fichas</h1>

			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId='droppable'>
					{(provided, snapshot) => (
						<div
							className='flex flex-col items-center w-full'
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{workoutSheets?.map((sheet, index) => (
								<DraggableCardWorkoutSheet
									key={sheet.id}
									id={sheet.id}
									cardIndex={index}
									name={sheet.name}
									trainingCount={sheet.trainingCount}
								/>
							))}
							{provided.placeholder}

							<button
								// onClick={toggleModal}
								className='px-4 py-2 my-3 text-white transition duration-300 bg-blue-600 rounded-md shadow-md hover:bg-blue-500'
							>
								Salvar
							</button>
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</main>
	);
};
