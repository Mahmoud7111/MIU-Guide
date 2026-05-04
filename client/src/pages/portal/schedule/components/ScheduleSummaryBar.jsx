import styles from '../SchedulePage.module.css';

/**
 * ScheduleSummaryBar — quick stats for the current schedule.
 */
const ScheduleSummaryBar = ({
  totalCourses,
  totalCredits,
  busiestDay,
  freeDays,
}) => {
  return (
    <div className={styles.summaryBar}>
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>Total Courses</span>
        <span className={styles.summaryValue}>{totalCourses}</span>
      </div>
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>Total Credits</span>
        <span className={styles.summaryValue}>{totalCredits}</span>
      </div>
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>Busiest Day</span>
        <span className={styles.summaryValue}>{busiestDay}</span>
      </div>
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>Free Days</span>
        <span className={styles.summaryValue}>{freeDays}</span>
      </div>
    </div>
  );
};

export default ScheduleSummaryBar;
