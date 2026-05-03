import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import styles from './StatCard.module.css';

/**
 * Animated StatCard component for the dashboard.
 */
const StatCard = ({ icon, label, value, subtitle, color }) => {
  // Simple count up effect could be implemented here or via framer-motion.
  // For simplicity we just use the final string, but framer-motion can animate the container.
  
  return (
    <Card className={styles.card} style={{ '--stat-color': color }}>
      <div className={styles.iconWrapper}>
        <i data-feather={icon} className={styles.icon}></i>
      </div>
      <div className={styles.content}>
        <h3 className={styles.label}>{label}</h3>
        <motion.div 
          className={styles.value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {value}
        </motion.div>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </Card>
  );
};

export default StatCard;
