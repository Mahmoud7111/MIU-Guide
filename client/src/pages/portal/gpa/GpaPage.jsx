import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageTransition } from '@/lib/motion/variants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { 
  calculateCurrentGPA, 
  getAcademicStanding, 
  getTotalCredits, 
  getHighestGradedCourse, 
  getLowestGradedCourse 
} from '@/lib/gpaUtils';
import Button from '@/components/ui/Button';

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

  // Derived state for current GPA
  const currentGpa = calculateCurrentGPA(courses);
  const standing = getAcademicStanding(currentGpa);
  const totalCredits = getTotalCredits(courses);
  const highestCourse = getHighestGradedCourse(courses)?.courseCode;
  const lowestCourse = getLowestGradedCourse(courses)?.courseCode;

  // Handlers for Mode 1
  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), courseCode: '', name: '', credits: 3, grade: '' }]);
  };

  const updateCourse = (id, fields) => {
    setCourses(courses.map(c => c.id === id ? { ...c, ...fields } : c));
  };

  const removeCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                <h3 className={styles.panelTitle}>Current Semester</h3>
                <Button variant="primary" onClick={addCourse}>+ Add Course</Button>
              </div>

              <table className={styles.courseTable}>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Credits</th>
                    <th>Grade</th>
                    <th>Points</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {courses.map(course => (
                      <CourseRow 
                        key={course.id} 
                        course={course} 
                        onUpdate={(fields) => updateCourse(course.id, fields)}
                        onRemove={() => removeCourse(course.id)}
                      />
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>

              <GpaDisplay 
                gpa={currentGpa}
                standing={standing}
                totalCredits={totalCredits}
                highestCourse={highestCourse}
                lowestCourse={lowestCourse}
              />
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
              <TargetCalculator completedCourses={courses} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default GpaPage;
