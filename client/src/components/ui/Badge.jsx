import React from 'react';
import PropTypes from 'prop-types';
import styles from './Badge.module.css';

/**
 * Badge component for tags, status indicators, etc.
 * Supports a pulsing dot indicator.
 * 
 * @param {Object} props
 * @param {'default'|'primary'|'success'|'warning'|'danger'} props.variant - Color variant.
 * @param {'sm'|'md'} props.size - Size of the badge.
 * @param {boolean} props.dot - Whether to show a pulsing dot.
 * @param {React.ReactNode} props.children - Label text.
 */
export const Badge = ({ 
  variant = 'default', 
  size = 'md', 
  dot = false, 
  children 
}) => {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]}`}>
      {dot && (
        <motion.span 
          className={styles.dot}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut"
          }}
        />
      )}
      {children}
    </span>
  );
};

Badge.propTypes = {
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger']),
  size: PropTypes.oneOf(['sm', 'md']),
  dot: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Badge;
