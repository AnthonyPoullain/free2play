/* eslint-disable react-hooks/rules-of-hooks*/
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiErrorCircle } from 'react-icons/bi';

function error() {
	const [count, setCount] = useState(7);
	const router = useRouter();

	useEffect(() => {
		if (count > 0) {
			const countdown = setTimeout(() => {
				setCount((prevCount) => prevCount - 1);
			}, 1000);
			return () => clearTimeout(countdown);
		}
		router.back();
	}, [count]);

	return (
		<div className="h-[60vh] text-center flex flex-col items-center justify-center w-full gap-2 m-auto">
			<div className="text-sky-600 text-7xl">
				<BiErrorCircle />
			</div>
			<p className="text-sky-600 text-xl font-bold">Ooops! An error occured.</p>

			<p className="mb-6 font-bold">
				The requested data could not be retrieved.{' '}
			</p>
			<p className="">
				You will be automatically redirected in{' '}
				<span className="text-sky-600 font-bold">{count}</span> seconds...
			</p>
		</div>
	);
}

export default error;
