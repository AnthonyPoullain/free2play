'use client';

import Link from 'next/link';
import { BiCategory, BiFoodMenu } from 'react-icons/bi';
import React, { RefObject } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function Sidebar({
  isOpen,
  sidebarRef,
}: {
  isOpen: boolean;
  sidebarRef?: RefObject<HTMLDivElement>;
}) {
	const GENRES = [
		'Shooter',
		'Sci-fi',
		'Card',
		'Anime',
		'Strategy',
		'MMORPG',
		'Fighting',
		'Action RPG',
		'Battle Royale',
		'MOBA',
		'Sports',
		'Racing',
		'MMO',
		'Social',
		'Fantasy',
	].sort() as Genre[];

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.aside
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          exit={{ x: '-100%' }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
          ref={sidebarRef}
          className="text-white w-72 absolute flex flex-col z-30 h-[calc(100dvh-60px)] bg-gray-800 overflow-auto"
        >
          <div className="bg-sky-600 gap-x-2 flex-nowrap whitespace-nowrap flex items-center px-4 py-2 font-bold">
            <BiFoodMenu />
            <h2>Menu</h2>
          </div>
          <ul className="flex flex-col">
            <li>
              <Link
                className="hover:bg-gray-700 block px-10 py-2 ease-out border-b border-gray-700"
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-gray-700 block px-10 py-2 ease-out border-b border-gray-700"
                href="/games"
              >
                All Games
              </Link>
            </li>
          </ul>

					<div className="gap-x-2 bg-sky-600 flex items-center px-4 py-2 font-bold">
						<BiCategory />
						<h2>Genre</h2>
					</div>
					<ul className="flex flex-col">
						{GENRES.map((genre) => (
							<li key={genre}>
								<Link
									className="hover:bg-gray-700 block px-10 py-2 ease-out border-b border-gray-700"
									href={`/genre/${genre}`}
								>
									{genre}
								</Link>
							</li>
						))}
					</ul>
				</motion.aside>
			) : null}
		</AnimatePresence>
	);
}
export default Sidebar;
