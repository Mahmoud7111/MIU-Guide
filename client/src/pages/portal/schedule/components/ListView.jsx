import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/motion/variants';
import DaySection from './DaySection';
import styles from '../SchedulePage.module.css';

/**
 * ListView — day-by-day schedule list.
 */
const ListView = ({ dayEntries, coursesByDay, onCourseSelect }) => {
  return (
    <motion.div
      className={styles.listView}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
    >
      {dayEntries.map((day) => (
        <DaySection
          key={day.name}
          day={day}
          courses={coursesByDay[day.name] || []}
          onCourseSelect={onCourseSelect}
        />
      ))}
    </motion.div>
  );
};

export default ListView;
