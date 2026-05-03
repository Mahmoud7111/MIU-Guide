import { motion, AnimatePresence } from 'framer-motion';
import { formatCourseCode } from '@/lib/formatters';
import EmptyState from '@/components/ui/EmptyState';
import { staggerContainer, staggerItem } from '@/lib/motion/variants';
import styles from '../DashboardPage.module.css';

/**
 * Determines status badge for a course.
 */
const getStatusBadge = (course) => {
  const now = new Date();
  const [startHour, startMin] = course.startTime.split(':').map(Number);
  const [endHour, endMin] = course.endTime.split(':').map(Number);
  
  const courseStart = new Date();
  courseStart.setHours(startHour, startMin, 0);
  
  const courseEnd = new Date();
  courseEnd.setHours(endHour, endMin, 0);

  if (now >= courseStart && now <= courseEnd) return { label: 'Now', type: 'active' };
  if (now < courseStart) return { label: 'Next', type: 'upcoming' };
  return { label: 'Done', type: 'done' };
};

/**
 * Formats a time string in 24h format to 12h AM/PM format.
 */
const formatTimeString = (timeStr) => {
  const [hour, min] = timeStr.split(':').map(Number);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h = hour % 12 || 12;
  return `${h}:${min.toString().padStart(2, '0')} ${ampm}`;
};

/**
 * Calculates duration in minutes between two time strings.
 */
const getDuration = (startTime, endTime) => {
  const [sHour, sMin] = startTime.split(':').map(Number);
  const [eHour, eMin] = endTime.split(':').map(Number);
  return (eHour * 60 + eMin) - (sHour * 60 + sMin);
};

/**
 * Displays today's schedule with enhanced cards.
 */
const TodaySchedule = ({ courses }) => {
  if (!courses || courses.length === 0) {
    return (
      <motion.section 
        className={styles.section}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.sectionTitle}>Today's Schedule</h2>
        <EmptyState message="No classes today 🎉" description="Enjoy your free day!" />
      </motion.section>
    );
  }

  const sortedCourses = [...courses].sort((a, b) => {
    const [aHour, aMin] = a.startTime.split(':').map(Number);
    const [bHour, bMin] = b.startTime.split(':').map(Number);
    return (aHour * 60 + aMin) - (bHour * 60 + bMin);
  });

  return (
    <motion.section 
      className={styles.section}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className={styles.sectionTitle}>Today's Schedule</h2>
      
      <motion.div 
        className={styles.scheduleList}
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <AnimatePresence mode="popLayout">
          {sortedCourses.map((course) => {
            const status = getStatusBadge(course);
            const isActive = status.type === 'active';
            const durationMins = getDuration(course.startTime, course.endTime);

            return (
              <motion.div 
                key={course.id} 
                className={`${styles.courseCard} ${isActive ? styles.courseCardActive : ''}`}
                variants={staggerItem}
                style={{ '--course-color': course.color }}
                layout
              >
                <div className={styles.courseLeftBorder} />
                
                <div className={styles.courseHeader}>
                  <div className={styles.courseHeadline}>
                    <span className={styles.courseCode}>
                      {formatCourseCode(course.courseCode)}
                    </span>
                    <span className={styles.courseName}>{course.courseName}</span>
                  </div>
                  <motion.span 
                    className={`${styles.statusBadge} ${styles[`status${status.type}`]}`}
                    animate={status.type === 'active' ? { opacity: [1, 0.6, 1] } : {}}
                    transition={status.type === 'active' ? { duration: 1.5, repeat: Infinity } : {}}
                  >
                    {status.type === 'active' && <span className={styles.pulsingDot} />}
                    {status.label}
                  </motion.span>
                </div>

                <div className={styles.courseMeta}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Time</span>
                    <span className={styles.metaValue}>
                      {formatTimeString(course.startTime)} → {formatTimeString(course.endTime)}
                    </span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Room</span>
                    <span className={styles.metaValue}>{course.room}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Instructor</span>
                    <span className={styles.metaValue}>{course.instructor}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Duration</span>
                    <span className={styles.metaValue}>{durationMins}m</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <motion.a 
        href="/portal/schedule"
        className={styles.viewAllLink}
        whileHover={{ x: 4 }}
      >
        View Full Schedule →
      </motion.a>
    </motion.section>
  );
};

export default TodaySchedule;
