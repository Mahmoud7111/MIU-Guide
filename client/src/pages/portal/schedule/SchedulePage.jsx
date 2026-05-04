import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getSchedule,
  getWeekSchedule,
  getTodaySchedule,
  getScheduleByDay,
} from '@/services/scheduleService';
import { getWeekDays, getWeekRange } from '@/lib/dateUtils';
import { formatSemester } from '@/lib/formatters';
import { getTotalCredits } from '@/lib/gpaUtils';
import { pageTransition } from '@/lib/motion/variants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Spinner from '@/components/ui/Spinner';
import styles from './SchedulePage.module.css';

import ScheduleHeader from './components/ScheduleHeader';
import ScheduleSummaryBar from './components/ScheduleSummaryBar';
import WeekGrid from './components/WeekGrid';
import ListView from './components/ListView';
import CourseDetailModal from './components/CourseDetailModal';

/**
 * SchedulePage — weekly schedule with grid and list views.
 */
const SchedulePage = () => {
  const [view, setView] = useLocalStorage('schedule_view', 'grid');
  const [weekOffset, setWeekOffset] = useLocalStorage('schedule_week', 0);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [direction, setDirection] = useState('next');
  const [loading, setLoading] = useState(true);

  const semesterLabel = formatSemester('S2026');
  const schedule = useMemo(() => getSchedule(), []);
  const weekSchedule = getWeekSchedule();
  const todayCourses = useMemo(() => getTodaySchedule(), []);

  const weekBaseDate = useMemo(() => {
    const base = new Date();
    base.setDate(base.getDate() + weekOffset * 7);
    return base;
  }, [weekOffset]);

  const weekRange = getWeekRange(weekBaseDate);
  const weekDays = getWeekDays(weekBaseDate);
  const miuDays = [
    weekDays[6],
    weekDays[0],
    weekDays[1],
    weekDays[2],
    weekDays[3],
  ];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

  const dayEntries = dayNames.map((name, idx) => ({
    name,
    date: miuDays[idx],
  }));

  const coursesByDay = dayNames.reduce((map, day) => {
    map[day] = weekSchedule[day] || [];
    return map;
  }, {});

  const totalCredits = getTotalCredits(schedule);
  const busiestDay = dayNames.reduce(
    (busiest, day) => {
      const count = getScheduleByDay(day).length;
      if (count > busiest.count) return { day, count };
      return busiest;
    },
    { day: dayNames[0], count: 0 },
  );

  const freeDays = dayNames.filter((day) => getScheduleByDay(day).length === 0);

  const handlePrevWeek = () => {
    setDirection('prev');
    setWeekOffset((prev) => prev - 1);
  };

  const handleNextWeek = () => {
    setDirection('next');
    setWeekOffset((prev) => prev + 1);
  };

  const handleThisWeek = () => {
    if (weekOffset === 0) return;
    setDirection('next');
    setWeekOffset(0);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth <= 768) {
      setView('list');
    }
  }, []);

  if (loading) {
    return (
      <div className={styles.page}>
        <Spinner />
      </div>
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
      <ScheduleHeader
        weekRange={weekRange}
        view={view}
        onViewChange={setView}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onThisWeek={handleThisWeek}
        isCurrentWeek={weekOffset === 0}
        semesterLabel={semesterLabel}
      />

      <ScheduleSummaryBar
        totalCourses={schedule.length}
        totalCredits={totalCredits}
        busiestDay={busiestDay.day}
        freeDays={freeDays.length}
      />

      <AnimatePresence mode="wait">
        {view === 'grid' ? (
          <WeekGrid
            key={`grid-${weekOffset}`}
            direction={direction}
            dayEntries={dayEntries}
            coursesByDay={coursesByDay}
            onCourseSelect={setSelectedCourse}
            showCurrentTime={todayCourses.length > 0}
          />
        ) : (
          <ListView
            key={`list-${weekOffset}`}
            dayEntries={dayEntries}
            coursesByDay={coursesByDay}
            onCourseSelect={setSelectedCourse}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCourse && (
          <CourseDetailModal
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
            semesterLabel={semesterLabel}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SchedulePage;
