/**
 * @fileoverview Display formatting utilities for the MIU Student Portal.
 *
 * Pure JavaScript — no external libraries.
 * Works alongside lib/dateUtils.js (date/time formatting lives there).
 *
 * Consumed by:
 *   GpaPage, AttendancePage, DashboardPage, SchedulePage,
 *   and any component that displays numbers, names, or labels.
 */

// ─── Grade Label Map ─────────────────────────────────────────────────

const GRADE_LABELS = {
  'A+': 'Excellent',
  'A':  'Excellent',
  'A-': 'Very Good',
  'B+': 'Very Good',
  'B':  'Good',
  'B-': 'Good',
  'C+': 'Satisfactory',
  'C':  'Satisfactory',
  'C-': 'Acceptable',
  'D+': 'Poor',
  'D':  'Poor',
  'D-': 'Poor',
  'F':  'Fail',
  'W':  'Withdrawn',
  'I':  'Incomplete',
};

// ─── Semester Code Map ───────────────────────────────────────────────

const SEMESTER_PREFIXES = {
  F: 'Fall',
  S: 'Spring',
  U: 'Summer',
  W: 'Winter',
};

// ─── Number Formatters ───────────────────────────────────────────────

/**
 * Formats a GPA value to exactly 2 decimal places.
 * @param {number|string|null} value
 * @returns {string} e.g. "3.70"
 */
export const formatGPA = (value) => {
  if (value == null || value === '') return '0.00';
  return Number(value).toFixed(2);
};

/**
 * Formats a number as a rounded percentage string.
 * @param {number|string|null} value — expected as 0–100, not 0–1
 * @returns {string} e.g. "87%"
 */
export const formatPercent = (value) => {
  if (value == null || value === '') return '0%';
  return `${Math.round(Number(value))}%`;
};

/**
 * Formats a credit-hour count with the "cr." suffix.
 * @param {number|string|null} value
 * @returns {string} e.g. "96 cr."
 */
export const formatCredits = (value) => {
  if (value == null || value === '') return '0 cr.';
  return `${Number(value)} cr.`;
};

/**
 * Returns a grade string with its descriptive label.
 * @param {string|null} grade — letter grade e.g. "A+", "B", "F"
 * @returns {string} e.g. "A+ (Excellent)"
 */
export const formatGrade = (grade) => {
  if (!grade) return '';
  const upper = grade.trim().toUpperCase();
  const label = GRADE_LABELS[upper];
  return label ? `${upper} (${label})` : upper;
};

// ─── Attendance Formatters ───────────────────────────────────────────

/**
 * Returns a status label based on an attendance percentage.
 *   >= 85 → "Safe"
 *   75-84 → "Warning"
 *   < 75  → "Danger"
 * @param {number|null} percent
 * @returns {string}
 */
export const formatAttendanceStatus = (percent) => {
  if (percent == null) return 'Unknown';
  const p = Number(percent);
  if (p >= 85) return 'Safe';
  if (p >= 75) return 'Warning';
  return 'Danger';
};

/**
 * Returns a human-readable absence string.
 * @param {number} attended — sessions attended
 * @param {number} total    — total sessions
 * @returns {string} e.g. "3 absences out of 30"
 */
export const formatAbsences = (attended, total) => {
  if (attended == null || total == null) return '0 absences out of 0';
  const absences = Math.max(0, Number(total) - Number(attended));
  return `${absences} ${absences === 1 ? 'absence' : 'absences'} out of ${total}`;
};

/**
 * Returns the CSS custom-property name matching the attendance band.
 * @param {number|null} percent
 * @returns {string} CSS variable name (without `var()`)
 */
export const formatAttendanceColor = (percent) => {
  if (percent == null) return '--color-danger';
  const p = Number(percent);
  if (p >= 85) return '--color-success';
  if (p >= 75) return '--color-warning';
  return '--color-danger';
};

// ─── GPA Formatters ──────────────────────────────────────────────────

/**
 * Returns the academic-standing label for a given GPA.
 * @param {number|null} gpa
 * @returns {string}
 */
export const formatGPAStatus = (gpa) => {
  if (gpa == null) return 'Unknown';
  const g = Number(gpa);
  if (g >= 3.7) return "Dean's List";
  if (g >= 3.0) return 'Good Standing';
  if (g >= 2.0) return 'Satisfactory';
  return 'Academic Probation';
};

/**
 * Returns a directional label comparing current vs previous GPA.
 * @param {number} current
 * @param {number} previous
 * @returns {string} e.g. "↑ Improved", "↓ Dropped", "→ Stable"
 */
