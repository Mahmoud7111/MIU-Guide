import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motion/variants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import PastExamCard from './PastExamCard';
import styles from '../ExamsPage.module.css';

/**
 * PastExamsSection - Collapsible section with stats
 */
const PastExamsSection = ({ pastExams, collapsed, setCollapsed }) => {
  const [grades] = useLocalStorage('exam_grades', {});

  const getAverageGrade = () => {
    const gradeValues = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D': 1.0, 'F': 0.0
    };
    
    const graded = Object.values(grades).filter(g => g in gradeValues);
    if (graded.length === 0) return null;
    
    const sum = graded.reduce((acc, g) => acc + gradeValues[g], 0);
    return (sum / graded.length).toFixed(2);
  };

  const getBestCourse = () => {
    const gradeValues = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D': 1.0, 'F': 0.0
    };

    let best = null;
    let bestScore = -1;

    Object.entries(grades).forEach(([examId, grade]) => {
      const exam = pastExams.find(e => e.id === examId);
      const score = gradeValues[grade] || 0;
      if (score > bestScore && exam) {
        bestScore = score;
        best = exam;
      }
    });

    return best;
  };

  const getPassRate = () => {
    const graded = Object.values(grades);
    if (graded.length === 0) return 0;
    const passed = graded.filter(g => g !== 'F').length;
    return Math.round((passed / graded.length) * 100);
  };

  const avg = getAverageGrade();
  const best = getBestCourse();
  const passRate = getPassRate();

  return (
    <div style={{ marginTop: 'var(--space-8)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <h2 className={styles.sectionTitle}>
          Past Exams
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', fontWeight: 400 }}>
            ({pastExams.length})
          </span>
        </h2>
        
        <Button variant="outline" size="small" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? 'Show Past Exams ▼' : 'Hide ▲'}
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            {pastExams.length > 0 ? (
              <>
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  <AnimatePresence mode="popLayout">
                    {pastExams.map(exam => (
                      <motion.div key={exam.id} variants={staggerItem} layout>
                        <PastExamCard exam={exam} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {(avg || best || passRate > 0) && (
                  <div className={styles.pastExamsStats}>
                    <div className={styles.statItem}>
                      <div className={styles.statValue}>{avg || '–'}</div>
                      <div className={styles.statLabel}>Avg GPA</div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statValue}>{best ? best.courseCode : '–'}</div>
                      <div className={styles.statLabel}>Best Course</div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statValue}>{passRate}%</div>
                      <div className={styles.statLabel}>Pass Rate</div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <EmptyState 
                icon="archive"
                title="No past exams yet"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PastExamsSection;
