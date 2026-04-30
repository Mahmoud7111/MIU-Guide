import React from 'react';
import { motion } from 'framer-motion';
import { Card, TagBadge } from '@/components/ui';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion/variants';
import styles from './AcademicCalendar.module.css';

const CALENDAR_DATA = [
  {
    id: 'fall',
    term: 'Fall Semester',
    events: [
      { id: 'f1', date: 'September 15', description: 'Classes Begin', type: 'Academic' },
      { id: 'f2', date: 'September 20-25', description: 'Add/Drop Period', type: 'Registration' },
      { id: 'f3', date: 'October 6', description: 'Armed Forces Day (Holiday)', type: 'Holiday' },
      { id: 'f4', date: 'November 10-18', description: 'Midterm Examinations', type: 'Exam' },
      { id: 'f5', date: 'January 5-20', description: 'Final Examinations', type: 'Exam' },
      { id: 'f6', date: 'January 25', description: 'Revolution Day (Holiday)', type: 'Holiday' },
    ]
  },
  {
    id: 'spring',
    term: 'Spring Semester',
    events: [
      { id: 's1', date: 'February 15', description: 'Classes Begin', type: 'Academic' },
      { id: 's2', date: 'February 20-25', description: 'Add/Drop Period', type: 'Registration' },
      { id: 's3', date: 'April 25', description: 'Sinai Liberation Day (Holiday)', type: 'Holiday' },
      { id: 's4', date: 'April 5-15', description: 'Midterm Examinations', type: 'Exam' },
      { id: 's5', date: 'May 1', description: 'Labor Day (Holiday)', type: 'Holiday' },
      { id: 's6', date: 'June 1-15', description: 'Final Examinations', type: 'Exam' },
    ]
  },
  {
    id: 'summer',
    term: 'Summer Semester (Optional)',
    events: [
      { id: 'su1', date: 'July 5', description: 'Classes Begin', type: 'Academic' },
      { id: 'su2', date: 'July 5-8', description: 'Add/Drop Period', type: 'Registration' },
      { id: 'su3', date: 'July 23', description: 'Revolution Day (Holiday)', type: 'Holiday' },
      { id: 'su4', date: 'August 1-5', description: 'Midterm Examinations', type: 'Exam' },
      { id: 'su5', date: 'August 25-30', description: 'Final Examinations', type: 'Exam' },
    ]
  }
];

export default function AcademicCalendarSection() {
  return (
    <div className={styles.contentWrapper}>
      <motion.div 
        className={styles.container}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {CALENDAR_DATA.map((termBlock) => (
          <motion.section key={termBlock.id} className={styles.termSection} variants={fadeUp}>
            <div className={styles.termHeader}>
              <h2 className={styles.termTitle}>{termBlock.term}</h2>
            </div>
            
            <div className={styles.eventsGrid}>
              {termBlock.events.map((event) => (
                <motion.div key={event.id} variants={staggerItem}>
                  <Card variant="bordered" hoverable padding="md" className={styles.eventCard}>
                    <div className={styles.eventContent}>
                      <div className={styles.eventDate}>{event.date}</div>
                      <p className={styles.eventDescription}>{event.description}</p>
                      <div className={styles.eventBadge}>
                        <TagBadge label={event.type} size="sm" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </motion.div>
    </div>
  );
}