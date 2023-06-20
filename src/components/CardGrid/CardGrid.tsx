import React from 'react';
import { Card } from '..';

export type CardGridProperties = {
  title?: string;
  games: Game[];
  border?: boolean;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
};

function CardGrid({
  title,
  games,
  border = false,
  cols = 3,
}: CardGridProperties) {
  const gridClass = [
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-5',
    'grid-cols-6',
  ];

  return (
    <section
      className={`w-fit border-zinc-300 ${
        border ? 'border-y' : ''
      } relative mx-auto py-4 ${title ? 'mt-16 ' : 'mt-14'} mb-14 ${
        !title && !border ? 'py-0' : ''
      }`}
    >
      <div
        className={`w-fit grid grid-cols-1 gap-1 mx-auto sm:${
          gridClass[cols - 1]
        }`}
      >
        {games?.map((game) => (
          <Card key={game.id} game={game} />
        ))}
      </div>
      {title && (
        <h2 className="uppercase translate-y-[-60%] bg-zinc-900 whitespace-nowrap sm:pl-0 pl-4 translate-x-[-50%] sm:translate-x-0 absolute top-0 sm:left-0 left-1/2 text-xl font-bold">
          {title}
          <span className="text-sky-600 px-2 text-2xl">▾</span>
        </h2>
      )}
    </section>
  );
}

export default CardGrid;
