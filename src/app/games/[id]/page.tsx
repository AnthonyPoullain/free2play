'use client';

import Image from 'next/image';
import { Games } from '@/src/services';
import { CardGrid, SectionWithTitle } from '@/src/components';
import { BsFillPlayFill, BsTwitch, BsYoutube } from 'react-icons/bs';
import Link from 'next/link';
import { shuffleArray } from '@/src/utils';
import { useEffect, useState } from 'react';

export default async function Game({ params }: { params: { id: string } }) {
  const [game, setGame] = useState<Game | null>(null);
  const [similarGames, setSimilarGames] = useState<Game[] | null>(null);
  const [popularGames, setPopularGames] = useState<Game[] | null>(null);

  useEffect(() => {
    async function getGameData(): Promise<void> {
      const gameData = await Games.getGame(params.id);
      setGame(gameData);
    }
    getGameData();
  }, []);

  useEffect(() => {
    if (!game) return;

    async function getPopularGames(): Promise<void> {
      const popularGamesData = await Games.getGames('popularity');
      popularGamesData?.splice(0, 8);
      setPopularGames(popularGamesData);
    }

    async function getSimilarGames(): Promise<void> {
      const similarGamesData = game
        ? await Games.getGamesByCategory(game?.genre)
        : null;
      if (similarGamesData && similarGamesData?.length >= 8) {
        shuffleArray(similarGamesData as []);
        setSimilarGames(similarGamesData?.splice(0, 8));
        return;
      }
      getPopularGames();
    }
    getSimilarGames();
  }, [game]);

  return game ? (
    <div className="md:text-left md:items-start flex flex-col items-center text-center">
      <h1 className="md:text-left mt-4 mb-12 text-3xl font-bold text-center">
        {game.title}
      </h1>
      <section className="w-fit flex flex-col gap-2 mb-4 text-sm">
        <Image
          src={game.thumbnail}
          alt={game.title}
          width={365}
          height={200}
          className="transition-opacity duration-1000 rounded-md opacity-0"
          onLoadingComplete={(image) => image.classList.remove('opacity-0')}
        />
        <Link
          href={game.game_url}
          target="_blank"
          className="border-sky-600 hover:bg-gray-700 focus:bg-gray-700 flex items-center justify-center w-full h-12 gap-2 p-2 font-bold bg-gray-800 border-2 rounded-md"
        >
          <span>Play Now</span>
          <BsFillPlayFill className="text-sky-600 inline text-2xl" />
        </Link>
        <div className="sm:flex-row flex flex-col gap-2">
          <Link
            href={`https://www.twitch.tv/search?term=${game.title
              .trim()
              .toLowerCase()}`}
            target="_blank"
            className="hover:bg-gray-700 focus:bg-gray-700 flex items-center justify-center w-full h-12 gap-2 p-2 bg-gray-800 rounded-md"
          >
            <span>
              Watch on <strong className="font-bold">Twitch</strong>
            </span>
            <BsTwitch className="inline text-lg text-purple-700" />
          </Link>
          <Link
            href={`https://www.youtube.com/results?search_query=${game.title}`}
            target="_blank"
            className="hover:bg-gray-700 focus:bg-gray-700 flex items-center justify-center w-full h-12 gap-2 p-2 bg-gray-800 rounded-md"
          >
            <span>
              Watch on <strong className="font-bold">YouTube</strong>
            </span>
            <BsYoutube className="inline text-2xl text-red-700" />
          </Link>
        </div>
      </section>
      {game.screenshots && game.screenshots.length ? (
        <SectionWithTitle title="Screenshots" border={true}>
          <div
            className={`sm:grid-cols-${game?.screenshots?.length} grid gap-2`}
          >
            {game?.screenshots?.map((screen) => (
              <div
                className="h-fit max-h-32 w-full overflow-hidden rounded-md"
                key={screen.id}
              >
                <Image
                  src={screen.image}
                  alt="screenshot"
                  width={600}
                  height={80}
                  className="transition-opacity duration-1000 opacity-0"
                  onLoadingComplete={(image) =>
                    image.classList.remove('opacity-0')
                  }
                />
              </div>
            ))}
          </div>
        </SectionWithTitle>
      ) : null}

      <SectionWithTitle
        title={
          <>
            About <span className="sm:inline hidden">{game.title}</span>
          </>
        }
      >
        <p className="text-justify">{game.description}</p>
      </SectionWithTitle>

      {similarGames ? (
        <CardGrid
          title={
            <>
              More <span className="sm:inline hidden">{game.genre}</span>
            </>
          }
          games={similarGames}
          cols={4}
          border={true}
        />
      ) : null}
      {popularGames ? (
        <CardGrid
          title={
            <>
              Popular <span className="sm:inline hidden">Games</span>
            </>
          }
          games={popularGames.splice(0, 8)}
          cols={4}
          border={true}
        />
      ) : null}
    </div>
  ) : null;
}
