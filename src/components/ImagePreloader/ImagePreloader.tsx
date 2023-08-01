'use client';

import Image from 'next/image';
import { useState } from 'react';
import { SkeletonImage } from '../Skeletons/Skeletons';

function ImagePreloader({ src }: { src: string }): JSX.Element | null {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <>
      {!imageLoaded && !imgError && <SkeletonImage />}
      {!imgError && (
        <Image
          className="object-cover object-center h-0 transition-opacity duration-1000 opacity-0"
          src={src}
          alt="screenshot"
          width={600}
          height={80}
          priority={true}
          onError={() => setImgError(true)}
          onLoadingComplete={(image) => {
            setImageLoaded(true);
            image.classList.remove('h-0');
            image.classList.add('h-full');
            image.classList.remove('opacity-0');
          }}
        />
      )}
    </>
  );
}

export default ImagePreloader;
