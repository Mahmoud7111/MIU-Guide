import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motion/variants';
import { getDaysUntil, isToday, formatDate } from '@/lib/dateUtils';
import { formatCourseCode, formatDuration } from '@/lib/formatters';
import ExamCountdown from './ExamCountdown';
import styles from '../ExamsPage.module.css';

/**
 * ExamTimelineView - Vertical timeline of exams
 */
const ExamTimelineView = ({ exams, pastExams }) => {
  const timelineRef = useRef(null);

  useEffect(() => {
    // Scroll to today marker on mount
    const todayMarker = timelineRef.current?.querySelector('[data-today-marker]');
    if (todayMarker) {
      setTimeout(() => {
        todayMarker.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, []);

  const getUrgency = (daysUntil) => {
    if (daysUntil <= 3) return 'critical';
    if (daysUntil <= 7) return 'high';
    if (daysUntil <= 14) return 'medium';
    return 'low';
  };

  const allExams = [...exams, ...pastExams.map(e => ({ ...e, isPast: true }))].sort((a, b) => a.date - b.date);

  return (
    <div style={{ position: 'relative', padding: 'var(--space-4) 0' }}>
      <h2 className={styles.sectionTitle}>Timeline View</h2>

      <div className={styles.timelineContainer} ref={timelineRef}>
        <div className={styles.timelineLine} />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {allExams.map((exam, idx) => {
            const daysUntil = getDaysUntil(exam.date);
            const urgency = getUrgency(daysUntil);
            const isLeft = idx % 2 === 0;
            const isExamToday = isToday(exam.date);

            return (
              <motion.div
                key={exam.id}
                className={styles.timelineNode}
                variants={staggerItem}
              >
                {isLeft ? (
                  <div className={`${styles.timelineNodeContent} ${exam.isPast ? styles.past : styles[urgency]}`}>
                    <div style={{ fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                      {formatCourseCode(exam.courseCode)}
                    </div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                      {exam.courseName}
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--space-2)' }}>
                      📅 {formatDate(exam.date)}
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--space-1)' }}>
                      ⏱️ {formatDuration(exam.duration)}
                    </div>
                    {isExamToday && <div style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-danger)' }}>TODAY 🎯</div>}
                  </div>
                ) : (
                  <div className={styles.timelineSpacer} />
                )}

                <div className={styles.timelineCenter} data-today-marker={isExamToday}>
                  <div className={`${styles.timelineNodeDot} ${exam.isPast ? styles.past : styles[urgency]}`} />
                </div>

                {!isLeft && !exam.isPast && (
                  <div className={`${styles.timelineNodeContent} ${styles[urgency]}`}>
                    <div style={{ fontSize: 'var(--text-xs)' }}>
                      <ExamCountdown date={exam.date} urgency={urgency} />
                    </div>
                  </div>
                )}

                {!isLeft && exam.isPast && (
                  <div className={`${styles.timelineNodeContent} ${styles.past}`}>
                    <div style={{ fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--color-text-muted)' }}>
                      {formatCourseCode(exam.courseCode)}
                    </div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                      {exam.courseName}
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--space-2)', color: 'var(--color-text-muted)' }}>
                      ✓ Completed
                    </div>
                  </div>
                )}

                {isLeft && <div className={styles.timelineSpacer} />}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default ExamTimelineView;
