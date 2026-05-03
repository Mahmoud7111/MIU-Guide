/**
 * @fileoverview Date/time utility functions for the MIU Student Portal.
 *
 * Pure JavaScript — no external libraries (no date-fns, no moment.js).
 * Uses the native Date API throughout.
 *
 * Consumed by:
 *   scheduleService.js, eventService.js, useCountdown.js,
 *   CalendarPage, SchedulePage, DashboardPage, ExamsPage
 */

// ─── Internal helpers ────────────────────────────────────────────────

const DAY_NAMES = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday',
];

const DAY_NAMES_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTH_NAMES_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const MS_PER_DAY = 86_400_000; // 24 * 60 * 60 * 1000

/**
 * Normalise any date-like input into a Date object.
 * Accepts Date instances, ISO strings, timestamps, etc.
 */
const toDate = (value) => {
  if (value instanceof Date) return value;
  return new Date(value);
};

/**
 * Return a Date with time set to midnight (start of day) for clean comparisons.
 */
const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

// ─── Day / Time Helpers ──────────────────────────────────────────────

/**
 * Returns today's date as a Date object (midnight).
 * @returns {Date}
 */
export const getToday = () => startOfDay(new Date());

/**
 * Returns today's day name, e.g. "Monday".
 * @returns {string}
 */
export const getTodayName = () => DAY_NAMES[new Date().getDay()];

/**
 * Formats a date as "May 3, 2026".
 * @param {Date|string|number} date
 * @returns {string}
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = toDate(date);
  return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};

/**
 * Formats a date's time portion as "09:30 AM".
 * @param {Date|string|number} date
 * @returns {string}
 */
export const formatTime = (date) => {
  if (!date) return '';
  const d = toDate(date);
  let hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // convert 0 → 12
  const mm = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hours < 10 ? '0' : ''}${hours}:${mm} ${ampm}`;
};

/**
 * Formats a date as "Mon, May 3".
 * @param {Date|string|number} date
 * @returns {string}
 */
export const formatDateShort = (date) => {
  if (!date) return '';
  const d = toDate(date);
  return `${DAY_NAMES_SHORT[d.getDay()]}, ${MONTH_NAMES_SHORT[d.getMonth()]} ${d.getDate()}`;
};

/**
 * Returns true if the given date is today.
 * @param {Date|string|number} date
 * @returns {boolean}
 */
export const isToday = (date) => {
  const d = toDate(date);
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
};

/**
 * Returns true if two dates fall on the same calendar day.
 * @param {Date|string|number} date1
 * @param {Date|string|number} date2
 * @returns {boolean}
 */
export const isSameDay = (date1, date2) => {
  const a = toDate(date1);
  const b = toDate(date2);
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
};

// ─── Week Helpers (SchedulePage – WeekGrid) ──────────────────────────

/**
 * Returns an array of 7 Date objects (Mon → Sun) for the week
 * that contains the given date.
 * @param {Date|string|number} date
 * @returns {Date[]}
 */
export const getWeekDays = (date) => {
  const d = toDate(date);
  const day = d.getDay(); // 0 = Sun … 6 = Sat
  // Offset so Monday = 0.  Sunday (0) becomes 6.
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + mondayOffset);
  monday.setHours(0, 0, 0, 0);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const current = new Date(monday);
    current.setDate(monday.getDate() + i);
    days.push(current);
  }
  return days;
};

/**
 * Returns a human-readable week range string, e.g. "Apr 28 – May 4, 2026".
 * Handles month/year boundaries gracefully.
 * @param {Date|string|number} date
 * @returns {string}
 */
export const getWeekRange = (date) => {
  const days = getWeekDays(date);
  const mon = days[0];
  const sun = days[6];

  const startMonth = MONTH_NAMES_SHORT[mon.getMonth()];
  const endMonth = MONTH_NAMES_SHORT[sun.getMonth()];

  // Same month → "Apr 28 – 30, 2026"
  if (mon.getMonth() === sun.getMonth() && mon.getFullYear() === sun.getFullYear()) {
    return `${startMonth} ${mon.getDate()} – ${sun.getDate()}, ${sun.getFullYear()}`;
  }

  // Different month, same year → "Apr 28 – May 4, 2026"
  if (mon.getFullYear() === sun.getFullYear()) {
    return `${startMonth} ${mon.getDate()} – ${endMonth} ${sun.getDate()}, ${sun.getFullYear()}`;
  }

  // Different year → "Dec 29, 2025 – Jan 4, 2026"
  return `${startMonth} ${mon.getDate()}, ${mon.getFullYear()} – ${endMonth} ${sun.getDate()}, ${sun.getFullYear()}`;
};

/**
 * Returns true if the given date falls within the current week (Mon–Sun).
 * @param {Date|string|number} date
 * @returns {boolean}
 */
export const isCurrentWeek = (date) => {
  const thisWeek = getWeekDays(new Date());
  const monday = startOfDay(thisWeek[0]);
  const sunday = startOfDay(thisWeek[6]);
  sunday.setHours(23, 59, 59, 999);
  const d = toDate(date);
  return d >= monday && d <= sunday;
};

// ─── Month Helpers (CalendarPage – MonthView) ────────────────────────

/**
 * Returns an array of Date objects for every day in the given month.
 * @param {number} year  – e.g. 2026
 * @param {number} month – 0-indexed (0 = January … 11 = December)
 * @returns {Date[]}
 */
export const getMonthDays = (year, month) => {
  const days = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(year, month, d));
  }
  return days;
};

/**
 * Returns "May 2026" for the given date.
 * @param {Date|string|number} date
 * @returns {string}
 */
export const getMonthName = (date) => {
  const d = toDate(date);
  return `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
};

