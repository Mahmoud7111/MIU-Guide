/**
 * @fileoverview GPA calculation utilities for the MIU Student Portal.
 *
 * Pure JavaScript — no external libraries.
 * Works alongside lib/dateUtils.js and lib/formatters.js.
 *
 * Consumed by:
 *   GpaPage, DashboardPage, StatCard, and any component
 *   that displays or simulates GPA data.
 *
 * Course object shape (graded):
 *   { name: string, credits: number, grade: string }
 *
 * Course object shape (in-progress / projected):
 *   { name: string, credits: number, expectedGrade: string }
 */

// ─── Grade-Point Scale (MIU Standard) ────────────────────────────────

/**
 * Maps letter grades to their numeric grade-point value.
 * @type {Record<string, number>}
 */
export const GRADE_POINTS = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0,
  'F': 0.0,
};

/** Sorted grade list from highest to lowest for lookups. */
const GRADES_DESCENDING = [
  'A+', 'A', 'A-',
  'B+', 'B', 'B-',
  'C+', 'C', 'C-',
  'D+', 'D',
  'F',
];

/** Default total credits required for graduation at MIU. */
const DEFAULT_REQUIRED_CREDITS = 136;

// ─── Internal Helpers ────────────────────────────────────────────────

/**
 * Safely retrieve grade points for a letter grade.
 * Returns 0 for any unrecognised grade.
 * @param {string} grade
 * @returns {number}
 */
const gradeToPoints = (grade) => {
  if (!grade || typeof grade !== 'string') return 0;
  const g = grade.trim().toUpperCase();
  return GRADE_POINTS[g] ?? 0;
};

/**
 * Round a number to exactly 2 decimal places.
 * @param {number} n
 * @returns {number}
 */
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

/**
 * Ensure `courses` is an array and filter out falsy entries.
 * @param {any} courses
 * @returns {Array}
 */
const safeCourses = (courses) =>
  Array.isArray(courses) ? courses.filter(Boolean) : [];

// ─── Core GPA Calculations ───────────────────────────────────────────

/**
 * Calculates the GPA for an array of graded courses.
 *
 * Formula:  Σ(gradePoints × credits) / Σ(credits)
 *
 * @param {Array<{name: string, credits: number, grade: string}>} courses
 * @returns {number} GPA rounded to 2 decimal places
 */
export const calculateGPA = (courses) => {
  const list = safeCourses(courses);
  if (list.length === 0) return 0;

  let totalPoints = 0;
  let totalCredits = 0;

  for (const c of list) {
    const cr = Number(c.credits) || 0;
    totalPoints += gradeToPoints(c.grade) * cr;
    totalCredits += cr;
  }

  return totalCredits === 0 ? 0 : round2(totalPoints / totalCredits);
};

/**
 * Alias for `calculateGPA` — explicitly named for single-semester context.
 *
 * @param {Array<{name: string, credits: number, grade: string}>} courses
 * @returns {number}
 */
export const calculateSemesterGPA = (courses) => calculateGPA(courses);

/**
 * Combines two weighted GPAs into a single cumulative GPA.
 *
 * Formula:  (gpa₁ × cr₁ + gpa₂ × cr₂) / (cr₁ + cr₂)
 *
 * @param {number} currentGPA
 * @param {number} currentCredits
 * @param {number} prevGPA
 * @param {number} prevCredits
 * @returns {number} Cumulative GPA rounded to 2 decimal places
 */
export const calculateCumulativeGPA = (
  currentGPA,
  currentCredits,
  prevGPA,
  prevCredits,
) => {
  const cGPA = Number(currentGPA) || 0;
  const cCr  = Number(currentCredits) || 0;
  const pGPA = Number(prevGPA) || 0;
  const pCr  = Number(prevCredits) || 0;

  const totalCredits = cCr + pCr;
  if (totalCredits === 0) return 0;

  return round2((cGPA * cCr + pGPA * pCr) / totalCredits);
};

// ─── Current vs Future GPA ───────────────────────────────────────────

/**
 * Calculates GPA based only on courses that already have a grade.
 * Courses without a `grade` property (or with an empty string) are skipped.
 *
 * @param {Array<{name: string, credits: number, grade?: string}>} completedCourses
 * @returns {number}
 */
