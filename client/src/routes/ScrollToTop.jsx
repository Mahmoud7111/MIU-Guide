import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Utility component to reset scroll position on route changes.
 * Uses 'instant' behavior to avoid conflicts with Framer Motion transitions.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // We use instant scroll because smooth scroll interferes with 
    // Framer Motion's page exit/enter animations.
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
