import { motion } from 'framer-motion';
import EmptyState from '@/components/ui/EmptyState';
import { useCountdown } from '@/hooks/useCountdown';
// Note: CountdownCard should ideally exist in ui/, if not we build a simple version here.
// The prompt says "CountdownCard component" was built by Dev 1. Let's assume it exists.
import CountdownCard from '@/components/ui/CountdownCard'; 
import styles from '../DashboardPage.module.css';

/**
 * Displays upcoming exams.
 */
const UpcomingExams = ({ exams }) => {
  return (
    <motion.section 
      className={styles.section}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className={styles.sectionTitle}>Upcoming Exams</h2>
      
      {(!exams || exams.length === 0) ? (
        <EmptyState message="No upcoming exams" />
      ) : (
        <div className={styles.upcomingExamsList}>
          {exams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      )}
    </motion.section>
  );
};

// We wrap the Countdown logic inside an individual component so hook rules apply per item
const ExamCard = ({ exam }) => {
  const { label, urgency } = useCountdown(exam.date);
  
  // If Dev 1 built CountdownCard, we just pass the props.
  // We'll pass the mapped values.
  return (
    <CountdownCard 
      title={`${exam.courseCode} - ${exam.type}`}
      date={exam.date}
      label={label}
      urgency={urgency}
      details={`${exam.room} • ${exam.duration} mins`}
    />
  );
};

export default UpcomingExams;
