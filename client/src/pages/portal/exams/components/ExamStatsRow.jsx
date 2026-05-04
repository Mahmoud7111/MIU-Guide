import React from 'react';
import styles from '../ExamsPage.module.css';

/**
 * ExamStatsRow - 4 stat cards with counts and tooltips
 */
const ExamStatsRow = ({ total, upcomingCount, thisWeekCount, nextLabel, nextExam, urgencyColor }) => {
  return (
    <div className={styles.statsRow}>
      <div style={{ padding: 'var(--space-4)', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', title: `Total exams: ${total}` }}>
        <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>
          Total Exams
        </div>
        <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
          {total}
        </div>
      </div>

      <div style={{ padding: 'var(--space-4)', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', title: `Upcoming exams: ${upcomingCount}` }}>
        <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>
          Upcoming
        </div>
        <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: upcomingCount > 2 ? 'var(--color-warning)' : 'inherit' }}>
          {upcomingCount}
        </div>
      </div>

      <div style={{ padding: 'var(--space-4)', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', title: `Exams this week: ${thisWeekCount}` }}>
        <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>
          This Week
        </div>
        <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: thisWeekCount > 2 ? 'var(--color-warning)' : 'inherit' }}>
          {thisWeekCount}
        </div>
      </div>

      <div style={{ padding: 'var(--space-4)', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', title: 'Next exam' }}>
        <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>
          Next Exam
        </div>
        <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: urgencyColor || 'inherit', marginTop: 'var(--space-2)' }}>
          {nextLabel || 'None scheduled'}
        </div>
      </div>
    </div>
  );
};

export default ExamStatsRow;
