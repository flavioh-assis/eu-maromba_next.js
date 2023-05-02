import ws from 'tailwind-styled-components';

export const Page = ws.main`
	flex
	flex-col
	items-center
	min-h-screen
	gap-2
	p-2
	sm:gap-6
	sm:p-6
`;

export const Title = ws.h1`
	text-lg
	font-bold
	sm:text-2xl
`;

export const Card = ws.div<{ isDraggable?: boolean }>`
	${p => p.isDraggable && 'mb-2 sm:mb-3'}
	flex
	items-center
	justify-between
	w-full
	gap-2
	px-2
	transition-shadow
	duration-500
	bg-white
	rounded-md
	shadow-md
	sm:gap-4
	sm:px-4
	hover:shadow-card
	sm:text-sm
`;

export const TrainingAmount = ws.span`
	text-sm
	sm:text-xl
`;

export const CardTitle = ws(TrainingAmount)`
	font-semibold
`;

export const FlexRow = ws.div`
	flex
	flex-row
	items-center
	w-full
`;

export const FlexCol = ws(FlexRow)`
	flex-col
`;