export const calculateCurrentGPA = (completedCourses) => {
  const graded = safeCourses(completedCourses).filter(
    (c) => c.grade && typeof c.grade === 'string' && c.grade.trim() !== '',
  );
  return calculateGPA(graded);
};

/**
 * Projects what the GPA would be if the student earns specific grades
 * in all in-progress courses.
 *
 * @param {Array<{name: string, credits: number, grade: string}>} completedCourses
 * @param {Array<{name: string, credits: number, expectedGrade: string}>} inProgressCourses
 * @returns {number} Projected GPA
 */
export const calculateFutureGPA = (completedCourses, inProgressCourses) => {
  const completed = safeCourses(completedCourses);
  const inProgress = safeCourses(inProgressCourses);

  // Merge: map expectedGrade → grade for in-progress courses
  const merged = [
    ...completed,
    ...inProgress.map((c) => ({
      ...c,
      grade: c.expectedGrade || c.grade || 'F',
    })),
  ];

  return calculateGPA(merged);
};

/**
 * Simulates what the GPA would be if one specific course's grade changed.
 *
 * @param {Array<{name: string, credits: number, grade: string, id?: string}>} courses
 * @param {string} courseId — matched against `course.id` or `course.name`
 * @param {string} newGrade — the hypothetical new grade
 * @returns {{ newGPA: number, delta: number, improved: boolean }}
 */
export const getGPAImpact = (courses, courseId, newGrade) => {
  const list = safeCourses(courses);
  const originalGPA = calculateGPA(list);

  const modified = list.map((c) => {
    const match = (c.id && c.id === courseId) || c.name === courseId;
    return match ? { ...c, grade: newGrade } : c;
  });

  const newGPA = calculateGPA(modified);
  const delta = round2(newGPA - originalGPA);

  return {
    newGPA,
    delta,
    improved: delta > 0,
  };
};

// ─── Target GPA Calculator ──────────────────────────────────────────

/**
 * Finds the closest letter grade whose grade-point value is
 * >= the given minimum points.
 *
 * @param {number} minPoints
 * @returns {string} Letter grade (e.g. "B+") or "A+" if none suffice
 */
const closestGradeForPoints = (minPoints) => {
  // Walk from lowest to highest — return the first grade >= minPoints
  for (let i = GRADES_DESCENDING.length - 1; i >= 0; i--) {
    if (GRADE_POINTS[GRADES_DESCENDING[i]] >= minPoints) {
      return GRADES_DESCENDING[i];
    }
  }
  // If nothing matches (minPoints > 4.0), return "A+"
  return 'A+';
};

/**
 * Returns true if the target GPA is mathematically achievable.
 *
 * @param {Array} completedCourses
 * @param {Array} inProgressCourses
 * @param {number} targetGPA
 * @returns {boolean}
 */
export const isTargetAchievable = (
  completedCourses,
  inProgressCourses,
  targetGPA,
) => {
  const target = Number(targetGPA);
  if (target > 4.0) return false;
  if (target <= 0) return true;

  // Best-case scenario: all remaining courses get A+ (4.0)
  const bestCase = calculateFutureGPA(
    completedCourses,
    safeCourses(inProgressCourses).map((c) => ({
      ...c,
      expectedGrade: 'A+',
    })),
  );

  return bestCase >= target;
};

/**
 * Given a target GPA, calculates the minimum grade-point average
 * needed per credit in remaining courses and the corresponding
 * letter grade.
 *
 * @param {Array} completedCourses
 * @param {Array} inProgressCourses
 * @param {number} targetGPA
 * @returns {{
 *   targetGPA: number,
 *   achievable: boolean,
 *   requiredGradePoints: number,
 *   requiredGrade: string,
 *   message: string
 * }}
 */
