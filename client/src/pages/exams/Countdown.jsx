import React from 'react';
import styles from './Countdown.module.css';

const Countdown = ({ time }) => (
  <div className={styles.countdown}>Countdown: {time}</div>
);

export default Countdown;
