import { Games } from './services';
import { Card } from './components';

export default async function Home() {
	const games = await Games.getGames();

	return (
		<div className="sm:grid-cols-3 grid grid-cols-2 overflow-hidden rounded-md">
			{games && games.map((game) => <Card key={game.id} game={game} />)}
		</div>
	);
}
