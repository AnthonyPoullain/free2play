import { Games } from '@/src/services';
import { Card } from '@/src/components';

export default async function GamesByCategrory({
  params,
}: {
  params: { genre: string };
}) {
  const games = await Games.getGamesByCategory(
    params.genre.trim().toLowerCase().replaceAll('%20', '-')
  );

  return (
    <div>
      <div>
        <h1 className="md:text-left mt-4 mb-12 text-3xl font-bold text-center">
          {games?.length} Free to Play{' '}
          <strong className="text-teal-600">
            {params.genre.replaceAll('%20', ' ')}
          </strong>{' '}
          Games
        </h1>
      </div>
      <div className="sm:grid-cols-3 w-fit grid grid-cols-1 gap-1 mx-auto">
        {games && games.map((game) => <Card key={game.id} game={game} />)}
      </div>
    </div>
  );
}
