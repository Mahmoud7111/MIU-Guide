import { motion } from 'framer-motion';
import DayColumn from './DayColumn';
import styles from '../SchedulePage.module.css';

/**
 * WeekGrid — visual timetable grid for Sun–Thu.
 */
const WeekGrid = ({
  dayEntries,
  coursesByDay,
  onCourseSelect,
  direction,
  showCurrentTime,
}) => {
  const startHour = 8;
  const endHour = 20;
  const slotMinutes = 30;
  const slotHeight = 40;

  const slots = [];
  for (let minutes = startHour * 60; minutes <= endHour * 60; minutes += slotMinutes) {
    slots.push(minutes);
  }

  const animationOffset = direction === 'next' ? 40 : -40;

  return (
    <motion.div
      className={styles.weekGrid}
      initial={{ opacity: 0, x: animationOffset }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: animationOffset * -1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.timeAxis}>
        {slots.map((minutes) => {
          const hour = Math.floor(minutes / 60);
          const min = minutes % 60;
          const label = `${hour}:${min.toString().padStart(2, '0')}`;
          return (
            <div key={label} className={styles.timeLabel}>
              {label}
            </div>
          );
        })}
      </div>

      {dayEntries.map((day) => (
        <DayColumn
          key={day.name}
          day={day}
          courses={coursesByDay[day.name] || []}
          onCourseSelect={onCourseSelect}
          startHour={startHour}
          endHour={endHour}
          slotMinutes={slotMinutes}
          slotHeight={slotHeight}
          showCurrentTime={showCurrentTime}
        />
      ))}
    </motion.div>
  );
};

export default WeekGrid;
