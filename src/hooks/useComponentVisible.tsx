import { useState, useEffect, useRef } from 'react';

/**
 * A custom React hook that allows for detecting clicks outside of a component.
 *
 * @param initialIsVisible - A boolean indicating whether the component is initially visible or not.
 *
 * @returns An object containing a ref to the component, a boolean indicating whether the component is currently visible, and a function to set the visibility of the component.
 */
export default function useComponentVisible(initialIsVisible: boolean): {
  ref: React.RefObject<HTMLDivElement>;
  isComponentVisible: boolean;
  setIsComponentVisible: (arg0: boolean) => void;
} {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef<HTMLDivElement>(null);

  /**
   * A function that handles clicks outside of the component.
   * @param e - The event object.
   */
  const handleClickOutside = (e: Event): void => {
    console.log((e.target as Node).nodeName);
    if (
      ref.current &&
      (!ref.current.contains(e.target as Node) ||
        (e.target as Node).nodeName === 'A')
    ) {
      e.stopPropagation();
      setIsComponentVisible(false);
    }
  };

  const handlePressEscape = (e: KeyboardEvent): void => {
    if (e.code === 'Escape') setIsComponentVisible(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    document.addEventListener('keydown', handlePressEscape, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}
