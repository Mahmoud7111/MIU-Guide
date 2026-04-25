import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styles from './Spinner.module.css';

/**
 * Spinner component for loading states.
 * Uses Framer Motion for the rotation animation.
 * 
 * @param {Object} props
 * @param {'sm'|'md'|'lg'} props.size - Size of the spinner.
 * @param {'primary'|'white'|'muted'} props.variant - Color variant of the spinner.
 * @param {string} [props.label] - Optional accessibility label.
 */
export const Spinner = ({ size = 'md', variant = 'primary', label = 'Loading...' }) => {
  return (
    <div 
      className={`${styles.container} ${styles[size]} ${styles[variant]}`}
      role="status"
      aria-live="polite"
    >
      <motion.div
        className={styles.spinner}
        animate={{ rotate: 360 }}
        transition={{ 
          repeat: Infinity, 
          ease: 'linear', 
          duration: 0.7 
        }}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['primary', 'white', 'muted']),
  label: PropTypes.string,
};

export default Spinner;
