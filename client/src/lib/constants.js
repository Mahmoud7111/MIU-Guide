/**
 * @fileoverview Application-wide constants for MIU — Misr International University.
 * Centralizes route strings, navigation links, and sidebar configuration
 * so that a single change propagates everywhere.
 */

/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */

/**
 * All application route strings.
 * Use these instead of hard-coding paths in <Link> and navigate() calls.
 * Dynamic segments (e.g. FACULTY) must be appended at call-site:
 *   `${ROUTES.FACULTY_BASE}/engineering`
 * @type {Object.<string, string>}
 */
export const ROUTES = {
  /** Public landing page */
  HOME: '/',

  /** University overview, history, mission */
  ABOUT: '/about',

  /** Academics overview listing all faculties */
  ACADEMICS: '/academics',

  /** Individual faculty page — :facultyId param resolved at call-site */
  FACULTY: '/academics/:facultyId',

  /** Admissions information and application portal */
  ADMISSIONS: '/admissions',

  /** Student life, clubs, activities */
  STUDENT_LIFE: '/student-life',

  /** University news and announcements */
  NEWS: '/news',

  /** Contact information and inquiry form */
  CONTACT: '/contact',

  /** Interactive campus map */
  CAMPUS: '/campus',

  /** Authentication — sign in */
  LOGIN: '/login',

  /** Authentication — create account */
  REGISTER: '/register',

  /* ---- Protected portal routes ---- */

  /** Portal home dashboard */
  DASHBOARD: '/portal',

  /** GPA calculator tool */
  GPA: '/portal/gpa',

  /** Attendance tracking */
  ATTENDANCE: '/portal/attendance',

  /** Weekly class schedule */
  SCHEDULE: '/portal/schedule',

  /** Exam schedule and results */
  EXAMS: '/portal/exams',

  /** Academic calendar */
  CALENDAR: '/portal/calendar',

  /** Campus map inside portal */
  PORTAL_CAMPUS: '/portal/campus',
};

/* -------------------------------------------------------------------------- */
/*                                 NAV LINKS                                  */
/* -------------------------------------------------------------------------- */

/**
 * Public navigation bar links.
 * Rendered by the Navbar component for unauthenticated (and authenticated) visitors.
 * @type {Array<{ label: string, path: string }>}
 */
export const NAV_LINKS = [
  { label: 'About',        path: ROUTES.ABOUT },
  { label: 'Academics',    path: ROUTES.ACADEMICS },
  { label: 'Admissions',   path: ROUTES.ADMISSIONS },
  { label: 'Student Life', path: ROUTES.STUDENT_LIFE },
  { label: 'News',         path: ROUTES.NEWS },
  { label: 'Contact',      path: ROUTES.CONTACT },
  { label: 'Campus',       path: ROUTES.CAMPUS },
];

/* -------------------------------------------------------------------------- */
/*                               SIDEBAR LINKS                                */
/* -------------------------------------------------------------------------- */

/**
 * Student portal sidebar navigation links.
 * `icon` is a string identifier matched against the icon registry in
 * the PortalSidebar component (e.g. "grid" → <Grid /> from lucide-react).
 * @type {Array<{ label: string, path: string, icon: string }>}
 */
export const SIDEBAR_LINKS = [
  { label: 'Dashboard',      path: ROUTES.DASHBOARD,     icon: 'grid' },
  { label: 'GPA Calculator', path: ROUTES.GPA,           icon: 'bar-chart' },
  { label: 'Attendance',     path: ROUTES.ATTENDANCE,    icon: 'check-circle' },
  { label: 'Schedule',       path: ROUTES.SCHEDULE,      icon: 'calendar' },
  { label: 'Exams',          path: ROUTES.EXAMS,         icon: 'clock' },
  { label: 'Calendar',       path: ROUTES.CALENDAR,      icon: 'calendar' },
  { label: 'Campus Map',     path: ROUTES.PORTAL_CAMPUS, icon: 'map' },
];
