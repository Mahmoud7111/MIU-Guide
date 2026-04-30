import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion/variants';
import Button from './Button';
import styles from './EmptyState.module.css';

/**
 * EmptyState component for placeholders and no-data scenarios.
 */
export const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  size = 'md',
}) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className={`${styles.container} ${styles[size]}`}
    >
      <div className={styles.iconWrapper}>
        <div className={styles.iconBg} />
        {Icon && <Icon className={styles.icon} />}
      </div>
      
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      
      {action && (
        <div className={styles.action}>
          <Button 
            variant="outlined" 
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        </div>
      )}
    </motion.div>
  );
};

EmptyState.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default EmptyState;
