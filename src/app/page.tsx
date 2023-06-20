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
      <h1 className="md:text-left mt-4 mb-12 text-3xl font-bold text-center">
        Welcome to Free2Play!
      </h1>
      {recentGames && (
        <CardGrid
          title="Recently Added"
          border={true}
          games={recentGames.splice(0, 4)}
          cols={4}
        />
      )}
      {popularGames && (
        <CardGrid
          title="Popular Games"
          border={true}
          games={popularGames.splice(0, 12)}
          cols={3}
        />
      )}
    </div>
  );
}
