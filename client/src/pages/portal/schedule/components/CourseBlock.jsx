import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion/variants';
import { formatCourseCode, formatRoomCode } from '@/lib/formatters';
import styles from '../SchedulePage.module.css';

/**
 * CourseBlock — a positioned course card inside the week grid.
 */
const CourseBlock = ({
  course,
  startHour,
  slotMinutes,
  slotHeight,
  onClick,
}) => {
  const toMinutes = (time) => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };

  const startMinutes = toMinutes(course.startTime) - startHour * 60;
  const endMinutes = toMinutes(course.endTime) - startHour * 60;
  const top = (startMinutes / slotMinutes) * slotHeight;
  const height = ((endMinutes - startMinutes) / slotMinutes) * slotHeight;

  return (
    <motion.div
      className={styles.courseBlock}
      style={{
        top,
        height,
        background: course.color,
      }}
      variants={fadeUp}
      whileHover={{ y: -2 }}
      onClick={onClick}
    >
      <div className={styles.courseBlockCode}>
        {formatCourseCode(course.courseCode)}
      </div>
      <div className={styles.courseBlockName}>{course.courseName}</div>
      <div className={styles.courseBlockRoom}>
        {formatRoomCode(course.room)}
      </div>
    </motion.div>
  );
};

export default CourseBlock;
