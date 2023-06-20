'use client';

import Link from 'next/link';
import { Logo, SearchBar, Sidebar } from '..';
import { GiHamburgerMenu } from 'react-icons/gi';
/* import { useState } from 'react'; */
import useComponentVisible from '@/src/hooks/useComponentVisible';

function Header() {
  /* const [isComponentVisible, setSidebarIsOpen] = useState(false); */
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-gray-800">
        <div className="flex items-center justify-between px-4 py-2 mx-auto">
          <button
            type="button"
            className="mr-4 text-lg"
            onClick={() => setIsComponentVisible(!isComponentVisible)}
          >
            <GiHamburgerMenu />
          </button>
          <Link className="w-fit block" href="/">
            <Logo />
          </Link>
          <div className="md:w-full flex justify-around">
            <SearchBar />
          </div>
        </div>
      </header>
      <Sidebar sidebarRef={ref} isOpen={isComponentVisible} />
    </>
  );
}
export default Header;
