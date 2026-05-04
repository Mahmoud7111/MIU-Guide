import React from 'react';
import { motion } from 'framer-motion';
import styles from '../ExamsPage.module.css';

/**
 * Toast - Simple toast notification
 */
const Toast = ({ message }) => {
  return (
    <motion.div
      className={styles.toast}
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {message}
    </motion.div>
  );
};

export default Toast;
