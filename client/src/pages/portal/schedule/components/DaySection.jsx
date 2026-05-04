import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import { formatDateShort, isToday } from '@/lib/dateUtils';
import { staggerItem } from '@/lib/motion/variants';
import CourseListRow from './CourseListRow';
import styles from '../SchedulePage.module.css';

/**
 * DaySection — collapsible day group for list view.
 */
const DaySection = ({ day, courses, onCourseSelect }) => {
  const [open, setOpen] = useState(true);
  const dayIsToday = isToday(day.date);

  return (
    <motion.section className={styles.daySection} variants={staggerItem}>
      <button
        type="button"
        className={styles.daySectionHeader}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div>
          <span className={styles.daySectionTitle}>{day.name}</span>
          <span className={styles.daySectionDate}>{formatDateShort(day.date)}</span>
        </div>
        <div className={styles.daySectionRight}>
          {dayIsToday && <Badge variant="primary" size="sm">Today</Badge>}
          <span className={styles.daySectionToggle}>
            {open ? 'Hide ▲' : 'Show ▼'}
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className={styles.daySectionBody}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {courses.length === 0 ? (
              <div className={styles.emptyDay}>No classes</div>
            ) : (
              courses
                .slice()
                .sort((a, b) => a.startTime.localeCompare(b.startTime))
                .map((course) => (
                  <CourseListRow
                    key={course.id}
                    course={course}
                    onClick={() => onCourseSelect(course)}
                  />
                ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default DaySection;
