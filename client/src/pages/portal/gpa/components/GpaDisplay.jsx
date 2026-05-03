import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const gpaColor = gpa >= 3.0 ? 'var(--color-success)' : gpa >= 2.0 ? 'var(--color-warning)' : 'var(--color-danger)';
  
  return (
    <div className={styles.gpaDisplayContainer}>
      <motion.div 
        className={styles.gpaDisplay}
        style={{ color: gpaColor }}
        key={gpa} // Animate on change
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {formatGPA(gpa)}
      </motion.div>
      
      <div className={styles.badgeContainer}>
        <Badge variant={gpa >= 3.0 ? 'success' : gpa >= 2.0 ? 'warning' : 'danger'}>
          {standing || formatGPAStatus(gpa)}
        </Badge>
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
