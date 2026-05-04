import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motion/variants';
import ListEventRow from './ListEventRow';
import styles from '../CalendarPage.module.css';

/**
 * ListView — events grouped by month in list layout.
 */
const ListView = ({ groupedEvents, onSelectEvent }) => {
  const monthKeys = Object.keys(groupedEvents).sort(
    (a, b) =>
      new Date(groupedEvents[a][0].date) - new Date(groupedEvents[b][0].date),
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={styles.listView}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0 }}
      >
        {monthKeys.length === 0 ? (
          <div className={styles.summaryValue}>No events found.</div>
        ) : (
          monthKeys.map((month) => (
            <motion.div key={month} className={styles.listMonth} variants={staggerItem}>
              <div className={styles.listMonthHeader}>{month}</div>
              {groupedEvents[month].map((event) => (
                <ListEventRow
                  key={event.id}
                  event={event}
                  onClick={() => onSelectEvent(event)}
                />
              ))}
            </motion.div>
          ))
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ListView;
