import React from 'react';
import { motion } from 'framer-motion';
import { FiGlobe, FiBriefcase, FiZap, FiArrowRight } from 'react-icons/fi';
import { fadeIn, fadeUp, staggerContainer, staggerItem } from '@/lib/motion/variants';
import styles from './AboutStrip.module.css';

// Asset
import aboutImg from '@/assets/images/About/about.webp';

/**
 * AboutStrip Component
 * A concise "Why MIU" section highlighting institutional advantages.
 */
const AboutStrip = () => {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        
        {/* Left: Visual Side */}
        <motion.div
          className={styles.imageSide}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className={styles.imageWrapper} variants={fadeIn}>
            <img src={aboutImg} alt="Students at MIU" className={styles.image} />
          </motion.div>
          
          <motion.div className={styles.badge} variants={fadeUp}>
            <span className={styles.badgeTitle}>Top 10</span>
            <span className={styles.badgeText}>Ranked in the Region</span>
          </motion.div>
        </motion.div>

        {/* Right: Content Side */}
        <motion.div
          className={styles.contentSide}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.header className={styles.header} variants={staggerContainer}>
            <motion.div className={styles.accent} variants={fadeIn} />
            <motion.h2 className={styles.title} variants={fadeUp}>Why MIU?</motion.h2>
            <motion.p className={styles.description} variants={fadeUp}>
              Misr International University provides a distinct educational environment focused on innovation, practical experience, and global readiness.
            </motion.p>
          </motion.header>

          <motion.div className={styles.points} variants={staggerContainer}>
            {/* Point 1 */}
            <motion.div className={styles.point} variants={staggerItem}>
              <div className={styles.icon}><FiGlobe size={24} /></div>
              <div>
                <h3 className={styles.pointTitle}>International Partnerships</h3>
                <p className={styles.pointText}>Dual-degree programs with leading European universities, expanding global horizons.</p>
              </div>
            </motion.div>

            {/* Point 2 */}
            <motion.div className={styles.point} variants={staggerItem}>
              <div className={styles.icon}><FiZap size={24} /></div>
              <div>
                <h3 className={styles.pointTitle}>State-of-the-art Facilities</h3>
                <p className={styles.pointText}>Modern labs, expansive libraries, and dedicated innovation hubs designed for the future.</p>
              </div>
            </motion.div>

            {/* Point 3 */}
            <motion.div className={styles.point} variants={staggerItem}>
              <div className={styles.icon}><FiBriefcase size={24} /></div>
              <div>
                <h3 className={styles.pointTitle}>Career Readiness</h3>
                <p className={styles.pointText}>Comprehensive career placement services and a vast alumni network opening doors worldwide.</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div className={styles.linkWrapper} variants={fadeUp}>
            <a href="@/about" className={styles.link}>
              Learn more about our vision <FiArrowRight />
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutStrip;