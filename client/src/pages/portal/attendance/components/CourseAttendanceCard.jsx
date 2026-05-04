import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerItem } from '@/lib/motion/variants';
import ProgressBar from '@/components/ui/ProgressBar';
import Badge from '@/components/ui/Badge';
import styles from '../AttendancePage.module.css';

/**
 * CourseAttendanceCard - Single course attendance card with progress details
 *
 * @param {Object} props
 * @param {Object} props.course - Course attendance data
 * @param {Object} props.attendanceUtils - Attendance utility functions
 * @param {Object} props.formatters - Formatter utility functions
 */
const CourseAttendanceCard = ({ course, attendanceUtils, formatters }) => {
  const percent = attendanceUtils.calculateAttendancePercent(course.attended, course.total);
  const status = attendanceUtils.getAttendanceStatus(percent);
  const risk = attendanceUtils.getAttendanceRisk(course.attended, course.total);
  const absences = attendanceUtils.calculateAbsences(course.attended, course.total);
  const allowedAbsences = attendanceUtils.calculateAllowedAbsences(course.total);
  const legacyAllowed = attendanceUtils.getAllowedAbsences(course.attended, course.total);
  const absencesRemaining = Math.max(0, allowedAbsences - absences);
  const sessionsNeeded = attendanceUtils.calculateSessionsNeeded(
    course.attended,
    course.total,
    attendanceUtils.ATTENDANCE_THRESHOLDS.SAFE,
  );

  const statusVariant =
    status === 'Safe' ? 'success' : status === 'Warning' ? 'warning' : 'danger';
  const cardTone = attendanceUtils.isAtRisk(percent)
    ? styles.danger
    : attendanceUtils.isInWarning(percent)
    ? styles.warning
    : '';

  const metadata = [
    formatters.formatCredits(course.credits),
    formatters.formatSemester(course.semester),
    formatters.formatRoomCode(course.room),
    `${formatters.formatDuration(course.duration)}`,
  ].join(' · ');

  return (
    <motion.article
      className={`${styles.courseCard} ${cardTone}`}
      variants={staggerItem}
      layout
      exit={{ opacity: 0, y: 12 }}
    >
      <motion.div variants={fadeUp} initial="offscreen" whileInView="onscreen">
        <div className={styles.courseHeader}>
          <div className={styles.courseTitle}>
            <span className={styles.courseCode}>{formatters.formatCourseCode(course.code)}</span>
            <span className={styles.courseName}>{course.name}</span>
            <span className={styles.courseMeta}>{metadata}</span>
          </div>
          <Badge variant={statusVariant} size="sm">
            {formatters.formatAttendanceStatus(percent)}
          </Badge>
        </div>

        <div className={styles.progressRow}>
          <ProgressBar value={percent} animated />
          <span
            className={styles.percentText}
            style={{ color: `var(${formatters.formatAttendanceColor(percent)})` }}
          >
            {formatters.formatPercent(percent)}
          </span>
        </div>

        <div className={styles.detailRow}>
          <span>{formatters.formatAbsences(course.attended, course.total)}</span>
          <span>
            Instructor: {formatters.formatName(course.instructor)} (
            {formatters.formatInitials(course.instructor)})
          </span>
          <span title={`Advisor contact: ${formatters.formatPhone(course.instructorPhone)}`}>
            Recent grade: {formatters.formatGrade(course.lastGrade)}
          </span>
        </div>

        <div className={styles.riskInfo} title={`Legacy allowed absences: ${legacyAllowed}`}>
          {risk.canAfford ? (
            <span>
              You can afford {absencesRemaining} more absences.
            </span>
          ) : (
            <span>
              You need {sessionsNeeded} sessions to reach the safe zone.
            </span>
          )}
          <div className={styles.riskBadgeRow}>
            {attendanceUtils.isAtRisk(percent) && (
              <Badge variant="danger" size="sm">
                Below minimum attendance
              </Badge>
            )}
            {attendanceUtils.isSafe(percent) && (
              <Badge variant="success" size="sm">
                Safe buffer: {absencesRemaining} absences left
              </Badge>
            )}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
};

export default CourseAttendanceCard;
