'use client';

import Link from 'next/link';
import { Logo, SearchBar, SearchModal, Sidebar } from '..';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useComponentVisible } from '@/src/hooks';

function Header() {
  const SidebarController = useComponentVisible(false);
  const SearchModalController = useComponentVisible(false);

  function handleShortcut(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      SearchModalController.setIsComponentVisible(
        !SearchModalController.isComponentVisible
      );
    }
  }

  if (typeof document !== 'undefined')
    document.addEventListener('keydown', handleShortcut);

  return (
    <>
      <header className="sticky top-0 z-40 text-white bg-gray-800">
        <div className="flex items-center justify-between px-4 py-2">
          <button
            type="button"
            className="mr-4 text-lg"
            onClick={() =>
              SidebarController.setIsComponentVisible(
                !SidebarController.isComponentVisible
              )
            }
          >
            <GiHamburgerMenu />
          </button>
          <Link className="w-fit block" href="/">
            <Logo />
          </Link>
          {/* NOTE: remove 'md:' below for logo to stay on the left */}
          <div className="md:w-full flex">
            <SearchBar
              onClick={() =>
                SearchModalController.setIsComponentVisible(
                  !SearchModalController.isComponentVisible
                )
              }
            />
          </div>
        </div>
      </header>
      <SearchModal
        modalRef={SearchModalController.ref}
        isOpen={SearchModalController.isComponentVisible}
      />
      <Sidebar
        sidebarRef={SidebarController.ref}
        isOpen={SidebarController.isComponentVisible}
      />
    </>
  );
}
export default Header;
