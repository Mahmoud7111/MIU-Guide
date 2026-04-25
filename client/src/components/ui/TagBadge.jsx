import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styles from './TagBadge.module.css';

/**
 * TagBadge component for categorization.
 * Features deterministic color generation and removable state.
 */
export const TagBadge = ({
  label,
  color,
  removable = false,
  onRemove,
  size = 'md',
  onClick,
}) => {
  // Deterministic color generation if none provided
  const tagStyles = useMemo(() => {
    if (color) return { '--tag-color': color };
    
    const colors = [
      '#EF4444', '#F59E0B', '#10B981', '#3B82F6', 
      '#6366F1', '#8B5CF6', '#EC4899', '#8B0000'
    ];
    
    let hash = 0;
    for (let i = 0; i < label.length; i++) {
      hash = label.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    
    return { '--tag-color': colors[index] };
  }, [label, color]);

  return (
    <motion.div
      layout
      onClick={onClick}
      className={`
        ${styles.tag} 
        ${styles[size]} 
        ${onClick ? styles.clickable : ''}
      `}
      style={tagStyles}
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
    >
      <span className={styles.label}>{label}</span>
      
      {removable && (
        <motion.button
          whileHover={{ scale: 1.2 }}
          className={styles.removeBtn}
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          aria-label={`Remove ${label}`}
        >
          &times;
        </motion.button>
      )}
    </motion.div>
  );
};

TagBadge.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  removable: PropTypes.bool,
  onRemove: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md']),
  onClick: PropTypes.func,
};

export default TagBadge;
