import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styles from './ProgressBar.module.css';

/**
 * ProgressBar component with status-based coloring and animations.
 */
export const ProgressBar = ({
  value = 0,
  label,
  showValue = false,
  size = 'md',
  variant,
  animated = true,
}) => {
  // Auto-variant logic if none provided
  const getAutoVariant = (val) => {
    if (val >= 85) return 'success';
    if (val >= 75) return 'warning';
    return 'danger';
  };

  const activeVariant = variant || getAutoVariant(value);
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={styles.container}>
      {(label || showValue) && (
        <div className={styles.header}>
          {label && <span className={styles.label}>{label}</span>}
          {showValue && <span className={styles.value}>{clampedValue}%</span>}
        </div>
      )}

      <div className={`${styles.track} ${styles[size]}`}>
        <motion.div
          className={`${styles.fill} ${styles[activeVariant]}`}
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {animated && <div className={styles.shimmer} />}
        </motion.div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string,
  showValue: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'success', 'warning', 'danger']),
  animated: PropTypes.bool,
};

export default ProgressBar;
