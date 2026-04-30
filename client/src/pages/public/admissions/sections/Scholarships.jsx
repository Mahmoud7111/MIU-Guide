import React from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiTrophy, HiStar } from 'react-icons/hi2';
import { Card } from '@/components/ui';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion/variants';
import styles from './Scholarships.module.css';

export default function Scholarships() {
  return (
    <section className={styles.sectionWrapper} id="scholarships">
      <motion.div 
        className={styles.container}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.div className={styles.header} variants={fadeUp}>
          <h2 className={styles.title}>Scholarships</h2>
          <p className={styles.subtitle}>
            MIU is committed to recognizing and rewarding excellence. We offer a range of scholarships for high academic achievers and talented athletes.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {/* Section 1: Merit Scholarships */}
          <motion.div variants={staggerItem}>
            <Card variant="bordered" hoverable padding="lg" className={styles.scholarshipCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <HiAcademicCap />
                </div>
                <h3 className={styles.sectionTitle}>Merit Scholarships</h3>
              </div>
              <ul className={styles.infoList}>
                <li className={styles.infoItem}>
                  <span className={styles.bullet}>&bull;</span>
                  <span className={styles.itemText}>
                    Egyptian students with <span className={styles.highlight}>high ranking scores</span> in Thanaweya Amma or its equivalent will be awarded scholarships.
                  </span>
                </li>
                <li className={styles.infoItem}>
                  <span className={styles.bullet}>&bull;</span>
                  <span className={styles.itemText}>
                    The scholarships are awarded at the time of admissions for <span className={styles.highlight}>one year</span>.
                  </span>
                </li>
                <li className={styles.infoItem}>
                  <span className={styles.bullet}>&bull;</span>
                  <span className={styles.itemText}>
                    After that, they will be adjusted according to the student’s academic performance based on <span className={styles.highlight}>cumulative GPA</span>.
                  </span>
                </li>
              </ul>
            </Card>
          </motion.div>

          {/* Section 2: Sports Achievement Awards */}
          <motion.div variants={staggerItem}>
            <Card variant="bordered" hoverable padding="lg" className={styles.scholarshipCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <HiTrophy />
                </div>
                <h3 className={styles.sectionTitle}>Sports Achievement Awards</h3>
              </div>
              <ul className={styles.infoList}>
                <li className={styles.infoItem}>
                  <span className={styles.bullet}>&bull;</span>
                  <div className={styles.itemText}>
                    Students with <span className={styles.highlight}>superior ranking in sports</span> will be granted scholarships for:
                    <ul style={{ paddingLeft: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
                      <li>Participating in international or regional championships.</li>
                      <li>Ranking first place in an individual/team in a most recent championship.</li>
                    </ul>
                  </div>
                </li>
                <li className={styles.infoItem}>
                  <span className={styles.bullet}>&bull;</span>
                  <span className={styles.itemText}>
                    Eligibility lasts for <span className={styles.highlight}>one academic year</span>.
                  </span>
                </li>
                <li className={styles.infoItem}>
                  <span className={styles.bullet}>&bull;</span>
                  <span className={styles.itemText}>
                    To renew the scholarship, the student must participate in the <span className={styles.highlight}>National Universities tournament</span> representing MIU.
                  </span>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}