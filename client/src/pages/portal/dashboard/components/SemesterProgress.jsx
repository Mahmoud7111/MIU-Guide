import { motion } from 'framer-motion';
import ProgressBar from '@/components/ui/ProgressBar';
import { formatSemester } from '@/lib/formatters';
import styles from '../DashboardPage.module.css';

/**
 * Displays the semester progress bar with milestones.
 */
const SemesterProgress = ({ progress }) => {
  const getProgressColor = () => {
    if (progress.percent < 33) return 'var(--color-success)';
    if (progress.percent < 66) return 'var(--color-primary)';
    return 'var(--color-warning)';
  };

  return (
    <motion.section 
      className={styles.section}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className={styles.sectionTitle}>Semester Progress</h2>
      
      <div className={styles.progressWrapper}>
        <div className={styles.progressInfo}>
          <div className={styles.progressMeta}>
            <span className={styles.progressLabel}>
              Week {progress.currentWeek} of {progress.totalWeeks}
            </span>
            <span className={styles.progressSubtitle}>
              {progress.weeksRemaining} weeks remaining
            </span>
          </div>
          <p className={styles.progressSemester}>
            {progress.semesterLabel}
          </p>
          <p className={styles.progressDates}>
            {progress.startDate} → {progress.endDate}
          </p>
        </div>

        <div 
          className={styles.progressBarContainer}
          style={{ '--progress-color': getProgressColor() }}
        >
          <motion.div 
            className={styles.progressTrack}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Midterms marker at 25% */}
            <div className={styles.milestone} style={{ left: '25%' }}>
              <span className={styles.milestoneLabel}>Midterms</span>
            </div>

            {/* Finals marker at 75% */}
            <div className={styles.milestone} style={{ left: '75%' }}>
              <span className={styles.milestoneLabel}>Finals</span>
            </div>

            {/* Progress fill */}
            <motion.div 
              className={styles.progressFill}
              initial={{ width: 0 }}
              whileInView={{ width: `${progress.percent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />

            {/* Current position marker */}
            <motion.div 
              className={styles.currentMarker}
              style={{ left: `${progress.percent}%` }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div>

        <div className={styles.progressStats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Completed</span>
            <span className={styles.statValue}>{progress.percent}%</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Remaining</span>
            <span className={styles.statValue}>{100 - progress.percent}%</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SemesterProgress;
