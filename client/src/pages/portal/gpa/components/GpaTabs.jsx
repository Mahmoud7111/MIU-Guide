import React from 'react';
import styles from '../GpaPage.module.css';

/**
 * GpaTabs - Tab switcher for the GPA Page
 * 
 * @param {Object} props
 * @param {string} props.activeTab - Currently active tab ('current', 'future', 'target')
 * @param {function} props.onChange - Callback when a tab is clicked
 */
const GpaTabs = ({ activeTab, onChange }) => {
  const tabs = [
    { id: 'current', label: 'Current GPA' },
    { id: 'future', label: 'Future Simulator' },
    { id: 'target', label: 'Target Calculator' },
  ];

  return (
    <div className={styles.tabs}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default GpaTabs;
