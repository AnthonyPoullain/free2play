'use client';

import Link from 'next/link';
import Image from 'next/image';
import Label from '../Label/Label';
import { BsBrowserChrome, BsWindows } from 'react-icons/bs';

function Card({ game }: { game: Game }): React.ReactNode {
	return (
		<Link
			key={game.id}
			href={`/games/${game.id}`}
			className="w-fit group relative block overflow-hidden outline-none"
		>
			<div className="sm:translate-y-10 group-hover:translate-y-0 group-focus:translate-y-0 gap-x-4 absolute bottom-0 z-10 flex items-center content-center w-full h-10 px-2 text-left duration-300 translate-y-0 bg-black bg-opacity-75">
				<h2 className="text-ellipsis whitespace-nowrap w-full overflow-hidden font-bold">
					{game.title}
				</h2>
				<Label label={game.genre} />
				<div className="text-xs">
					{game.platform.includes('Windows') ? (
						<BsWindows />
					) : (
						<BsBrowserChrome />
					)}
				</div>
			</div>
			<div className="group-focus:scale-105 group-hover:scale-105 transition-transform duration-300 ease-out">
				<Image
					className="transition-opacity duration-1000 opacity-0"
					src={game.thumbnail}
					width={365}
					height={200}
					alt={game.title + 'thumbnail'}
					onLoadingComplete={(image) => image.classList.remove('opacity-0')}
				/>
			</div>
		</Link>
	);
}
export default Card;
