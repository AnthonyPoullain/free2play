'use client';

import { Games } from '@/src/services';
import FocusTrap from 'focus-trap-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import Label from '../Label/Label';
import { BsBrowserChrome, BsWindows } from 'react-icons/bs';

function SearchModal() {
  const [value, setValue] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [searchResults, setSearchResults] = useState<Game[]>([]);

  useEffect(() => {
    async function loadGames() {
      const res = await Games.getGames();
      if (res) setGames(res);
    }
    loadGames();
  }, []);

  useEffect(() => {
    function debounce(fn: Function, ms = 300) {
      let timeoutId: ReturnType<typeof setTimeout>;
      return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
      };
    }

    function handleFilterResults() {
      if (value.length === 0) {
        setSearchResults([]);
        return;
      }

      if (value.length >= 1) {
        const titleResults = games.filter((game) =>
          game.title?.toLowerCase().includes(value.trim().toLowerCase())
        );
        const descriptionResults = games.filter((game) =>
          game.short_description
            ?.toLowerCase()
            .includes(value.trim().toLowerCase())
        );
        const results = [...titleResults, ...descriptionResults];
        setSearchResults([...new Set(results)]);
      }
    }
    const updateResults = debounce(handleFilterResults);
    updateResults();
  }, [value]);

  function highlightSearchwords(input: string, needle: string) {
    return input.replace(
      new RegExp('(^|)(' + needle.trim() + ')(|$)', 'ig'),
      '$1<b style="background-color: yellow; color: black; border-radius: 3px; padding: 0 2px;">$2</b>$3'
    );
  }

  return (
    <div
      className={`absolute inset-0 top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 transition-opacity`}
    >
      <FocusTrap>
        <div className="h-fit inset-x-[10vw] md:inset-x-[20vw] inset-y-[20vh] absolute p-6 bg-gray-800 rounded-md">
          {/* SEARCH BAR */}
          <div className="relative">
            <input
              autoFocus
              className="group hover:opacity-100 focus:opacity-100 flex items-center w-full px-12 py-4 text-white duration-300 bg-transparent border rounded-md outline-none opacity-50"
              type="text"
              name="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Battlefield..."
            />
            <BiSearch className="group-hover:opacity-100 group-focus:opacity-100 left-4 top-5 absolute text-xl opacity-50" />
            <span className="md:block group-hover:opacity-100 group-focus:opacity-100 right-3 top-3 absolute hidden p-2 text-xs border rounded-md opacity-50">
              Esc
            </span>
          </div>
          {/* RESULTS */}
          {searchResults.length ? (
            <div
              id="search-results"
              className="max-h-96 w-full mt-6 overflow-y-scroll"
            >
              {searchResults.map((game) => (
                <Link
                  key={game.id}
                  href={`games/${game.id}`}
                  className="group outline-none"
                >
                  <div className="hover:bg-gray-700 group-focus:bg-gray-700 hover:rounded-md group-focus:rounded-md flex w-full h-20 gap-4 p-1 border-b border-gray-700">
                    <Image
                      src={game.thumbnail}
                      alt={game.title + 'thumbnail'}
                      width={100}
                      height={50}
                      className="w-auto h-full rounded-md"
                    />
                    <div className="text-ellipsis w-full h-full overflow-hidden text-sm text-gray-400">
                      <div className="flex justify-between">
                        <h2 className="leading-0 mr-2 text-base font-bold text-white">
                          {game.title}
                        </h2>
                        <div className="flex items-center gap-2">
                          <Label label={game.genre} />
                          {game.platform.includes('Windows') ? (
                            <BsWindows />
                          ) : (
                            <BsBrowserChrome />
                          )}
                        </div>
                      </div>
                      {value.length > 2 ? (
                        <p
                          dangerouslySetInnerHTML={{
                            __html: highlightSearchwords(
                              game.short_description,
                              value
                            ),
                          }}
                        ></p>
                      ) : (
                        <p className="">{game.short_description}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </FocusTrap>
    </div>
  );
}
export default SearchModal;
