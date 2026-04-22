import React from 'react';
import styles from './EventList.module.css';

const EventList = ({ events }) => (
  <ul className={styles.list}>
    {events && events.length ? events.map((e, i) => <li key={i}>{e}</li>) : <li>No events</li>}
  </ul>
);

export default EventList;
