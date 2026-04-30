import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '@/routes/ScrollToTop';

/**
 * RootLayout component that wraps all public and protected routes.
 * Provides the core shell of the application including Navbar, Footer, and page transitions.
 */
const RootLayout = () => {
  const location = useLocation();

  return (
    <>
      {/* Utility to scroll to top on every route change */}
      <ScrollToTop />

      {/* Persistent Navigation */}
      <Navbar />

      {/* Main Content Area with Page Transitions */}
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait" initial={false}>
          {/* 
            The key={location.pathname} is critical for AnimatePresence 
            to detect route changes and trigger exit animations. 
          */}
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>

      {/* Persistent Footer */}
      <Footer />
    </>
  );
};

export default RootLayout;