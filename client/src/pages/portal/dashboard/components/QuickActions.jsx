import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { staggerContainer, staggerItem } from '@/lib/motion/variants';
import styles from '../DashboardPage.module.css';

/**
 * Quick navigation actions grid.
 */
const QuickActions = ({ examsCount = 0, atRiskCount = 0 }) => {
  const navigate = useNavigate();

  const actions = [
    { label: 'Calculate GPA', path: '/portal/gpa', icon: '🎓' },
    { label: 'My Attendance', path: '/portal/attendance', icon: '📋', badge: atRiskCount > 0 ? atRiskCount : null },
    { label: 'View Schedule', path: '/portal/schedule', icon: '📅' },
    { label: 'Upcoming Exams', path: '/portal/exams', icon: '📝', badge: examsCount > 0 ? examsCount : null },
    { label: 'Calendar', path: '/portal/calendar', icon: '🗓️' },
    { label: 'Campus Map', path: '/portal/campus', icon: '🗺️' },
  ];

  return (
    <motion.section 
      className={styles.section}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className={styles.sectionTitle}>Quick Actions</h2>
      <motion.div 
        className={styles.quickGrid}
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <AnimatePresence>
          {actions.map((action, idx) => (
            <motion.div
              key={action.path}
              variants={staggerItem}
              layout
            >
              <button
                className={styles.quickActionButton}
                onClick={() => navigate(action.path)}
                title={action.label}
              >
                <span className={styles.actionIcon}>{action.icon}</span>
                <span className={styles.actionLabel}>{action.label}</span>
                {action.badge && (
                  <motion.span 
                    className={styles.actionBadge}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {action.badge}
                  </motion.span>
                )}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default QuickActions;
