import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import Sidebar from './Sidebar';
import styles from './PortalLayout.module.css';

/**
 * PortalLayout component for authenticated student pages.
 * Features a persistent sidebar and a contextual topbar.
 */
export const PortalLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const pageTitle = usePageTitle();

  const getInitials = (name) => {
    if (!name) return 'S';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className={styles.layout}>
      {/* Persistent Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        collapsed={isCollapsed} 
        setCollapsed={setIsCollapsed} 
      />

      {/* Main Container */}
      <div className={`
        ${styles.mainContainer} 
        ${isCollapsed ? styles.sidebarCollapsed : ''}
      `}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button 
              className={styles.hamburger} 
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon size={24} />
            </button>
            <h1 className={styles.pageTitle}>{pageTitle}</h1>
          </div>

          <div className={styles.topbarRight}>
            <button className={styles.iconBtn} aria-label="Notifications">
              <BellIcon size={20} />
            </button>
            
            <button className={styles.iconBtn} onClick={toggleTheme} aria-label="Toggle theme">
              {isDark ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>

            <div className={styles.userProfile}>
              <div className={styles.userText}>
                <span className={styles.userName}>{user?.name?.split(' ')[0] || 'Student'}</span>
                <span className={styles.userRole}>Student</span>
              </div>
              <div className={styles.userAvatar}>
                {getInitials(user?.name)}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className={styles.content}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            className={styles.mobileBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

/* --- Icons --- */

const MenuIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);

const BellIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);

const SunIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
);

const MoonIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
);

export default PortalLayout;
