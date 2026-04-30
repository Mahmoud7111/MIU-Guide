import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SIDEBAR_LINKS } from '@/lib/constants';
import { sidebarIndicator } from '@/lib/motion/variants';
import { useAuth } from '@/context/AuthContext';
import styles from './Sidebar.module.css';

/**
 * Student Portal Sidebar navigation.
 * Features collapsible states, active link indicators, and user profile summary.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Mobile drawer state.
 * @param {boolean} props.collapsed - Desktop collapsed state.
 * @param {Function} props.setCollapsed - Toggle desktop collapse.
 */
export const Sidebar = ({ isOpen, collapsed, setCollapsed }) => {
  const { user, logout } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'S';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <motion.aside 
      className={`
        ${styles.sidebar} 
        ${collapsed ? styles.collapsed : ''} 
        ${isOpen ? styles.mobileOpen : ''}
      `}
      animate={{ width: collapsed ? 68 : 260 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      <div className={styles.header}>
        <img src="/MIU.png" alt="MIU Logo" className={styles.sidebarLogo} />
      </div>

      {/* Middle: Links */}
      <nav className={styles.nav}>
        {SIDEBAR_LINKS.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
            title={collapsed ? link.label : ''}
          >
            {({ isActive }) => (
              <>
                <span className={styles.icon}>{getIcon(link.icon)}</span>
                {!collapsed && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    className={styles.label}
                  >
                    {link.label}
                  </motion.span>
                )}
                <ActiveIndicator isActive={isActive} />
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom: User Card & Collapse Toggle */}
      <div className={styles.footer}>
        <div className={styles.userCard}>
          <div className={styles.avatar}>{getInitials(user?.name)}</div>
          {!collapsed && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className={styles.userInfo}
            >
              <p className={styles.userName}>{user?.name || 'Student'}</p>
              <p className={styles.userFaculty}>{user?.faculty || 'MIU'}</p>
            </motion.div>
          )}
        </div>

        <div className={styles.footerActions}>
          <button 
            className={styles.actionBtn} 
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <motion.span animate={{ rotate: collapsed ? 180 : 0 }}>
              <ChevronLeftIcon size={18} />
            </motion.span>
          </button>
          
          <button 
            className={`${styles.actionBtn} ${styles.logoutBtn}`}
            onClick={logout}
            aria-label="Logout"
          >
            <LogoutIcon size={18} />
          </button>
        </div>
      </div>
    </motion.aside>
  );
};

/* --- Helpers --- */

const ActiveIndicator = ({ isActive }) => (
  <AnimatePresence>
    {isActive && (
      <motion.span
        layoutId="sidebar-indicator"
        className={styles.activePill}
        variants={sidebarIndicator}
        initial="hidden"
        animate="visible"
        exit="exit"
      />
    )}
  </AnimatePresence>
);

const getIcon = (name) => {
  const icons = {
    'grid': <GridIcon size={20} />,
    'bar-chart': <ChartIcon size={20} />,
    'check-circle': <CheckIcon size={20} />,
    'calendar': <CalendarIcon size={20} />,
    'clock': <ClockIcon size={20} />,
    'map': <MapIcon size={20} />,
  };
  return icons[name] || <GridIcon size={20} />;
};

/* --- SVGs --- */



const ChevronLeftIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);

const LogoutIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
);

const GridIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
);

const ChartIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18M18 17V9M13 17V5M8 17v-3"/></svg>
);

const CheckIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
);

const CalendarIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
);

const ClockIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
);

const MapIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>
);

export default Sidebar;
