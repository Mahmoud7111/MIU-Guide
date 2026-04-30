import React from 'react';
import styles from './StatsBar.module.css';

const stats = [
  { number: '30+', label: 'YEARS OF EXCELLENCE' },
  { number: '9', label: 'WORLD-CLASS FACULTIES' },
  { number: '2,040', label: 'STUDENTS AT INTERNATIONAL PROGRAMS' },
  { number: '23,000+', label: 'ALUMNI' },
];

/**
 * StatsBar Component
 * Renders an infinite marquee of university statistics.
 * Animation is handled via CSS in StatsBar.module.css for maximum reliability.
 */
const StatsBar = () => {
  return (
    <section className={styles.marqueeSection}>
      <div className={styles.marqueeTrack}>
        {/* First set of stats */}
        <div className={styles.statsList}>
          {stats.map((stat, index) => (
            <div key={`stat-1-${index}`} className={styles.statItem}>
              <span className={styles.number}>{stat.number}</span>
              <span className={styles.label}>{stat.label}</span>
            </div>
          ))}
        </div>
        
        {/* Duplicate set for seamless looping */}
        <div className={styles.statsList}>
          {stats.map((stat, index) => (
            <div key={`stat-2-${index}`} className={styles.statItem}>
              <span className={styles.number}>{stat.number}</span>
              <span className={styles.label}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;