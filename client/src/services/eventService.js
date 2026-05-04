/**
 * @fileoverview Campus events & calendar service for the MIU Student Portal.
 *
 * All data is mocked — no real API calls.
 * When a backend is introduced, swap the mock arrays for fetch() calls
 * and make the exported functions async.
 *
 * Consumed by:
 *   CalendarPage, DashboardPage
 */

import {
  isToday,
  isSameDay,
  isUpcoming,
  getWeekDays,
  getMonthDays,
  getMonthName,
} from '../lib/dateUtils';

// ─── Mock Data ───────────────────────────────────────────────────────

/** @type {Array<Object>} Campus events for the current academic year. */
const MOCK_EVENTS = [
  // ── Academic (3) ──────────────────────────────────────────────────
  {
    id: 1,
    title: 'Mid-Term Exam Week',
    type: 'academic',
    date: '2026-04-19',
    endDate: '2026-04-24',
    description: 'Mid-term examinations for all departments.',
    location: 'Various Halls',
    allDay: true,
    color: 'var(--color-primary)',
  },
  {
    id: 2,
    title: 'Final Exam Period',
    type: 'academic',
    date: '2026-06-07',
    endDate: '2026-06-18',
    description: 'Final examinations — Spring 2026 semester.',
    location: 'Various Halls',
    allDay: true,
    color: 'var(--color-primary)',
  },
  {
    id: 3,
    title: 'Fall 2026 Registration Opens',
    type: 'academic',
    date: '2026-07-01',
    endDate: null,
    description: 'Online registration portal opens for Fall 2026.',
    location: 'Online — Student Portal',
    allDay: true,
    color: 'var(--color-primary)',
  },

  // ── Holidays (3) ─────────────────────────────────────────────────
  {
    id: 4,
    title: 'Sham El-Nessim',
    type: 'holiday',
    date: '2026-04-13',
    endDate: null,
    description: 'National Egyptian spring holiday — university closed.',
    location: 'Campus Closed',
    allDay: true,
    color: 'var(--color-success)',
  },
  {
    id: 5,
    title: 'Sinai Liberation Day',
    type: 'holiday',
    date: '2026-04-25',
    endDate: null,
    description: 'National holiday commemorating the liberation of Sinai.',
    location: 'Campus Closed',
    allDay: true,
    color: 'var(--color-success)',
  },
  {
    id: 6,
    title: 'June 30 Revolution Day',
    type: 'holiday',
    date: '2026-06-30',
    endDate: null,
    description: 'National holiday — university closed.',
    location: 'Campus Closed',
    allDay: true,
    color: 'var(--color-success)',
  },

  // ── Activities (3) ───────────────────────────────────────────────
  {
    id: 7,
    title: 'MIU Tech Fest 2026',
    type: 'activity',
    date: '2026-05-10',
    endDate: '2026-05-11',
    description: 'Annual technology festival — hackathon, demos, and guest speakers.',
    location: 'Hall A — Auditorium',
    allDay: false,
    color: 'var(--brand-primary)',
  },
  {
    id: 8,
    title: 'Inter-Faculty Football Tournament',
    type: 'activity',
    date: '2026-05-17',
    endDate: '2026-05-18',
    description: 'Spring sports tournament — all faculties compete.',
    location: 'MIU Sports Complex',
    allDay: false,
    color: 'var(--brand-primary)',
  },
  {
    id: 9,
    title: 'MIU Coding Club — React Workshop',
    type: 'activity',
    date: '2026-05-06',
    endDate: null,
    description: 'Hands-on React workshop for all skill levels.',
    location: 'Lab C-201',
    allDay: false,
    color: 'var(--brand-primary)',
  },

  // ── Deadlines (2) ────────────────────────────────────────────────
  {
    id: 10,
    title: 'Course Add/Drop Deadline',
    type: 'deadline',
    date: '2026-05-04',
    endDate: null,
    description: 'Last day to add or drop courses without academic penalty.',
    location: 'Online — Student Portal',
    allDay: true,
    color: 'var(--color-warning)',
  },
  {
    id: 11,
    title: 'Senior Project Submission',
    type: 'deadline',
    date: '2026-05-25',
    endDate: null,
    description: 'Final submission for all senior graduation projects.',
    location: 'Online — LMS',
    allDay: true,
    color: 'var(--color-warning)',
  },

  // ── Social (2) ───────────────────────────────────────────────────
  {
    id: 12,
    title: 'Spring 2026 Graduation Ceremony',
    type: 'social',
    date: '2026-06-25',
    endDate: null,
    description: 'Commencement ceremony for the Class of 2026.',
    location: 'MIU Grand Hall',
    allDay: false,
    color: 'var(--color-info)',
  },
  {
    id: 13,
    title: 'New Student Orientation — Fall 2026',
    type: 'social',
    date: '2026-09-01',
    endDate: '2026-09-02',
    description: 'Welcome sessions, campus tours, and faculty meet & greet.',
    location: 'Hall A — Auditorium',
    allDay: false,
    color: 'var(--color-info)',
  },
];

// ─── Internal Helpers ────────────────────────────────────────────────

/**
 * Normalise a value to a Date at midnight.
 * @param {Date|string|number} value
 * @returns {Date}
 */
