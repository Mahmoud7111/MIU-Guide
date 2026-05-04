import { getRelativeLabel } from '@/lib/dateUtils';
import styles from '../CalendarPage.module.css';

/**
 * MonthSummaryBar — summary of the current month.
 */
const MonthSummaryBar = ({ summary, fallbackNextEvent }) => {
  const nextEvent = summary.nextEvent || fallbackNextEvent;
  const nextLabel = nextEvent ? getRelativeLabel(nextEvent.date) : 'No upcoming';

  const typeLabels = [
    { key: 'academic', label: 'Academic', color: 'var(--color-primary)' },
    { key: 'holiday', label: 'Holidays', color: 'var(--color-success)' },
    { key: 'activity', label: 'Activities', color: 'var(--color-warning)' },
    { key: 'deadline', label: 'Deadlines', color: 'var(--color-danger)' },
    { key: 'social', label: 'Social', color: 'var(--color-info)' },
  ];

  return (
    <div className={styles.summaryBar}>
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>Total Events</span>
        <span className={styles.summaryValue}>{summary.totalEvents}</span>
      </div>

      {typeLabels.map((type) => (
        <div key={type.key} className={styles.summaryItem}>
          <span className={styles.summaryLabel}>{type.label}</span>
          <span className={styles.summaryBadge} style={{ background: type.color }}>
            {summary.byType[type.key]}
          </span>
        </div>
      ))}

      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>Next Up</span>
        <span className={styles.summaryValue}>
          {nextEvent ? `${nextEvent.title} • ${nextLabel}` : 'No upcoming'}
        </span>
      </div>
    </div>
  );
};

export default MonthSummaryBar;
