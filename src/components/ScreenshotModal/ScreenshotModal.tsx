'use client';

import { RefObject, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { useImageSlider } from '@/src/hooks';
import { AnimatePresence, motion } from 'framer-motion';

export default function ScreenshotModal({
  isOpen,
  modalRef,
  images,
  initialIndex,
}: {
  isOpen: boolean;
  modalRef?: RefObject<HTMLDivElement>;
  images: Screenshot[];
  initialIndex: number;
}) {
  const [currentImageIndex, nextImage, previousImage] = useImageSlider(
    initialIndex,
    images.length - 1
  );

  function handleShortcut(e: KeyboardEvent): void {
    e.preventDefault();
    if (e.key === 'ArrowLeft') previousImage();
    if (e.key === 'ArrowRight') nextImage();
  }

  useEffect(() => {
    window.addEventListener('keydown', handleShortcut);
    return () => {
      window.removeEventListener('keydown', handleShortcut);
    };
  }, [currentImageIndex]);

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ x: 0 }}
          transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
          className={`absolute inset-0 w-full h-full bg-black backdrop-blur-sm bg-opacity-50 z-50`}
        >
          <div className="top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-fit absolute overflow-hidden">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 1 }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
              ref={modalRef}
              className="sm:px-4 group w-fit relative mx-auto"
            >
              {/* eslint-disable-next-line */}
              <img
                className="sm:rounded-md  mx-auto transition-transform duration-300 ease-out w-[1000px]"
                src={images[currentImageIndex]?.image}
                alt="img"
              />
              <div className="bg-opacity-50 left-1/2 translate-x-[-50%] absolute bottom-2 z-50 rounded-full w-fit px-4 h-6 bg-gray-800 flex gap-x-2 items-center justify-center">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className={`w-2 h-2 border rounded-full transition-all duration-200 ${
                      images.indexOf(img) === currentImageIndex
                        ? 'bg-sky-600'
                        : ''
                    }`}
                  />
                ))}
              </div>
              <div className="group-hover:sm:opacity-100 transition-opacity duration-300 ease-out opacity-0">
                <button
                  type="button"
                  onClick={previousImage}
                  className="rounded-l-md sm:left-4 bottom-1/2 w-fit absolute left-0 z-50 h-full px-4 text-3xl translate-y-1/2 bg-gray-800 bg-opacity-50"
                >
                  <BsArrowLeftCircle />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="rounded-r-md sm:right-4 bottom-1/2 w-fit absolute right-0 z-50 h-full px-4 text-3xl translate-y-1/2 bg-gray-800 bg-opacity-50"
                >
                  <BsArrowRightCircle />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.querySelector('#modal') as Element
  );
}
