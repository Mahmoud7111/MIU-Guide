import React from 'react';
import styles from './AttendanceCard.module.css';

const AttendanceCard = ({ course, percent }) => (
  <div className={styles.card}>
    <div>{course}</div>
    <div>{percent}%</div>
  </div>
);

export default AttendanceCard;
