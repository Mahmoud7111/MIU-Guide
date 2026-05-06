import React from 'react';
import { NavLink } from 'react-router-dom';
import { SIDEBAR_LINKS } from '@/lib/constants';
import { useAuth } from '@/context/AuthContext';
import styles from './Sidebar.module.css';

/**
 * Student Portal Sidebar navigation.
 * Features collapsible states, active link indicators, and user profile summary.
 */
export const Sidebar = ({ isOpen, collapsed, setCollapsed, onClose }) => {
  const { user, logout } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'S';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <aside 
      className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''} ${isOpen ? styles.mobileOpen : ''}`}
      style={{ width: collapsed ? 68 : 260 }}
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
            end={link.path === '/portal/dashboard'}
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
            title={collapsed ? link.label : ''}
            onClick={onClose}
          >
            <span className={styles.icon}>{getIcon(link.icon)}</span>
            {!collapsed && <span className={styles.label}>{link.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom: User Card & Collapse Toggle */}
      <div className={styles.footer}>
        <div className={styles.userCard}>
          <div className={styles.avatar}>{getInitials(user?.name)}</div>
          {!collapsed && (
            <div className={styles.userInfo}>
              <p className={styles.userName}>{user?.name || 'Student'}</p>
              <p className={styles.userFaculty}>{user?.faculty || 'MIU'}</p>
            </div>
          )}
        </div>

        <div className={styles.footerActions}>
          <button 
            className={styles.actionBtn} 
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <span className={collapsed ? styles.chevronRotated : ''}>
              <ChevronLeftIcon size={18} />
            </span>
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
    </aside>
  );
};

/* --- Helpers --- */

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

const UsersIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

export default Sidebar;
