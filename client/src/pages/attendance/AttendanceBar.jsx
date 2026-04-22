import React from 'react';
import styles from './AttendanceBar.module.css';

const AttendanceBar = ({ percent }) => (
  <div className={styles.barContainer}>
    <div className={styles.bar} style={{ width: percent + '%' }} />
  </div>
);

export default AttendanceBar;
