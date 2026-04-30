import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp } from '@/lib/motion/variants';
import styles from './Input.module.css';

/**
 * Flexible Input component supporting text, search, and textarea.
 * Includes floating labels and error states.
 */
export const Input = ({
  variant = 'default',
  label,
  placeholder,
  value,
  onChange,
  error,
  hint,
  icon: Icon,
  iconRight: IconRight,
  disabled = false,
  required = false,
  rows = 4,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isTextarea = variant === 'textarea';
  const hasValue = value && value.length > 0;
  const showLabel = label && (isFocused || hasValue);

  const InputElement = isTextarea ? 'textarea' : 'input';

  return (
    <div className={`${styles.container} ${disabled ? styles.disabled : ''} ${className}`}>
      <div className={`${styles.fieldWrapper} ${error ? styles.errorField : ''} ${isFocused ? styles.focused : ''}`}>
        <AnimatePresence>
          {showLabel && (
            <motion.label
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className={styles.floatingLabel}
            >
              {label} {required && <span className={styles.required}>*</span>}
            </motion.label>
          )}
        </AnimatePresence>

        <div className={styles.inputGroup}>
          {Icon && (
            <span className={styles.iconLeft}>
              <Icon size={20} />
            </span>
          )}

          <InputElement
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={!showLabel ? placeholder : ''}
            disabled={disabled}
            required={required}
            rows={isTextarea ? rows : undefined}
            className={`${styles.input} ${variant === 'search' ? styles.search : ''} ${Icon ? styles.hasIconLeft : ''} ${IconRight ? styles.hasIconRight : ''}`}
            {...props}
          />

          {IconRight && (
            <span className={styles.iconRight}>
              {typeof IconRight === 'function' ? <IconRight size={20} /> : IconRight}
            </span>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            key="error"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={styles.errorMessage}
          >
            {error}
          </motion.p>
        ) : hint ? (
          <p key="hint" className={styles.hintText}>{hint}</p>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

Input.propTypes = {
  variant: PropTypes.oneOf(['default', 'search', 'textarea']),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  hint: PropTypes.string,
  icon: PropTypes.elementType,
  iconRight: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  rows: PropTypes.number,
  className: PropTypes.string,
};

export default Input;
