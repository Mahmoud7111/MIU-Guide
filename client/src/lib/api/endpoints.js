/**
 * @fileoverview Centralised API endpoint strings for MIU.
  endpoints.js is a file that contains all the API endpoints for the application, which means endpoint is the URL of the API.
  
 * 
 * All paths are relative to the baseURL configured in lib/api/http.js.
 * Dynamic endpoints are functions so callers stay readable:
 *
 *   import { ENDPOINTS } from '@/lib/api/endpoints';
 *
 *   http.get(ENDPOINTS.ACADEMICS.FACULTY('engineering'));
 *   http.post(ENDPOINTS.AUTH.LOGIN, payload);
 *   http.get(ENDPOINTS.STUDENT.GPA);
 */

/* -------------------------------------------------------------------------- */
/*                              ENDPOINTS OBJECT                                */
/* -------------------------------------------------------------------------- */

/**
 * Grouped API endpoint definitions for the entire MIU application.
 * Static endpoints are strings; dynamic endpoints are functions returning strings.
 *
 * @type {Object}
 */
export const ENDPOINTS = {
  /* ---------------------------------------------------------------------- */
  /*                              AUTH                                        */
  /* ---------------------------------------------------------------------- */

  /**
   * Authentication endpoints.
   * All routes are public (no JWT required).
   */
  AUTH: {
    /** POST — exchange credentials for a JWT token */
    LOGIN: '/auth/login',

    /** POST — create a new student / staff account */
    REGISTER: '/auth/register',

    /** POST — invalidate the current JWT on the server */
    LOGOUT: '/auth/logout',

    /** POST — exchange a refresh token for a new access token */
    REFRESH_TOKEN: '/auth/refresh-token',
  },

  /* ---------------------------------------------------------------------- */
  /*                            ACADEMICS                                     */
  /* ---------------------------------------------------------------------- */

  /**
   * Academic content — faculties and programmes.
   * GET requests are public; POST/PUT/DELETE require admin JWT.
   */
  ACADEMICS: {
    /** GET — list all faculties */
    FACULTIES: '/academics/faculties',

    /**
     * GET — single faculty by slug or ID.
     * @param {string|number} id - Faculty slug or numeric ID.
     * @returns {string}
     */
    FACULTY: (id) => `/academics/faculties/${id}`,

    /** GET — list all programmes across all faculties */
    PROGRAMS: '/academics/programs',

    /**
     * GET — single programme by slug or ID.
     * @param {string|number} id - Programme slug or numeric ID.
     * @returns {string}
     */
    PROGRAM: (id) => `/academics/programs/${id}`,
  },

  /* ---------------------------------------------------------------------- */
  /*                               NEWS                                       */
  /* ---------------------------------------------------------------------- */

  /**
   * News articles and university events — all public GET endpoints.
   */
  NEWS: {
    /** GET — paginated list of news articles */
    LIST: '/news',

    /**
     * GET — single news article by ID.
     * @param {string|number} id - Article ID.
     * @returns {string}
     */
    SINGLE: (id) => `/news/${id}`,

    /** GET — list of upcoming and past university events */
    EVENTS: '/news/events',
  },

  /* ---------------------------------------------------------------------- */
  /*                              CAMPUS                                      */
  /* ---------------------------------------------------------------------- */

  /**
   * Campus map data — buildings, floors, and rooms.
   * All public GET endpoints; used by the interactive campus map pages.
   */
  CAMPUS: {
    /** GET — list all campus buildings */
    BUILDINGS: '/campus/buildings',

    /**
     * GET — single building with floor plan metadata.
     * @param {string|number} id - Building ID.
     * @returns {string}
     */
    BUILDING: (id) => `/campus/buildings/${id}`,

    /** GET — list all rooms across all buildings */
    ROOMS: '/campus/rooms',

    /**
     * GET — single room with capacity and schedule data.
     * @param {string|number} id - Room ID.
     * @returns {string}
     */
    ROOM: (id) => `/campus/rooms/${id}`,
  },

  /* ---------------------------------------------------------------------- */
  /*                              STUDENT                                     */
  /* ---------------------------------------------------------------------- */

  /**
   * Authenticated student portal endpoints.
   * All require a valid JWT (attached automatically by http.js interceptor).
   */
  STUDENT: {
    /** GET — weekly class schedule for the authenticated student */
    SCHEDULE: '/student/schedule',

    /** GET — attendance records grouped by course */
    ATTENDANCE: '/student/attendance',

    /** GET — current GPA breakdown and credit summary */
    GPA: '/student/gpa',

    /** GET — upcoming and past exam schedule */
    EXAMS: '/student/exams',

    /** GET — academic calendar events for the student's cohort */
    CALENDAR_EVENTS: '/student/calendar',

    /** GET/PUT — authenticated student profile data */
    PROFILE: '/student/profile',
  },
};
