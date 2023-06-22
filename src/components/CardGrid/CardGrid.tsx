import { Card } from '..';
import SectionWithTitle from '../SectionWithTitle/SectionWithTitle';

export type CardGridProperties = {
	title?: string;
	games: Game[];
	border?: boolean;
	cols?: 1 | 2 | 3 | 4 | 5 | 6;
};

function CardGrid({
	title,
	games,
	border = false,
	cols = 3,
}: CardGridProperties) {
	const gridClass = {
		1: 'sm:grid-cols-1',
		2: 'sm:grid-cols-2',
		3: 'sm:grid-cols-3',
		4: 'sm:grid-cols-4',
		5: 'sm:grid-cols-5',
		6: 'sm:grid-cols-6',
	};

	return (
		<SectionWithTitle title={title} border={border}>
			<div
				className={`sm:w-full w-fit grid grid-cols-1 gap-1 mx-auto ${gridClass[cols]}`}
			>
				{games?.map((game) => (
					<Card key={game.id} game={game} />
				))}
			</div>
		</SectionWithTitle>
	);
}

export default CardGrid;
