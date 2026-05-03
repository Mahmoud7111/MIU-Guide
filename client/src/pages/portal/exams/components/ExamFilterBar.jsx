import React from 'react';
import styles from '../ExamsPage.module.css';

/**
 * ExamFilterBar - Filter chips for exams list
 *
 * @param {Object} props
 * @param {string} props.activeFilter - The currently active filter
 * @param {function} props.setFilter - Setter for active filter
 * @param {Array} props.exams - All upcoming exams (used to calculate counts)
 */
const ExamFilterBar = ({ activeFilter, setFilter, exams }) => {
  const types = ['Midterm', 'Final', 'Quiz'];
  
  const getCount = (type) => {
    if (type === 'All') return exams.length;
    return exams.filter(e => e.type.toLowerCase() === type.toLowerCase()).length;
  };

  const filters = ['All', ...types];

  return (
    <div className={styles.filterBar}>
      {filters.map(filter => (
        <button
          key={filter}
          className={`${styles.filterChip} ${activeFilter === filter ? styles.active : ''}`}
          onClick={() => setFilter(filter)}
        >
          {filter} ({getCount(filter)})
        </button>
      ))}
    </div>
  );
};

export default ExamFilterBar;
