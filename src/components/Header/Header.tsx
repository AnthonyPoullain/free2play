'use client';

import Link from 'next/link';
import { Logo, SearchBar, Sidebar } from '..';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from 'react';

function Header() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-40 bg-gray-800">
        <div className="flex items-center justify-between px-4 py-2 mx-auto">
          <button
            type="button"
            className="mr-4 text-lg"
            onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
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
      {sidebarIsOpen ? <Sidebar /> : null}
    </>
  );
}
export default Header;
