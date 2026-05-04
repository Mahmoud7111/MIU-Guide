import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motion/variants';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import {
  isTargetAchievable,
  getRequiredGrades,
  getRemainingCredits,
  getEarnedCredits,
  getTotalCredits,
  calculateFutureGPA,
} from '@/lib/gpaUtils';
import { formatGPA } from '@/lib/formatters';
import { useDebounce } from '@/hooks/useDebounce';
import styles from '../GpaPage.module.css';

/**
 * TargetCalculator - Mode 3 Target GPA Calculator
 * 
 * @param {Object} props
 * @param {Array} props.completedCourses - Array of completed courses
 * @param {Array} props.inProgressCourses - Array of future/in-progress courses
 */
const TargetCalculator = ({ completedCourses, inProgressCourses = [] }) => {
  const earnedCredits = getEarnedCredits(completedCourses);
  const defaultRemaining = getRemainingCredits(earnedCredits);

  const [targetInput, setTargetInput] = useState('3.5');
  const [remainingInput, setRemainingInput] = useState(`${defaultRemaining}`);
  const debouncedTarget = useDebounce(targetInput, 300);

  const targetVal = parseFloat(debouncedTarget);
  const isValidTarget = !isNaN(targetVal) && targetVal >= 0 && targetVal <= 4.0;
  const isCalculating = targetInput !== debouncedTarget;

  const remainingCreditsInput = Math.max(0, Number(remainingInput) || 0);
  const inProgressCredits = getTotalCredits(inProgressCourses);
  const effectiveRemainingCredits = Math.max(remainingCreditsInput, inProgressCredits);
  const remainingGap = Math.max(0, effectiveRemainingCredits - inProgressCredits);

  const targetCourses =
    remainingGap === 0
      ? inProgressCourses
      : [
          ...inProgressCourses,
          { name: 'Remaining Credits', credits: remainingGap, expectedGrade: 'A+' },
        ];

  // Calculate states
  const achievable = isValidTarget
    ? isTargetAchievable(completedCourses, targetCourses, targetVal)
    : true;
  const required = isValidTarget
    ? getRequiredGrades(completedCourses, targetCourses, targetVal)
    : null;

  const maxPossibleGpa = calculateFutureGPA(
    completedCourses,
    targetCourses.map((course) => ({ ...course, expectedGrade: 'A+' })),
  );

  const scenarioGrades = [
    { label: 'A+/A', grade: 'A+' },
    { label: 'A-', grade: 'A-' },
    { label: 'B+', grade: 'B+' },
    { label: 'B', grade: 'B' },
    { label: 'C', grade: 'C' },
  ];

  const scenarios = isValidTarget
    ? scenarioGrades.map((row) => {
        const projectedCourses = targetCourses.map((course) => ({
          ...course,
          expectedGrade: row.grade,
        }));
        const projectedGPA = calculateFutureGPA(completedCourses, projectedCourses);
        const delta = Number((projectedGPA - targetVal).toFixed(2));
        return {
          ...row,
          projectedGPA,
          delta,
          achievesTarget: projectedGPA >= targetVal,
        };
      })
    : [];

  return (
    <div className={styles.targetLayout}>
      <div className={styles.targetInputCard}>
        <label className={styles.targetLabel}>What is your target GPA?</label>
        <div className={styles.targetControls}>
          <input
            type="range"
            min="0"
            max="4"
            step="0.1"
            value={targetInput}
            onChange={(e) => setTargetInput(e.target.value)}
            className={styles.targetSlider}
          />
          <Input
            type="number"
            min="0"
            max="4"
            step="0.1"
            value={targetInput}
            onChange={(e) => setTargetInput(e.target.value)}
            className={styles.targetInput}
          />
        </div>
        <div className={styles.remainingRow}>
          <label className={styles.remainingLabel}>Remaining credits</label>
          <Input
            type="number"
            min="0"
            max="200"
            value={remainingInput}
            onChange={(e) => setRemainingInput(e.target.value)}
            className={styles.remainingInput}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isValidTarget && (
          <motion.div
            key="target-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`${styles.achieveCard} ${achievable ? styles.achieveSuccess : styles.achieveFail}`}>
              <div className={styles.achieveIcon}>{achievable ? '✅' : '❌'}</div>
              <div>
                <strong>{achievable ? 'Target achievable' : 'Target not achievable'}</strong>
                <p className={styles.achieveText}>
                  With {effectiveRemainingCredits} remaining credits, the maximum possible GPA is{' '}
                  {formatGPA(maxPossibleGpa)}.
                </p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isCalculating ? (
                <motion.div
                  key="skeleton"
                  className={styles.skeletonBlock}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className={styles.skeletonLine} />
                  <div className={styles.skeletonLine} />
                  <div className={styles.skeletonLine} />
                </motion.div>
              ) : (
                <motion.div
                  key="details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {required && (
                    <div className={styles.requiredCard}>
                      <Badge variant={required.achievable ? 'success' : 'danger'}>
                        You need at least {required.requiredGrade}
                      </Badge>
                      <div className={styles.requiredMessage}>
                        {required.message}
                      </div>
                    </div>
                  )}

                  <h3 className={styles.panelTitle}>Possible Scenarios</h3>
                  <table className={styles.scenarioTable}>
                    <thead>
                      <tr>
                        <th>Grade</th>
                        <th>GPA Result</th>
                        <th>vs Target</th>
                        <th>Feasibility</th>
                      </tr>
                    </thead>
                    <motion.tbody variants={staggerContainer} initial="hidden" animate="visible">
                      {scenarios.map((scenario) => {
                        const arrow = scenario.delta > 0 ? '↑' : scenario.delta < 0 ? '↓' : '→';
                        return (
                          <motion.tr
                            key={scenario.grade}
                            className={`${styles.scenarioRow} ${scenario.achievesTarget ? styles.scenarioAchieved : styles.scenarioFailed}`}
                            variants={staggerItem}
                          >
                            <td>{scenario.label}</td>
                            <td><strong>{scenario.projectedGPA.toFixed(2)}</strong></td>
                            <td>
                              {scenario.delta >= 0 ? '+' : ''}
                              {scenario.delta.toFixed(2)} {arrow}
                            </td>
                            <td>{scenario.achievesTarget ? '✅ Achieves' : '❌ Misses'}</td>
                          </motion.tr>
                        );
                      })}
                    </motion.tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TargetCalculator;
