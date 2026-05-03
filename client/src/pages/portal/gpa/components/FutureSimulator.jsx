import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { calculateFutureGPA, getGPAImpact } from '@/lib/gpaUtils';
import { formatGPA, formatGPATrend } from '@/lib/formatters';
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
    setFutureCourses([...futureCourses, { id: Date.now(), courseCode: '', name: '', credits: 3, expectedGrade: '' }]);
  };

  const updateFutureCourse = (id, fields) => {
    setFutureCourses(futureCourses.map(c => c.id === id ? { ...c, ...fields } : c));
  };

  const removeFutureCourse = (id) => {
    setFutureCourses(futureCourses.filter(c => c.id !== id));
  };

  const projectedGpa = calculateFutureGPA(completedCourses, futureCourses);
  const impact = getGPAImpact(completedCourses, futureCourses);
  const trend = formatGPATrend(impact);

  return (
    <div className={styles.simulatorLayout}>
      <div className={styles.simulatorPanel}>
        <h3 className={styles.panelTitle}>Future Courses</h3>
        <table className={styles.courseTable}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Cr</th>
              <th>Expected</th>
              <th>Pts</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {futureCourses.map((course) => (
                <CourseRow 
                  key={course.id} 
                  course={course} 
                  isFuture={true}
                  onUpdate={(fields) => updateFutureCourse(course.id, fields)}
                  onRemove={() => removeFutureCourse(course.id)}
                />
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        <Button variant="outline" onClick={addFutureCourse} style={{ width: '100%' }}>
          + Add Expected Course
        </Button>
      </div>

      <div className={styles.simulatorPanel}>
        <h3 className={styles.panelTitle}>Live Projection</h3>
        <div style={{ textAlign: 'center', padding: 'var(--space-6) 0' }}>
          <div style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>
            Current GPA: <strong style={{ color: 'var(--color-text)' }}>{formatGPA(currentGpa)}</strong>
          </div>
          <div style={{ fontSize: 'var(--text-6xl)', fontWeight: 700, margin: 'var(--space-4) 0' }}>
            {formatGPA(projectedGpa)}
          </div>
          {impact !== 0 && (
            <div className={styles.deltaIndicator} style={{
              background: impact > 0 ? 'var(--color-success-light)' : 'var(--color-danger-light)',
              color: impact > 0 ? 'var(--color-success-dark)' : 'var(--color-danger-dark)'
            }}>
              {trend} from current
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FutureSimulator;
