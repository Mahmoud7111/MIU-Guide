import { motion, AnimatePresence } from 'framer-motion';
import { formatDate, formatTime } from '@/lib/dateUtils';
import { formatCourseCode, truncate } from '@/lib/formatters';
import { useCountdown } from '@/hooks/useCountdown';
import EmptyState from '@/components/ui/EmptyState';
import { staggerContainer, staggerItem } from '@/lib/motion/variants';
import styles from '../DashboardPage.module.css';

/**
 * Individual exam card with countdown.
 */
const ExamCard = ({ exam }) => {
  const { days, hours, minutes, seconds, urgency } = useCountdown(exam.date);
  
  const getUrgencyColor = () => {
    switch (urgency) {
      case 'critical': return 'var(--color-danger)';
      case 'high': return 'var(--color-warning)';
      case 'medium': return 'var(--color-primary)';
      default: return 'var(--color-success)';
    }
  };

  const getUrgencyStyle = () => {
    if (urgency === 'critical') return styles.countdownCritical;
    if (urgency === 'high') return styles.countdownHigh;
    if (urgency === 'medium') return styles.countdownMedium;
    return styles.countdownLow;
  };

  // Convert string date to Date object if necessary
  const examDate = typeof exam.date === 'string' ? new Date(exam.date) : exam.date;
  const dateStr = formatDate(examDate);
  const timeStr = formatTime(examDate);

  return (
    <motion.div
      className={styles.examCard}
      variants={staggerItem}
      layout
    >
      <div className={styles.examHeader}>
        <div className={styles.examHeadline}>
          <span className={styles.examCourse}>
            {formatCourseCode(exam.courseCode)}
          </span>
          <span className={`${styles.examBadge} ${styles[`badge${exam.type?.toLowerCase()}`]}`}>
            {exam.type}
          </span>
        </div>
        <motion.span 
          className={`${styles.countdown} ${getUrgencyStyle()}`}
          style={{ '--urgency-color': getUrgencyColor() }}
          animate={urgency === 'critical' ? { opacity: [1, 0.7, 1] } : {}}
          transition={urgency === 'critical' ? { duration: 1, repeat: Infinity } : {}}
        >
          {days > 0 ? `${days}d ${hours}h` : hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m ${seconds}s`}
        </motion.span>
      </div>

      <div className={styles.examMeta}>
        <div className={styles.examMetaItem}>
          <span className={styles.examMetaLabel}>Date & Time</span>
          <span className={styles.examMetaValue}>
            {dateStr} • {timeStr}
          </span>
        </div>
        <div className={styles.examMetaItem}>
          <span className={styles.examMetaLabel}>Room</span>
          <span className={styles.examMetaValue}>{exam.room}</span>
        </div>
        <div className={styles.examMetaItem}>
          <span className={styles.examMetaLabel}>Duration</span>
          <span className={styles.examMetaValue}>{exam.duration} mins</span>
        </div>
      </div>

      {exam.notes && (
        <div className={styles.examNotes}>
          {truncate(exam.notes, 100)}
        </div>
      )}
    </motion.div>
  );
};

/**
 * Displays upcoming exams with countdown.
 */
const UpcomingExams = ({ exams }) => {
  if (!exams || exams.length === 0) {
    return (
      <motion.section 
        className={styles.section}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.sectionTitle}>Upcoming Exams</h2>
        <EmptyState message="No upcoming exams 🎉" description="Take a breath and enjoy!" />
      </motion.section>
    );
  }

  return (
    <motion.section 
      className={styles.section}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className={styles.sectionTitle}>Upcoming Exams</h2>
      
      <motion.div 
        className={styles.examsList}
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <AnimatePresence mode="popLayout">
          {exams.slice(0, 3).map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.a 
        href="/portal/exams"
        className={styles.viewAllLink}
        whileHover={{ x: 4 }}
      >
        View All Exams →
      </motion.a>
    </motion.section>
  );
};

export default UpcomingExams;
