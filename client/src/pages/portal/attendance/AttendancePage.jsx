import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageTransition, staggerContainer } from '@/lib/motion/variants';
import { useAuth } from '@/context/AuthContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import {
  ATTENDANCE_THRESHOLDS,
  calculateAttendancePercent,
  calculateAbsences,
  calculateAllowedAbsences,
  calculateSessionsNeeded,
  getAttendanceStatus,
  getAttendanceRisk,
  isAtRisk,
  isInWarning,
  isSafe,
  getOverallAttendance,
  getAtRiskCourses,
  getWarningCourses,
  getBestAttendance,
  getWorstAttendance,
  sortCoursesByAttendance,
  projectAttendance,
  getMinSessionsToPass,
  getAttendanceWarning,
  getAllowedAbsences,
} from '@/lib/attendanceUtils';
import {
  formatGPA,
  formatPercent,
  formatCredits,
  formatGrade,
  formatAttendanceStatus,
  formatAbsences,
  formatAttendanceColor,
  formatGPAStatus,
  formatGPATrend,
  formatName,
  formatInitials,
  formatCourseCode,
  truncate,
  formatDuration,
  formatRoomCode,
  formatSemester,
  formatDecimal,
  formatCurrency,
  formatPhone,
  truncateText,
} from '@/lib/formatters';
import Badge from '@/components/ui/Badge';
import AttendanceTabs from './components/AttendanceTabs';
import AttendanceStatsRow from './components/AttendanceStatsRow';
import CourseAttendanceCard from './components/CourseAttendanceCard';
import AttendanceSimulator from './components/AttendanceSimulator';
import styles from './AttendancePage.module.css';

const attendanceUtils = {
  ATTENDANCE_THRESHOLDS,
  calculateAttendancePercent,
  calculateAbsences,
  calculateAllowedAbsences,
  calculateSessionsNeeded,
  getAttendanceStatus,
  getAttendanceRisk,
  isAtRisk,
  isInWarning,
  isSafe,
  getOverallAttendance,
  getAtRiskCourses,
  getWarningCourses,
  getBestAttendance,
  getWorstAttendance,
  sortCoursesByAttendance,
  projectAttendance,
  getMinSessionsToPass,
  getAttendanceWarning,
  getAllowedAbsences,
};

const formatters = {
  formatGPA,
  formatPercent,
  formatCredits,
  formatGrade,
  formatAttendanceStatus,
  formatAbsences,
  formatAttendanceColor,
  formatGPAStatus,
  formatGPATrend,
  formatName,
  formatInitials,
  formatCourseCode,
  truncate,
  formatDuration,
  formatRoomCode,
  formatSemester,
  formatDecimal,
  formatCurrency,
  formatPhone,
  truncateText,
};

const MOCK_COURSES = [
  {
    id: 'cs301',
    code: 'CS301',
    name: 'Data Structures',
    attended: 26,
    total: 28,
    credits: 3,
    semester: 'S2026',
    room: 'HallA-204',
    duration: 90,
    instructor: 'Dr. Mariam El-Sayed',
    instructorPhone: '01012345678',
    lastGrade: 'A-',
    remainingSessions: 6,
  },
  {
    id: 'math241',
    code: 'MATH241',
    name: 'Linear Algebra',
    attended: 20,
    total: 26,
    credits: 3,
    semester: 'S2026',
    room: 'HallB-110',
    duration: 120,
    instructor: 'Dr. Omar Abdelrahman',
    instructorPhone: '01098765432',
    lastGrade: 'B',
    remainingSessions: 7,
  },
  {
    id: 'eng202',
    code: 'ENG202',
    name: 'Technical Writing',
    attended: 18,
    total: 24,
    credits: 2,
    semester: 'S2026',
    room: 'C305',
    duration: 60,
    instructor: 'Dr. Salma Hassanein',
    instructorPhone: '01122334455',
    lastGrade: 'B+',
    remainingSessions: 5,
  },
  {
    id: 'bio210',
    code: 'BIO210',
    name: 'Cell Biology',
    attended: 16,
    total: 25,
    credits: 4,
    semester: 'S2026',
    room: 'HallD-019',
    duration: 120,
    instructor: 'Dr. Nourhan Adel',
    instructorPhone: '01055566778',
    lastGrade: 'C+',
    remainingSessions: 8,
  },
  {
    id: 'chem201',
    code: 'CHEM201',
    name: 'Organic Chemistry',
    attended: 19,
    total: 30,
    credits: 4,
    semester: 'S2026',
    room: 'HallC-210',
    duration: 120,
    instructor: 'Dr. Hany Abdelaziz',
    instructorPhone: '01233445566',
    lastGrade: 'C',
    remainingSessions: 9,
  },
  {
    id: 'bus205',
    code: 'BUS205',
    name: 'Business Ethics',
    attended: 23,
    total: 27,
    credits: 3,
    semester: 'S2026',
    room: 'B101',
    duration: 75,
    instructor: 'Dr. Rania Mahmoud',
    instructorPhone: '01066778899',
    lastGrade: 'A',
    remainingSessions: 6,
  },
];

