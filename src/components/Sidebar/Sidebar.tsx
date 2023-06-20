import Link from 'next/link';
import { BiCategory, BiFoodMenu } from 'react-icons/bi';
import React from 'react';

function Sidebar() {
  const GENRES = [
    'Shooter',
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
  ].sort();

  return (
    <aside className="w-72 absolute flex flex-col z-30 h-[calc(100vh-60px)] bg-gray-800">
      <div className="bg-sky-600 gap-x-2 flex items-center px-4 py-2 font-bold">
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
            href="/"
          >
            All Games
          </Link>
        </li>
      </ul>

      <div className="gap-x-2 flex items-center px-4 py-2 font-bold bg-teal-600">
        <BiCategory />
        <h2>Genre</h2>
      </div>
      <ul className="flex flex-col">
        {GENRES.map((genre) => (
          <li key={genre}>
            <Link
              className="hover:bg-gray-700 block px-10 py-1 ease-out border-b border-gray-700"
              href={`genre/${genre}`}
            >
              {genre}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
export default Sidebar;
