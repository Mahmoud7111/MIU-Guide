import React from 'react';
import { Reorder } from 'framer-motion';
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
 * @param {function} props.onAddRow - Callback to add a new course row
 * @param {boolean} props.disableRemove - Whether remove is disabled
 * @param {boolean} [props.isFuture=false] - Whether this is for Future Simulator (expected grade)
 */
const CourseRow = ({
  course,
  onUpdate,
  onRemove,
  onAddRow,
  disableRemove = false,
  isFuture = false,
}) => {
  const gradeField = isFuture ? 'expectedGrade' : 'grade';
  const gradeValue = course[gradeField] || '';
  const gradePoints = GRADE_POINTS[gradeValue] || 0;
  const credits = Number(course.credits) || 0;
  const totalPoints = gradePoints * credits;
  const pointsText = gradeValue
    ? `${gradeValue} × ${credits}cr = ${totalPoints.toFixed(1)} pts`
    : '-';
  const isRowEmpty =
    !course.courseCode?.trim() &&
    !course.name?.trim() &&
    !gradeValue &&
    (course.credits === '' || Number(course.credits) === 0 || course.credits == null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (onAddRow) onAddRow();
    }
    if ((event.key === 'Backspace' || event.key === 'Delete') && isRowEmpty && !disableRemove) {
      event.preventDefault();
      onRemove();
    }
  };

  const gradeOptions = [
    { label: 'A+ (4.0)', value: 'A+' },
    { label: 'A (4.0)', value: 'A' },
    { label: 'A- (3.7)', value: 'A-' },
    { label: 'B+ (3.3)', value: 'B+' },
    { label: 'B (3.0)', value: 'B' },
    { label: 'B- (2.7)', value: 'B-' },
    { label: 'C+ (2.3)', value: 'C+' },
    { label: 'C (2.0)', value: 'C' },
    { label: 'C- (1.7)', value: 'C-' },
    { label: 'D+ (1.3)', value: 'D+' },
    { label: 'D (1.0)', value: 'D' },
    { label: 'F (0.0)', value: 'F' },
  ];

  return (
    <Reorder.Item
      value={course}
      as="tr"
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
          onKeyDown={handleKeyDown}
          className={styles.courseCodeInput}
        />
      </td>
      <td className={styles.courseTableTd}>
        <Input 
          value={course.name || ''} 
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Course Name"
          onKeyDown={handleKeyDown}
        />
      </td>
      <td className={styles.courseTableTd}>
        <Input 
          type="number"
          min="1"
          max="6"
          value={course.credits || ''} 
          onChange={(e) => onUpdate({ credits: e.target.value === '' ? '' : parseInt(e.target.value, 10) || 0 })}
          onKeyDown={handleKeyDown}
          className={styles.courseCreditsInput}
        />
      </td>
      <td className={styles.courseTableTd}>
        <select 
          value={gradeValue} 
          onChange={(e) => onUpdate({ [gradeField]: e.target.value })}
          onKeyDown={handleKeyDown}
          className={styles.gradeSelect}
        >
          <option value="">Select</option>
          {gradeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </td>
      <td className={`${styles.courseTableTd} ${styles.pointsFormula}`}>
        {pointsText}
      </td>
      <td className={styles.courseTableTd} style={{ textAlign: 'right' }}>
        <Button
          variant="outlined"
          size="sm"
          onClick={onRemove}
          disabled={disableRemove}
          className={styles.deleteButton}
          aria-label="Remove course"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </Button>
      </td>
    </Reorder.Item>
  );
};

export default CourseRow;
