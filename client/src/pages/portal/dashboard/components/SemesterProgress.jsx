import { motion } from 'framer-motion';
import ProgressBar from '@/components/ui/ProgressBar';
import styles from '../DashboardPage.module.css';

/**
 * Displays the semester progress bar.
 */
const SemesterProgress = ({ progress }) => {
  return (
    <motion.section 
      className={styles.section}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className={styles.sectionTitle}>Semester Progress</h2>
      <ProgressBar 
        progress={progress.percent} 
        label={`Week ${progress.currentWeek} of ${progress.totalWeeks} • ${progress.weeksRemaining} weeks remaining`}
        color="var(--brand-primary)"
        animated={true}
      />
    </motion.section>
  );
};

export default SemesterProgress;
