import React from 'react';
import styles from './GpaSummary.module.css';

const GpaSummary = ({ gpa }) => (
  <div className={styles.summary}>GPA: {gpa}</div>
);

export default GpaSummary;
