/**
 * @fileoverview Attendance calculation utilities for the MIU Student Portal.
 *
 * Pure JavaScript — no external libraries.
 * Works alongside lib/dateUtils.js and lib/formatters.js.
 *
 * Consumed by:
 *   AttendancePage, DashboardPage, StatCard, and any component
 *   that displays or analyses attendance data.
 *
 * Course object shape:
 *   { name: string, attended: number, total: number }
 */

// ─── Attendance Thresholds (MIU Standard) ────────────────────────────

/**
 * Official MIU attendance-percentage thresholds.
 * @type {{ SAFE: number, WARNING: number, DANGER: number }}
 */
export const ATTENDANCE_THRESHOLDS = {
  SAFE:    85, // >= 85% → green
  WARNING: 75, // 75–84% → amber
  DANGER:   0, // <  75% → crimson + warning badge
};

// ─── Internal Helpers ────────────────────────────────────────────────

/**
 * Round a number to exactly 2 decimal places.
 * @param {number} n
 * @returns {number}
 */
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

/**
 * Ensure a value is a non-negative finite number, defaulting to 0.
 * @param {*} v
 * @returns {number}
 */
const safeNum = (v) => {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

/**
 * Ensure `courses` is an array and filter out falsy entries.
 * @param {*} courses
 * @returns {Array}
 */
const safeCourses = (courses) =>
  Array.isArray(courses) ? courses.filter(Boolean) : [];

// ─── Core Calculations ──────────────────────────────────────────────

/**
 * Calculates the attendance percentage.
 *
 * @param {number} attended — sessions attended
 * @param {number} total    — total sessions
 * @returns {number} Percentage rounded to 2 decimals (0 if total is 0)
 */
export const calculateAttendancePercent = (attended, total) => {
  const a = safeNum(attended);
  const t = safeNum(total);
  if (t === 0) return 0;
  return round2((a / t) * 100);
};

/**
 * Returns the number of absences.
 *
 * @param {number} attended
 * @param {number} total
 * @returns {number}
 */
export const calculateAbsences = (attended, total) => {
  const a = safeNum(attended);
  const t = safeNum(total);
  return Math.max(0, t - a);
};

/**
 * Returns the maximum number of absences allowed before hitting
 * the danger zone (< 75%).
 *
 * Formula: total − ⌈total × 0.75⌉
 *
 * @param {number} total — total sessions in the course
 * @returns {number}
 */
export const calculateAllowedAbsences = (total) => {
  const t = safeNum(total);
  if (t === 0) return 0;
  const minRequired = Math.ceil(t * (ATTENDANCE_THRESHOLDS.WARNING / 100));
  return Math.max(0, t - minRequired);
};

/**
 * Returns how many consecutive sessions a student must attend
 * to reach a target attendance percentage.
 *
 * Returns 0 if the student is already at or above the target.
 *
 * @param {number} attended       — sessions attended so far
 * @param {number} total          — total sessions so far
 * @param {number} targetPercent  — desired percentage (default 85)
 * @returns {number} Sessions needed (0 if already met)
 */
export const calculateSessionsNeeded = (
  attended,
  total,
  targetPercent = ATTENDANCE_THRESHOLDS.SAFE,
) => {
  const a = safeNum(attended);
  const t = safeNum(total);
  const target = Number(targetPercent);

  const currentPercent = t === 0 ? 100 : (a / t) * 100;
  if (currentPercent >= target) return 0;

  // Solve: (a + x) / (t + x) = target / 100
  //   100(a + x) = target(t + x)
  //   100a + 100x = target*t + target*x
  //   x(100 - target) = target*t - 100*a
  //   x = (target*t - 100*a) / (100 - target)
  if (target >= 100) return Infinity;
  const x = (target * t - 100 * a) / (100 - target);
  return x <= 0 ? 0 : Math.ceil(x);
};

// ─── Status & Risk ───────────────────────────────────────────────────

/**
 * Returns a status label based on an attendance percentage.
 *
 * @param {number} percent
 * @returns {"Safe"|"Warning"|"Danger"}
 */
export const getAttendanceStatus = (percent) => {
  const p = Number(percent);
  if (p >= ATTENDANCE_THRESHOLDS.SAFE) return 'Safe';
  if (p >= ATTENDANCE_THRESHOLDS.WARNING) return 'Warning';
  return 'Danger';
};

/**
 * Returns a comprehensive risk assessment for a single course.
 *
 * @param {number} attended
 * @param {number} total
 * @returns {{
 *   status: string,
 *   percent: number,
 *   absences: number,
 *   allowedAbsences: number,
 *   canAfford: boolean,
 *   sessionsNeeded: number
 * }}
 */
export const getAttendanceRisk = (attended, total) => {
  const percent = calculateAttendancePercent(attended, total);
  const absences = calculateAbsences(attended, total);
  const allowedAbsences = calculateAllowedAbsences(total);

  return {
    status: getAttendanceStatus(percent),
    percent,
    absences,
    allowedAbsences,
    canAfford: absences < allowedAbsences,
    sessionsNeeded: calculateSessionsNeeded(attended, total, ATTENDANCE_THRESHOLDS.SAFE),
  };
};

/**
 * Returns true if the student is in danger (< 75%).
 *
 * @param {number} percent
 * @returns {boolean}
 */
export const isAtRisk = (percent) =>
  Number(percent) < ATTENDANCE_THRESHOLDS.WARNING;

/**
 * Returns true if the student is in the warning band (75–84%).
 *
 * @param {number} percent
 * @returns {boolean}
 */
export const isInWarning = (percent) => {
  const p = Number(percent);
  return p >= ATTENDANCE_THRESHOLDS.WARNING && p < ATTENDANCE_THRESHOLDS.SAFE;
};

/**
 * Returns true if the student is safe (>= 85%).
 *
 * @param {number} percent
 * @returns {boolean}
 */
export const isSafe = (percent) =>
  Number(percent) >= ATTENDANCE_THRESHOLDS.SAFE;

// ─── Course-level Analysis ───────────────────────────────────────────

/**
 * Calculates overall attendance across multiple courses.
 *
 * @param {Array<{name: string, attended: number, total: number}>} courses
 * @returns {number} Overall percentage (2 decimals)
 */
export const getOverallAttendance = (courses) => {
  const list = safeCourses(courses);
  if (list.length === 0) return 0;

  let totalAttended = 0;
  let totalSessions = 0;

  for (const c of list) {
    totalAttended += safeNum(c.attended);
    totalSessions += safeNum(c.total);
  }

  return calculateAttendancePercent(totalAttended, totalSessions);
};

/**
 * Returns courses where attendance is below 75% (danger).
 *
 * @param {Array<{name: string, attended: number, total: number}>} courses
 * @returns {Array}
 */
export const getAtRiskCourses = (courses) =>
  safeCourses(courses).filter((c) =>
    isAtRisk(calculateAttendancePercent(safeNum(c.attended), safeNum(c.total))),
  );

/**
 * Returns courses where attendance is 75–84% (warning).
 *
 * @param {Array<{name: string, attended: number, total: number}>} courses
 * @returns {Array}
 */
export const getWarningCourses = (courses) =>
  safeCourses(courses).filter((c) =>
    isInWarning(calculateAttendancePercent(safeNum(c.attended), safeNum(c.total))),
  );

/**
 * Returns the course with the highest attendance percentage.
 *
 * @param {Array<{name: string, attended: number, total: number}>} courses
 * @returns {object|null}
 */
export const getBestAttendance = (courses) => {
  const list = safeCourses(courses);
  if (list.length === 0) return null;

  return list.reduce((best, c) => {
    const bp = calculateAttendancePercent(safeNum(best.attended), safeNum(best.total));
    const cp = calculateAttendancePercent(safeNum(c.attended), safeNum(c.total));
    return cp > bp ? c : best;
  });
};

/**
 * Returns the course with the lowest attendance percentage.
 *
 * @param {Array<{name: string, attended: number, total: number}>} courses
 * @returns {object|null}
 */
export const getWorstAttendance = (courses) => {
  const list = safeCourses(courses);
  if (list.length === 0) return null;

  return list.reduce((worst, c) => {
    const wp = calculateAttendancePercent(safeNum(worst.attended), safeNum(worst.total));
    const cp = calculateAttendancePercent(safeNum(c.attended), safeNum(c.total));
    return cp < wp ? c : worst;
  });
};

/**
 * Returns a new array of courses sorted by attendance percentage.
 *
 * @param {Array<{name: string, attended: number, total: number}>} courses
 * @param {"asc"|"desc"} [order="desc"] — sort direction
 * @returns {Array}
 */
export const sortCoursesByAttendance = (courses, order = 'desc') => {
  const list = safeCourses(courses);

  return [...list].sort((a, b) => {
    const ap = calculateAttendancePercent(safeNum(a.attended), safeNum(a.total));
    const bp = calculateAttendancePercent(safeNum(b.attended), safeNum(b.total));
    return order === 'asc' ? ap - bp : bp - ap;
  });
};

// ─── Projection ──────────────────────────────────────────────────────

/**
 * Simulates future attendance if the student attends (or skips)
 * a number of upcoming sessions.
 *
 * @param {number} attended        — sessions attended so far
 * @param {number} total           — total sessions so far
 * @param {number} futureSessions  — upcoming sessions to simulate
 * @param {boolean} [willAttend=true] — true = attending, false = skipping
 * @returns {{
 *   projectedPercent: number,
 *   projectedStatus: string,
 *   safe: boolean
 * }}
 */
export const projectAttendance = (
  attended,
  total,
  futureSessions,
  willAttend = true,
) => {
  const a = safeNum(attended);
  const t = safeNum(total);
  const f = safeNum(futureSessions);

  const newAttended = willAttend ? a + f : a;
  const newTotal = t + f;

  const projectedPercent = calculateAttendancePercent(newAttended, newTotal);
  const projectedStatus = getAttendanceStatus(projectedPercent);

  return {
    projectedPercent,
    projectedStatus,
    safe: isSafe(projectedPercent),
  };
};

/**
 * Returns the minimum number of sessions the student must attend
 * from all remaining classes to stay at or above 75%.
 *
 * If the student is already above 75% with zero more sessions, returns 0.
 * If it's mathematically impossible (already too many absences), returns -1.
 *
 * @param {number} attended         — sessions attended so far
 * @param {number} total            — total sessions so far
 * @param {number} [remaining]      — remaining sessions in the semester
 *                                    (if omitted, assumes unlimited future)
 * @returns {number} Minimum sessions to attend, 0 if already safe, -1 if impossible
 */
export const getMinSessionsToPass = (attended, total, remaining) => {
  const a = safeNum(attended);
  const t = safeNum(total);
  const target = ATTENDANCE_THRESHOLDS.WARNING; // 75

  // If no remaining sessions provided, just check current status
  if (remaining === undefined || remaining === null) {
    const current = t === 0 ? 100 : (a / t) * 100;
    return current >= target ? 0 : -1;
  }

  const r = safeNum(remaining);

  // Try every count from 0 to remaining
  for (let x = 0; x <= r; x++) {
    const percent = ((a + x) / (t + r)) * 100;
    if (percent >= target) return x;
  }

  // Impossible — even attending all remaining won't be enough
  return -1;
};

// ─── Legacy / Backward-compatible ────────────────────────────────────

/**
 * Returns a warning-level object based on MIU policy thresholds.
 * Kept for backward compatibility with existing components.
 *
 * @param {number} percent
 * @returns {{ level: string, message: string }}
 */
export const getAttendanceWarning = (percent) => {
  if (percent < 70) return { level: 'critical', message: 'Filing (Dismissal)' };
  if (percent < 75) return { level: 'warning', message: 'Final Warning' };
  if (percent < 80) return { level: 'caution', message: 'First Warning' };
  return { level: 'safe', message: 'Good Standing' };
};

/**
 * Calculates how many more absences are allowed before hitting a limit.
 * Kept for backward compatibility — prefer `calculateAllowedAbsences`.
 *
 * @param {number} present
 * @param {number} total
 * @param {number} [limitPercent=75]
 * @returns {number}
 */
export const getAllowedAbsences = (present, total, limitPercent = 75) => {
  const maxTotal = (100 * present) / limitPercent;
  const allowed = Math.floor(maxTotal - total);
  return Math.max(0, allowed);
};
