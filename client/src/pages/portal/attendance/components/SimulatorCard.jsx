import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '@/components/ui/Input';
import styles from '../AttendancePage.module.css';

/**
 * SimulatorCard - Single course simulator row
 *
 * @param {Object} props
 * @param {Object} props.course - Course data
 * @param {Object} props.simInputs - Persisted simulator inputs
 * @param {function} props.setSimInputs - Setter for simulator inputs
 * @param {Object} props.attendanceUtils - Attendance utility functions
 * @param {Object} props.formatters - Formatter utility functions
 */
const SimulatorCard = ({
  course,
  simInputs,
  setSimInputs,
  attendanceUtils,
  formatters,
}) => {
  const remainingValue =
    simInputs[course.id]?.remaining ?? `${course.remainingSessions}`;
  const plannedValue =
    simInputs[course.id]?.planned ?? `${Math.ceil(course.remainingSessions * 0.8)}`;

  const remaining = Math.max(0, Number(remainingValue || 0));
  const planned = Math.min(remaining, Math.max(0, Number(plannedValue || 0)));
  const skipped = Math.max(0, remaining - planned);

  const currentPercent = attendanceUtils.calculateAttendancePercent(
    course.attended,
    course.total,
  );

  const afterAttend = attendanceUtils.projectAttendance(
    course.attended,
    course.total,
    planned,
    true,
  );
  const finalProjection = attendanceUtils.projectAttendance(
    course.attended + planned,
    course.total + planned,
    skipped,
    false,
  );

  const projectedPercent = finalProjection.projectedPercent;
  const projectedStatus = finalProjection.projectedStatus;
  const trendLabel = formatters.formatGPATrend(projectedPercent, currentPercent);
  const trendClass =
    projectedPercent > currentPercent
      ? styles.trendUp
      : projectedPercent < currentPercent
      ? styles.trendDown
      : styles.trendStable;

  const resultKey = `${projectedStatus}-${projectedPercent}`;
  const resultVariant =
    projectedStatus === 'Safe'
      ? styles.projectedSafe
      : projectedStatus === 'Warning'
      ? styles.projectedWarning
      : styles.projectedDanger;

  const updateInput = (field, value) => {
    setSimInputs(prev => ({
      ...prev,
      [course.id]: {
        ...prev[course.id],
        [field]: value,
      },
    }));
  };

  return (
    <motion.div className={styles.simCard} layout>
      <div className={styles.simCardHeader}>
        <div>
          <span className={styles.simCourseName}>{course.name}</span>
          <span className={styles.simCurrentPercent}>
            Current: {formatters.formatPercent(currentPercent)}
          </span>
        </div>
        <span className={styles.simCurrentPercent}>
          Status: {formatters.formatAttendanceStatus(currentPercent)}
        </span>
      </div>

      <div className={styles.simInputs}>
        <Input
          type="number"
          min="0"
          label="Remaining sessions"
          value={remainingValue}
          onChange={(event) => updateInput('remaining', event.target.value)}
        />
        <Input
          type="number"
          min="0"
          max={remaining || 0}
          label="Sessions I plan to attend"
          value={plannedValue}
          onChange={(event) => updateInput('planned', event.target.value)}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={resultKey}
          className={`${styles.projectedResult} ${resultVariant}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div>
            <strong>
              Projected: {formatters.formatPercent(projectedPercent)}
            </strong>
            <div className={styles.simCurrentPercent}>
              {projectedStatus} · {formatters.formatDecimal(projectedPercent)}%
            </div>
          </div>
          <span className={`${styles.trendIndicator} ${trendClass}`}>
            {trendLabel}
          </span>
        </motion.div>
      </AnimatePresence>
      <div className={styles.simCurrentPercent}>
        If you attend {planned} of {remaining} sessions, you will add{' '}
        {afterAttend.projectedPercent > currentPercent ? 'momentum' : 'pressure'}.
      </div>
    </motion.div>
  );
};

export default SimulatorCard;
