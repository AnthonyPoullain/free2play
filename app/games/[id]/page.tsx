import Image from 'next/image';
import { Games } from '../../services';

export default async function Game({ params }: { params: { id: string } }) {
	const game = await Games.getGame(params.id);
	return game ? (
		<div className="">
			<h1 className="mb-4 text-3xl font-bold">{game.title}</h1>
			<Image
				className="mb-8 rounded-md"
				src={game.thumbnail}
				alt={game.title}
				width={365}
				height={200}
			/>
			{game.screenshots ? (
				<>
					<h2 className="mb-4 text-xl font-bold">Screenshots</h2>
					<div className="sm:grid-cols-4 grid grid-cols-2 gap-2 my-4">
						{game?.screenshots.map((screen) => (
							<div
								className="w-auto h-20 overflow-hidden rounded-md"
								key={screen.id}
							>
								<Image
									src={screen.image}
									alt="screenshot"
									width={640}
									height={200}
								/>
							</div>
						))}
					</div>
				</>
			) : null}
			<h2 className="mb-4 text-xl font-bold">Description</h2>
			<p className="leading-7">{game.description}</p>
		</div>
	) : null;
}
