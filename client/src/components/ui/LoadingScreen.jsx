import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './LoadingScreen.module.css';

/**
 * LoadingScreen - A premium loading overlay for lazy routes and bootstrapping.
 * 
 * @param {Object} props
 * @param {string} [props.message="Loading"] - Text to display below the loader.
 * @param {boolean} [props.fullScreen=true] - If true, covers viewport (fixed). Else fills relative parent (absolute).
 */
const LoadingScreen = ({ message = "Loading", fullScreen = true }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`${styles.container} ${fullScreen ? styles.fullScreen : styles.absolute}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.loaderWrapper}>
        <motion.div
          className={styles.circleOuter}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className={styles.circleInner}
          animate={{ 
            scale: [0.8, 1.2, 0.8], 
            opacity: [0.5, 0.8, 0.5] 
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className={styles.message}>
        {message}<span className={styles.ellipsis}>{dots}</span>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
