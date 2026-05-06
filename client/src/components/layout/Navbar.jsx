import React, { useState, useEffect, useMemo } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useTheme } from '@/context/ThemeContext';
import { NAV_LINKS, ROUTES } from '@/lib/constants';
import { FACULTIES } from '@/data/faculties';
import Button from '@/components/ui/Button';
import styles from './Navbar.module.css';

/**
 * Main application navigation bar.
 * Features Oxford-style pill and Harvard-style full-screen menu.
 */
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [expandedLink, setExpandedLink] = useState(null);
  const [activeDrawerLink, setActiveDrawerLink] = useState(null);
  const { scrollDirection } = useScrollDirection();
  const scrollY = useScrollPosition();
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const menuRef = useClickOutside(() => setIsMenuOpen(false));
  const searchRef = useClickOutside(() => setIsSearchOpen(false));
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // navigate(`/search?q=${searchQuery}`); // Example search route
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isHidden = scrollDirection === 'down' && scrollY > 200;
  const isScrolled = scrollY > 50;

  const academicsSubLinks = useMemo(
    () => [
      { label: 'All Faculties', path: '/academics#faculties' },
      { label: 'Programs Search', path: '/academics#programs' },
      { label: 'Academic Calendar', path: '/academics#calendar' },
      ...FACULTIES.map((faculty) => ({
        label: faculty.name,
        path: `${ROUTES.ACADEMICS}/${faculty.slug}`
      }))
    ],
    []
  );

  const drawerLinks = useMemo(() => (
    NAV_LINKS.map((link) => {
      if (link.path === ROUTES.ACADEMICS) {
        return { ...link, subLinks: academicsSubLinks };
      }
      if (link.path === ROUTES.ADMISSIONS) {
        return {
          ...link,
          subLinks: [
            { label: 'Admission Requirements', path: '/admissions#requirements' },
            { label: 'How to Apply', path: '/admissions#apply' },
            { label: 'Scholarships', path: '/admissions#scholarships' },
            { label: 'Admissions FAQ', path: '/admissions#faq' }
          ]
        };
      }
      if (link.path === ROUTES.CAMPUS) {
        return {
          ...link,
          subLinks: [
            { label: 'Building Finder', path: '/campus#buildings' },
            { label: 'Campus Facilities', path: '/campus#facilities' },
            { label: 'Dining & Restaurants', path: '/campus#dining' },
            { label: 'Contact Us', path: '/campus#contact' }
          ]
        };
      }
      if (link.path === ROUTES.ABOUT) {
        return {
          ...link,
          subLinks: [
            { label: 'Mission & Vision', path: '/about#mission' },
            { label: 'Our History', path: '/about#history' },
            { label: 'Leadership', path: '/about#leadership' },
            { label: 'Accreditations', path: '/about#accreditations' }
          ]
        };
      }
      if (link.path === ROUTES.STUDENT_LIFE) {
        return {
          ...link,
          subLinks: [
            { label: 'Clubs & Organizations', path: '/student-life#clubs' },
            { label: 'Sports & Athletics', path: '/student-life#sports' },
            { label: 'Student Services', path: '/student-life#services' },
            { label: 'Campus Gallery', path: '/student-life#gallery' }
          ]
        };
      }
      if (link.path === ROUTES.NEWS) {
        return {
          ...link,
          subLinks: [
            { label: 'Latest News', path: ROUTES.NEWS },
            { label: 'Press Releases', path: '/news/press' },
            { label: 'Media Gallery', path: '/news/gallery' }
          ]
        };
      }
      if (link.path === ROUTES.CONTACT) {
        return {
          ...link,
          subLinks: [
            { label: 'General Inquiries', path: ROUTES.CONTACT },
            { label: 'Department Directory', path: '/directory' },
            { label: 'Admissions Office', path: ROUTES.ADMISSIONS }
          ]
        };
      }
      return { ...link, subLinks: [] };
    })
  ), [academicsSubLinks]);

  const activeDrawerSection = useMemo(
    () => drawerLinks.find((link) => link.path === activeDrawerLink),
    [drawerLinks, activeDrawerLink]
  );

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      setActiveDrawerLink(null);
    }
  }, [isMenuOpen]);

  const handleDrawerLinkClick = (link) => {
    if (activeDrawerLink === link.path) {
      navigate(link.path);
      setIsMenuOpen(false);
    } else {
      setActiveDrawerLink(link.path);
    }
  };

  const handleSubLinkClick = (path) => {
    setIsMenuOpen(false);
    
    const [pathname, hash] = path.split('#');
    const isSamePage = location.pathname === pathname;

    if (isSamePage && hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      navigate(path);
    }
  };

  return (
    <header
      className={`
        ${styles.header} 
        ${isHidden ? styles.hidden : ''}
        ${isScrolled ? styles.scrolled : ''}
      `}
    >
      <div className={styles.container}>
        {/* Logo */}
        <Link to={ROUTES.HOME} className={styles.logo}>
          <img src="/MIU.png" alt="MIU Logo" className={styles.logoImage} />
        </Link>

        <div className={styles.navGroups}>
          {/* Group 1: Student Portal Button - Left CTA */}
          <Link to={ROUTES.DASHBOARD} className={styles.portalBtn} aria-label="Student Portal">
            Student Portal
          </Link>

          {/* Group 2: Nav Links Pill */}
          <nav className={styles.linksPill}>
            <Link to={ROUTES.ACADEMICS} className={styles.pillLink}>Academics</Link>
            <Link to={ROUTES.ADMISSIONS} className={styles.pillLink}>Admissions</Link>
            <Link to={ROUTES.CAMPUS} className={styles.pillLink}>Campus</Link>
          </nav>

          {/* Group 3: Actions Pill */}
          <div className={styles.actionsPill}>
            <div
              ref={searchRef}
              className={`${styles.searchContainer} ${isSearchOpen ? styles.searchOpen : ''}`}
            >
              <input
                type="text"
                placeholder="Search MIU..."
                className={styles.searchInput}
                autoFocus={isSearchOpen}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
              <button
                className={styles.actionBtn}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Toggle search"
              >
                <SearchIcon size={18} />
              </button>
            </div>

            <button
              className={styles.actionBtn}
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
            </button>

            <button
              className={styles.menuBtn}
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className={styles.menuLabel}>Menu</span>
              <MenuIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Harvard Style Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className={`${styles.drawerWrapper} ${isMenuOpen ? styles.open : ''}`}>
            <motion.aside
              ref={menuRef}
              className={styles.drawer}
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.drawerHeader}>
                <Link to={ROUTES.HOME} onClick={() => setIsMenuOpen(false)}>
                  <img src="/MIU.png" alt="MIU Logo" className={styles.logoImage} style={{ filter: 'brightness(0) invert(1)', height: '70px' }} />
                </Link>
                <button onClick={() => setIsMenuOpen(false)} className={styles.closeBtn}>
                  Close <XIcon size={24} />
                </button>
              </div>

              <div className={styles.drawerContent}>
                {/* Left: Primary Nav */}
                <nav className={`
                  ${styles.drawerNav} 
                  ${activeDrawerLink ? styles.drawerNavHiddenMobile : ''}
                `}>
                  {drawerLinks.map((link, idx) => {
                    const hasSubLinks = link.subLinks && link.subLinks.length > 0;
                    const isActiveDrawer = activeDrawerLink === link.path;

                    return (
                      <motion.div
                        key={link.path}
                        className={styles.drawerLinkGroup}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 + 0.2 }}
                      >
                        <div className={styles.drawerLinkRow}>
                          <button
                            type="button"
                            className={`${styles.drawerLinkButton} ${isActiveDrawer ? styles.drawerLinkButtonActive : ''}`}
                            onClick={() => handleDrawerLinkClick(link)}
                          >
                            {link.label}
                          </button>
                          {hasSubLinks && (
                            <span className={styles.drawerLinkHint}>
                              <ChevronIcon isOpen={isActiveDrawer} />
                            </span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}

                  <motion.div
                    key={ROUTES.DASHBOARD}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: NAV_LINKS.length * 0.05 + 0.2 }}
                  >
                    <NavLink
                      to={ROUTES.DASHBOARD}
                      className={({ isActive }) => `${styles.drawerPortalLink} ${isActive ? styles.active : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Student Portal
                    </NavLink>
                  </motion.div>

                </nav>

                {/* Right: Detailed Sections */}
                <div className={`
                  ${styles.drawerDetails} 
                  ${activeDrawerLink ? styles.drawerDetailsVisibleMobile : ''}
                `}>
                  {activeDrawerSection ? (
                    <div className={styles.drawerDetailWrapper}>
                      <button 
                        className={styles.mobileBackBtn}
                        onClick={() => setActiveDrawerLink(null)}
                      >
                        <SmallArrow /> Back to menu
                      </button>
                      {activeDrawerSection.subLinks.length > 0 ? (
                      <motion.div
                        key={activeDrawerSection.path}
                        className={styles.drawerSubPanel}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <button
                          className={styles.drawerSubTitle}
                          onClick={() => handleSubLinkClick(activeDrawerSection.path)}
                        >
                          {activeDrawerSection.label} <ArrowIcon />
                        </button>
                        <div className={styles.drawerSubLinks}>
                          {activeDrawerSection.subLinks.map((subLink, sIdx) => (
                              <motion.div
                                key={subLink.path}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: sIdx * 0.05 + 0.1 }}
                              >
                                <button
                                  className={styles.drawerSubLink}
                                  onClick={() => handleSubLinkClick(subLink.path)}
                                >
                                  {subLink.label}
                                </button>
                              </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        className={styles.emptyDrawerDetail}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <h3>{activeDrawerSection.label}</h3>
                        <p>Discover more about {activeDrawerSection.label.toLowerCase()} at MIU. Click below to view the full section.</p>
                        <Link to={activeDrawerSection.path} className={styles.subLink} onClick={() => setIsMenuOpen(false)}>
                          View {activeDrawerSection.label} <SmallArrow />
                        </Link>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <motion.div
                    className={styles.drawerPlaceholder}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                  >
                    <p>Select a category to explore</p>
                  </motion.div>
                )}
              </div>
              </div>

              <div className={styles.drawerFooter}>
                <div className={styles.footerLinks}>
                  <span className={styles.footerLabel}>Quick Links</span>
                  <Link to={ROUTES.ACADEMICS} className={styles.footerLink} onClick={() => setIsMenuOpen(false)}>All Faculties</Link>
                  <Link to={ROUTES.CAMPUS} className={styles.footerLink} onClick={() => setIsMenuOpen(false)}>Staff Directory</Link>
                  <Link to={ROUTES.ADMISSIONS} className={styles.footerLink} onClick={() => setIsMenuOpen(false)}>Apply Now</Link>
                  <Link to={ROUTES.NEWS} className={styles.footerLink} onClick={() => setIsMenuOpen(false)}>Latest News</Link>
                  <Link to={ROUTES.STUDENT_LIFE} className={styles.footerLink} onClick={() => setIsMenuOpen(false)}>Clubs & Sports</Link>
                  <Link to={ROUTES.ABOUT} className={styles.footerLink} onClick={() => setIsMenuOpen(false)}>Our History</Link>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

const SearchIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);

const MenuIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const XIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const SmallArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const ChevronIcon = ({ isOpen }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const SunIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export default Navbar;
