import { Games } from '@/src/services';
import { CardGrid } from '@/src/components';

export default async function Home() {
  const games = await Games.getGames();

  return (
    <div>
      <div>
        <h1 className="md:text-left mt-4 mb-12 text-4xl font-bold text-center">
          <strong className="text-sky-600">{games?.length}</strong> Free to Play
          Games
        </h1>
      </div>
      {games && (
        <CardGrid
          games={games}
          cols={4}
          pagination={40}
          scrollToViewOnPageChange
        />
      )}
    </div>
  );
}
