import { useState, useEffect, useRef, useMemo } from 'react';
import { getDaysUntil, isToday, getRelativeLabel } from '../lib/dateUtils';

// ─── Internal helpers ────────────────────────────────────────────────

/**
 * The "all zeros" object returned when the target date is
 * null, invalid, or already past.
 */
const EXPIRED_STATE = Object.freeze({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  total: 0,
  isExpired: true,
  isToday: false,
  isTomorrow: false,
  label: 'Expired',
  urgency: 'low',
});

/**
 * Try to coerce any input into a valid Date.
 * Returns `null` if the value is missing or produces an invalid date.
 * @param {*} value
 * @returns {Date|null}
 */
const toValidDate = (value) => {
  if (value == null) return null;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

/**
 * Determine urgency tier based on how many days remain.
 * @param {number} daysLeft
 * @returns {"low"|"medium"|"high"|"critical"}
 */
const getUrgency = (daysLeft) => {
  if (daysLeft <= 1) return 'critical'; // today or tomorrow
  if (daysLeft <= 3) return 'high';     // 1–3 days
  if (daysLeft <= 7) return 'medium';   // 3–7 days
  return 'low';                         // > 7 days
};

/**
 * Build the full countdown state object from a target Date.
 * @param {Date} target
 * @returns {object}
 */
const calculateCountdown = (target) => {
  const now = Date.now();
  const total = target.getTime() - now;

  // Already past
  if (total <= 0) {
    return { ...EXPIRED_STATE, isToday: isToday(target) };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours   = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days    = Math.floor(total / (1000 * 60 * 60 * 24));

  const daysUntil   = getDaysUntil(target);
  const todayFlag   = isToday(target);
  const tomorrowFlag = daysUntil === 1;

  // Build a label — reuse dateUtils for the friendly string
  let label;
  if (todayFlag) {
    label = 'Today';
  } else if (tomorrowFlag) {
    label = 'Tomorrow';
  } else {
    label = getRelativeLabel(target);
  }

  return {
    days,
    hours,
    minutes,
    seconds,
    total,
    isExpired: false,
    isToday: todayFlag,
    isTomorrow: tomorrowFlag,
    label,
    urgency: getUrgency(daysUntil),
  };
};

// ─── Hook ────────────────────────────────────────────────────────────

/**
 * Live countdown timer hook for exam dates and deadlines.
 *
 * Ticks every second and returns a rich state object describing
 * the time remaining, urgency level, and friendly label.
 *
 * @param {Date|string|number|null} targetDate
 *   — The date/time to count down to.
 *     Accepts a Date instance, ISO string, or timestamp.
 *     Pass `null`/`undefined` to get an expired state.
 *
 * @returns {{
 *   days: number,
 *   hours: number,
 *   minutes: number,
 *   seconds: number,
 *   total: number,
 *   isExpired: boolean,
 *   isToday: boolean,
 *   isTomorrow: boolean,
 *   label: string,
 *   urgency: "low"|"medium"|"high"|"critical"
 * }}
 *
 * @example
 * const { days, hours, minutes, seconds, urgency, label } = useCountdown(exam.date);
 *
 * // urgency → CSS variable mapping:
 * //   "low"      → var(--color-success)
 * //   "medium"   → var(--color-primary)
 * //   "high"     → var(--color-warning)
 * //   "critical" → var(--color-danger)
 */
export const useCountdown = (targetDate) => {
  // Memoise the parsed date so we only recalculate when the
  // serialised value actually changes (avoids infinite re-renders
  // if the caller passes a new Date object every render).
  const targetKey = useMemo(() => {
    const d = toValidDate(targetDate);
    return d ? d.getTime() : null;
  }, [targetDate]);

  const [countdown, setCountdown] = useState(() => {
    if (targetKey === null) return EXPIRED_STATE;
    return calculateCountdown(new Date(targetKey));
  });

  const intervalRef = useRef(null);

  useEffect(() => {
    // ── No valid target → return expired immediately ──────────────
    if (targetKey === null) {
      setCountdown(EXPIRED_STATE);
      return;
    }

    const target = new Date(targetKey);

    // Compute initial state right away (no 1-second delay)
    const initial = calculateCountdown(target);
    setCountdown(initial);

    // If already expired, no need to start the interval
    if (initial.isExpired) return;

    // ── Tick every second ─────────────────────────────────────────
    intervalRef.current = setInterval(() => {
      const next = calculateCountdown(target);
      setCountdown(next);

      // Auto-stop once expired
      if (next.isExpired && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 1000);

    // ── Cleanup on unmount or targetDate change ──────────────────
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [targetKey]);

  return countdown;
};
