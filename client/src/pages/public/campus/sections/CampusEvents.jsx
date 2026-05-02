import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarDays, FaClock, FaMapLocationDot } from 'react-icons/fa6';
import { staggerContainer, staggerItem, fadeUp } from '@/lib/motion/variants';
import Button from '@/components/ui/Button';
import { campusEvents } from '@/data/campusBuildings';
import { ROUTES } from '@/lib/constants';
import styles from './CampusEvents.module.css';

const tagColors = {
  Academic: '#3B82F6',
  Sports:   '#10B981',
  Culture:  '#8B5CF6',
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-EG', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const CampusEvents = () => {
  return (
    <section id="events" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <motion.header
          className={styles.header}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span className={styles.eyebrow} variants={fadeUp}>
            What's On
          </motion.span>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Upcoming Events
          </motion.h2>
        </motion.header>

        {/* Event cards */}
        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {campusEvents.map((event) => (
            <motion.div
              key={event.id}
              className={styles.card}
              variants={staggerItem}
              whileHover={{ y: -5, boxShadow: 'var(--shadow-hover)' }}
            >
              <span
                className={styles.tag}
                style={{ background: tagColors[event.tag] || 'var(--brand-primary)' }}
              >
                {event.tag}
              </span>

              <h3 className={styles.eventTitle}>{event.title}</h3>

              <div className={styles.eventMeta}>
                <span className={styles.metaItem}>
                  <FaCalendarDays aria-hidden="true" />
                  <span>{formatDate(event.date)}</span>
                </span>
                <span className={styles.metaItem}>
                  <FaClock aria-hidden="true" />
                  <span>{event.time}</span>
                </span>
                <span className={styles.metaItem}>
                  <FaMapLocationDot aria-hidden="true" />
                  <span>{event.location}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button variant="outlined" as={Link} to={ROUTES.NEWS ?? '/news'}>
            View All Events
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CampusEvents;
