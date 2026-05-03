import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageTransition, staggerContainer, staggerItem } from '@/lib/motion/variants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { 
  getExams, 
  getUpcomingExams, 
  getPastExams, 
  getNextExam 
} from '@/services/scheduleService';
import { getRelativeLabel, getDaysUntil } from '@/lib/dateUtils';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';

import ExamStatsRow from './components/ExamStatsRow';
import ExamFilterBar from './components/ExamFilterBar';
import ExamCard from './components/ExamCard';
import UrgencyBanner from './components/UrgencyBanner';
import PastExamsSection from './components/PastExamsSection';
import styles from './ExamsPage.module.css';

/**
 * ExamsPage - Displays and filters all exams
 */
const ExamsPage = () => {
  // Persistent state
  const [filter, setFilter] = useLocalStorage('exams_filter', 'All');
  const [bannerDismissed, setBannerDismissed] = useLocalStorage('exam_banner_dismissed', false);
  const [pastCollapsed, setPastCollapsed] = useLocalStorage('past_exams_collapsed', true);

  // Data fetching
  const allExams = getExams();
  const upcomingExams = getUpcomingExams();
  const pastExams = getPastExams();
  const nextExam = getNextExam();

  // Next exam calculations
  const nextLabel = nextExam ? getRelativeLabel(nextExam.date) : '';
  const daysToNext = nextExam ? getDaysUntil(nextExam.date) : Infinity;
  let nextColor = 'inherit';
  if (daysToNext <= 3) nextColor = 'var(--color-danger)';
  else if (daysToNext <= 7) nextColor = 'var(--color-warning)';
  else if (daysToNext <= 14) nextColor = 'var(--color-primary)';

  // Filtering
  const filteredUpcoming = filter === 'All' 
    ? upcomingExams 
    : upcomingExams.filter(e => e.type.toLowerCase() === filter.toLowerCase());

  // Show banner if next exam is <= 3 days away and not dismissed
  const showBanner = nextExam && daysToNext <= 3 && !bannerDismissed;

  if (allExams.length === 0) {
    return (
      <motion.div
        className={styles.page}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        <div className={styles.emptyStateContainer}>
          <EmptyState 
            icon="calendar"
            title="No exams scheduled 🎉"
            description="Enjoy the break!"
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.page}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <header className={styles.header}>
        <h1 className={styles.title}>My Exams</h1>
        <p className={styles.subtitle}>
          {upcomingExams.length > 0 
            ? `You have ${upcomingExams.length} upcoming exam${upcomingExams.length === 1 ? '' : 's'}`
            : 'No upcoming exams 🎉'}
        </p>
      </header>

      <UrgencyBanner 
        exam={nextExam} 
        isDismissed={bannerDismissed || daysToNext > 3} 
        onDismiss={() => setBannerDismissed(true)} 
      />

      <ExamStatsRow 
        total={allExams.length}
        upcomingCount={upcomingExams.length}
        nextLabel={nextLabel}
        urgencyColor={nextColor}
      />

      <ExamFilterBar 
        activeFilter={filter}
        setFilter={setFilter}
        exams={upcomingExams}
      />

      <div>
        <h2 className={styles.sectionTitle}>
          Upcoming
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', fontWeight: 400 }}>
            ({filteredUpcoming.length})
          </span>
        </h2>

        {filteredUpcoming.length > 0 ? (
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <AnimatePresence mode="popLayout">
              {filteredUpcoming.map(exam => (
                <motion.div key={exam.id} variants={staggerItem} layout>
                  <ExamCard exam={exam} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div style={{ padding: 'var(--space-8) 0', textAlign: 'center' }}>
            <EmptyState 
              title={`No ${filter !== 'All' ? filter : ''} exams found`}
              description="You have no upcoming exams matching this filter."
            />
            <Button variant="outline" onClick={() => setFilter('All')} style={{ marginTop: 'var(--space-4)' }}>
              Clear Filter
            </Button>
          </div>
        )}
      </div>

      <PastExamsSection 
        pastExams={pastExams}
        collapsed={pastCollapsed}
        setCollapsed={setPastCollapsed}
      />
    </motion.div>
  );
};

export default ExamsPage;
