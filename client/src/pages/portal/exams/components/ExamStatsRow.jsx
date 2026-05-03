import React from 'react';
import Card from '@/components/ui/Card';
import styles from '../ExamsPage.module.css';

/**
 * ExamStatsRow - Displays 3 stat cards for the ExamsPage
 *
 * @param {Object} props
 * @param {number} props.total - Total exams
 * @param {number} props.upcomingCount - Upcoming exams count
 * @param {string} props.nextLabel - Next exam relative label
 * @param {string} props.urgencyColor - Color based on urgency
 */
const ExamStatsRow = ({ total, upcomingCount, nextLabel, urgencyColor }) => {
  return (
    <div className={styles.statsRow}>
      <Card>
        <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>
          Total Exams
        </div>
        <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
          {total}
        </div>
      </Card>
      <Card>
        <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>
          Upcoming
        </div>
        <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: upcomingCount > 2 ? 'var(--color-warning)' : 'inherit' }}>
          {upcomingCount}
        </div>
      </Card>
      <Card>
        <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>
          Next Exam
        </div>
        <div style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: urgencyColor || 'inherit', marginTop: 'var(--space-2)' }}>
          {nextLabel || 'None scheduled'}
        </div>
      </Card>
    </div>
  );
};

export default ExamStatsRow;
