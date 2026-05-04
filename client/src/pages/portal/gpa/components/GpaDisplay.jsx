import React, { useEffect, useRef, useState } from 'react';
import { motion, animate } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import { formatGPA, formatGPAStatus } from '@/lib/formatters';
import styles from '../GpaPage.module.css';

/**
 * GpaDisplay - Large GPA number and academic standing badge
 * 
 * @param {Object} props
 * @param {number} props.gpa - The GPA value to display
 * @param {string} props.standing - The academic standing string
 * @param {number} props.totalCredits - Total credits
 * @param {string} props.highestCourse - Name of highest graded course
 * @param {string} props.lowestCourse - Name of lowest graded course
 */
const GpaDisplay = ({ gpa, standing, totalCredits, highestCourse, lowestCourse }) => {
  const [displayGpa, setDisplayGpa] = useState(formatGPA(gpa));
  const previousGpa = useRef(gpa);

  useEffect(() => {
    const controls = animate(previousGpa.current, gpa, {
      duration: 0.4,
      ease: 'easeOut',
      onUpdate: (value) => {
        setDisplayGpa(Number(value).toFixed(2));
      },
    });
    previousGpa.current = gpa;
    return () => controls.stop();
  }, [gpa]);

  const resolvedStanding = standing || formatGPAStatus(gpa);
  const standingIcon =
    resolvedStanding === "Dean's List"
      ? '🏆'
      : resolvedStanding === 'Good Standing'
      ? '✅'
      : resolvedStanding === 'Satisfactory'
      ? '⚠️'
      : '❌';

  const gpaColor =
    gpa >= 3.7
      ? 'var(--color-success)'
      : gpa >= 3.0
      ? 'var(--color-primary)'
      : gpa >= 2.0
      ? 'var(--color-warning)'
      : 'var(--color-danger)';

  const badgeVariant =
    gpa >= 3.7 ? 'success' : gpa >= 3.0 ? 'primary' : gpa >= 2.0 ? 'warning' : 'danger';

  const clampedGpa = Math.min(Math.max(gpa, 0), 4);
  const markerLeft = `${(clampedGpa / 4) * 100}%`;

  return (
    <div className={styles.gpaDisplayContainer}>
      <motion.div
        className={`${styles.gpaDisplay} ${styles.gpaValue}`}
        style={{ color: gpaColor }}
        key={gpa}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {displayGpa}
      </motion.div>
      
      <div className={styles.badgeContainer}>
        <Badge variant={badgeVariant}>
          <span className={styles.badgeIcon}>{standingIcon}</span> {resolvedStanding}
        </Badge>
      </div>

      <div className={styles.scaleWrapper} title="GPA scale: 0.0 (F) to 4.0 (A+)">
        <div className={styles.scaleLabels}>
          <span>0.0</span>
          <span className={styles.scaleTooltip}>GPA Scale</span>
          <span>4.0</span>
        </div>
        <div className={styles.scaleTrack}>
          <motion.div
            className={styles.scaleFill}
            style={{ width: markerLeft, background: gpaColor }}
            layout
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className={styles.scaleMarker}
            style={{ left: markerLeft, borderColor: gpaColor }}
            layout
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
      
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Credits</span>
          <span className={styles.statValue}>{totalCredits || 0}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Highest Grade</span>
          <span className={styles.statValue} style={{ color: 'var(--color-success)' }}>{highestCourse || '-'}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Lowest Grade</span>
          <span className={styles.statValue} style={{ color: 'var(--color-danger)' }}>{lowestCourse || '-'}</span>
        </div>
      </div>
    </div>
  );
};

export default GpaDisplay;
