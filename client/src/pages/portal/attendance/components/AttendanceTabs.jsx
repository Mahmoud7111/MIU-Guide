import React from 'react';
import styles from '../AttendancePage.module.css';

/**
 * AttendanceTabs - Tab switcher for attendance modes
 *
 * @param {Object} props
 * @param {string} props.activeTab - Current tab id
 * @param {function} props.onChange - Handler for tab changes
 */
const AttendanceTabs = ({ activeTab, onChange }) => {
  const tabs = [
    { id: 'overview', label: 'Attendance Overview' },
    { id: 'simulator', label: 'What If Simulator' },
  ];

  return (
    <div className={styles.tabs}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          type="button"
          className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default AttendanceTabs;
