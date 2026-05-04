import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../SchedulePage.module.css';

/**
 * CurrentTimeLine — red indicator for the current time.
 */
const CurrentTimeLine = ({ startHour, endHour, slotMinutes, slotHeight }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const minutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = startHour * 60;
  const endMinutes = endHour * 60;

  if (minutes < startMinutes || minutes > endMinutes) return null;

  const offsetMinutes = minutes - startMinutes;
  const top = (offsetMinutes / slotMinutes) * slotHeight;

  return (
    <motion.div
      className={styles.currentTimeLine}
      animate={{ top }}
      transition={{ duration: 0.4 }}
    >
      <span className={styles.currentTimeDot} />
    </motion.div>
  );
};

export default CurrentTimeLine;
