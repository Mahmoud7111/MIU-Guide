import React, { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { pageTransition } from '@/lib/motion/variants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { 
  calculateCurrentGPA, 
  GRADE_POINTS,
  getTotalCredits, 
  getHighestGrade, 
  getLowestGrade,
  getFailedCourses,
} from '@/lib/gpaUtils';
import { formatGPA, formatGPAStatus } from '@/lib/formatters';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';
import { FiBookOpen } from 'react-icons/fi';

import GpaTabs from './components/GpaTabs';
import CourseRow from './components/CourseRow';
import GpaDisplay from './components/GpaDisplay';
import FutureSimulator from './components/FutureSimulator';
import TargetCalculator from './components/TargetCalculator';

import styles from './GpaPage.module.css';

/**
 * GpaPage - Main GPA Management and Calculator Page
 */
const GpaPage = () => {
  // Persisted state
  const [activeTab, setActiveTab] = useLocalStorage('gpa_tab', 'current');
  const [courses, setCourses] = useLocalStorage('gpa_courses', [
    { id: 1, courseCode: 'CS101', name: 'Introduction to CS', credits: 3, grade: 'A' },
    { id: 2, courseCode: 'MATH101', name: 'Calculus I', credits: 3, grade: 'B+' },
  ]);
  const [futureCourses, setFutureCourses] = useLocalStorage('gpa_future_courses', []);
  const [isResetOpen, setIsResetOpen] = useState(false);

  // Derived state for current GPA
  const currentGpa = calculateCurrentGPA(courses);
  const standing = formatGPAStatus(currentGpa);
  const totalCredits = getTotalCredits(courses);
  const highestCourse = getHighestGrade(courses);
  const lowestCourse = getLowestGrade(courses);
  const failedCourses = getFailedCourses(courses);
  const failedCount = failedCourses.length;
  const totalGradePoints = courses.reduce(
    (sum, course) =>
      sum + (GRADE_POINTS[course.grade] || 0) * (Number(course.credits) || 0),
    0,
  );

  // Handlers for Mode 1
  const addCourse = () => {
    setCourses((prev) => [
      ...prev,
      { id: Date.now(), courseCode: '', name: '', credits: 3, grade: '' },
    ]);
  };

  const updateCourse = (id, fields) => {
    setCourses(courses.map(c => c.id === id ? { ...c, ...fields } : c));
  };

  const removeCourse = (id) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter(c => c.id !== id));
  };

  const handleResetAll = () => {
    setCourses([]);
    setIsResetOpen(false);
  };

  const exportSummary = () => {
    const summary = `My GPA: ${formatGPA(currentGpa)} | Standing: ${standing} | Credits: ${totalCredits}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(summary);
    }
  };

  return (
    <motion.div
      className={styles.page}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <header className={styles.header}>
        <h1 className={styles.title}>Academic Performance</h1>
        <p className={styles.subtitle}>Track your GPA, simulate future grades, and calculate target scenarios.</p>
      </header>

      <GpaTabs activeTab={activeTab} onChange={setActiveTab} />

      <div className={styles.contentArea}>
        <AnimatePresence mode="wait">
          {activeTab === 'current' && (
            <motion.div
              key="current"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>Current Semester</h3>
                <div className={styles.panelActions}>
                  <Button variant="outlined" onClick={() => setIsResetOpen(true)}>
                    Reset All
                  </Button>
                </div>
              </div>

              {courses.length === 0 ? (
                <div className={styles.emptyStateWrapper}>
                  <EmptyState
                    icon={FiBookOpen}
                    title="Add your first course to calculate GPA"
                    description="Start building your GPA by adding course details and grades."
                  />
                  <Button variant="primary" onClick={addCourse} className={styles.emptyStateButton}>
                    + Add Course
                  </Button>
                </div>
              ) : (
                <>
                  <table className={styles.courseTable}>
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Credits</th>
                        <th>Grade</th>
                        <th>Grade Points</th>
                        <th></th>
                      </tr>
                    </thead>
                    <Reorder.Group
                      as="tbody"
                      axis="y"
                      values={courses}
                      onReorder={setCourses}
                    >
                      <AnimatePresence>
                        {courses.map(course => (
                          <CourseRow 
                            key={course.id} 
                            course={course} 
                            onUpdate={(fields) => updateCourse(course.id, fields)}
                            onRemove={() => removeCourse(course.id)}
                            onAddRow={addCourse}
                            disableRemove={courses.length <= 1}
                          />
                        ))}
                      </AnimatePresence>
                    </Reorder.Group>
                  </table>

                  <div className={styles.courseActions}>
                    <Button variant="primary" onClick={addCourse} fullWidth>
                      + Add Course
                    </Button>
                  </div>
                </>
              )}

              {courses.length > 0 && (
                <>
                  <GpaDisplay 
                    gpa={currentGpa}
                    standing={standing}
                    totalCredits={totalCredits}
                    highestCourse={highestCourse?.courseCode}
                    lowestCourse={lowestCourse?.courseCode}
                  />

                  <div className={styles.summaryCard}>
                    <div className={styles.summaryHeader}>
                      <h4 className={styles.summaryTitle}>Semester Summary</h4>
                      <Button variant="outlined" size="sm" onClick={exportSummary}>
                        Export Summary
                      </Button>
                    </div>
                    <div className={styles.summaryGrid}>
                      <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Total credits attempted</span>
                        <span className={styles.summaryValue}>{totalCredits}</span>
                      </div>
                      <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Total grade points earned</span>
                        <span className={styles.summaryValue}>{totalGradePoints.toFixed(2)}</span>
                      </div>
                      <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Highest grade</span>
                        <span className={styles.summaryValue}>
                          {highestCourse
                            ? `${highestCourse.name || highestCourse.courseCode} (${highestCourse.grade})`
                            : '-'}
                        </span>
                      </div>
                      <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Lowest grade</span>
                        <span className={styles.summaryValue}>
                          {lowestCourse
                            ? `${lowestCourse.name || lowestCourse.courseCode} (${lowestCourse.grade})`
                            : '-'}
                        </span>
                      </div>
                      <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Failed courses</span>
                        <span className={styles.summaryValue}>
                          {failedCount > 0 ? (
                            <Badge variant="danger">{failedCount}</Badge>
                          ) : (
                            '0'
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {activeTab === 'future' && (
            <motion.div
              key="future"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <FutureSimulator 
                completedCourses={courses}
                futureCourses={futureCourses}
                setFutureCourses={setFutureCourses}
                currentGpa={currentGpa}
              />
            </motion.div>
          )}

          {activeTab === 'target' && (
            <motion.div
              key="target"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <TargetCalculator completedCourses={courses} inProgressCourses={futureCourses} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Modal
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        title="Reset all courses?"
        footer={
          <div className={styles.modalFooter}>
            <Button variant="outlined" onClick={() => setIsResetOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleResetAll}>
              Reset All
            </Button>
          </div>
        }
      >
        This will remove all current courses and reset your GPA calculation.
      </Modal>
    </motion.div>
  );
};

export default GpaPage;
