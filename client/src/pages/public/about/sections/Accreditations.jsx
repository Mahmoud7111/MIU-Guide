import React from 'react';
import { motion } from 'framer-motion';
import { Card, TagBadge } from '../../../../components/ui';
import { fadeUp, staggerContainer, staggerItem } from '../../../../lib/motion/variants';
import styles from './Accreditations.module.css';

const ACCREDITATIONS_DATA = [
  {
    id: 'naqaae',
    title: 'NAQAAE Accreditation',
    description: 'Officially accredited by the National Authority for Quality Assurance and Accreditation of Education, reflecting our commitment to the highest academic standards in Egypt.',
    status: 'Fully Accredited',
  },
  {
    id: 'mohe',
    title: 'Ministry of Higher Education',
    description: 'All academic programs and degrees offered by MIU are fully recognized and equivalated by the Egyptian Supreme Council of Universities and the Ministry of Higher Education.',
    status: 'Recognized',
  },
  {
    id: 'institutional',
    title: 'Institutional Credibility',
    description: 'Committed to global standards with curricula designed to match international benchmarks, fostering robust academic excellence and professional opportunities for our graduates.',
    status: 'Global Standard',
  }
];

export default function Accreditations() {
  return (
    <section className={styles.section} id="accreditations" aria-labelledby="accreditations-heading">
      <motion.div 
        className={styles.container}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div className={styles.header} variants={fadeUp}>
          <h2 id="accreditations-heading" className={styles.title}>
            Academic Accreditations
          </h2>
          <p className={styles.subtitle}>
            Misr International University maintains the highest educational standards, holding prominent national accreditations and institutional recognition.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {ACCREDITATIONS_DATA.map((item) => (
            <motion.div key={item.id} variants={staggerItem}>
              <Card variant="bordered" hoverable padding="lg" className={styles.card}>
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <TagBadge label={item.status} size="sm" />
                  </div>
                  <p className={styles.cardText}>
                    {item.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
