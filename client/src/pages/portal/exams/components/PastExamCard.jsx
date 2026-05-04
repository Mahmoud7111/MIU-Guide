import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { formatCourseCode, formatGrade } from '@/lib/formatters';
import { formatDate } from '@/lib/dateUtils';
import Badge from '@/components/ui/Badge';
import styles from '../ExamsPage.module.css';

/**
 * PastExamCard - Enhanced past exam with grade input and performance badge
 */
const PastExamCard = ({ exam }) => {
  const [grades, setGrades] = useLocalStorage('exam_grades', {});
  const [isEditing, setIsEditing] = useState(false);
  
  const grade = grades[exam.id] || '';

  const handleGradeChange = (newGrade) => {
    setGrades(prev => ({ ...prev, [exam.id]: newGrade }));
    setIsEditing(false);
  };

  const getPerformanceBadge = () => {
    if (!grade) return null;
    const upper = grade.trim().toUpperCase();
    if (['A+', 'A', 'A-'].includes(upper)) return { text: 'Excellent 🏆', class: 'excellent' };
    if (['B+', 'B', 'B-'].includes(upper)) return { text: 'Good ✅', class: 'good' };
    if (['C+', 'C', 'C-'].includes(upper)) return { text: 'Average ⚠️', class: 'average' };
    return { text: 'Needs Improvement ❌', class: 'poor' };
  };

  const performance = getPerformanceBadge();

  return (
    <motion.div 
      className={styles.pastExamCard}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
          <span className={styles.pastExamCode}>{formatCourseCode(exam.courseCode)}</span>
          <Badge variant="outline" style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}>
            {exam.type}
          </Badge>
          <span style={{ fontWeight: 500 }}>{exam.courseName}</span>
        </div>
        
        <div className={styles.pastExamDetails}>
          <span>📅 {formatDate(exam.date)}</span>
          <span>⏱️ {Math.floor(exam.duration / 60)}h {exam.duration % 60}m</span>
          <span>📍 {exam.room}</span>
        </div>
      </div>

      <div className={styles.pastExamGradeSection}>
        {isEditing ? (
          <input
            type="text"
            className={styles.gradeInput}
            placeholder="A+"
            maxLength="2"
            value={grade}
            onChange={(e) => handleGradeChange(e.target.value.toUpperCase())}
            onBlur={() => setIsEditing(false)}
            autoFocus
          />
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className={styles.gradeInput}
            style={{ cursor: 'pointer', background: grade ? 'var(--color-primary)' : 'var(--color-background)', color: grade ? 'white' : 'var(--color-text-muted)', border: 'none' }}
          >
            {grade || '–'}
          </button>
        )}

        {performance && (
          <Badge className={`${styles.performanceBadge} ${styles[performance.class]}`}>
            {performance.text}
          </Badge>
        )}
      </div>
    </motion.div>
  );
};

export default PastExamCard;
