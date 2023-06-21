import Image from 'next/image';
import { Games } from '@/src/services';
import { CardGrid, SectionWithTitle } from '@/src/components';
import { BsFillPlayFill, BsTwitch, BsYoutube } from 'react-icons/bs';
import Link from 'next/link';

export default async function Game({ params }: { params: { id: string } }) {
	const game = await Games.getGame(params.id);
	const sameGenreGames = game?.genre
		? await Games.getGamesByCategory(game?.genre)
		: null;

	return game ? (
		<div className="md:text-left md:items-start flex flex-col items-center text-center">
			<h1 className="md:text-left mt-4 mb-12 text-3xl font-bold text-center">
				{game.title}
			</h1>
			<section className="w-fit flex flex-col gap-2 mb-4 text-sm">
				<Image
					className="rounded-md"
					src={game.thumbnail}
					alt={game.title}
					width={365}
					height={200}
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
						className="hover:bg-gray-700 focus:bg-gray-700 flex items-center justify-center w-full h-12 gap-2 p-2 font-bold bg-gray-800 rounded-md"
					>
						<span>Watch on Twitch</span>
						<BsTwitch className="inline text-lg text-purple-700" />
					</Link>
					<Link
						href={`https://www.youtube.com/results?search_query=${game.title}`}
						target="_blank"
						className="hover:bg-gray-700 focus:bg-gray-700 flex items-center justify-center w-full h-12 gap-2 p-2 font-bold bg-gray-800 rounded-md"
					>
						<span>Watch on YouTube</span>
						<BsYoutube className="inline text-2xl text-red-700" />
					</Link>
				</div>
			</section>
			<SectionWithTitle title="Screenshots" border={true}>
				<div className={`sm:grid-cols-${game?.screenshots?.length} grid gap-2`}>
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
							/>
						</div>
					))}
				</div>
			</SectionWithTitle>
			<SectionWithTitle title={`About ${game.title}`}>
				<p className="text-justify">{game.description}</p>
			</SectionWithTitle>
			{sameGenreGames ? (
				<CardGrid
					title={`More Free ${game.genre}`}
					games={sameGenreGames.splice(0, 8)}
					cols={4}
					border={true}
				/>
			) : null}
		</div>
	) : null;
}
