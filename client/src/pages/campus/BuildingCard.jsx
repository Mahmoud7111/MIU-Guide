import React from 'react';
import styles from './BuildingCard.module.css';

const BuildingCard = ({ building }) => (
  <div className={styles.card}>{building}</div>
);

export default BuildingCard;
