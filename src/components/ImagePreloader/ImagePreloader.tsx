'use client';

import Image from 'next/image';
import { useState } from 'react';
import { SkeletonImage } from '../Skeletons/Skeletons';

function ImagePreloader({ src }: { src: string }): JSX.Element | null {
	const [imageLoaded, setImageLoaded] = useState(false);

	return (
		<>
			{!imageLoaded && <SkeletonImage />}
			<Image
				className="object-cover object-center h-0 transition-opacity duration-1000 opacity-0"
				src={src}
				alt="screenshot"
				width={600}
				height={80}
				priority={true}
				onLoadingComplete={(image) => {
					image.classList.remove('h-0');
					image.classList.remove('opacity-0');
					setImageLoaded(true);
				}}
			/>
		</>
	);
}

export default ImagePreloader;
