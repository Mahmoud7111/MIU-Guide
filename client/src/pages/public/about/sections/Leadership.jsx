import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../../components/ui';
import { fadeUp, staggerContainer, staggerItem } from '../../../../lib/motion/variants';
import styles from './Leadership.module.css';

const LEADERSHIP_DATA = [
  {
    id: 'chairman',
    role: 'Chairman of the Board of Trustees',
    name: 'Hussein El Rashidy',
    description: 'Guiding the university\'s strategic vision, the Chairman ensures MIU adheres to its foundational mission of providing premium international-standard education while contributing significantly to societal development.',
  },
  {
    id: 'president',
    role: 'University President',
    description: 'Leading the academic and administrative operations of MIU, the President fosters a culture of excellence, innovation, and continuous improvement across all university faculties and research centers.',
  },
  {
    id: 'vp-academic',
    role: 'Vice President for Academic Affairs',
    description: 'Responsible for maintaining the highest standards of teaching and curriculum development, ensuring all academic programs align with international benchmarks and quality assurance protocols.',
  },
  {
    id: 'vp-research',
    role: 'Vice President for Research & Graduate Studies',
    description: 'Spearheading MIU\'s research initiatives and partnerships, driving advancements in scientific discovery, applied research, and postgraduate educational programs.',
  }
];

/**
 * Leadership section displaying MIU's academic leadership roles.
 * Built as a standalone, reusable component adhering to the university design system.
 */
export default function Leadership() {
  return (
    <section className={styles.section} id="leadership" aria-labelledby="leadership-heading">
      <motion.div 
        className={styles.container}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div className={styles.header} variants={fadeUp}>
          <h2 id="leadership-heading" className={styles.title}>
            University Leadership
          </h2>
          <p className={styles.subtitle}>
            Committed to academic excellence, our institutional leadership guides Misr International University towards achieving its vision of being a premier destination for higher education.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {LEADERSHIP_DATA.map((member) => (
            <motion.div key={member.id} variants={staggerItem}>
              <Card variant="bordered" hoverable padding="lg" className={styles.card}>
                <div className={styles.cardContent}>
                  {member.name ? (
                    <>
                      <p className={styles.roleLabel}>{member.role}</p>
                      <h3 className={styles.leaderName}>{member.name}</h3>
                    </>
                  ) : (
                    <h3 className={styles.leaderName}>{member.role}</h3>
                  )}
                  <p className={styles.leaderDescription}>{member.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}