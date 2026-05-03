import { useFetch } from '@/hooks/useFetch';
import { getTodaySchedule, getUpcomingExams, getSchedule } from '@/services/scheduleService';
import { calculateCurrentGPA, getEarnedCredits, getTotalCredits } from '@/lib/gpaUtils';
import { getOverallAttendance, getAttendanceStatus, formatAttendanceColor } from '@/lib/attendanceUtils';
import { formatGPA, formatPercent, formatCredits, formatGPAStatus } from '@/lib/formatters';
import { getSemesterProgress, getWeeksRemaining } from '@/lib/dateUtils';

/**
 * Custom hook to aggregate all data needed for the DashboardPage.
 */
export const useDashboardData = () => {
  // In a real app, these would be separate API calls.
  // Here we use the mocked services and calculate the derived stats.
  
  return useFetch(async () => {
    const allCourses = getSchedule();
    
    // Calculate GPA stats (mocking grades since schedule doesn't have them)
    // For demo purposes, we'll assign random grades or just hardcode some completed ones
    const mockCompletedCourses = [
      { name: 'Data Structures', credits: 3, grade: 'A' },
      { name: 'Database Systems', credits: 3, grade: 'B+' },
      { name: 'Linear Algebra', credits: 3, grade: 'A-' }
    ];
    
    const currentGPA = calculateCurrentGPA(mockCompletedCourses);
    const earnedCredits = getEarnedCredits(mockCompletedCourses);
    
    // Calculate Attendance stats (mocking attendance data)
    const mockAttendanceCourses = allCourses.map(c => ({
      name: c.courseName,
      attended: Math.floor(Math.random() * 5) + 20, // random 20-25
      total: 25
    }));
    
    const overallAttendance = getOverallAttendance(mockAttendanceCourses);

    // Semester dates (Mock)
    const semesterStart = '2026-02-15';
    const semesterEnd = '2026-06-15';

    return {
      stats: {
        gpa: {
          value: formatGPA(currentGPA),
          label: formatGPAStatus(currentGPA),
          color: currentGPA >= 3.0 ? 'var(--color-success)' : 'var(--color-warning)'
        },
        attendance: {
          value: formatPercent(overallAttendance),
          status: getAttendanceStatus(overallAttendance),
          color: `var(${formatAttendanceColor(overallAttendance)})`
        },
        exams: {
          count: getUpcomingExams().length
        },
        credits: {
          value: formatCredits(earnedCredits)
        }
      },
      schedule: getTodaySchedule(),
      exams: getUpcomingExams().slice(0, 3), // next 3 exams
      progress: {
        percent: getSemesterProgress(semesterStart, semesterEnd),
        weeksRemaining: getWeeksRemaining(semesterEnd),
        totalWeeks: 16,
        currentWeek: 16 - getWeeksRemaining(semesterEnd)
      }
    };
  });
};
