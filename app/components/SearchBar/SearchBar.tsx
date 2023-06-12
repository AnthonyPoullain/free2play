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
				console.log('close');
			}
		}
		document.addEventListener('click', handleClickResult);
		return () => {
			document.removeEventListener('click', handleClickResult);
		};
	}, []);

	return (
		<div className=" flex justify-around w-full">
			<button
				className="border rounded-md py-2 px-4 opacity-50 hover:opacity-100 focus:opacity-100 duration-300 flex items-center gap-x-6 hover:gap-x-8 focus:gap-x-8 text-sm translate-x-[-77.5px]"
				type="button"
				onClick={() => setSearchModalIsOpen(!searchModalIsOpen)}
			>
				<BiSearch className="text-lg" />
				Search a game...
				<span>⌘K</span>
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
