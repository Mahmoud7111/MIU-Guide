import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styles from './Card.module.css';

/**
 * Versatile Card component for grouping content.
 * Supports elevation, borders, and interactive hover states.
 */
export const Card = ({
  variant = 'default',
  hoverable = false,
  clickable = false,
  padding = 'md',
  className = '',
  onClick,
  children,
  ...props
}) => {
  const Component = clickable ? motion.div : 'div';

  return (
    <Component
      onClick={onClick}
      className={`
        ${styles.card}
        ${styles[variant]}
        ${styles[`p-${padding}`]}
        ${hoverable ? styles.hoverable : ''}
        ${clickable ? styles.clickable : ''}
        ${className}
      `}
      {...(clickable ? { whileTap: { scale: 0.98 } } : {})}
      {...props}
    >
      {children}
    </Component>
  );
};

Card.propTypes = {
  variant: PropTypes.oneOf(['default', 'elevated', 'bordered', 'flat']),
  hoverable: PropTypes.bool,
  clickable: PropTypes.bool,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Card;
