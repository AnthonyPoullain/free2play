import { Games } from '@/src/services';
import { Card } from '@/src/components';

export default async function Home() {
  const games = await Games.getGames();

  return (
    <div>
      <div>
        <h1 className="md:text-left mb-12 text-3xl font-bold text-center">
          <strong className="text-teal-600">{games?.length}</strong> Free to
          Play Games
        </h1>
      </div>
      <div className="sm:grid-cols-3 w-fit grid grid-cols-1 gap-1 mx-auto">
        {games && games.map((game) => <Card key={game.id} game={game} />)}
      </div>
    </div>
  );
}
