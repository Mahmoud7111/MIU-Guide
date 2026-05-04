import React from 'react';
import styles from '../ExamsPage.module.css';

/**
 * ExamFilterBar - Dual filter rows (type + time)
 */
const ExamFilterBar = ({ typeFilter, setTypeFilter, timeFilter, setTimeFilter, exams, filteredCount }) => {
  const types = ['All', 'Midterm', 'Final', 'Quiz'];
  const times = ['All', 'Today', 'This Week', 'Past'];
  
  const getTypeCount = (type) => {
    if (type === 'All') return exams.length;
    return exams.filter(e => e.type.toLowerCase() === type.toLowerCase()).length;
  };

  const now = new Date();
  const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const getTimeCount = (time) => {
    if (time === 'All') return exams.length;
    if (time === 'Today') return exams.filter(e => new Date(e.date).toDateString() === now.toDateString()).length;
    if (time === 'This Week') return exams.filter(e => new Date(e.date) >= now && new Date(e.date) <= weekFromNow).length;
    return exams.length;
  };

  return (
    <div className={styles.filterBar} data-filter-bar>
      <label className={styles.filterRowLabel}>By Type</label>
      <div className={styles.filterRow}>
        {types.map(type => (
          <button
            key={type}
            className={`${styles.filterChip} ${typeFilter === type ? styles.active : ''}`}
            onClick={() => setTypeFilter(type)}
          >
            {type}
            <span className={styles.filterChipBadge}>{getTypeCount(type)}</span>
          </button>
        ))}
      </div>

      <label className={styles.filterRowLabel}>By Time</label>
      <div className={styles.filterRow}>
        {times.map(time => (
          <button
            key={time}
            className={`${styles.filterChip} ${timeFilter === time ? styles.active : ''}`}
            onClick={() => setTimeFilter(time)}
          >
            {time}
            <span className={styles.filterChipBadge}>{getTimeCount(time)}</span>
          </button>
        ))}
      </div>

      <div className={styles.filterResultsCount}>
        Showing {filteredCount} exam{filteredCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default ExamFilterBar;
