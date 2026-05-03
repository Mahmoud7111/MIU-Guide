import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import styles from './StatCard.module.css';

/**
 * Animated StatCard component for the dashboard with enhanced features.
 */
const StatCard = ({ icon, label, value, subtitle, color, trend, atRiskCount, badge, progress, onClick }) => {
  const [hovered, setHovered] = useState(false);

  const getTrendIndicator = () => {
    if (!trend) return null;
    if (trend > 0) return <span className={styles.trendUp}>↑ +{trend}</span>;
    if (trend < 0) return <span className={styles.trendDown}>↓ {trend}</span>;
    return <span className={styles.trendFlat}>→</span>;
  };

  return (
    <motion.div
      className={styles.cardWrapper}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <Card className={styles.card} style={{ '--stat-color': color }}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <i data-feather={icon} className={styles.icon}></i>
          </div>
          {badge && (
            <motion.span 
              className={styles.badge}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {badge}
            </motion.span>
          )}
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

          <div className={styles.subtitleWrapper}>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            {trend !== undefined && getTrendIndicator()}
          </div>

          {atRiskCount !== undefined && atRiskCount > 0 && (
            <p className={styles.warning}>
              {atRiskCount} at-risk course{atRiskCount !== 1 ? 's' : ''}
            </p>
          )}

          {progress !== undefined && (
            <div className={styles.progressBar}>
              <motion.div 
                className={styles.progressFill}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          )}
        </div>
      </Card>

      {hovered && onClick && (
        <motion.div 
          className={styles.ripple}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.div>
  );
};

export default StatCard;
