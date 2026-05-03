import { useCallback } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { getTodaySchedule, getUpcomingExams, getSchedule } from '@/services/scheduleService';
import { calculateCurrentGPA, getEarnedCredits, getTotalCredits, getRemainingCredits } from '@/lib/gpaUtils';
import { getOverallAttendance, getAttendanceStatus, getAtRiskCourses } from '@/lib/attendanceUtils';
import { 
  formatGPA, 
  formatPercent, 
  formatCredits, 
  formatGPAStatus, 
  formatAttendanceColor,
  formatGPATrend,
  formatSemester
} from '@/lib/formatters';
import { getSemesterProgress, getWeeksRemaining, getToday, formatDate } from '@/lib/dateUtils';

/**
 * Custom hook to aggregate all data needed for the DashboardPage.
 */
export const useDashboardData = () => {
  const fetchFn = useCallback(async () => {
    const allCourses = getSchedule();
    
    // Mock completed courses with grades
    const mockCompletedCourses = [
      { name: 'Data Structures', code: 'CS301', credits: 3, grade: 'A' },
      { name: 'Database Systems', code: 'CS302', credits: 3, grade: 'B+' },
      { name: 'Linear Algebra', code: 'MATH201', credits: 3, grade: 'A-' }
    ];
    
    const currentGPA = calculateCurrentGPA(mockCompletedCourses);
    const earnedCredits = getEarnedCredits(mockCompletedCourses);
    const remainingCredits = getRemainingCredits(earnedCredits);
    
    // Mock attendance data
    const mockAttendanceCourses = allCourses.map(c => ({
      name: c.courseName,
      code: c.courseCode,
      attended: Math.floor(Math.random() * 5) + 20,
      total: 25
    }));
    
    const overallAttendance = getOverallAttendance(mockAttendanceCourses);
    const atRiskCourses = getAtRiskCourses(mockAttendanceCourses).length;

    // Semester dates
    const semesterStart = '2026-02-15';
    const semesterEnd = '2026-06-15';
    const progress = getSemesterProgress(semesterStart, semesterEnd);

    // Get GPA color based on value
    const getGpaColor = (gpa) => {
      if (gpa >= 3.7) return 'var(--color-success)';
      if (gpa >= 3.0) return 'var(--color-primary)';
      if (gpa >= 2.0) return 'var(--color-warning)';
      return 'var(--color-danger)';
    };

    // Get attendance color
    const getAttendanceColor = () => {
      if (overallAttendance >= 85) return 'var(--color-success)';
      if (overallAttendance >= 75) return 'var(--color-warning)';
      return 'var(--color-danger)';
    };

    // Get exam data
    const upcomingExams = getUpcomingExams();
    const nextExam = upcomingExams.length > 0 ? upcomingExams[0] : null;

    return {
      gpaValue: currentGPA,
      stats: {
        gpa: {
          value: formatGPA(currentGPA),
          label: formatGPAStatus(currentGPA),
          color: getGpaColor(currentGPA),
          trend: parseFloat((currentGPA - 3.5).toFixed(2)) // Mock trend
        },
        attendance: {
          value: formatPercent(overallAttendance),
          status: getAttendanceStatus(overallAttendance),
          color: getAttendanceColor(),
          atRiskCount: atRiskCourses
        },
        exams: {
          count: upcomingExams.length,
          nextExam: nextExam ? `${nextExam.courseCode}: ${nextExam.type}` : 'None scheduled',
          urgencyColor: 'var(--color-primary)'
        },
        credits: {
          value: formatCredits(earnedCredits),
          subtitle: `${remainingCredits} left to graduate`,
          progress: Math.round((earnedCredits / 136) * 100)
        }
      },
      schedule: getTodaySchedule(),
      exams: upcomingExams.slice(0, 3),
      progress: {
        percent: progress,
        weeksRemaining: getWeeksRemaining(semesterEnd),
        totalWeeks: 16,
        currentWeek: 16 - getWeeksRemaining(semesterEnd),
        semesterLabel: 'Spring 2026',
        startDate: formatDate(new Date(semesterStart)),
        endDate: formatDate(new Date(semesterEnd))
      },
      semesterLabel: 'Spring 2026'
    };
  }, []);

  return useFetch(fetchFn, []);
};

