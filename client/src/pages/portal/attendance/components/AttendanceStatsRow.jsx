import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motion/variants';
import Badge from '@/components/ui/Badge';
import styles from '../AttendancePage.module.css';

/**
 * AttendanceStatsRow - Summary stats row for attendance overview
 *
 * @param {Object} props
 * @param {number} props.overallAttendance - Overall attendance percentage
 * @param {number} props.atRiskCount - Number of danger courses
 * @param {number} props.warningCount - Number of warning courses
 * @param {Object} props.attendanceUtils - Attendance utility functions
 * @param {Object} props.formatters - Formatter utility functions
 */
const AttendanceStatsRow = ({
  overallAttendance,
  atRiskCount,
  warningCount,
  attendanceUtils,
  formatters,
}) => {
  const overallStatus = attendanceUtils.getAttendanceStatus(overallAttendance);
  const overallVariant =
    overallStatus === 'Safe' ? 'success' : overallStatus === 'Warning' ? 'warning' : 'danger';

  return (
    <motion.div
      className={styles.statsRow}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={styles.statCard} variants={staggerItem} layout>
        <span className={styles.statLabel}>Overall Attendance</span>
        <div className={styles.statValue}>
          {formatters.formatPercent(overallAttendance)}
          <Badge variant={overallVariant} size="sm">
            {formatters.formatAttendanceStatus(overallAttendance)}
          </Badge>
        </div>
        <span className={styles.statMeta}>
          {overallAttendance >= attendanceUtils.ATTENDANCE_THRESHOLDS.SAFE
            ? 'Safe zone'
            : 'Needs attention'}
        </span>
      </motion.div>

      <motion.div className={styles.statCard} variants={staggerItem} layout>
        <span className={styles.statLabel}>At Risk Courses</span>
        <div className={styles.statValue}>
          {atRiskCount}
          {atRiskCount > 0 && (
            <Badge variant="danger" size="sm">
              Danger
            </Badge>
          )}
        </div>
        <span className={styles.statMeta}>Below 75%</span>
      </motion.div>

      <motion.div className={styles.statCard} variants={staggerItem} layout>
        <span className={styles.statLabel}>Warning Courses</span>
        <div className={styles.statValue}>
          {warningCount}
          {warningCount > 0 && (
            <Badge variant="warning" size="sm">
              Warning
            </Badge>
          )}
        </div>
        <span className={styles.statMeta}>75–84%</span>
      </motion.div>
    </motion.div>
  );
};

export default AttendanceStatsRow;
