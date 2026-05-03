import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';
import styles from '../DashboardPage.module.css';

/**
 * Quick navigation actions grid.
 */
const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { label: 'Calculate GPA', path: ROUTES.GPA, icon: 'bar-chart' },
    { label: 'My Attendance', path: ROUTES.ATTENDANCE, icon: 'check-circle' },
    { label: 'View Schedule', path: ROUTES.SCHEDULE, icon: 'calendar' },
    { label: 'Campus Map', path: ROUTES.PORTAL_CAMPUS, icon: 'map' },
  ];

  return (
    <motion.section 
      className={styles.section}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className={styles.sectionTitle}>Quick Actions</h2>
      <div className={styles.quickGrid}>
        {actions.map((action, idx) => (
          <Button 
            key={idx} 
            variant="outline"
            onClick={() => navigate(action.path)}
            icon={action.icon}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </motion.section>
  );
};

export default QuickActions;
