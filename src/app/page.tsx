import { Games } from '@/src/services';
import { CardGrid } from '@/src/components';

export default async function Home() {
	const recentGamesData = Games.getGames('release-date');
	const popularGamesData = Games.getGames('popularity');

	const [recentGames, popularGames] = await Promise.all([
		recentGamesData,
		popularGamesData,
	]);

	return (
		<div>
			<h1 className="md:text-left mt-4 mb-12 text-4xl font-bold text-center">
				Welcome to Free2Play!
			</h1>
			<section className="gap-y-6 flex flex-col">
				{recentGames && (
					<CardGrid
						title="Recently Added"
						games={recentGames.splice(0, 4)}
						border={false}
						cols={4}
					/>
				)}
				{popularGames && (
					<CardGrid
						title="Popular Games"
						games={popularGames.splice(0, 12)}
						border={false}
						cols={3}
					/>
				)}
			</section>
		</div>
	);
}
