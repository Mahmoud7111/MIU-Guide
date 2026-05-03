import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';
import styles from '../ExamsPage.module.css';

/**
 * AnimatedDigit - Animates individual digits of the countdown
 */
const AnimatedDigit = ({ digit }) => (
  <div style={{ position: 'relative', display: 'inline-flex', justifyContent: 'center' }}>
    <AnimatePresence mode="popLayout">
      <motion.span
        key={digit}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={styles.timerDigit}
      >
        {digit}
      </motion.span>
    </AnimatePresence>
  </div>
);

/**
 * ExamCountdown - Left side of the exam card, shows live countdown
 *
 * @param {Object} props
 * @param {string} props.date - The exam date string
 */
const ExamCountdown = ({ date }) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(date);
  
  if (isExpired) {
    return (
      <div className={styles.countdownDisplay}>
        <div style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>Exam Started</div>
      </div>
    );
  }

  const pad = (n) => String(n).padStart(2, '0');
  const hStr = pad(hours);
  const mStr = pad(minutes);
  const sStr = pad(seconds);

  return (
    <div className={styles.countdownDisplay}>
      <div className={styles.daysNumber}>{days}</div>
      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Days left
      </div>
      
      <div className={styles.timer}>
        <AnimatedDigit digit={hStr[0]} /><AnimatedDigit digit={hStr[1]} />
        <span style={{ margin: '0 2px' }}>:</span>
        <AnimatedDigit digit={mStr[0]} /><AnimatedDigit digit={mStr[1]} />
        <span style={{ margin: '0 2px' }}>:</span>
        <AnimatedDigit digit={sStr[0]} /><AnimatedDigit digit={sStr[1]} />
      </div>
    </div>
  );
};

export default ExamCountdown;