export const getRequiredGrades = (
  completedCourses,
  inProgressCourses,
  targetGPA,
) => {
  const target = Number(targetGPA);
  const completed = safeCourses(completedCourses);
  const inProgress = safeCourses(inProgressCourses);

  const currentGPA = calculateCurrentGPA(completed);
  const completedCredits = getTotalCredits(
    completed.filter(
      (c) => c.grade && c.grade.trim() !== '',
    ),
  );
  const remainingCredits = getTotalCredits(inProgress);

  // Edge: no remaining courses
  if (remainingCredits === 0) {
    const alreadyMet = currentGPA >= target;
    return {
      targetGPA: target,
      achievable: alreadyMet,
      requiredGradePoints: 0,
      requiredGrade: alreadyMet ? '-' : 'N/A',
      message: alreadyMet
        ? `You've already achieved a ${currentGPA.toFixed(2)} GPA!`
        : `No remaining courses — your current GPA is ${currentGPA.toFixed(2)}.`,
    };
  }

  // Edge: target already met
  if (currentGPA >= target && completedCredits > 0) {
    return {
      targetGPA: target,
      achievable: true,
      requiredGradePoints: 0,
      requiredGrade: 'Any',
      message: `Your current GPA (${currentGPA.toFixed(2)}) already meets the ${target.toFixed(2)} target!`,
    };
  }

  // Required points per credit:
  //   target = (completedPoints + requiredPPC * remainingCredits) / totalCredits
  //   requiredPPC = (target * totalCredits - completedPoints) / remainingCredits
  const totalCredits = completedCredits + remainingCredits;
  const completedPoints = currentGPA * completedCredits;
  const requiredPPC = round2(
    (target * totalCredits - completedPoints) / remainingCredits,
  );

  const achievable = requiredPPC <= 4.0;
  const requiredGrade = achievable
    ? closestGradeForPoints(requiredPPC)
    : 'N/A';

  const message = achievable
    ? `You need at least ${requiredGrade} in all remaining courses to reach ${target.toFixed(2)}.`
    : `A ${target.toFixed(2)} GPA is not achievable — you would need ${requiredPPC.toFixed(2)} grade points per credit, which exceeds 4.0.`;

  return {
    targetGPA: target,
    achievable,
    requiredGradePoints: Math.max(0, requiredPPC),
    requiredGrade,
    message,
  };
};

/**
 * Returns multiple grade-scenario projections for reaching a target GPA.
 *
 * @param {Array} completedCourses
 * @param {Array} inProgressCourses
 * @param {number} targetGPA
 * @returns {Array<{scenario: string, projectedGPA: number, achievesTarget: boolean}>}
 */
export const getTargetScenarios = (
  completedCourses,
  inProgressCourses,
  targetGPA,
) => {
  const target = Number(targetGPA);
  const inProgress = safeCourses(inProgressCourses);

  const scenarioGrades = [
    { label: 'All A+', grade: 'A+' },
    { label: 'All A',  grade: 'A'  },
    { label: 'All A-', grade: 'A-' },
    { label: 'All B+', grade: 'B+' },
    { label: 'All B',  grade: 'B'  },
    { label: 'All B-', grade: 'B-' },
    { label: 'All C+', grade: 'C+' },
    { label: 'All C',  grade: 'C'  },
    { label: 'All C-', grade: 'C-' },
    { label: 'All D',  grade: 'D'  },
    { label: 'All F',  grade: 'F'  },
  ];

  return scenarioGrades.map(({ label, grade }) => {
    const projected = inProgress.map((c) => ({
      ...c,
      expectedGrade: grade,
    }));

    const projectedGPA = calculateFutureGPA(completedCourses, projected);

    return {
      scenario: label,
      projectedGPA,
      achievesTarget: projectedGPA >= target,
    };
  });
};

// ─── Credit Calculations ─────────────────────────────────────────────

/**
 * Returns the sum of credits across all courses.
 *
 * @param {Array<{credits: number}>} courses
 * @returns {number}
 */
export const getTotalCredits = (courses) => {
  return safeCourses(courses).reduce(
    (sum, c) => sum + (Number(c.credits) || 0),
    0,
  );
};

/**
 * Returns credits only for courses with a passing grade (not "F").
 *
 * @param {Array<{credits: number, grade: string}>} courses
 * @returns {number}
 */
export const getEarnedCredits = (courses) => {
  return safeCourses(courses)
    .filter((c) => c.grade && c.grade.trim().toUpperCase() !== 'F')
    .reduce((sum, c) => sum + (Number(c.credits) || 0), 0);
};

