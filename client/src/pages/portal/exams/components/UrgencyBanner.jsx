import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDaysUntil, formatTime, formatDateShort } from '@/lib/dateUtils';
import { formatCourseCode } from '@/lib/formatters';
import styles from '../ExamsPage.module.css';

/**
 * UrgencyBanner - Enhanced urgency banner with full exam details
 */
const UrgencyBanner = ({ exam, onDismiss }) => {
  if (!exam) return null;

  const daysUntil = getDaysUntil(exam.date);
  if (daysUntil > 3) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className={styles.urgencyBanner}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.bannerContent}>
          <div className={styles.bannerTitle}>
            ⚠️ {formatCourseCode(exam.courseCode)} {exam.type} — {formatDateShort(exam.date)} at {formatTime(exam.date)}
          </div>
          <div className={styles.bannerDetails}>
            <div>📍 {exam.room}</div>
            <div>⏱️ {Math.floor(exam.duration / 60)}h {exam.duration % 60}m</div>
          </div>
        </div>
        <button 
          className={styles.bannerClose} 
          onClick={onDismiss}
          aria-label="Dismiss banner"
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default UrgencyBanner;
