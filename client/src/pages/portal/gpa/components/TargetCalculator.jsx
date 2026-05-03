import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motion/variants';
import Input from '@/components/ui/Input';
import { isTargetAchievable, getRequiredGrades, getTargetScenarios } from '@/lib/gpaUtils';
import { useDebounce } from '@/hooks/useDebounce';
import styles from '../GpaPage.module.css';

/**
 * TargetCalculator - Mode 3 Target GPA Calculator
 * 
 * @param {Object} props
 * @param {Array} props.completedCourses - Array of completed courses
 */
const TargetCalculator = ({ completedCourses }) => {
  const [targetInput, setTargetInput] = useState('3.5');
  const debouncedTarget = useDebounce(targetInput, 500);
  
  const targetVal = parseFloat(debouncedTarget);
  const isValidTarget = !isNaN(targetVal) && targetVal >= 0 && targetVal <= 4.0;
  
  // Calculate states
  const achievable = isValidTarget ? isTargetAchievable(completedCourses, targetVal) : true;
  const requiredMsg = isValidTarget && achievable ? getRequiredGrades(completedCourses, targetVal) : '';
  const scenarios = isValidTarget ? getTargetScenarios(completedCourses, targetVal) : [];

  return (
    <div className={styles.targetLayout}>
      <div className={styles.targetInputCard}>
        <label className={styles.targetLabel}>What is your target GPA?</label>
        <Input 
          type="number"
          min="0"
          max="4"
          step="0.01"
          value={targetInput}
          onChange={(e) => setTargetInput(e.target.value)}
          className={styles.targetInput}
        />
      </div>

      {isValidTarget && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {!achievable ? (
            <div style={{ padding: 'var(--space-4)', background: 'var(--color-danger-light)', color: 'var(--color-danger-dark)', borderRadius: 'var(--radius-md)', textAlign: 'center', marginBottom: 'var(--space-6)' }}>
              <strong>Target not achievable with remaining credits.</strong>
              <p style={{ marginTop: 'var(--space-2)' }}>Even if you get an A in all remaining courses, you cannot reach {targetVal.toFixed(2)}.</p>
            </div>
          ) : (
            <>
              <div style={{ padding: 'var(--space-4)', background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', borderRadius: 'var(--radius-md)', textAlign: 'center', marginBottom: 'var(--space-6)', fontWeight: 500 }}>
                {requiredMsg}
              </div>

              <h3 className={styles.panelTitle}>Possible Scenarios</h3>
              <table className={styles.scenarioTable}>
                <thead>
                  <tr>
                    <th>Scenario</th>
                    <th>Projected GPA</th>
                    <th>Achieves Target</th>
                  </tr>
                </thead>
                <motion.tbody
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {scenarios.map((scenario, i) => (
                    <motion.tr 
                      key={i} 
                      className={`${styles.scenarioRow} ${scenario.achievesTarget ? styles.scenarioAchieved : styles.scenarioFailed}`}
                      variants={staggerItem}
                    >
                      <td>All {scenario.grade}</td>
                      <td><strong>{scenario.projectedGPA.toFixed(2)}</strong></td>
                      <td>{scenario.achievesTarget ? '✅' : '❌'}</td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default TargetCalculator;
