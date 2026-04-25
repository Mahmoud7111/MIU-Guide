/**
 * @fileoverview Configured Axios instance for all MIU API requests.
 *
 * Features:
 *  - baseURL from VITE_API_URL env variable with a localhost fallback
 *  - 10-second request timeout
 *  - Automatic JWT attachment via request interceptor
 *  - Standardised error shape from response interceptor
 *  - 401 auto-logout: clears the same localStorage keys used by AuthContext
 *    (miu_token, miu_user) and redirects to /login. 
 
 *
 * Import this instance instead of plain axios everywhere in the app:
 *   import http from '@/lib/api/http'; 
 */

import axios from 'axios';

/* -------------------------------------------------------------------------- */
/*                              AXIOS INSTANCE                                */
/* -------------------------------------------------------------------------- */

/**
 * Pre-configured Axios instance with base URL, timeout, and default headers.
 * All interceptors are attached below.
 */
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* -------------------------------------------------------------------------- */
/*                            REQUEST INTERCEPTOR                               */
/* -------------------------------------------------------------------------- */

/**
 * Attaches the stored JWT to every outgoing request.
 * If no token is present the Authorization header is omitted — the API
 * decides whether to allow the unauthenticated request.
 */
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('miu_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* -------------------------------------------------------------------------- */
/*                           RESPONSE INTERCEPTOR                               */
/* -------------------------------------------------------------------------- */

/**
 * Normalises successful responses and converts Axios errors into a clean,
 * predictable shape so callers never need to inspect the raw Axios error.
 *
 * On 401 the session data is wiped from localStorage (same keys as
 * AuthContext) and the user is redirected to /login to avoid a circular
 * dependency on the context module.
 *
 * @typedef {Object} ApiError
 * @property {number}      status  - HTTP status code (0 for network errors).
 * @property {string}      message - Human-readable error message.
 * @property {Object|null} data    - Raw response data from the server, if any.
 */
http.interceptors.response.use(
  /* Success: pass through unchanged */
  (response) => response,

  /* Error: normalise and handle special cases */
  (error) => {
    const status = error.response?.status ?? 0;
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'An unexpected error occurred.';
    const data = error.response?.data ?? null;

    /* 401 Unauthorised — token expired or invalid */
    if (status === 401) {
      localStorage.removeItem('miu_token');
      localStorage.removeItem('miu_user');

      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    /** @type {ApiError} */
    return Promise.reject({ status, message, data });
  }
);

export default http;