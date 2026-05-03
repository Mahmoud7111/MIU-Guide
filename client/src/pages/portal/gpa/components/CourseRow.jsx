import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { GRADE_POINTS } from '@/lib/gpaUtils';
import styles from '../GpaPage.module.css';

/**
 * CourseRow - A single editable row in the course table
 * 
 * @param {Object} props
 * @param {Object} props.course - The course data
 * @param {function} props.onUpdate - Callback to update course fields
 * @param {function} props.onRemove - Callback to remove the course
 * @param {boolean} [props.isFuture=false] - Whether this is for Future Simulator (expected grade)
 */
const CourseRow = ({ course, onUpdate, onRemove, isFuture = false }) => {
  const gradeField = isFuture ? 'expectedGrade' : 'grade';
  const gradeValue = course[gradeField] || '';
  const gradePoints = GRADE_POINTS[gradeValue] || 0;
  const credits = Number(course.credits) || 0;
  
  return (
    <motion.tr 
      className={styles.courseRow}
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <td className={styles.courseTableTd}>
        <Input 
          value={course.courseCode || ''} 
          onChange={(e) => onUpdate({ courseCode: e.target.value })}
          placeholder="e.g. CS101"
          style={{ width: '100px' }}
        />
      </td>
      <td className={styles.courseTableTd}>
        <Input 
          value={course.name || ''} 
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Course Name"
        />
      </td>
      <td className={styles.courseTableTd}>
        <Input 
          type="number"
          min="1"
          max="6"
          value={course.credits || ''} 
          onChange={(e) => onUpdate({ credits: parseInt(e.target.value) || 0 })}
          style={{ width: '80px' }}
        />
      </td>
      <td className={styles.courseTableTd}>
        <select 
          value={gradeValue} 
          onChange={(e) => onUpdate({ [gradeField]: e.target.value })}
          style={{ 
            padding: 'var(--space-2)', 
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)'
          }}
        >
          <option value="">Select</option>
          {Object.keys(GRADE_POINTS).map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </td>
      <td className={styles.courseTableTd} style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>
        {(gradePoints * credits).toFixed(2)}
      </td>
      <td className={styles.courseTableTd} style={{ textAlign: 'right' }}>
        <Button variant="danger" size="small" onClick={onRemove} aria-label="Remove course">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </Button>
      </td>
    </motion.tr>
  );
};

export default CourseRow;
