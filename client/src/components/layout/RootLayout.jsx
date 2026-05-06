import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '@/routes/ScrollToTop';
import Chatbot from '../ui/Chatbot/Chatbot';

import CustomCursor from '../ui/CustomCursor/CustomCursor';

/**
 * RootLayout component that wraps all public and protected routes.
 * Provides the core shell of the application including Navbar, Footer, and page transitions.
 */
const RootLayout = () => {
  const location = useLocation();
  const isAuthRoute = location.pathname.startsWith('/login') || 
                      location.pathname.startsWith('/register') ||
                      location.pathname.startsWith('/forgot-password');

  return (
    <div className={isAuthRoute ? 'native-cursor' : 'custom-cursor-active'}>
      {/* Custom Cursor */}
      {!isAuthRoute && <CustomCursor />}

      {/* Utility to scroll to top on every route change */}
      <ScrollToTop />

      {/* Persistent Navigation */}
      <Navbar />

      {/* Main Content Area with Page Transitions */}
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait">
          {/* 
            The key={location.pathname} is critical for AnimatePresence 
            to detect route changes and trigger exit animations. 
          */}
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>

      {/* Floating Chatbot */}
      <Chatbot />

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
};

export default RootLayout;