/**
 * Returns the number of credits remaining to graduate.
 *
 * @param {number} earned — credits earned so far
 * @param {number} [required=136] — total credits required for graduation
 * @returns {number}
 */
export const getRemainingCredits = (earned, required = DEFAULT_REQUIRED_CREDITS) => {
  return Math.max(0, Number(required) - Number(earned));
};

// ─── Course Analysis ─────────────────────────────────────────────────

/**
 * Returns the course object with the highest grade.
 * If multiple share the top grade, the first encountered is returned.
 *
 * @param {Array<{name: string, credits: number, grade: string}>} courses
 * @returns {object|null}
 */
export const getHighestGrade = (courses) => {
  const list = safeCourses(courses).filter((c) => c.grade);
  if (list.length === 0) return null;

  return list.reduce((best, c) =>
    gradeToPoints(c.grade) > gradeToPoints(best.grade) ? c : best,
  );
};

/**
 * Returns the course object with the lowest grade.
 *
 * @param {Array<{name: string, credits: number, grade: string}>} courses
 * @returns {object|null}
 */
export const getLowestGrade = (courses) => {
  const list = safeCourses(courses).filter((c) => c.grade);
  if (list.length === 0) return null;

  return list.reduce((worst, c) =>
    gradeToPoints(c.grade) < gradeToPoints(worst.grade) ? c : worst,
  );
};

/**
 * Returns an array of courses with grade "F".
 *
 * @param {Array<{name: string, credits: number, grade: string}>} courses
 * @returns {Array}
 */
export const getFailedCourses = (courses) => {
  return safeCourses(courses).filter(
    (c) => c.grade && c.grade.trim().toUpperCase() === 'F',
  );
};

/**
 * Returns all courses matching a specific letter grade.
 *
 * @param {Array<{name: string, credits: number, grade: string}>} courses
 * @param {string} grade — letter grade to filter by
 * @returns {Array}
 */
export const getCoursesByGrade = (courses, grade) => {
  if (!grade) return [];
  const target = grade.trim().toUpperCase();
  return safeCourses(courses).filter(
    (c) => c.grade && c.grade.trim().toUpperCase() === target,
  );
};

// ─── Validation ──────────────────────────────────────────────────────

/**
 * Checks if a string is a valid grade in the GRADE_POINTS table.
 *
 * @param {string} grade
 * @returns {boolean}
 */
export const isValidGrade = (grade) => {
  if (!grade || typeof grade !== 'string') return false;
  return grade.trim().toUpperCase() in GRADE_POINTS;
};

/**
 * Checks if a credit value is within the valid 1–6 range.
 *
 * @param {number} credits
 * @returns {boolean}
 */
export const isValidCredits = (credits) => {
  const n = Number(credits);
  return Number.isFinite(n) && n >= 1 && n <= 6;
};

/**
 * Validates a course object and returns errors if any.
 *
 * @param {{ name?: string, credits?: number, grade?: string }} course
 * @returns {{ valid: boolean, errors: string[] }}
 */
export const validateCourse = (course) => {
  const errors = [];

  if (!course || typeof course !== 'object') {
    return { valid: false, errors: ['Course must be a valid object.'] };
  }

  if (!course.name || typeof course.name !== 'string' || course.name.trim() === '') {
    errors.push('Course name is required.');
  }

  if (!isValidCredits(course.credits)) {
    errors.push('Credits must be a number between 1 and 6.');
  }

  if (course.grade !== undefined && course.grade !== '' && !isValidGrade(course.grade)) {
    errors.push(`"${course.grade}" is not a valid grade.`);
  }

  return { valid: errors.length === 0, errors };
};

// ─── Legacy / Backward-compatible ────────────────────────────────────

/**
 * Returns a textual label for a GPA value.
 * Kept for backward compatibility — prefer formatGPAStatus in formatters.js.
 *
 * @param {number} gpa
 * @returns {string}
 */
export const getGpaStatus = (gpa) => {
  if (gpa >= 3.7) return 'Excellent';
  if (gpa >= 3.0) return 'Very Good';
  if (gpa >= 2.0) return 'Good';
  if (gpa >= 1.0) return 'Satisfactory';
  return 'Probation';
};
