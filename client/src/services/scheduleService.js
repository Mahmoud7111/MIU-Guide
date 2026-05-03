/**
 * @fileoverview Schedule & exam service for the MIU Student Portal.
 *
 * All data is mocked — no real API calls.
 * When a backend is introduced, swap the mock arrays for fetch() calls
 * and make the exported functions async.
 *
 * Consumed by:
 *   SchedulePage, ExamsPage, DashboardPage, CalendarPage
 */

import { getTodayName, isUpcoming, isPast } from '../lib/dateUtils';

// ─── Mock Data ───────────────────────────────────────────────────────

/** @type {Array<Object>} Full semester course schedule. */
const MOCK_SCHEDULE = [
  {
    id: 1,
    courseCode: 'CS301',
    courseName: 'Data Structures & Algorithms',
    instructor: 'Dr. Ahmed Hassan',
    room: 'A204',
    building: 'Hall A',
    days: ['Sunday', 'Tuesday'],
    startTime: '09:00',
    endTime: '10:30',
    credits: 3,
    color: 'var(--color-primary)',
  },
  {
    id: 2,
    courseCode: 'CS312',
    courseName: 'Database Systems',
    instructor: 'Dr. Mona El-Sayed',
    room: 'B102',
    building: 'Hall B',
    days: ['Sunday', 'Wednesday'],
    startTime: '11:00',
    endTime: '12:30',
    credits: 3,
    color: 'var(--color-info)',
  },
  {
    id: 3,
    courseCode: 'MATH241',
    courseName: 'Linear Algebra',
    instructor: 'Dr. Khaled Mostafa',
    room: 'C301',
    building: 'Hall C',
    days: ['Monday', 'Wednesday'],
    startTime: '09:00',
    endTime: '10:30',
    credits: 3,
    color: 'var(--color-warning)',
  },
  {
    id: 4,
    courseCode: 'CS320',
    courseName: 'Operating Systems',
    instructor: 'Dr. Nadia Farouk',
    room: 'A105',
    building: 'Hall A',
    days: ['Monday', 'Thursday'],
    startTime: '11:00',
    endTime: '12:30',
    credits: 3,
    color: 'var(--color-danger)',
  },
  {
    id: 5,
    courseCode: 'HUM202',
    courseName: 'Technical Writing',
    instructor: 'Dr. Yasmin Abdel-Latif',
    room: 'D210',
    building: 'Hall D',
    days: ['Tuesday', 'Thursday'],
    startTime: '13:00',
    endTime: '14:30',
    credits: 2,
    color: 'var(--color-success)',
  },
  {
    id: 6,
    courseCode: 'CS350',
    courseName: 'Software Engineering',
    instructor: 'Dr. Omar Mansour',
    room: 'B205',
    building: 'Hall B',
    days: ['Sunday', 'Tuesday', 'Thursday'],
    startTime: '14:30',
    endTime: '16:00',
    credits: 3,
    color: 'var(--brand-primary)',
  },
];

/** @type {Array<Object>} Exam schedule — mix of upcoming and past. */
const MOCK_EXAMS = [
  {
    id: 1,
    courseCode: 'CS301',
    courseName: 'Data Structures & Algorithms',
    type: 'Midterm',
    date: '2026-04-20T10:00:00',
    duration: 120,
    room: 'B101',
    building: 'Hall B',
    notes: 'Chapters 1–5, closed book',
  },
  {
    id: 2,
    courseCode: 'MATH241',
    courseName: 'Linear Algebra',
    type: 'Midterm',
    date: '2026-04-22T09:00:00',
    duration: 90,
    room: 'C301',
    building: 'Hall C',
    notes: 'Chapters 1–4, formula sheet allowed',
  },
  {
    id: 3,
    courseCode: 'CS312',
    courseName: 'Database Systems',
    type: 'Quiz',
    date: '2026-05-01T11:00:00',
    duration: 30,
    room: 'B102',
    building: 'Hall B',
    notes: 'SQL joins & normalization',
  },
  {
    id: 4,
    courseCode: 'CS301',
    courseName: 'Data Structures & Algorithms',
    type: 'Final',
    date: '2026-06-10T10:00:00',
    duration: 180,
    room: 'A101',
    building: 'Hall A',
    notes: 'Comprehensive — all chapters',
  },
  {
    id: 5,
    courseCode: 'CS320',
    courseName: 'Operating Systems',
    type: 'Midterm',
    date: '2026-05-08T11:00:00',
    duration: 120,
    room: 'A105',
    building: 'Hall A',
    notes: 'Process management & scheduling',
  },
  {
    id: 6,
    courseCode: 'CS350',
    courseName: 'Software Engineering',
    type: 'Final',
    date: '2026-06-15T14:00:00',
    duration: 150,
    room: 'B205',
    building: 'Hall B',
    notes: 'UML, Agile, testing — open notes',
  },
  {
    id: 7,
    courseCode: 'MATH241',
    courseName: 'Linear Algebra',
    type: 'Final',
    date: '2026-06-12T09:00:00',
    duration: 120,
    room: 'C301',
    building: 'Hall C',
    notes: 'Comprehensive — all chapters',
  },
  {
    id: 8,
    courseCode: 'HUM202',
    courseName: 'Technical Writing',
    type: 'Final',
    date: '2026-06-08T13:00:00',
    duration: 90,
    room: 'D210',
    building: 'Hall D',
    notes: 'Essay + report formatting',
  },
];

