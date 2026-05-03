import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { getToday, formatDate } from '@/lib/dateUtils';
import { formatName } from '@/lib/formatters';
import { pageTransition, staggerContainer, staggerItem } from '@/lib/motion/variants';

import { useDashboardData } from './hooks/useDashboardData';
import StatCard from './components/StatCard';
import TodaySchedule from './components/TodaySchedule';
import UpcomingExams from './components/UpcomingExams';
import SemesterProgress from './components/SemesterProgress';
import QuickActions from './components/QuickActions';

import Spinner from '@/components/ui/Spinner';
import EmptyState from '@/components/ui/EmptyState';
import styles from './DashboardPage.module.css';

/**
 * Returns a time-aware greeting.
 * @returns {string}
 */
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

/**
 * DashboardPage: The main overview page of the student portal.
 */
const DashboardPage = () => {
  const { user } = useAuth();
  const { data, loading, error } = useDashboardData();

  const greeting = getGreeting();
  const firstName = formatName(user?.name || 'Student');
  const today = formatDate(getToday());

  if (loading) return <Spinner />;
  if (error) return <EmptyState message="Failed to load dashboard data" />;
  if (!data) return <EmptyState message="No data found" />;

  const { stats, schedule, exams, progress } = data;

  return (
    <motion.div
      className={styles.page}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      {/* 1. Greeting Header */}
      <header className={styles.header}>
        <h1 className={styles.greeting}>
          {greeting}, {firstName} 👋
        </h1>
        <p className={styles.date}>{today}</p>
      </header>

      {/* 2. Stats Row */}
      <motion.section
        className={styles.statsRow}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={staggerItem}>
          <StatCard
            icon="bar-chart"
            label="Current GPA"
            value={stats.gpa.value}
            subtitle={stats.gpa.label}
            color={stats.gpa.color}
          />
        </motion.div>
        <motion.div variants={staggerItem}>
          <StatCard
            icon="check-circle"
            label="Attendance"
            value={stats.attendance.value}
            subtitle={stats.attendance.status}
            color={stats.attendance.color}
          />
        </motion.div>
        <motion.div variants={staggerItem}>
          <StatCard
            icon="clock"
            label="Upcoming Exams"
            value={stats.exams.count}
            subtitle="Next 30 days"
            color="var(--color-primary)"
          />
        </motion.div>
        <motion.div variants={staggerItem}>
          <StatCard
            icon="book"
            label="Earned Credits"
            value={stats.credits.value}
            subtitle="of 136 required"
            color="var(--color-info)"
          />
        </motion.div>
      </motion.section>

      <div className={styles.grid}>
        {/* 3. Today's Schedule */}
        <TodaySchedule courses={schedule} />

        {/* 4. Upcoming Exams Widget */}
        <UpcomingExams exams={exams} />
      </div>

      {/* 5. Semester Progress Bar */}
      <SemesterProgress progress={progress} />

      {/* 6. Quick Actions Grid */}
      <QuickActions />
    </motion.div>
  );
};

export default DashboardPage;
