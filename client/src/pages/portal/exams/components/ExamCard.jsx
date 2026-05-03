import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getDaysUntil, formatDate } from '@/lib/dateUtils';
import { formatCourseCode, formatTime, formatDuration, formatRoomCode, truncate } from '@/lib/formatters';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ExamCountdown from './ExamCountdown';
import styles from '../ExamsPage.module.css';

/**
 * ExamCard - Displays an upcoming exam
 *
 * @param {Object} props
 * @param {Object} props.exam - The exam data
 */
const ExamCard = ({ exam }) => {
  const [toastMsg, setToastMsg] = useState('');
  const daysUntil = getDaysUntil(exam.date);
  
  // Calculate urgency class
  let urgencyClass = 'low';
  if (daysUntil <= 3) urgencyClass = 'critical';
  else if (daysUntil <= 7) urgencyClass = 'high';
  else if (daysUntil <= 14) urgencyClass = 'medium';

  // Mock progress bar (assume exam was announced 30 days prior)
  const totalDays = 30;
  const daysPassed = Math.max(0, totalDays - daysUntil);
  const progressPercent = Math.min(100, (daysPassed / totalDays) * 100);

  const handleAction = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <motion.div 
      className={`${styles.examCard} ${styles[urgencyClass]}`}
      layout
    >
      <ExamCountdown date={exam.date} />
      
      <div className={styles.cardRight}>
        <div className={styles.courseCodeRow}>
          <span className={styles.courseCode}>{formatCourseCode(exam.courseCode)}</span>
          <Badge variant="outline">{exam.type}</Badge>
        </div>
        
        <h3 className={styles.courseName}>{exam.courseName}</h3>
        
        <div className={styles.examDetails}>
          <div className={styles.examDetailItem}>
            📅 {formatDate(exam.date)} at {formatTime(exam.date)}
          </div>
          <div className={styles.examDetailItem}>
            ⏱️ {formatDuration(exam.duration)}
          </div>
          <div className={styles.examDetailItem}>
            📍 {formatRoomCode(exam.room)}
          </div>
        </div>

        {exam.notes && (
          <div className={styles.examNotes}>
            📝 {truncate(exam.notes, 60)}
          </div>
        )}

        <div className={styles.progressBarContainer}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-1)' }}>
            <span>Announced</span>
            <span>Exam Date</span>
          </div>
          <div className={styles.progressBarTrack}>
            <div 
              className={styles.progressBarFill} 
              style={{ 
                width: `${progressPercent}%`, 
                background: urgencyClass === 'critical' ? 'var(--color-danger)' : 
                            urgencyClass === 'high' ? 'var(--color-warning)' : 
                            'var(--color-primary)' 
              }} 
            />
          </div>
        </div>

        <div className={styles.cardActions}>
          <Button variant="outline" size="small" onClick={() => handleAction('Added to Calendar')}>
            Add to Calendar
          </Button>
          <Button variant="secondary" size="small" onClick={() => handleAction('Reminder Set')}>
            Set Reminder
          </Button>
          {toastMsg && <span style={{ marginLeft: 'auto', alignSelf: 'center', color: 'var(--color-success)', fontSize: 'var(--text-sm)' }}>{toastMsg}</span>}
        </div>
      </div>
    </motion.div>
  );
};

export default ExamCard;
