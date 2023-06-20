'use client';

import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import SearchModal from '../SearchModal/SearchModal';
import { createPortal } from 'react-dom';

function SearchBar() {
  const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.metaKey) {
        if (e.key === 'k') {
          setSearchModalIsOpen(!searchModalIsOpen);
        }
      }
      if (e.key === 'Escape') {
        setSearchModalIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    if (searchModalIsOpen) {
      document.body.style.overflow = 'hidden';
    }

    if (!searchModalIsOpen) {
      document.body.style.overflow = 'auto';
    }
  }, [searchModalIsOpen]);

  useEffect(() => {
    function handleClickResult(e: MouseEvent) {
      const clickedOnResult = (e.target as HTMLElement).closest(
        'div#search-results'
      );
      if (clickedOnResult) {
        setSearchModalIsOpen(false);
      }
    }
    document.addEventListener('click', handleClickResult);
    return () => {
      document.removeEventListener('click', handleClickResult);
    };
  }, []);

  return (
    <div className=" md:justify-around flex justify-end w-full">
      <button
        className="border rounded-md p-2 md:py-2 md:px-4 md:opacity-50 hover:opacity-100 focus:opacity-100 duration-300 flex gap-x-6 hover:gap-x-8 focus:gap-x-8 text-sm md:translate-x-[-92.5px]"
        type="button"
        onClick={() => setSearchModalIsOpen(!searchModalIsOpen)}
      >
        <BiSearch className="text-lg" />
        <span className="md:block hidden">Search a game...</span>
        <span className="md:block hidden">⌘K</span>
      </button>
      {searchModalIsOpen
        ? createPortal(
            <SearchModal />,
            document.querySelector('#modal') as HTMLElement
          )
        : null}
    </div>
  );
}

export default SearchBar;
