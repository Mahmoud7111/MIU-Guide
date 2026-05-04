import { motion, AnimatePresence } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import { formatDate, isToday } from '@/lib/dateUtils';
import { staggerContainer, staggerItem } from '@/lib/motion/variants';
import SidebarEventCard from './SidebarEventCard';
import styles from '../CalendarPage.module.css';

/**
 * EventsSidebar — list of events for selected day.
 */
const EventsSidebar = ({ date, events, onSelectEvent }) => {
  const heading = `${date.toLocaleDateString('en-US', { weekday: 'long' })}, ${formatDate(date)}`;
  const todayFlag = isToday(date);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <span className={styles.sidebarTitle}>{heading}</span>
        {todayFlag && <Badge variant="primary" size="sm">Today</Badge>}
      </div>

      {events.length === 0 ? (
        <EmptyState
          title="No events today"
          description="Enjoy the quiet day on campus."
          size="sm"
        />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={date.toDateString()}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {events.map((event) => (
              <motion.div key={event.id} variants={staggerItem}>
                <SidebarEventCard event={event} onClick={() => onSelectEvent(event)} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </aside>
  );
};

export default EventsSidebar;
