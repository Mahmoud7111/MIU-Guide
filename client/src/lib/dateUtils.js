/**
 * @fileoverview Date manipulation utilities.
 */

/**
 * Formats a date string into a readable format (e.g. March 15, 2024).
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Checks if a date is today.
 */
export const isToday = (dateString) => {
  const d = new Date(dateString);
  const today = new Date();
  return d.getDate() === today.getDate() &&
         d.getMonth() === today.getMonth() &&
         d.getFullYear() === today.getFullYear();
};

/**
 * Returns the time relative to now (e.g. "2 hours ago").
 * Simple implementation for basic needs.
 */
export const getRelativeTime = (dateString) => {
  const delta = Math.round((+new Date() - +new Date(dateString)) / 1000);
  const minute = 60, hour = minute * 60, day = hour * 24;

  if (delta < 30) return 'just now';
  if (delta < minute) return delta + ' seconds ago';
  if (delta < 2 * minute) return 'a minute ago';
  if (delta < hour) return Math.floor(delta / minute) + ' minutes ago';
  if (delta < day) return Math.floor(delta / hour) + ' hours ago';
  if (delta < 2 * day) return 'yesterday';
  return Math.floor(delta / day) + ' days ago';
};
