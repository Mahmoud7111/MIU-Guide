import { motion, AnimatePresence } from 'framer-motion';
import { getWeekDays } from '@/lib/dateUtils';
import { staggerContainer, staggerItem } from '@/lib/motion/variants';
import DayCell from './DayCell';
import styles from '../CalendarPage.module.css';

/**
 * MonthGrid — 7×6 calendar grid for month view.
 */
const MonthGrid = ({ days, selectedDate, onSelectDate, direction }) => {
  const headerWeek = getWeekDays(new Date());
  const headerDates = [headerWeek[6], ...headerWeek.slice(0, 6)];
  const headerLabels = headerDates.map((d) =>
    d.toLocaleDateString('en-US', { weekday: 'short' }),
  );

  return (
    <div className={styles.calendarGrid}>
      <div className={styles.dayHeaders}>
        {headerLabels.map((label, idx) => {
          const isWeekend = idx === 5 || idx === 6;
          return (
            <div
              key={label}
              className={`${styles.dayHeader} ${isWeekend ? styles.dayCellWeekend : ''}`}
            >
              {label}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={days[0]?.date?.toISOString() || 'month'}
          className={styles.daysGrid}
          variants={staggerContainer}
          initial={{ opacity: 0, x: direction === 'next' ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction === 'next' ? -100 : 100 }}
          transition={{ duration: 0.3 }}
        >
          {days.map((day) => (
            <motion.div key={day.date.toISOString()} variants={staggerItem}>
              <DayCell
                day={day}
                selectedDate={selectedDate}
                onSelect={() => onSelectDate(day.date)}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MonthGrid;
