import { Games } from '@/src/services';
import { Card } from '@/src/components';

export default async function Home() {
  const games = await Games.getGames();

  return (
    <div>
      <div>
        <h1 className="md:text-left mt-4 mb-12 text-3xl font-bold text-center">
          <strong className="text-sky-600">{games?.length}</strong> Free to Play
          Games
        </h1>
      </div>
      <div className="sm:grid-cols-3 w-fit grid grid-cols-1 gap-1 mx-auto">
        {games?.map((game) => (
          <Card key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
