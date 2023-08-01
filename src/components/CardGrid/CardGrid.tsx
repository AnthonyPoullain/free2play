'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { Card } from '..';
import SectionWithTitle from '../SectionWithTitle/SectionWithTitle';
import { Pagination } from '@mantine/core';

export type CardGridProperties = {
  title?: string | ReactNode;
  games: Game[];
  border?: boolean;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  pagination?: number | null;
  scrollToViewOnPageChange?: boolean;
};

function CardGrid({
  title,
  games,
  border = false,
  pagination = null,
  cols = 3,
  scrollToViewOnPageChange = false,
}: CardGridProperties) {
  const gridClass = {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
    5: 'sm:grid-cols-5',
    6: 'sm:grid-cols-6',
  };

  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const ref = useRef(null);

  const scrollToElement = () => {
    if (ref.current) (ref.current as Element)?.scrollIntoView();
  };

  useEffect(() => {
    if (scrollToViewOnPageChange) scrollToElement();
  }, [activePage]);

  useEffect(() => {
    if (pagination) {
      setTotalPages(Math.ceil(games.length / pagination));
    }
  }, [pagination]);

  return (
    <div ref={ref} className="scroll-mt-[120px]">
      <SectionWithTitle title={title} border={border}>
        <div
          className={`sm:w-full w-fit grid grid-cols-1 gap-1 mx-auto mb-4 ${gridClass[cols]}`}
        >
          {pagination
            ? games
                ?.slice((activePage - 1) * pagination, activePage * pagination)
                .map((game) => <Card key={game.id} game={game} />)
            : games.map((game) => <Card key={game.id} game={game} />)}
        </div>
        {pagination && totalPages > 1 && (
          <Pagination
            total={totalPages}
            onChange={setActivePage}
            styles={(theme) => ({
              control: {
                color: '#D4D4D8',
                borderColor: '#D4D4D8',
                borderOpacity: '50%',
                '&:hover': theme.fn.hover({
                  backgroundColor: '#0284C7',
                }),
              },

              leftIcon: {
                marginRight: theme.spacing.md,
              },
            })}
          />
        )}
      </SectionWithTitle>
    </div>
  );
}

export default CardGrid;
