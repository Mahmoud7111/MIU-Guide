import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './Card';
import Badge from './Badge';
import styles from './CountdownCard.module.css';

/**
 * Specialized CountdownCard for exam and event reminders.
 * Features a real-time ticking countdown with urgency-based styling.
 */
export const CountdownCard = ({
  examName,
  subject,
  date,
  location,
  type = 'exam',
}) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date));

  function calculateTimeLeft(targetDate) {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      total: difference
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);
    return () => clearInterval(timer);
  }, [date]);

  const getUrgencyClass = () => {
    if (!timeLeft) return styles.passed;
    const days = timeLeft.days;
    if (days >= 7) return styles.safe;
    if (days >= 3) return styles.warning;
    return styles.urgent;
  };

  const renderTimeUnit = (value, label) => (
    <div className={styles.timeBox}>
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          className={styles.timeValue}
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
      <span className={styles.timeLabel}>{label}</span>
    </div>
  );

  return (
    <Card className={`${styles.card} ${getUrgencyClass()}`} padding="md" hoverable>
      <div className={styles.header}>
        <div className={styles.info}>
          <h4 className={styles.subject}>{subject}</h4>
          <h3 className={styles.examName}>{examName}</h3>
        </div>
        <Badge variant="primary" size="sm">{type}</Badge>
      </div>

      <div className={styles.countdown}>
        {timeLeft ? (
          <>
            {renderTimeUnit(timeLeft.days, 'DAYS')}
            {renderTimeUnit(timeLeft.hours, 'HOURS')}
            {renderTimeUnit(timeLeft.minutes, 'MINS')}
            {renderTimeUnit(timeLeft.seconds, 'SECS')}
          </>
        ) : (
          <div className={styles.passedMessage}>EXAM PASSED</div>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.footerItem}>
          <span className={styles.footerLabel}>Location</span>
          <span className={styles.footerValue}>{location}</span>
        </div>
        <div className={styles.footerItem}>
          <span className={styles.footerLabel}>Date</span>
          <span className={styles.footerValue}>
            {new Date(date).toLocaleDateString(undefined, { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
        </div>
      </div>
    </Card>
  );
};

CountdownCard.propTypes = {
  examName: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default CountdownCard;
