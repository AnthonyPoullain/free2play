import { Games } from '@/src/services';
import { CardGrid } from '@/src/components';
import Image from 'next/image';
import Link from 'next/link';
import { BsFillPlayFill } from 'react-icons/bs';

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
      {recentGames && (
        <section className="mb-6">
          <div className="h-[400px] relative w-full bg-gray-800 overflow-hidden rounded-md">
            <Image
              className="opacity-10 blur-sm object-cover object-center"
              src={recentGames[0].thumbnail}
              priority
              alt="thumbnail"
              fill
            />
            <div className="sm:block absolute inset-0 hidden w-1/5 bg-gray-800"></div>
            <div className="blur-3xl absolute h-[2000px] translate-y-[-50%] w-1/3 bg-gray-800 hidden sm:block"></div>
            <div className="sm:px-10 absolute inset-0 flex px-4">
              {/* left side */}
              <div className="sm:text-left sm:w-1/2 gap-y-2 sm:gap-y-0 sm:items-start flex flex-col items-center justify-center w-full h-full text-center">
                <span className="w-fit bg-sky-600 sm:mx-0 px-2 mx-auto mb-1 font-bold text-white uppercase">
                  New!
                </span>
                <h2 className="sm:text-5xl mb-2 text-4xl font-bold uppercase">
                  {recentGames[0].title}
                </h2>
                <p className="mb-4 text-gray-400">
                  {recentGames[0].short_description}
                </p>
                <Link
                  href={`/games/${recentGames[0].id}`}
                  className="border-sky-600 hover:border-sky-500 focus:border-sky-500 hover:text-sky-500 focus:text-sky-500 text-sky-600 w-fit flex items-center justify-center h-12 gap-2 px-6 py-2 font-bold border rounded-md"
                >
                  Discover
                  <BsFillPlayFill className="text-2xl" />
                </Link>
              </div>
              {/* Right side */}
              <div className="sm:flex items-center justify-around hidden w-1/2 h-full mr-10">
                {recentGames && (
                  <div className="w-[300px] h-fit scale-150">
                    {/* <SkeletonImage /> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
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
