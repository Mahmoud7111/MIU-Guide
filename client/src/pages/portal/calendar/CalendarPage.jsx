import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getCalendarMonth,
  getEventsByDate,
  getEventsByType,
  getUpcomingEvents,
  getMonthSummary,
} from '@/services/eventService';
import { getMonthName } from '@/lib/dateUtils';
import { formatSemester } from '@/lib/formatters';
import { pageTransition } from '@/lib/motion/variants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Spinner from '@/components/ui/Spinner';
import styles from './CalendarPage.module.css';

import CalendarHeader from './components/CalendarHeader';
import MonthGrid from './components/MonthGrid';
import EventsSidebar from './components/EventsSidebar';
import MonthSummaryBar from './components/MonthSummaryBar';
import ListView from './components/ListView';
import EventFilterBar from './components/EventFilterBar';
import EventDetailModal from './components/EventDetailModal';

/**
 * CalendarPage — monthly calendar with events and list view.
 */
const CalendarPage = () => {
  const today = new Date();
  const [view, setView] = useLocalStorage('calendar_view', 'month');
  const [selectedDate, setSelectedDate] = useLocalStorage(
    'calendar_date',
    today.toISOString(),
  );
  const [filter, setFilter] = useLocalStorage('calendar_filter', 'All');
  const [month, setMonth] = useLocalStorage('calendar_month', today.getMonth());
  const [year, setYear] = useLocalStorage('calendar_year', today.getFullYear());
  const [direction, setDirection] = useState('next');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  const semesterLabel = formatSemester('S2026');
  const monthLabel = getMonthName(new Date(year, month, 1));

  const selectedDateObj = useMemo(() => {
    const d = new Date(selectedDate);
    return Number.isNaN(d.getTime()) ? today : d;
  }, [selectedDate]);

  const monthData = useMemo(() => getCalendarMonth(year, month), [year, month]);
  const monthSummary = useMemo(() => getMonthSummary(year, month), [year, month]);
  const upcomingEvents = useMemo(() => getUpcomingEvents(5), []);

  const monthDays = useMemo(() => {
    const reordered = [];
    for (let i = 0; i < monthData.days.length; i += 7) {
      const week = monthData.days.slice(i, i + 7);
      if (week.length === 7) {
        reordered.push(week[6], ...week.slice(0, 6));
      }
    }
    return reordered;
  }, [monthData.days]);

  const filteredMonthDays = useMemo(() => {
    if (filter === 'All') return monthDays;
    return monthDays.map((day) => ({
      ...day,
      events: day.events.filter((e) => e.type === filter.toLowerCase()),
    }));
  }, [filter, monthDays]);

  const selectedDayEvents = useMemo(() => {
    const events = getEventsByDate(selectedDateObj);
    if (filter === 'All') return events;
    return events.filter((e) => e.type === filter.toLowerCase());
  }, [selectedDateObj, filter]);

  const listEvents = useMemo(() => {
    const types = ['academic', 'holiday', 'activity', 'deadline', 'social'];
    const map = new Map();
    types.forEach((type) => {
      getEventsByType(type).forEach((event) => {
        map.set(event.id, event);
      });
    });
    const all = Array.from(map.values());
    const filtered =
      filter === 'All'
        ? all
        : all.filter((e) => e.type === filter.toLowerCase());
    return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [filter]);

  const groupedListEvents = useMemo(() => {
    const groups = {};
    listEvents.forEach((event) => {
      const label = getMonthName(new Date(event.date));
      if (!groups[label]) groups[label] = [];
      groups[label].push(event);
    });
    return groups;
  }, [listEvents]);

  const handlePrevMonth = () => {
    setDirection('prev');
    const newMonth = month === 0 ? 11 : month - 1;
    const newYear = month === 0 ? year - 1 : year;
    setMonth(newMonth);
    setYear(newYear);
    setSelectedDate(new Date(newYear, newMonth, 1).toISOString());
  };

  const handleNextMonth = () => {
    setDirection('next');
    const newMonth = month === 11 ? 0 : month + 1;
    const newYear = month === 11 ? year + 1 : year;
    setMonth(newMonth);
    setYear(newYear);
    setSelectedDate(new Date(newYear, newMonth, 1).toISOString());
  };

  const handleToday = () => {
    setDirection('next');
    setMonth(today.getMonth());
    setYear(today.getFullYear());
    setSelectedDate(today.toISOString());
  };

  const handleToast = (message) => {
    setToast({ id: Date.now(), message });
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!toast?.id) return undefined;
    const timer = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(timer);
  }, [toast?.id]);

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
      <CalendarHeader
        monthLabel={monthLabel}
        semesterLabel={semesterLabel}
        view={view}
        onViewChange={setView}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
        filter={filter}
        onFilterChange={setFilter}
      />

      <AnimatePresence mode="wait">
        {view === 'month' ? (
          <motion.div
            key={`month-${month}-${year}`}
            className={styles.monthLayout}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>
              <MonthGrid
                days={filteredMonthDays}
                selectedDate={selectedDateObj}
                direction={direction}
                onSelectDate={(date) => setSelectedDate(date.toISOString())}
              />
              <MonthSummaryBar
                summary={monthSummary}
                fallbackNextEvent={upcomingEvents[0] || null}
              />
            </div>

            <EventsSidebar
              date={selectedDateObj}
              events={selectedDayEvents}
              onSelectEvent={setSelectedEvent}
            />
          </motion.div>
        ) : (
          <motion.div
            key={`list-${filter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EventFilterBar
              filter={filter}
              onChange={setFilter}
              className={styles.listFilterBar}
            />
            <ListView
              groupedEvents={groupedListEvents}
              onSelectEvent={setSelectedEvent}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedEvent && (
          <EventDetailModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onAddToCalendar={() => handleToast('Added to My Calendar!')}
            onShare={() => handleToast('Event link copied!')}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className={styles.toast}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CalendarPage;
