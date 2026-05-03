import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motion/variants';
import SimulatorCard from './SimulatorCard';
import styles from '../AttendancePage.module.css';

/**
 * AttendanceSimulator - What-if simulator for projected attendance
 *
 * @param {Object} props
 * @param {Array} props.courses - Course list
 * @param {Object} props.simInputs - Persisted simulator input state
 * @param {function} props.setSimInputs - Persisted state setter
 * @param {Object} props.attendanceUtils - Attendance utility functions
 * @param {Object} props.formatters - Formatter utility functions
 */
const AttendanceSimulator = ({
  courses,
  simInputs,
  setSimInputs,
  attendanceUtils,
  formatters,
}) => {
  const projections = courses.map(course => {
    const remainingRaw = simInputs[course.id]?.remaining ?? `${course.remainingSessions}`;
    const plannedRaw = simInputs[course.id]?.planned ?? `${Math.ceil(course.remainingSessions * 0.8)}`;

    const remaining = Math.max(0, Number(remainingRaw || 0));
    const planned = Math.min(remaining, Math.max(0, Number(plannedRaw || 0)));
    const skipped = Math.max(0, remaining - planned);

    const finalProjection = attendanceUtils.projectAttendance(
      course.attended + planned,
      course.total + planned,
      skipped,
      false,
    );

    return {
      courseId: course.id,
      currentPercent: attendanceUtils.calculateAttendancePercent(course.attended, course.total),
      projectedPercent: finalProjection.projectedPercent,
      projectedStatus: finalProjection.projectedStatus,
      movedToSafe:
        attendanceUtils.isAtRisk(
          attendanceUtils.calculateAttendancePercent(course.attended, course.total),
        ) && attendanceUtils.isSafe(finalProjection.projectedPercent),
      stillAtRisk: !attendanceUtils.isSafe(finalProjection.projectedPercent),
      remaining,
      minToPass: attendanceUtils.getMinSessionsToPass(course.attended, course.total, remaining),
    };
  });

  const movedToSafeCount = projections.filter(p => p.movedToSafe).length;
  const stillAtRiskCount = projections.filter(p => p.stillAtRisk).length;
  const projectedCourses = courses.map(course => {
    const remainingRaw = simInputs[course.id]?.remaining ?? `${course.remainingSessions}`;
    const plannedRaw = simInputs[course.id]?.planned ?? `${Math.ceil(course.remainingSessions * 0.8)}`;
    const remaining = Math.max(0, Number(remainingRaw || 0));
    const planned = Math.min(remaining, Math.max(0, Number(plannedRaw || 0)));

    return {
      ...course,
      attended: course.attended + planned,
      total: course.total + remaining,
    };
  });

  const overallProjected = attendanceUtils.getOverallAttendance(projectedCourses);
  const overallCurrent = attendanceUtils.getOverallAttendance(courses);
  const overallTrend = formatters.formatGPATrend(overallProjected, overallCurrent);
  const warning = attendanceUtils.getAttendanceWarning(overallProjected);

  const motivationalMessage =
    overallProjected >= attendanceUtils.ATTENDANCE_THRESHOLDS.SAFE
      ? 'Great work! You are projected to stay in the safe zone.'
      : overallProjected >= attendanceUtils.ATTENDANCE_THRESHOLDS.WARNING
      ? 'You are close to safe territory. Attending the next sessions can make the difference.'
      : 'Attendance is in the danger zone. Prioritize upcoming classes to recover.';

  return (
    <div>
      <div className={styles.simHeader}>
        <h2 className={styles.simTitle}>What If Simulator</h2>
        <p className={styles.simSubtitle}>
          See how future sessions affect your attendance.
        </p>
      </div>

      <motion.div
        className={styles.simList}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {courses.map(course => (
          <motion.div key={course.id} variants={staggerItem} layout>
            <SimulatorCard
              course={course}
              simInputs={simInputs}
              setSimInputs={setSimInputs}
              attendanceUtils={attendanceUtils}
              formatters={formatters}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className={styles.summaryCard}>
        <div className={styles.summaryRow}>
          <span>Courses moving from danger to safe</span>
          <span className={styles.summaryValue}>{movedToSafeCount}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Courses staying at risk</span>
          <span className={styles.summaryValue}>{stillAtRiskCount}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Overall projection trend</span>
          <span className={styles.summaryValue}>{overallTrend}</span>
        </div>
        <div className={styles.summaryMessage}>
          {motivationalMessage} ({warning.message})
        </div>
      </div>
    </div>
  );
};

export default AttendanceSimulator;
