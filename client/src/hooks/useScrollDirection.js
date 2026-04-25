import { useState, useEffect } from 'react';

/**
 * Hook to detect scroll direction and scroll position.
 * Returns 'up' or 'down' and the current scrollY value.
 */
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const currentScrollY = window.pageYOffset;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && (currentScrollY - lastScrollY > 10 || currentScrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
      setScrollY(currentScrollY);
    };

    window.addEventListener('scroll', updateScrollDirection);
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [scrollDirection]);

  return { scrollDirection, scrollY };
};

export default useScrollDirection;
