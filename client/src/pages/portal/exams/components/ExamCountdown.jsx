import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';
import { isToday, getDaysUntil } from '@/lib/dateUtils';
import styles from '../ExamsPage.module.css';

/**
 * AnimatedDigit - Animates individual digits
 */
const AnimatedDigit = ({ digit }) => (
  <div style={{ position: 'relative', display: 'inline-flex', justifyContent: 'center' }}>
    <AnimatePresence mode="wait">
      <motion.span
        key={digit}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.timerDigit}
      >
        {digit}
      </motion.span>
    </AnimatePresence>
  </div>
);

/**
 * ExamCountdown - Countdown display with animated digits and progress ring
 */
const ExamCountdown = ({ date, urgency = 'low' }) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(date);
  const daysUntil = getDaysUntil(date);
  const isExamToday = isToday(date);
  const isTomorrow = daysUntil === 1;
  
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

  // SVG circle progress
  const circumference = 2 * Math.PI * 45;
  const progress = Math.max(0, Math.min(100, (daysUntil / 30) * 100));
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <div className={styles.countdownDisplay}>
      <div className={styles.countdownCircle}>
        <svg className={styles.countdownRing} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-border)" strokeWidth="2" />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={urgency === 'critical' ? 'var(--color-danger)' : urgency === 'high' ? 'var(--color-warning)' : 'var(--color-primary)'}
            strokeWidth="2"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5 }}
            strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50px 50px' }}
          />
        </svg>

        <div className={styles.countdownCenter}>
          <motion.div 
            className={`${styles.daysNumber} ${daysUntil < 3 ? styles.urgent : ''}`}
            animate={daysUntil < 3 ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: daysUntil < 3 ? Infinity : 0 }}
          >
            {days}
          </motion.div>
          <div className={styles.daysLabel}>Days left</div>
        </div>

        {isExamToday && <div className={styles.todayBadge}>TODAY</div>}
        {isTomorrow && <div className={styles.tomorrowBadge}>TOMORROW</div>}
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