export const formatGPATrend = (current, previous) => {
  if (current == null || previous == null) return '→ Stable';
  const c = Number(current);
  const p = Number(previous);
  if (c > p) return '↑ Improved';
  if (c < p) return '↓ Dropped';
  return '→ Stable';
};

// ─── Text Formatters ─────────────────────────────────────────────────

/**
 * Extracts the first name from a full name string.
 * @param {string|null} fullName
 * @returns {string} e.g. "Mina"
 */
export const formatName = (fullName) => {
  if (!fullName || typeof fullName !== 'string') return '';
  return fullName.trim().split(/\s+/)[0];
};

/**
 * Returns uppercase initials from a full name (for avatar fallbacks).
 * Takes the first letter of the first and last name.
 * @param {string|null} fullName
 * @returns {string} e.g. "ME"
 */
export const formatInitials = (fullName) => {
  if (!fullName || typeof fullName !== 'string') return '';
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Inserts a space between the letter prefix and the number portion of a
 * course code.  e.g. "CS301" → "CS 301", "MATH201" → "MATH 201".
 * If the code already contains a space it is returned as-is.
 * @param {string|null} code
 * @returns {string}
 */
export const formatCourseCode = (code) => {
  if (!code || typeof code !== 'string') return '';
  const trimmed = code.trim();
  // Already formatted
  if (/[A-Za-z]\s+\d/.test(trimmed)) return trimmed;
  // Insert space before first digit run
  return trimmed.replace(/([A-Za-z]+)(\d+)/, '$1 $2');
};

/**
 * Truncates text at `maxLength` and appends "…" if it exceeds the limit.
 * @param {string|null} text
 * @param {number} [maxLength=100]
 * @returns {string}
 */
export const truncate = (text, maxLength = 100) => {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
};

// ─── Exam / Schedule Formatters ──────────────────────────────────────

/**
 * Formats a duration in minutes to a human-readable string.
 * @param {number|null} minutes
 * @returns {string} e.g. "1h 30m", "45m", "0m"
 */
export const formatDuration = (minutes) => {
  if (minutes == null || minutes === '') return '0m';
  const m = Math.max(0, Math.round(Number(minutes)));
  if (m === 0) return '0m';
  const hours = Math.floor(m / 60);
  const mins = m % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

/**
 * Formats a room string into a structured label.
 * Accepts formats like "HallA-204", "Hall A-204", "A204", etc.
 * @param {string|null} room
 * @returns {string} e.g. "Hall A — Room 204"
 */
export const formatRoomCode = (room) => {
  if (!room || typeof room !== 'string') return '';
  const trimmed = room.trim();

  // Try "HallA-204" or "Hall A-204" pattern
  const hallMatch = trimmed.match(/^Hall\s*([A-Za-z])\s*[-–—]\s*(\d+)$/i);
  if (hallMatch) {
    return `Hall ${hallMatch[1].toUpperCase()} — Room ${hallMatch[2]}`;
  }

  // Try compact "A204" pattern (single letter + digits)
  const compactMatch = trimmed.match(/^([A-Za-z])(\d+)$/);
  if (compactMatch) {
    return `Hall ${compactMatch[1].toUpperCase()} — Room ${compactMatch[2]}`;
  }

  // Fallback — return as-is
  return trimmed;
};

/**
 * Converts a semester code to a readable label.
 *   "F2025" → "Fall 2025"
 *   "S2026" → "Spring 2026"
 *   "U2026" → "Summer 2026"
 * @param {string|null} code
 * @returns {string}
 */
export const formatSemester = (code) => {
  if (!code || typeof code !== 'string') return '';
  const trimmed = code.trim();
  const prefix = trimmed[0]?.toUpperCase();
  const year = trimmed.slice(1);
  const season = SEMESTER_PREFIXES[prefix];
  if (!season || !/^\d{4}$/.test(year)) return trimmed;
  return `${season} ${year}`;
};

// ─── Legacy / Backward-compatible ────────────────────────────────────

/**
 * Formats a number to 2 decimal places.
 * Kept for backward compatibility — prefer `formatGPA` for GPA values.
 * @param {number} num
 * @returns {string}
 */
export const formatDecimal = (num) => {
  return Number(num).toFixed(2);
};

/**
 * Formats a number as Egyptian Pound currency.
 * @param {number} amount
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
  }).format(amount);
};

/**
 * Formats a phone number string.
 * @param {string} phone
 * @returns {string}
 */
export const formatPhone = (phone) => {
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

/**
 * Alias for `truncate` — kept for backward compatibility.
 * @param {string} text
 * @param {number} [limit=100]
 * @returns {string}
 */
export const truncateText = (text, limit = 100) => truncate(text, limit);
