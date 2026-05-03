import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCourseCode, formatRoomCode } from '@/lib/formatters';
import { formatDateShort, formatTime } from '@/lib/dateUtils';
import styles from '../ExamsPage.module.css';

/**
 * UrgencyBanner - Shows warning for very close exams
 *
 * @param {Object} props
 * @param {Object} props.exam - The nearest exam
 * @param {function} props.onDismiss - Handler to close banner
 * @param {boolean} props.isDismissed - Whether banner was closed
 */
const UrgencyBanner = ({ exam, onDismiss, isDismissed }) => {
  if (!exam || isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className={styles.urgencyBanner}
        initial={{ y: -20, opacity: 0, height: 0 }}
        animate={{ y: 0, opacity: 1, height: 'auto' }}
        exit={{ y: -20, opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          ⚠️ <strong>{formatCourseCode(exam.courseCode)}</strong> exam is 
          {' '}{formatDateShort(exam.date)} at {formatTime(exam.date)} — {formatRoomCode(exam.room)}
        </div>
        <button className={styles.bannerClose} onClick={onDismiss} aria-label="Dismiss banner">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default UrgencyBanner;
