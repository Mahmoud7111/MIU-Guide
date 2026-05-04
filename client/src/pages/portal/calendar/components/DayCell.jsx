import { motion } from 'framer-motion';
import styles from '../CalendarPage.module.css';

/**
 * DayCell — single day cell in month grid with event dots.
 */
const DayCell = ({ day, selectedDate, onSelect }) => {
  const isSelected =
    selectedDate &&
    selectedDate.toDateString() === day.date.toDateString();
  const isWeekend = day.date.getDay() === 5 || day.date.getDay() === 6;

  const typeColors = {
    academic: 'var(--color-primary)',
    holiday: 'var(--color-success)',
    activity: 'var(--color-warning)',
    deadline: 'var(--color-danger)',
    social: 'var(--color-info)',
  };

  const dots = day.events.slice(0, 3);
  const extraCount = day.events.length - dots.length;

  return (
    <motion.div
      className={[
        styles.dayCell,
        !day.isCurrentMonth ? styles.dayCellOther : '',
        day.isToday ? styles.dayCellToday : '',
        isSelected ? styles.dayCellSelected : '',
        isWeekend ? styles.dayCellWeekend : '',
      ].join(' ')}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
    >
      <div className={styles.dayNumber}>{day.dayNumber}</div>
      {day.events.length > 0 && (
        <div className={styles.eventDots}>
          {dots.map((event) => (
            <span
              key={event.id}
              className={styles.eventDot}
              style={{ background: typeColors[event.type] }}
            />
          ))}
          {extraCount > 0 && (
            <span className={styles.moreBadge}>+{extraCount} more</span>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default DayCell;
