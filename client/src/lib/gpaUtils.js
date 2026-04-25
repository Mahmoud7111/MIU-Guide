/**
 * @fileoverview Logic for MIU GPA calculations.
 */

const GRADE_POINTS = {
  'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0,
  'F': 0.0
};

/**
 * Calculates Semester GPA.
 * @param {Array} courses List of { grade, credits }
 */
export const calculateGPA = (courses) => {
  if (!courses || courses.length === 0) return 0;
  
  let totalPoints = 0;
  let totalCredits = 0;

  courses.forEach(course => {
    const points = GRADE_POINTS[course.grade] || 0;
    totalPoints += points * course.credits;
    totalCredits += course.credits;
  });

  return totalCredits === 0 ? 0 : (totalPoints / totalCredits);
};

/**
 * Returns the textual representation of a GPA.
 */
export const getGpaStatus = (gpa) => {
  if (gpa >= 3.7) return 'Excellent';
  if (gpa >= 3.0) return 'Very Good';
  if (gpa >= 2.0) return 'Good';
  if (gpa >= 1.0) return 'Satisfactory';
  return 'Probation';
};
