import Badge from '@/components/ui/Badge';
import { formatDateShort, isToday } from '@/lib/dateUtils';
import { staggerContainer } from '@/lib/motion/variants';
import { motion } from 'framer-motion';
import CourseBlock from './CourseBlock';
import CurrentTimeLine from './CurrentTimeLine';
import styles from '../SchedulePage.module.css';

/**
 * DayColumn — single day in the week grid.
 */
const DayColumn = ({
  day,
  courses,
  onCourseSelect,
  startHour,
  endHour,
  slotMinutes,
  slotHeight,
  showCurrentTime,
}) => {
  const totalSlots = ((endHour - startHour) * 60) / slotMinutes;
  const dayIsToday = isToday(day.date);

  return (
    <div className={`${styles.dayColumn} ${dayIsToday ? styles.today : ''}`}>
      <div className={styles.dayHeader}>
        <div className={styles.dayName}>{day.name}</div>
        <div className={styles.dayDate}>{formatDateShort(day.date)}</div>
        {dayIsToday && (
          <Badge variant="primary" size="sm">Today</Badge>
        )}
      </div>

      <div
        className={styles.dayBody}
        style={{ height: totalSlots * slotHeight }}
      >
        {dayIsToday && showCurrentTime && (
          <CurrentTimeLine
            startHour={startHour}
            endHour={endHour}
            slotMinutes={slotMinutes}
            slotHeight={slotHeight}
          />
        )}

        <motion.div
          className={styles.courseLayer}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {courses.map((course) => (
            <CourseBlock
              key={course.id}
              course={course}
              startHour={startHour}
              slotMinutes={slotMinutes}
              slotHeight={slotHeight}
              onClick={() => onCourseSelect(course)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DayColumn;
