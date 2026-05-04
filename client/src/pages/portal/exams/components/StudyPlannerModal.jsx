import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDaysUntil, formatDate } from '@/lib/dateUtils';
import { formatCourseCode } from '@/lib/formatters';
import Button from '@/components/ui/Button';
import styles from '../ExamsPage.module.css';

/**
 * StudyPlannerModal - Plan study schedule with conflict detection
 */
const StudyPlannerModal = ({ isOpen, onClose, exams }) => {
  const getStudyStartDate = (examDate, type) => {
    const date = new Date(examDate);
    const daysBack = type === 'Final' ? 14 : type === 'Midterm' ? 7 : 2;
    date.setDate(date.getDate() - daysBack);
    return date;
  };

  const getStudyHours = (type) => {
    const hours = { 'Final': 20, 'Midterm': 10, 'Quiz': 3 };
    return hours[type] || 5;
  };

  const detectConflicts = () => {
    const conflicts = [];
    for (let i = 0; i < exams.length; i++) {
      for (let j = i + 1; j < exams.length; j++) {
        const daysDiff = Math.abs(getDaysUntil(exams[i].date) - getDaysUntil(exams[j].date));
        if (daysDiff <= 2 && daysDiff > 0) {
          conflicts.push({
            exam1: exams[i],
            exam2: exams[j],
            daysDiff
          });
        }
      }
    }
    return conflicts;
  };

  const conflicts = detectConflicts();

  const handleExport = () => {
    let plan = 'MIU STUDY PLAN\n\n';
    exams.forEach(exam => {
      const startDate = getStudyStartDate(exam.date, exam.type);
      const hours = getStudyHours(exam.type);
      plan += `${formatCourseCode(exam.courseCode)} - ${exam.courseName}\n`;
      plan += `📅 Exam: ${formatDate(exam.date)}\n`;
      plan += `📚 Start studying: ${formatDate(startDate)}\n`;
      plan += `⏱️ Study time: ${hours} hours total (~${Math.ceil(hours / 7)} hours/day)\n\n`;
    });

    navigator.clipboard.writeText(plan).then(() => {
      alert('Study plan copied to clipboard!');
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.studyPlannerModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.studyPlannerContent}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.studyPlannerHeader}>
              <h2 className={styles.studyPlannerTitle}>📚 Study Plan</h2>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 'var(--text-xl)',
                  cursor: 'pointer',
                  color: 'var(--color-text-muted)',
                }}
              >
                ✕
              </button>
            </div>

            {/* Conflicts */}
            {conflicts.length > 0 && (
              <div>
                {conflicts.map((conflict, idx) => (
                  <div key={idx} className={styles.studyPlannerConflict}>
                    ⚠️ {formatCourseCode(conflict.exam1.courseCode)} and {formatCourseCode(conflict.exam2.courseCode)} exams are {conflict.daysDiff} day{conflict.daysDiff > 1 ? 's' : ''} apart — plan carefully!
                  </div>
                ))}
              </div>
            )}

            {/* Study Plan Items */}
            <div>
              {exams.map(exam => {
                const startDate = getStudyStartDate(exam.date, exam.type);
                const hours = getStudyHours(exam.type);
                const daysToStudy = Math.ceil(getDaysUntil(exam.date) - getDaysUntil(startDate));
                const hoursPerDay = daysToStudy > 0 ? Math.ceil(hours / daysToStudy) : hours;

                return (
                  <div key={exam.id} className={styles.studyPlannerExamItem}>
                    <div className={styles.studyPlannerExamName}>
                      {formatCourseCode(exam.courseCode)} — {exam.courseName}
                    </div>
                    <div className={styles.studyPlannerStudyStart}>
                      📅 Exam: {formatDate(exam.date)}
                    </div>
                    <div className={styles.studyPlannerStudyStart}>
                      📚 Start studying: {formatDate(startDate)}
                    </div>
                    <div className={styles.studyPlannerStudyStart}>
                      ⏱️ Study {hours} hours total (~{hoursPerDay}h/day for {daysToStudy} day{daysToStudy > 1 ? 's' : ''})
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Export Button */}
            <div style={{ marginTop: 'var(--space-6)', display: 'flex', gap: 'var(--space-2)' }}>
              <Button
                variant="primary"
                onClick={handleExport}
                style={{ flex: 1 }}
              >
                📋 Copy Plan
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                style={{ flex: 1 }}
              >
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StudyPlannerModal;
