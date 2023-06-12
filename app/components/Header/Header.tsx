import Link from 'next/link';
import { Logo, SearchBar } from '..';

function Header() {
	return (
		<header className="bg-gray-800">
			<div className="flex items-center justify-between p-4 mx-auto">
				<Link className="w-fit block" href="/">
					<Logo />
				</Link>
				<div className=" flex justify-around w-full">
					<SearchBar />
				</div>
			</div>
		</header>
	);
}
export default Header;
