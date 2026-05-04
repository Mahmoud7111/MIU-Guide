import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageTransition, staggerContainer, staggerItem } from '@/lib/motion/variants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { 
  getExams, 
  getUpcomingExams, 
  getPastExams, 
  getNextExam 
} from '@/services/scheduleService';
import { getRelativeLabel, getDaysUntil, isToday, formatDate, formatTime } from '@/lib/dateUtils';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';

import ExamStatsRow from './components/ExamStatsRow';
import ExamFilterBar from './components/ExamFilterBar';
import ExamCard from './components/ExamCard';
import UrgencyBanner from './components/UrgencyBanner';
import PastExamsSection from './components/PastExamsSection';
import ExamTimelineView from './components/ExamTimelineView';
import StudyPlannerModal from './components/StudyPlannerModal';
import Toast from './components/Toast';
import styles from './ExamsPage.module.css';

/**
 * ExamsPage - Displays and filters all exams with timeline view and study planner
 */
const ExamsPage = () => {
  // Persistent state
  const [typeFilter, setTypeFilter] = useLocalStorage('exams_type_filter', 'All');
  const [timeFilter, setTimeFilter] = useLocalStorage('exams_time_filter', 'All');
  const [viewMode, setViewMode] = useLocalStorage('exams_view_mode', 'cards');
  const [pastCollapsed, setPastCollapsed] = useLocalStorage('past_exams_collapsed', true);
  const [dismissedBanners, setDismissedBanners] = useLocalStorage('exam_banners_dismissed', {});
  const [studyPlannerOpen, setStudyPlannerOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Data fetching
  const allExams = getExams();
  const upcomingExams = getUpcomingExams();
  const pastExams = getPastExams();
  const nextExam = getNextExam();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        document.querySelector('[data-filter-bar]')?.focus();
      }
      if (e.key === 't' || e.key === 'T') {
        document.querySelector('[data-timeline-view]')?.scrollIntoView({ behavior: 'smooth' });
      }
      if (e.key === 'Escape') {
        setStudyPlannerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Add toast notification
  const addToast = (message, duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  // Filter logic
  const filteredByType = typeFilter === 'All' 
    ? upcomingExams 
    : upcomingExams.filter(e => e.type.toLowerCase() === typeFilter.toLowerCase());

  const now = new Date();
  const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  const filteredByTime = timeFilter === 'All' 
    ? filteredByType
    : timeFilter === 'Today'
    ? filteredByType.filter(e => isToday(e.date))
    : timeFilter === 'This Week'
    ? filteredByType.filter(e => new Date(e.date) >= now && new Date(e.date) <= weekFromNow)
    : timeFilter === 'Past'
    ? pastExams
    : filteredByType;

  const filteredUpcoming = filteredByTime;

  // Banner dismissal per exam
  const handleBannerDismiss = (examId) => {
    setDismissedBanners(prev => ({ ...prev, [examId]: true }));
  };

  const nextCriticalExam = upcomingExams.find(e => getDaysUntil(e.date) <= 3);
  const showBanner = nextCriticalExam && !dismissedBanners[nextCriticalExam.id];

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 className={styles.title}>My Exams</h1>
            <p className={styles.subtitle}>
              {upcomingExams.length > 0 
                ? `You have ${upcomingExams.length} upcoming exam${upcomingExams.length === 1 ? '' : 's'}`
                : 'No upcoming exams 🎉'}
            </p>
          </div>
          <Button 
            variant="primary" 
            onClick={() => setStudyPlannerOpen(true)}
            style={{ whiteSpace: 'nowrap' }}
          >
            📚 Plan My Study
          </Button>
        </div>
      </header>

      <AnimatePresence>
        {showBanner && nextCriticalExam && (
          <UrgencyBanner 
            exam={nextCriticalExam}
            onDismiss={() => handleBannerDismiss(nextCriticalExam.id)}
          />
        )}
      </AnimatePresence>

      <ExamStatsRow 
        total={allExams.length}
        upcomingCount={upcomingExams.length}
        thisWeekCount={upcomingExams.filter(e => new Date(e.date) >= now && new Date(e.date) <= weekFromNow).length}
        nextLabel={nextExam ? getRelativeLabel(nextExam.date) : ''}
        nextExam={nextExam}
        urgencyColor={nextExam && getDaysUntil(nextExam.date) <= 3 ? 'var(--color-danger)' : 'inherit'}
      />

      <ExamFilterBar 
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        exams={upcomingExams}
        filteredCount={filteredUpcoming.length}
      />

      {/* View Toggle */}
      <div className={styles.viewToggle}>
        <button
          className={`${styles.viewToggleBtn} ${viewMode === 'cards' ? styles.active : ''}`}
          onClick={() => setViewMode('cards')}
        >
          Cards
        </button>
        <button
          className={`${styles.viewToggleBtn} ${viewMode === 'timeline' ? styles.active : ''}`}
          onClick={() => setViewMode('timeline')}
          data-timeline-view
        >
          Timeline
        </button>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' && (
        <div>
          <h2 className={styles.sectionTitle}>
            Upcoming
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', fontWeight: 400 }}>
              (Showing {filteredUpcoming.length} of {upcomingExams.length})
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
                    <ExamCard exam={exam} onToast={addToast} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div style={{ padding: 'var(--space-8) 0', textAlign: 'center' }}>
              <EmptyState 
                title={timeFilter === 'This Week' ? 'No exams this week 🎉' : `No ${typeFilter !== 'All' ? typeFilter : ''} exams found`}
                description="You have no upcoming exams matching this filter."
              />
              <Button 
                variant="outline" 
                onClick={() => {
                  setTypeFilter('All');
                  setTimeFilter('All');
                }} 
                style={{ marginTop: 'var(--space-4)' }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <ExamTimelineView exams={upcomingExams} pastExams={pastExams} />
      )}

      <PastExamsSection 
        pastExams={pastExams}
        collapsed={pastCollapsed}
        setCollapsed={setPastCollapsed}
      />

      {/* Toast Notifications */}
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast key={toast.id} message={toast.message} />
        ))}
      </AnimatePresence>

      {/* Study Planner Modal */}
      <StudyPlannerModal 
        isOpen={studyPlannerOpen}
        onClose={() => setStudyPlannerOpen(false)}
        exams={upcomingExams}
      />
    </motion.div>
  );
};

export default ExamsPage;