/**
 * Returns the day of the week as a number 0–6 (0 = Sunday).
 * @param {Date|string|number} date
 * @returns {number}
 */
export const getDayOfWeek = (date) => toDate(date).getDay();

// ─── Exam / Countdown Helpers ────────────────────────────────────────

/**
 * Returns the number of whole days until the given date.
 * 0 if the date is today, negative if in the past.
 * @param {Date|string|number} date
 * @returns {number}
 */
export const getDaysUntil = (date) => {
  const target = startOfDay(toDate(date));
  const today = startOfDay(new Date());
  return Math.round((target - today) / MS_PER_DAY);
};

/**
 * Returns true if the date is strictly in the future (not today).
 * @param {Date|string|number} date
 * @returns {boolean}
 */
export const isUpcoming = (date) => getDaysUntil(date) > 0;

/**
 * Returns true if the date is strictly in the past (not today).
 * @param {Date|string|number} date
 * @returns {boolean}
 */
export const isPast = (date) => getDaysUntil(date) < 0;

/**
 * Returns a human-friendly label relative to today:
 *   "Today", "Tomorrow", "Yesterday", "In 3 days", "3 days ago",
 *   or a formatted date if the distance is > 7 days.
 * @param {Date|string|number} date
 * @returns {string}
 */
export const getRelativeLabel = (date) => {
  const diff = getDaysUntil(date);

  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Yesterday';
  if (diff > 1 && diff <= 7) return `In ${diff} days`;
  if (diff < -1 && diff >= -7) return `${Math.abs(diff)} days ago`;

  // Farther away → fall back to full date
  return formatDate(date);
};

// ─── Semester Helpers (Dashboard) ────────────────────────────────────

/**
 * Returns the semester progress as a percentage (0–100).
 * Clamped so it never goes below 0 or above 100.
 * @param {Date|string|number} startDate
 * @param {Date|string|number} endDate
 * @returns {number}
 */
export const getSemesterProgress = (startDate, endDate) => {
  const start = startOfDay(toDate(startDate)).getTime();
  const end = startOfDay(toDate(endDate)).getTime();
  const now = startOfDay(new Date()).getTime();

  if (end === start) return 100; // zero-length semester edge case
  const progress = ((now - start) / (end - start)) * 100;
  return Math.min(100, Math.max(0, Math.round(progress)));
};

/**
 * Returns the number of whole weeks remaining until the given end date.
 * Returns 0 if the date is today or in the past.
 * @param {Date|string|number} endDate
 * @returns {number}
 */
export const getWeeksRemaining = (endDate) => {
  const days = getDaysUntil(endDate);
  if (days <= 0) return 0;
  return Math.ceil(days / 7);
};

// ─── Legacy / Backward-compatible ────────────────────────────────────

/**
 * Returns a relative time string such as "2 hours ago", "just now", etc.
 * Kept for backward compatibility with existing components.
 * @param {Date|string|number} dateString
 * @returns {string}
 */
export const getRelativeTime = (dateString) => {
  const delta = Math.round((+new Date() - +new Date(dateString)) / 1000);
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;

  if (delta < 30) return 'just now';
  if (delta < minute) return `${delta} seconds ago`;
  if (delta < 2 * minute) return 'a minute ago';
  if (delta < hour) return `${Math.floor(delta / minute)} minutes ago`;
  if (delta < day) return `${Math.floor(delta / hour)} hours ago`;
  if (delta < 2 * day) return 'yesterday';
  return `${Math.floor(delta / day)} days ago`;
};
