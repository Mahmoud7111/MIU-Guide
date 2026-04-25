import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useTheme } from '../../context/ThemeContext';
import { NAV_LINKS, ROUTES } from '../../lib/constants';
import { 
  navIndicator, 
  hamburgerTop, 
  hamburgerMiddle, 
  hamburgerBottom 
} from '../../lib/motion/variants';
import Button from '../ui/Button';
import styles from './Navbar.module.css';

/**
 * Main application navigation bar.
 * Features scroll-aware visibility, theme toggling, and a mobile drawer.
 */
export const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { scrollDirection, scrollY } = useScrollDirection();
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const drawerRef = useClickOutside(() => setIsDrawerOpen(false));

  const isScrolled = scrollY > 60;
  const isHidden = scrollDirection === 'down' && scrollY > 100;

  return (
    <header 
      className={`
        ${styles.header} 
        ${isScrolled ? styles.scrolled : ''} 
        ${isHidden ? styles.hidden : ''}
      `}
    >
      <div className={`${styles.container} container`}>
        {/* Logo */}
        <Link to={ROUTES.HOME} className={styles.logo}>
          <MIULogoIcon className={styles.logoIcon} />
          <span className={styles.logoText}>Misr International University</span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {NAV_LINKS.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path} 
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <AnimatePresence>
                    {isActive && <ActiveIndicator />}
                  </AnimatePresence>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div className={styles.actions}>
          <button className={styles.iconBtn} aria-label="Search">
            <SearchIcon size={20} />
          </button>

          <motion.button 
            className={styles.iconBtn} 
            onClick={toggleTheme}
            whileTap={{ rotate: 180, scale: 0.8 }}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.span key="sun" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <SunIcon size={20} />
                </motion.span>
              ) : (
                <motion.span key="moon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <MoonIcon size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <div className={styles.portalBtn}>
            <Button variant="primary" onClick={() => navigate(ROUTES.DASHBOARD)}>
              Student Portal
            </Button>
          </div>

          {/* Hamburger Toggle */}
          <button 
            className={styles.hamburger} 
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open menu"
          >
            <motion.span 
              variants={hamburgerTop}
              animate={isDrawerOpen ? "open" : "closed"}
            />
            <motion.span 
              variants={hamburgerMiddle}
              animate={isDrawerOpen ? "open" : "closed"}
            />
            <motion.span 
              variants={hamburgerBottom}
              animate={isDrawerOpen ? "open" : "closed"}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className={styles.drawerWrapper}>
            <motion.div 
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
            />
            <motion.aside
              ref={drawerRef}
              className={styles.drawer}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className={styles.drawerHeader}>
                <MIULogoIcon className={styles.logoIcon} />
                <button onClick={() => setIsDrawerOpen(false)} className={styles.closeBtn}>
                  <motion.span whileHover={{ rotate: 90 }} style={{ display: 'inline-block' }}>&times;</motion.span>
                </button>
              </div>

              <nav className={styles.drawerNav}>
                {NAV_LINKS.map((link, idx) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.2 }}
                  >
                    <NavLink 
                      to={link.path} 
                      className={styles.drawerLink}
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className={styles.drawerFooter}>
                <Button 
                  variant="primary" 
                  fullWidth 
                  onClick={() => {
                    navigate(ROUTES.DASHBOARD);
                    setIsDrawerOpen(false);
                  }}
                >
                  Student Portal
                </Button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

/* --- Internal Helpers --- */

const ActiveIndicator = () => (
  <motion.span 
    layoutId="nav-indicator"
    className={styles.activeIndicator}
    variants={navIndicator}
    initial="hidden"
    animate="visible"
    exit="exit"
  />
);

const MIULogoIcon = (props) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 2L16 30M2 16L30 16" stroke="currentColor" strokeWidth="2"/>
    <ellipse cx="16" cy="16" rx="14" ry="7" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 2C16 2 21 6 21 16C21 26 16 30 16 30" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 2C16 2 11 6 11 16C11 26 16 30 16 30" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const SearchIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
);

const SunIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
);

const MoonIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
);

export default Navbar;
