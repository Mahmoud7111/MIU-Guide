import React from 'react';
import { AnimatePresence, Reorder } from 'framer-motion';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { FiBookOpen } from 'react-icons/fi';
import { calculateFutureGPA, GRADE_POINTS } from '@/lib/gpaUtils';
import { formatGPA } from '@/lib/formatters';
import CourseRow from './CourseRow';
import styles from '../GpaPage.module.css';

/**
 * FutureSimulator - Mode 2 Side-by-side view for projecting GPA
 * 
 * @param {Object} props
 * @param {Array} props.completedCourses - Array of completed courses
 * @param {Array} props.futureCourses - Array of in-progress courses
 * @param {function} props.setFutureCourses - State setter for future courses
 * @param {number} props.currentGpa - The current GPA value
 */
const FutureSimulator = ({ completedCourses, futureCourses, setFutureCourses, currentGpa }) => {
  const addFutureCourse = () => {
    setFutureCourses((prev) => [
      ...prev,
      { id: Date.now(), courseCode: '', name: '', credits: 3, expectedGrade: '' },
    ]);
  };

  const updateFutureCourse = (id, fields) => {
    setFutureCourses(futureCourses.map(c => c.id === id ? { ...c, ...fields } : c));
  };

  const removeFutureCourse = (id) => {
    setFutureCourses(futureCourses.filter(c => c.id !== id));
  };

  const projectedGpa = calculateFutureGPA(completedCourses, futureCourses);
  const impact = Number((projectedGpa - currentGpa).toFixed(2));
  const arrow = impact > 0 ? '↑' : impact < 0 ? '↓' : '→';
  const deltaText =
    impact > 0
      ? `Your GPA will improve by +${impact.toFixed(2)}`
      : impact < 0
      ? `Your GPA will drop by ${impact.toFixed(2)}`
      : 'Your GPA will stay the same';
  const deltaClass =
    impact > 0 ? styles.deltaUp : impact < 0 ? styles.deltaDown : styles.deltaNeutral;

  const setScenario = (grade) => {
    setFutureCourses(
      futureCourses.map((course) => ({
        ...course,
        expectedGrade: grade,
      })),
    );
  };

  return (
    <div className={styles.simulatorLayout}>
      <div className={styles.simulatorPanel}>
        <h3 className={styles.panelTitle}>Completed Courses</h3>
        {completedCourses.length === 0 ? (
          <div className={styles.emptyStateWrapper}>
            <EmptyState
              icon={FiBookOpen}
              title="No completed courses yet"
              description="Add courses in the Current GPA tab to see your projection."
            />
          </div>
        ) : (
          <table className={styles.courseTable}>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Cr</th>
                <th>Grade</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {completedCourses.map((course) => {
                const points =
                  (GRADE_POINTS[course.grade] || 0) * (Number(course.credits) || 0);
                return (
                  <tr key={course.id} className={styles.readOnlyRow}>
                    <td className={styles.courseTableTd}>{course.courseCode || '-'}</td>
                    <td className={styles.courseTableTd}>{course.name || '-'}</td>
                    <td className={styles.courseTableTd}>{course.credits || '-'}</td>
                    <td className={styles.courseTableTd}>{course.grade || '-'}</td>
                    <td className={`${styles.courseTableTd} ${styles.pointsFormula}`}>
                      {course.grade
                        ? `${course.grade} × ${course.credits}cr = ${points.toFixed(1)} pts`
                        : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <div className={styles.gpaSummary}>
          Current GPA: <strong>{formatGPA(currentGpa)}</strong>
        </div>
      </div>

      <div className={styles.simulatorPanel}>
        <div className={styles.panelHeader}>
          <h3 className={styles.panelTitle}>In-Progress Courses</h3>
          <div className={styles.chipRow}>
            <button
              type="button"
              className={styles.chip}
              onClick={() => setScenario('A')}
            >
              Best case scenario
            </button>
            <button
              type="button"
              className={styles.chip}
              onClick={() => setScenario('D')}
            >
              Worst case scenario
            </button>
          </div>
        </div>

        <table className={styles.courseTable}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Cr</th>
              <th>Expected</th>
              <th>Points</th>
              <th></th>
            </tr>
          </thead>
          <Reorder.Group
            as="tbody"
            axis="y"
            values={futureCourses}
            onReorder={setFutureCourses}
          >
            <AnimatePresence>
              {futureCourses.map((course) => (
                <CourseRow
                  key={course.id}
                  course={course}
                  isFuture={true}
                  onUpdate={(fields) => updateFutureCourse(course.id, fields)}
                  onRemove={() => removeFutureCourse(course.id)}
                  onAddRow={addFutureCourse}
                  disableRemove={futureCourses.length <= 1}
                />
              ))}
            </AnimatePresence>
          </Reorder.Group>
        </table>
        <Button variant="outlined" onClick={addFutureCourse} fullWidth>
          + Add Expected Course
        </Button>

        <div className={styles.projectionCard}>
          <div className={styles.projectionValue}>{formatGPA(projectedGpa)}</div>
          <div className={styles.projectionLabel}>Projected GPA</div>
          <div className={`${styles.deltaCard} ${deltaClass}`}>
            <span className={styles.deltaArrow}>{arrow}</span>
            <span className={styles.deltaText}>{deltaText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureSimulator;
