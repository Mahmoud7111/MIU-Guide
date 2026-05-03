import React from 'react';
import { formatCourseCode, formatDuration, formatRoomCode } from '@/lib/formatters';
import { formatDate } from '@/lib/dateUtils';
import Badge from '@/components/ui/Badge';
import styles from '../ExamsPage.module.css';

/**
 * PastExamCard - Compact display for past exams
 *
 * @param {Object} props
 * @param {Object} props.exam - The past exam data
 */
const PastExamCard = ({ exam }) => {
  return (
    <div className={styles.pastExamCard}>
      <div className={styles.pastExamInfo}>
        <span className={styles.pastExamCode}>{formatCourseCode(exam.courseCode)}</span>
        <Badge variant="outline" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
          {exam.type}
        </Badge>
        <span style={{ fontWeight: 500 }}>{exam.courseName}</span>
      </div>
      
      <div className={styles.pastExamDetails}>
        <span>📅 {formatDate(exam.date)}</span>
        <span>⏱️ {formatDuration(exam.duration)}</span>
        <span>📍 {formatRoomCode(exam.room)}</span>
        <Badge style={{ background: 'var(--color-surface)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
          Expired
        </Badge>
      </div>
    </div>
  );
};

export default PastExamCard;
