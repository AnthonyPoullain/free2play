import { useState } from 'react';

type ImageSlider = [
  currentImageIndex: number,
  nextImage: () => void,
  previousImage: () => void
];

export default function useImageSlider(
  initialIndex: number,
  lengthOfArray: number
): ImageSlider {
  const [currentImageIndex, setCurrentImageIndex] =
    useState<number>(initialIndex);

  function nextImage(): void {
    setCurrentImageIndex((prev) =>
      currentImageIndex === lengthOfArray ? 0 : prev + 1
    );
  }

  function previousImage(): void {
    setCurrentImageIndex((prev) =>
      currentImageIndex === 0 ? lengthOfArray : prev - 1
    );
  }

  return [currentImageIndex, nextImage, previousImage];
}
