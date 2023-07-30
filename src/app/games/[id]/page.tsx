import Image from 'next/image';
import { Games } from '@/src/services';
import {
  CardGrid,
  ScreenshotSection,
  SectionWithTitle,
} from '@/src/components';
import { BsFillPlayFill, BsTwitch, BsYoutube } from 'react-icons/bs';
import Link from 'next/link';
import { shuffleArray } from '@/src/utils';

export default async function Game({ params }: { params: { id: string } }) {
  const game = await Games.getGame(params.id);

  const similarGames = game
    ? await Games.getGamesByCategory(game?.genre)
    : null;

  if (similarGames) shuffleArray(similarGames as []);

  const popularGames =
    similarGames && similarGames?.length
      ? null
      : await Games.getGames('popularity');

  return game ? (
    <div className="md:text-left md:items-start flex flex-col items-center text-center">
      <h1 className="md:text-left mt-4 mb-12 text-4xl font-bold text-center">
        {game.title}
      </h1>
      <div className="md:grid-cols-2 grid w-full grid-cols-1 gap-4">
        <section className="w-fit md:mx-0 flex flex-col gap-2 mx-auto mb-10 text-sm">
          <Image
            src={game.thumbnail}
            alt={game.title}
            width={365}
            height={200}
            className="rounded-md"
            priority={true}
          />
          <Link
            href={game.game_url}
            target="_blank"
            className="border-sky-600 hover:bg-gray-700 focus:bg-gray-700 flex items-center justify-center w-full h-12 gap-2 p-2 font-bold bg-gray-800 border-2 rounded-md"
          >
            <span>Play Now</span>
            <BsFillPlayFill className="text-sky-600 inline text-2xl" />
          </Link>
          <div className="md:flex-row flex flex-col gap-2">
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
      </div>
      {game.screenshots && game.screenshots.length ? (
        <ScreenshotSection screenshots={game?.screenshots} />
      ) : null}

      <SectionWithTitle
        title={
          <>
            About <span className="sm:inline hidden">{game.title}</span>
          </>
        }
      >
        <p className="leading-7 text-justify">{game.description}</p>
      </SectionWithTitle>

      <SectionWithTitle title={'More info'}>
        <table className="align-left sm:mx-0 border-zinc-300 w-full max-w-md p-2 mx-auto mt-2 text-left border border-separate rounded">
          <tbody>
            <tr>
              <td>Title</td>
              <td>{game?.title}</td>
            </tr>
            <tr>
              <td>Genre</td>
              <td>{game?.genre}</td>
            </tr>
            <tr>
              <td>Platform</td>
              <td>{game?.platform}</td>
            </tr>
            <tr>
              <td>Publisher</td>
              <td>{game?.publisher}</td>
            </tr>
            <tr>
              <td>Developer</td>
              <td>{game?.developer}</td>
            </tr>
            <tr>
              <td>Release Date</td>
              <td>{new Date(game.release_date).toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>
      </SectionWithTitle>

      <SectionWithTitle title="System requirements">
        <table className="sm:text-left w-full p-2 text-center rounded">
          <tbody>
            {game.minimum_system_requirements &&
            !game.platform.toLowerCase().includes('browser') ? (
              Object.values(
                game?.minimum_system_requirements as SystemRequirements
              ).map((requirement: string) => (
                <tr key={crypto.randomUUID()}>
                  <td>{requirement}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="font-normal">
                  <strong className="font-bold">{game?.title}</strong> is a
                  browser based game and should run smoothly on practically any
                  PC with an updated web browser. If you have old hardware or
                  software, you may still be able to play, but your game
                  experience may suffer. For the best gameplay experience, we
                  recommend the latest versions of Chrome or Firefox.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </SectionWithTitle>

      {similarGames && similarGames.length >= 8 ? (
        <CardGrid
          title={
            <>
              More <span className="sm:inline hidden">{game.genre}</span>
            </>
          }
          games={similarGames.splice(0, 8)}
          cols={4}
          border={false}
        />
      ) : null}
      {popularGames && popularGames.length >= 8 ? (
        <CardGrid
          title={
            <>
              Popular <span className="sm:inline hidden">Games</span>
            </>
          }
          games={popularGames.splice(0, 8)}
          cols={4}
          border={false}
        />
      ) : null}
    </div>
  ) : null;
}
