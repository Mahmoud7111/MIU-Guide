import React from 'react';
import styles from './CourseRow.module.css';

const CourseRow = ({ course, grade }) => (
  <div className={styles.row}>
    <span>{course}</span>
    <span>{grade}</span>
  </div>
);

export default CourseRow;
