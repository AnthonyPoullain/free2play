import { Games } from '@/src/services';
import { CardGrid } from '@/src/components';

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
      <h1 className="md:text-left mt-4 mb-12 text-3xl font-bold text-center">
        {games?.length} Free to Play{' '}
        <strong className="text-sky-600">
          {params.genre.replaceAll('%20', ' ')}
        </strong>{' '}
        Games
      </h1>
      {games && <CardGrid games={games} />}
    </div>
  );
}
