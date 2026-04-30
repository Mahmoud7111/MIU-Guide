import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../../components/ui';
import { fadeUp, staggerContainer, staggerItem } from '../../../../lib/motion/variants';
import styles from './MissionVision.module.css';

/**
 * MissionVision section displaying MIU's official Mission and Vision.
 * Built as a standalone, reusable component adhering to the university design system.
 */
export default function MissionVision() {
  return (
    <section className={styles.section} id="mission-vision" aria-labelledby="mission-vision-heading">
      <motion.div 
        className={styles.container}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div className={styles.header} variants={fadeUp}>
          <h2 id="mission-vision-heading" className={styles.title}>
            Mission & Vision
          </h2>
          <p className={styles.subtitle}>
            Guiding our commitment to academic excellence, research, and innovation to prepare graduates for a rapidly evolving global landscape.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {/* Vision Card */}
          <motion.div variants={staggerItem}>
            <Card variant="bordered" hoverable padding="lg" className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>Our Vision</h3>
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.text}>
                    To be a leading institution in higher education, research, and innovation locally and internationally.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Mission Card */}
          <motion.div variants={staggerItem}>
            <Card variant="bordered" hoverable padding="lg" className={styles.card}>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>Our Mission</h3>
                </div>
                <div className={styles.cardBody}>
                  <ul className={styles.list}>
                    <li className={styles.listItem}>
                      To provide high-quality education aligned with international standards.
                    </li>
                    <li className={styles.listItem}>
                      To prepare graduates who are innovative, ethical, and capable of contributing to society and global development.
                    </li>
                    <li className={styles.listItem}>
                      To support research, creativity, and lifelong learning.
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}