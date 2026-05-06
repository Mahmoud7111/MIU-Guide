import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Utility component to reset scroll position on route changes.
 * Uses 'instant' behavior to avoid conflicts with Framer Motion transitions.
 */
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // 1. Handle Hash Scroll (e.g., /page#section)
    if (location.hash) {
      const id = location.hash.replace('#', '');
      
      // We use a longer delay because the page might be lazy-loading 
      // or performing exit/enter animations via Framer Motion.
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Fallback to top if element not found after delay
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }, 500); // 500ms allows for lazy loading + transitions

      return () => clearTimeout(timer);
    }

    // 2. Default: Scroll to top instantly on pathname change
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname, location.hash]);

  return null;
};

export default ScrollToTop;
