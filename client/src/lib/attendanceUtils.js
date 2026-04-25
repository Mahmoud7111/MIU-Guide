/**
 * @fileoverview Logic for attendance tracking and warning calculations.
 */

/**
 * Calculates attendance percentage.
 * @param {number} present Count of attended classes
 * @param {number} total Total classes held
 */
export const calculateAttendancePercent = (present, total) => {
  if (total === 0) return 100;
  return (present / total) * 100;
};

/**
 * Determines attendance warning level based on percentage.
 * MIU Policy: Warning at 75%, Dismissal at 70%.
 */
export const getAttendanceWarning = (percent) => {
  if (percent < 70) return { level: 'critical', message: 'Filing (Dismissal)' };
  if (percent < 75) return { level: 'warning', message: 'Final Warning' };
  if (percent < 80) return { level: 'caution', message: 'First Warning' };
  return { level: 'safe', message: 'Good Standing' };
};

/**
 * Calculates how many more absences are allowed before hitting a limit.
 */
export const getAllowedAbsences = (present, total, limitPercent = 75) => {
  // Solve for 'x' in: present / (total + x) = limitPercent / 100
  // x = (100 * present / limitPercent) - total
  const maxTotal = (100 * present) / limitPercent;
  const allowed = Math.floor(maxTotal - total);
  return Math.max(0, allowed);
};