/**
 * AttendancePage - Student attendance overview and simulator
 */
const AttendancePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useLocalStorage('attendance_tab', 'overview');
  const [simInputs, setSimInputs] = useLocalStorage('attendance_sim', {});

  const sortedCourses = attendanceUtils.sortCoursesByAttendance(MOCK_COURSES, 'desc');
  const overallAttendance = attendanceUtils.getOverallAttendance(sortedCourses);
  const atRiskCourses = attendanceUtils.getAtRiskCourses(sortedCourses);
  const warningCourses = attendanceUtils.getWarningCourses(sortedCourses);
  const hasAcademicWarning = atRiskCourses.length > 0;
  const overallWarning = attendanceUtils.getAttendanceWarning(overallAttendance);
  const bestCourse = attendanceUtils.getBestAttendance(sortedCourses);
  const worstCourse = attendanceUtils.getWorstAttendance(sortedCourses);
  const displayName = formatters.formatName(user?.name || 'Student');

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={styles.page}
    >
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>My Attendance</h1>
          <p className={styles.subtitle}>
            Stay on track, {displayName}. See how future sessions impact each course.
          </p>
          {bestCourse && worstCourse && (
            <p className={styles.helperText}>
              Best attendance: {formatters.formatCourseCode(bestCourse.code)} · Focus course:{' '}
              {formatters.formatCourseCode(worstCourse.code)}
            </p>
          )}
        </div>

        <div className={styles.overallBlock}>
          <span
            className={styles.overallPercent}
            style={{ color: `var(${formatters.formatAttendanceColor(overallAttendance)})` }}
          >
            {formatters.formatPercent(overallAttendance)}
          </span>
          <span className={styles.overallLabel}>
            Overall attendance ({formatters.formatDecimal(overallAttendance)}%)
          </span>
          {hasAcademicWarning && (
            <Badge variant="danger" size="sm">
              Academic warning — {overallWarning.message}
            </Badge>
          )}
        </div>
      </header>

      <AttendanceTabs activeTab={activeTab} onChange={setActiveTab} />

      <AttendanceStatsRow
        overallAttendance={overallAttendance}
        atRiskCount={atRiskCourses.length}
        warningCount={warningCourses.length}
        attendanceUtils={attendanceUtils}
        formatters={formatters}
      />

      <div className={styles.contentArea}>
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={styles.tabPanel}
            >
              <motion.div
                className={styles.courseList}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {sortedCourses.map(course => (
                    <CourseAttendanceCard
                      key={course.id}
                      course={course}
                      attendanceUtils={attendanceUtils}
                      formatters={formatters}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'simulator' && (
            <motion.div
              key="simulator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={styles.tabPanel}
            >
              <AttendanceSimulator
                courses={sortedCourses}
                simInputs={simInputs}
                setSimInputs={setSimInputs}
                attendanceUtils={attendanceUtils}
                formatters={formatters}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AttendancePage;
