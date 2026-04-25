import { useEffect, useRef } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref.
 * @param {Function} handler Callback function to execute on outside click.
 * @returns {import('react').RefObject} The ref to attach to the target element.
 */
export const useClickOutside = (handler) => {
  const domNode = useRef();

  useEffect(() => {
    const maybeHandler = (event) => {
      if (domNode.current && !domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', maybeHandler);
    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  }, [handler]);

  return domNode;
};

export default useClickOutside;
