'use client';

import { useOs } from '@mantine/hooks';
import { BiSearch } from 'react-icons/bi';

function SearchBar({ onClick }: { onClick: () => void }) {
	const os = useOs();

	return (
		<div className=" md:justify-around flex justify-end w-full">
			<button
				className="border rounded-md p-2 md:py-2 md:px-4 md:opacity-50 hover:opacity-100 focus:opacity-100 duration-300 flex gap-x-6 hover:gap-x-8 focus:gap-x-8 text-sm md:translate-x-[-92.5px]"
				type="button"
				onClick={onClick}
			>
				<BiSearch className="text-lg" />
				<span className="md:block hidden">Search a game...</span>
				<span className="md:block hidden">
					{os === 'macos' ? '⌘K' : os === 'windows' ? 'Ctrl+k' : ''}
				</span>
			</button>
		</div>
	);
}

export default SearchBar;