const toDate = (value) => {
  const d = value instanceof Date ? new Date(value) : new Date(value);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Check whether a specific date falls within an event's date range.
 * Single-day events: date equals event.date.
 * Multi-day events:  event.date <= date <= event.endDate.
 *
 * @param {Object} event
 * @param {Date} date — normalised to midnight
 * @returns {boolean}
 */
const eventOccursOn = (event, date) => {
  const start = toDate(event.date);
  const end = event.endDate ? toDate(event.endDate) : start;
  const d = toDate(date);
  return d >= start && d <= end;
};

/**
 * Check whether an event overlaps with a given month.
 * @param {Object} event
 * @param {number} year
 * @param {number} month — 0-indexed
 * @returns {boolean}
 */
const eventOverlapsMonth = (event, year, month) => {
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0); // last day of month

  const evStart = toDate(event.date);
  const evEnd = event.endDate ? toDate(event.endDate) : evStart;

  return evStart <= monthEnd && evEnd >= monthStart;
};

// ─── Core Event Functions ────────────────────────────────────────────

/**
 * Returns the full events array.
 * @returns {Array<Object>}
 */
export const getEvents = () => MOCK_EVENTS;

/**
 * Returns all events occurring in a given month.
 * Multi-day events that overlap the month boundaries are included.
 *
 * @param {number} year  — e.g. 2026
 * @param {number} month — 0-indexed (0 = January)
 * @returns {Array<Object>}
 */
export const getEventsByMonth = (year, month) =>
  MOCK_EVENTS.filter((e) => eventOverlapsMonth(e, year, month));

/**
 * Returns all events on a specific date.
 * Multi-day events are included if the date falls within their range.
 *
 * @param {Date|string|number} date
 * @returns {Array<Object>}
 */
export const getEventsByDate = (date) => {
  const d = toDate(date);
  return MOCK_EVENTS.filter((e) => eventOccursOn(e, d));
};

/**
 * Returns events filtered by type.
 *
 * @param {"academic"|"holiday"|"activity"|"deadline"|"social"} type
 * @returns {Array<Object>}
 */
export const getEventsByType = (type) => {
  if (!type) return [];
  const t = type.trim().toLowerCase();
  return MOCK_EVENTS.filter((e) => e.type === t);
};

/**
 * Returns the next N upcoming events, sorted soonest-first.
 *
 * @param {number} [limit=5] — max events to return
 * @returns {Array<Object>}
 */
export const getUpcomingEvents = (limit = 5) =>
  MOCK_EVENTS
    .filter((e) => {
      const end = e.endDate || e.date;
      return isUpcoming(end) || isToday(end);
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, limit);

/**
 * Returns all events in the week that contains the given date.
 * Uses `getWeekDays()` from dateUtils (Mon–Sun range).
 *
 * @param {Date|string|number} date
 * @returns {Array<Object>}
 */
export const getEventsForWeek = (date) => {
  const weekDays = getWeekDays(date);
  const weekStart = toDate(weekDays[0]);
  const weekEnd = toDate(weekDays[6]);

  return MOCK_EVENTS.filter((e) => {
    const evStart = toDate(e.date);
    const evEnd = e.endDate ? toDate(e.endDate) : evStart;
    return evStart <= weekEnd && evEnd >= weekStart;
  });
};

// ─── Calendar Helpers ────────────────────────────────────────────────

/**
 * Builds a full 6-week × 7-day calendar grid for the MonthView component.
 *
 * Each cell contains:
 *   { date, dayNumber, isCurrentMonth, isToday, events, hasEvents }
 *
 * @param {number} year  — e.g. 2026
 * @param {number} month — 0-indexed (0 = January)
 * @returns {{
 *   year: number,
 *   month: number,
 *   monthName: string,
 *   days: Array<{
 *     date: Date,
 *     dayNumber: number,
 *     isCurrentMonth: boolean,
 *     isToday: boolean,
 *     events: Array<Object>,
 *     hasEvents: boolean
 *   }>
 * }}
 */
export const getCalendarMonth = (year, month) => {
  const TOTAL_CELLS = 42; // 6 weeks × 7 days
  const firstDay = new Date(year, month, 1);
  const monthEvents = getEventsByMonth(year, month);

  // Day-of-week of the 1st (shift so Monday = 0, Sunday = 6)
  let startOffset = firstDay.getDay() - 1;
  if (startOffset < 0) startOffset = 6; // Sunday → 6

  // Fill cells: prev-month padding → current month → next-month padding
  const days = [];

  for (let i = 0; i < TOTAL_CELLS; i++) {
    const date = new Date(year, month, 1 + (i - startOffset));
    const dayEvents = monthEvents.filter((e) => eventOccursOn(e, date));

    days.push({
      date,
      dayNumber: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
      isToday: isToday(date),
      events: dayEvents,
      hasEvents: dayEvents.length > 0,
    });
  }

  return {
    year,
    month,
    monthName: getMonthName(firstDay),
    days,
  };
};

/**
 * Returns a summary of a month's events for the dashboard.
 *
 * @param {number} year
 * @param {number} month — 0-indexed
 * @returns {{
 *   totalEvents: number,
 *   byType: { academic: number, holiday: number, activity: number, deadline: number, social: number },
 *   nextEvent: Object|null
 * }}
 */
export const getMonthSummary = (year, month) => {
  const events = getEventsByMonth(year, month);

  const byType = {
    academic: 0,
    holiday: 0,
    activity: 0,
    deadline: 0,
    social: 0,
  };

  for (const e of events) {
    if (byType[e.type] !== undefined) {
      byType[e.type]++;
    }
  }

  // Next upcoming event within this month
  const upcoming = events
    .filter((e) => {
      const end = e.endDate || e.date;
      return isUpcoming(end) || isToday(end);
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return {
    totalEvents: events.length,
    byType,
    nextEvent: upcoming.length > 0 ? upcoming[0] : null,
  };
};
