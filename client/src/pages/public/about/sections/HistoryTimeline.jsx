import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion/variants';
import styles from './HistoryTimeline.module.css';

const HISTORY_DATA = [
  {
    id: 'establishment',
    year: '1996',
    title: 'Foundation & Establishment',
    description: 'Misr International University was officially established by presidential decree No. 246, becoming one of the early pioneering private universities in Egypt. The institution was founded by Hussein El Rashidy with a vision for academic excellence.',
  },
  {
    id: 'inception',
    year: 'Early Years',
    title: 'Academic Inception',
    description: 'The university commenced its educational journey with core foundational faculties, specifically the Faculty of Business Administration and International Trade, alongside the Faculty of Alsun (Languages).',
  },
  {
    id: 'expansion',
    year: 'Strategic Growth',
    title: 'Institutional Expansion',
    description: 'MIU significantly expanded its academic offerings to meet growing educational demands, subsequently establishing the faculties of Engineering, Pharmacy, Computer Science, Dentistry, and Mass Communication.',
  },
  {
    id: 'future',
    year: 'Present & Future',
    title: 'Global Integration',
    description: 'Today, MIU focuses on uniquely combining Egyptian educational heritage with international academic standards, ensuring continuous development in both academic programs and institutional infrastructure.',
  }
];

/**
 * HistoryTimeline section displaying MIU's official history.
 * Built as a standalone, reusable component adhering to the university design system.
 */
export default function HistoryTimeline() {
  return (
    <section className={styles.section} id="history" aria-labelledby="history-heading">
      <motion.div 
        className={styles.container}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div className={styles.header} variants={fadeUp}>
          <h2 id="history-heading" className={styles.title}>
            Our History & Legacy
          </h2>
          <p className={styles.subtitle}>
            A timeline of academic excellence, institutional growth, and a continuous commitment to shaping the future of education in Egypt.
          </p>
        </motion.div>

        <div className={styles.timeline}>
          {HISTORY_DATA.map((item) => (
            <motion.div key={item.id} className={styles.timelineItem} variants={staggerItem}>
              <div className={styles.timelineMarker} aria-hidden="true" />
              <Card variant="bordered" hoverable padding="md" className={styles.itemCard}>
                <div className={styles.itemContent}>
                  <span className={styles.itemYear}>{item.year}</span>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemText}>{item.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}