import { motion, AnimatePresence } from 'framer-motion';
import { getRelativeTime } from '@/lib/dateUtils';
import { staggerContainer, staggerItem } from '@/lib/motion/variants';
import styles from '../DashboardPage.module.css';

/**
 * Activity type icons and colors.
 */
const ACTIVITY_TYPES = {
  grade: { icon: '📊', color: 'var(--color-primary)' },
  attendance: { icon: '📋', color: 'var(--color-warning)' },
  exam: { icon: '📝', color: 'var(--color-danger)' },
  deadline: { icon: '⏰', color: 'var(--color-warning)' },
  event: { icon: '🎉', color: 'var(--color-success)' },
};

/**
 * Mock recent activities data.
 */
const MOCK_ACTIVITIES = [
  { 
    id: 1,
    type: 'grade',
    text: 'New grade posted for CS301: Data Structures',
    time: '2h ago',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  { 
    id: 2,
    type: 'attendance',
    text: 'Absence recorded in CS401: Operating Systems',
    time: '1d ago',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
  },
  { 
    id: 3,
    type: 'exam',
    text: 'Exam scheduled: OS Midterm on May 15, 2026',
    time: '2d ago',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  { 
    id: 4,
    type: 'deadline',
    text: 'Project submission deadline approaching in 3 days',
    time: '3d ago',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  { 
    id: 5,
    type: 'event',
    text: 'MIU Spring Festival this week - Join us!',
    time: '4d ago',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
  },
];

/**
 * Individual activity item.
 */
const ActivityItem = ({ activity }) => {
  const typeInfo = ACTIVITY_TYPES[activity.type] || ACTIVITY_TYPES.event;

  return (
    <motion.div
      className={styles.activityItem}
      variants={staggerItem}
      style={{ '--activity-color': typeInfo.color }}
    >
      <div className={styles.activityIconWrapper}>
        <span className={styles.activityIcon}>{typeInfo.icon}</span>
      </div>

      <div className={styles.activityContent}>
        <p className={styles.activityText}>{activity.text}</p>
        <span className={styles.activityTime}>{activity.time}</span>
      </div>
    </motion.div>
  );
};

/**
 * Recent activity feed section.
 */
const ActivityFeed = () => {
  return (
    <motion.section 
      className={styles.section}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className={styles.sectionTitle}>Recent Activity</h2>

      <motion.div 
        className={styles.activityList}
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <AnimatePresence mode="popLayout">
          {MOCK_ACTIVITIES.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default ActivityFeed;
