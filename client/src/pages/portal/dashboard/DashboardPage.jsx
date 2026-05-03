import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { getToday, formatDate, getTodayName, getRelativeTime } from '@/lib/dateUtils';
import { formatName, formatSemester, formatGPAStatus } from '@/lib/formatters';
import { pageTransition, staggerContainer, staggerItem } from '@/lib/motion/variants';
import { useState, useEffect } from 'react';

import { useDashboardData } from './hooks/useDashboardData';
import StatCard from './components/StatCard';
import TodaySchedule from './components/TodaySchedule';
import UpcomingExams from './components/UpcomingExams';
import SemesterProgress from './components/SemesterProgress';
import QuickActions from './components/QuickActions';
import ActivityFeed from './components/ActivityFeed';

import Spinner from '@/components/ui/Spinner';
import EmptyState from '@/components/ui/EmptyState';
import styles from './DashboardPage.module.css';

/**
 * Returns a time-aware greeting with icon.
 * @returns {{greeting: string, icon: string}}
 */
const getGreetingWithIcon = () => {
  const hour = new Date().getHours();
  if (hour < 12) return { greeting: 'Good morning', icon: '🌅' };
  if (hour < 18) return { greeting: 'Good afternoon', icon: '☀️' };
  return { greeting: 'Good evening', icon: '🌙' };
};

/**
 * Returns motivational message based on GPA standing.
 * @returns {string}
 */
const getMotivationalMessage = (gpaStatus) => {
  switch (gpaStatus) {
    case "Dean's List":
      return "You're doing amazing, keep it up! 🏆";
    case 'Good Standing':
      return 'Great work, stay consistent! ✅';
    case 'Satisfactory':
      return 'You can do better, push harder! 💪';
    case 'Academic Probation':
      return "Let's turn this around together! ❤️";
    default:
      return 'Keep pushing forward! 🚀';
  }
};

/**
 * DashboardPage: The main overview page of the student portal.
 */
const DashboardPage = () => {
  const { user } = useAuth();
  const { data, loading, error } = useDashboardData();
  const [currentTime, setCurrentTime] = useState(new Date());

  const { greeting, icon } = getGreetingWithIcon();
  const firstName = formatName(user?.name || 'Student');
  const todayName = getTodayName();
  const today = formatDate(getToday());
  const fullDate = `${todayName}, ${today}`;
  const timeString = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const motivationalMsg = data ? getMotivationalMessage(formatGPAStatus(data.gpaValue)) : '';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

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
      <motion.header 
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className={styles.greeting}
          key={icon}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className={styles.greetingIcon}>{icon}</span>
          {greeting}, {firstName}
        </motion.h1>
        <div className={styles.dateInfo}>
          <p className={styles.dateText}>{fullDate} • {timeString}</p>
          <p className={styles.semesterText}>{data.semesterLabel}</p>
        </div>
        <p className={styles.motivationalMsg}>{motivationalMsg}</p>
      </motion.header>

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
            trend={stats.gpa.trend}
            onClick={() => window.location.href = '/portal/gpa'}
          />
        </motion.div>
        <motion.div variants={staggerItem}>
          <StatCard
            icon="check-circle"
            label="Attendance"
            value={stats.attendance.value}
            subtitle={stats.attendance.status}
            color={stats.attendance.color}
            atRiskCount={stats.attendance.atRiskCount}
            onClick={() => window.location.href = '/portal/attendance'}
          />
        </motion.div>
        <motion.div variants={staggerItem}>
          <StatCard
            icon="clock"
            label="Upcoming Exams"
            value={stats.exams.count}
            subtitle={stats.exams.nextExam}
            color={stats.exams.urgencyColor}
            badge={stats.exams.count > 0 ? stats.exams.count : null}
            onClick={() => window.location.href = '/portal/exams'}
          />
        </motion.div>
        <motion.div variants={staggerItem}>
          <StatCard
            icon="book"
            label="Earned Credits"
            value={stats.credits.value}
            subtitle={stats.credits.subtitle}
            color="var(--color-primary)"
            progress={stats.credits.progress}
            onClick={() => window.location.href = '/portal/gpa'}
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
      <QuickActions examsCount={stats.exams.count} atRiskCount={stats.attendance.atRiskCount} />

      {/* 7. Recent Activity Feed */}
      <ActivityFeed />

      {/* 8. Last Updated Footer */}
      <div className={styles.footer}>
        <p className={styles.lastUpdated}>
          Last updated: {getRelativeTime(new Date().toISOString())}
        </p>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
