'use client';

import { motion } from 'framer-motion';
import { ScreenshotModal, SectionWithTitle } from '..';
import NextImage from 'next/image';
import { useComponentVisible } from '@/src/hooks';
import { useEffect, useState } from 'react';

function ScreenshotSection({ screenshots }: { screenshots: Screenshot[] }) {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [clickedIndex, setClickedIndex] = useState(0);

  function handleClick(index: number): void {
    setClickedIndex(index);
    setIsComponentVisible(!isComponentVisible);
  }

  async function cacheImages(srcArray: string[]) {
    const promises = srcArray.map((src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    await Promise.all(promises);
  }

  useEffect(() => {
    const images = screenshots.map((screen) => screen.image);
    console.log(images);
    cacheImages(images);
  }, []);

  return (
    <SectionWithTitle title="Screenshots" border={true}>
      <div className={`sm:grid-cols-${screenshots?.length} grid gap-2`}>
        {screenshots.map((screen, i) => (
          <motion.div
            layoutId={screen.id.toString()}
            className="h-fit max-h-32 w-full overflow-hidden rounded-md cursor-pointer"
            onClick={() => handleClick(i)}
            key={screen.id}
          >
            <NextImage
              className="transition-opacity duration-1000 opacity-0"
              src={screen.image}
              alt="screenshot"
              width={600}
              height={80}
              priority={true}
              onLoadingComplete={(image) => image.classList.remove('opacity-0')}
            />
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
