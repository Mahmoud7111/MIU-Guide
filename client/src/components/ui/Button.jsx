import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styles from './Button.module.css';
import Spinner from './Spinner';

/**
 * Primary Button component for MIU.
 * Supports multiple variants, sizes, and states (loading, disabled).
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  children,
  className = '',
  ...props
}) => {
  const isDisabled = disabled || loading;
  const isIconOnly = !children;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${styles.btn}
        ${styles[variant]}
        ${styles[size]}
        ${fullWidth ? styles.fullWidth : ''}
        ${isIconOnly ? styles.iconOnly : ''}
        ${className}
      `}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {loading ? (
        <Spinner size="sm" variant={variant === 'primary' || variant === 'inverted' ? 'white' : 'primary'} />
      ) : (
        <>
          {Icon && <span className={styles.iconLeft}><Icon size={size === 'sm' ? 16 : 20} /></span>}
          {children && <span className={styles.label}>{children}</span>}
          {IconRight && <span className={styles.iconRight}><IconRight size={size === 'sm' ? 16 : 20} /></span>}
        </>
      )}
    </motion.button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'inverted', 'outlined']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  icon: PropTypes.elementType,
  iconRight: PropTypes.elementType,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Button;