/** MIU working days (Sun–Thu). */
const MIU_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

// ─── Internal Helpers ────────────────────────────────────────────────

/**
 * Converts a "HH:MM" string into total minutes since midnight.
 * @param {string} time — e.g. "09:30"
 * @returns {number}
 */
const timeToMinutes = (time) => {
  if (!time || typeof time !== 'string') return 0;
  const [h, m] = time.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
};

// ─── Schedule Functions ──────────────────────────────────────────────

/**
 * Returns the full course schedule array.
 * @returns {Array<Object>}
 */
export const getSchedule = () => MOCK_SCHEDULE;

/**
 * Returns courses happening today.
 * Uses `getTodayName()` from dateUtils to match against each
 * course's `days` array.
 *
 * @returns {Array<Object>}
 */
export const getTodaySchedule = () => {
  const today = getTodayName();
  return MOCK_SCHEDULE.filter((c) => c.days.includes(today));
};

/**
 * Returns courses scheduled on a specific day.
 *
 * @param {string} dayName — e.g. "Monday"
 * @returns {Array<Object>}
 */
export const getScheduleByDay = (dayName) => {
  if (!dayName || typeof dayName !== 'string') return [];
  const normalised = dayName.trim();
  return MOCK_SCHEDULE.filter((c) => c.days.includes(normalised));
};

/**
 * Returns the weekly schedule organised by day (Sun–Thu).
 *
 * @returns {Record<string, Array<Object>>}
 * @example
 * {
 *   Sunday:    [course1, course6],
 *   Monday:    [course3, course4],
 *   Tuesday:   [course1, course5, course6],
 *   Wednesday: [course2, course3],
 *   Thursday:  [course4, course5, course6],
 * }
 */
export const getWeekSchedule = () => {
  const week = {};
  for (const day of MIU_DAYS) {
    week[day] = getScheduleByDay(day);
  }
  return week;
};

/**
 * Returns a single course by its ID.
 *
 * @param {number|string} id
 * @returns {Object|null}
 */
export const getCourseById = (id) => {
  if (id == null) return null;
  return MOCK_SCHEDULE.find((c) => c.id === Number(id)) ?? null;
};

/**
 * Checks whether two courses overlap in time on any shared day.
 *
 * Two time ranges [startA, endA) and [startB, endB) overlap when:
 *   startA < endB  AND  startB < endA
 *
 * @param {Object} courseA
 * @param {Object} courseB
 * @returns {boolean}
 */
export const hasConflict = (courseA, courseB) => {
  if (!courseA || !courseB) return false;
  if (courseA.id === courseB.id) return false;

  // Check if they share at least one day
  const sharedDay = courseA.days.some((d) => courseB.days.includes(d));
  if (!sharedDay) return false;

  // Check time overlap
  const startA = timeToMinutes(courseA.startTime);
  const endA   = timeToMinutes(courseA.endTime);
  const startB = timeToMinutes(courseB.startTime);
  const endB   = timeToMinutes(courseB.endTime);

  return startA < endB && startB < endA;
};

// ─── Exam Functions ──────────────────────────────────────────────────

/**
 * Returns the full exam schedule array.
 * @returns {Array<Object>}
 */
export const getExams = () => MOCK_EXAMS;

/**
 * Returns upcoming exams (date in the future), sorted soonest-first.
 *
 * @returns {Array<Object>}
 */
export const getUpcomingExams = () =>
  MOCK_EXAMS
    .filter((e) => isUpcoming(e.date))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

/**
 * Returns past exams (date in the past), sorted most-recent-first.
 *
 * @returns {Array<Object>}
 */
export const getPastExams = () =>
  MOCK_EXAMS
    .filter((e) => isPast(e.date))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

/**
 * Returns the single nearest upcoming exam, or `null` if none remain.
 *
 * @returns {Object|null}
 */
export const getNextExam = () => {
  const upcoming = getUpcomingExams();
  return upcoming.length > 0 ? upcoming[0] : null;
};

/**
 * Returns exams filtered by type.
 *
 * @param {"Midterm"|"Final"|"Quiz"} type
 * @returns {Array<Object>}
 */
export const getExamsByType = (type) => {
  if (!type) return [];
  return MOCK_EXAMS.filter(
    (e) => e.type.toLowerCase() === type.trim().toLowerCase(),
  );
};

/**
 * Returns all exams for a specific course code.
 *
 * @param {string} courseCode — e.g. "CS301"
 * @returns {Array<Object>}
 */
export const getExamsByCourse = (courseCode) => {
  if (!courseCode) return [];
  const code = courseCode.trim().toUpperCase();
  return MOCK_EXAMS.filter((e) => e.courseCode.toUpperCase() === code);
};
