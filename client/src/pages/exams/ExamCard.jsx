import React from 'react';
import styles from './ExamCard.module.css';

const ExamCard = ({ exam }) => (
  <div className={styles.card}>{exam}</div>
);

export default ExamCard;
