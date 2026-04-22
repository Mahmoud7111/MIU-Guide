import React from 'react';
import styles from './LectureCard.module.css';

const LectureCard = ({ lecture }) => (
  <div className={styles.card}>{lecture}</div>
);

export default LectureCard;
