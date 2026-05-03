import { motion } from 'framer-motion';
import EmptyState from '@/components/ui/EmptyState';
import styles from '../DashboardPage.module.css';

/**
 * Displays today's schedule.
 */
const TodaySchedule = ({ courses }) => {
  return (
    <motion.section 
      className={styles.section}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className={styles.sectionTitle}>Today's Schedule</h2>
      
      {(!courses || courses.length === 0) ? (
        <EmptyState message="No classes today 🎉" />
      ) : (
        <div className={styles.scheduleList}>
          {courses.map((course) => (
            <div 
              key={course.id} 
              className={styles.courseItem}
              style={{ '--course-color': course.color }}
            >
              <div className={styles.courseInfo}>
                <span className={styles.courseCode}>{course.courseCode}</span>
                <span className={styles.courseName}>{course.courseName}</span>
                <span className={styles.courseRoom}>{course.room} • {course.instructor}</span>
              </div>
              <div className={styles.courseMeta}>
                <span className={styles.courseTime}>
                  {course.startTime} - {course.endTime}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default TodaySchedule;
