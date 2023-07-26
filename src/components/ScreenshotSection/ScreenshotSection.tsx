'use client';

import { motion } from 'framer-motion';
import { ImagePreloader, ScreenshotModal, SectionWithTitle } from '..';
import NextImage from 'next/image';
import { useComponentVisible } from '@/src/hooks';
import { useEffect, useState } from 'react';

function ScreenshotSection({ screenshots }: { screenshots: Screenshot[] }) {
	const { ref, isComponentVisible, setIsComponentVisible } =
		useComponentVisible(false);
	const [clickedIndex, setClickedIndex] = useState(0);
	const [screenshotsLoaded, setScreenshotsLoaded] = useState(false);

	function handleClick(index: number): void {
		setClickedIndex(index);
		setIsComponentVisible(!isComponentVisible);
	}

	const loadedImages = [];
	async function cacheImage(src: string) {
		new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve({ src, status: 'ok' });
			img.onerror = () => reject({ src, status: 'error' });
			img.src = src;
			loadedImages.push(img);
		});
	}
	useEffect(() => {
		const images = screenshots.map((screen) => screen.image);
		images.forEach(async (img) => await cacheImage(img));
	}, []);

	return (
		<SectionWithTitle title="Screenshots" border={false}>
			<div className={`sm:grid-cols-${screenshots?.length} grid gap-2`}>
				{screenshots.map((screen, i) => (
					<motion.div
						layoutId={screen.id.toString()}
						className="h-fit max-h-32 w-full overflow-hidden rounded-md cursor-pointer"
						onClick={() => handleClick(i)}
						key={screen.id}
					>
						<div className="object-center">
							<ImagePreloader src={screen.image} />
						</div>
					</motion.div>
				))}
			</div>
			{isComponentVisible && (
				<ScreenshotModal
					isOpen={isComponentVisible}
					modalRef={ref}
					images={screenshots}
					initialIndex={clickedIndex}
				/>
			)}
		</SectionWithTitle>
	);
}
export default ScreenshotSection;
