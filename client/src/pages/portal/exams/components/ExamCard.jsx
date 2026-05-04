import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { getDaysUntil, formatDate, formatTime } from '@/lib/dateUtils';
import { formatCourseCode, formatDuration, formatRoomCode, truncate } from '@/lib/formatters';
import Button from '@/components/ui/Button';
import ExamCountdown from './ExamCountdown';
import styles from '../ExamsPage.module.css';

/**
 * ExamCard - Enhanced exam card with difficulty, study time, and action buttons
 */
const ExamCard = ({ exam, onToast }) => {
  const daysUntil = getDaysUntil(exam.date);
  
  // Urgency class
  let urgencyClass = 'low';
  if (daysUntil <= 3) urgencyClass = 'critical';
  else if (daysUntil <= 7) urgencyClass = 'high';
  else if (daysUntil <= 14) urgencyClass = 'medium';

  // Progress (assume exam announced 30 days prior)
  const totalDays = 30;
  const daysPassed = Math.max(0, totalDays - daysUntil);
  const progressPercent = Math.min(100, (daysPassed / totalDays) * 100);

  // Mock difficulty
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const difficulty = useMemo(() => {
    const source = `${exam.id || ''}${exam.courseCode || ''}`;
    const hash = source.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return difficulties[hash % difficulties.length];
  }, [exam.id, exam.courseCode]);

  // Study time estimate
  const studyHours = {
    'Final': 20,
    'Midterm': 10,
    'Quiz': 3,
  }[exam.type] || 5;

  // Type icon
  const typeIcons = {
    'Midterm': '📝',
    'Final': '🎓',
    'Quiz': '✏️',
  };

  const handleAction = (msg) => {
    if (onToast) {
      onToast(msg);
    }
  };

  return (
    <motion.div 
      className={`${styles.examCard} ${styles[urgencyClass]}`}
      layout
    >
      <ExamCountdown date={exam.date} urgency={urgencyClass} />
      
      <div className={styles.cardRight}>
        <div className={styles.courseCodeRow}>
          <span className={styles.courseCode}>{formatCourseCode(exam.courseCode)}</span>
          <div className={styles.typeBadgeWithIcon}>
            {typeIcons[exam.type]} {exam.type}
          </div>
        </div>
        
        <h3 className={styles.courseName}>{exam.courseName}</h3>

        {exam.notes && (
          <div className={styles.examTopics}>
            📚 Topics: {truncate(exam.notes, 60)}
          </div>
        )}

        <div className={styles.difficultyIndicator}>
          <span>Difficulty:</span>
          <div className={styles.difficultyDot} style={{ background: difficulty === 'Easy' ? 'var(--color-success)' : difficulty === 'Medium' ? 'var(--color-warning)' : 'var(--color-danger)' }} />
          <span>{difficulty}</span>
        </div>

        <div className={styles.studyTimeEstimate}>
          ⏱️ ~{studyHours} hours recommended
        </div>
        
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
          <Button 
            variant="outline" 
            size="small" 
            className={styles.actionButton}
            onClick={() => handleAction('✅ Added to Calendar')}
          >
            📅 Calendar
          </Button>
          <Button 
            variant="secondary" 
            size="small" 
            className={styles.actionButton}
            onClick={() => handleAction('🔔 Reminder Set')}
          >
            🔔 Reminder
          </Button>
          <Button 
            variant="outline" 
            size="small" 
            className={styles.actionButton}
            onClick={() => handleAction('📚 Materials Opened')}
          >
            📚 Materials
          </Button>
          <Button 
            variant="outline" 
            size="small" 
            className={styles.actionButton}
            onClick={() => handleAction('👥 Study Group')}
          >
            👥 Group
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExamCard;
