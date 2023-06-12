'use client';

import { Games } from '@/app/services';
import FocusTrap from 'focus-trap-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';

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
			return function(this: any, ...args: any[]) {
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
					game.title?.toLowerCase().includes(value.toLowerCase())
				);
				const descriptionResults = games.filter((game) =>
					game.short_description
						?.toLowerCase()
						.includes(value.toLowerCase())
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
			new RegExp('(^|)(' + needle + ')(|$)', 'ig'),
			'$1<b style="background-color: yellow; border-radius: 3px">$2</b>$3'
		);
	}

	return (
		<div
			className={`absolute inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm`}
		>
			<FocusTrap>
				<div className="inset-x-10 md:inset-x-40 lg:inset-x-80 inset-y-40 absolute p-8 bg-gray-800 rounded-md">
					{/* SEARCH BAR */}
					<div className="relative mb-8">
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
						<span className="group-hover:opacity-100 group-focus:opacity-100 right-3 top-3 absolute p-2 text-xs border rounded-md opacity-50">
							Esc
						</span>
					</div>
					{/* RESULTS */}
					<div
						id="search-results"
						className="h-4/5 w-full overflow-x-hidden rounded-md"
					>
						{searchResults
							? searchResults.map((game) => (
								<Link
									key={game.id}
									href={`games/${game.id}`}
									className="group outline-none"
								>
									<div className="hover:bg-gray-700 group-focus:bg-gray-700 flex w-full h-20 gap-4 py-2 border-b border-gray-700">
										<Image
											src={game.thumbnail}
											alt={game.title + 'thumbnail'}
											width={100}
											height={50}
											className="w-auto h-full rounded-md"
										/>
										<div className="text-ellipsis overflow-hidden">
											<div className="text-sm text-gray-400">
												<h2 className="leading-0 mr-2 text-base font-bold text-white">
													{game.title}
												</h2>
												<p
													dangerouslySetInnerHTML={{
														__html: highlightSearchwords(
															game.short_description,
															value
														),
													}}
												></p>
											</div>
										</div>
									</div>
								</Link>
							))
							: null}
					</div>
				</div>
			</FocusTrap>
		</div>
	);
}
export default SearchModal;
