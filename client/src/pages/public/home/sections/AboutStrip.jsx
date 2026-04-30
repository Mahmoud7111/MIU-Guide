import React from 'react';
import { FiGlobe, FiBriefcase, FiZap, FiArrowRight } from 'react-icons/fi';
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
        <div className={styles.imageSide}>
          <div className={styles.imageWrapper}>
            <img src={aboutImg} alt="Students at MIU" className={styles.image} />
          </div>
          
          <div className={styles.badge}>
            <span className={styles.badgeTitle}>Top 10</span>
            <span className={styles.badgeText}>Ranked in the Region</span>
          </div>
        </div>

        {/* Right: Content Side */}
        <div className={styles.contentSide}>
          <header className={styles.header}>
            <div className={styles.accent} />
            <h2 className={styles.title}>Why MIU?</h2>
            <p className={styles.description}>
              Misr International University provides a distinct educational environment focused on innovation, practical experience, and global readiness.
            </p>
          </header>

          <div className={styles.points}>
            {/* Point 1 */}
            <div className={styles.point}>
              <div className={styles.icon}><FiGlobe size={24} /></div>
              <div>
                <h3 className={styles.pointTitle}>International Partnerships</h3>
                <p className={styles.pointText}>Dual-degree programs with leading European universities, expanding global horizons.</p>
              </div>
            </div>

            {/* Point 2 */}
            <div className={styles.point}>
              <div className={styles.icon}><FiZap size={24} /></div>
              <div>
                <h3 className={styles.pointTitle}>State-of-the-art Facilities</h3>
                <p className={styles.pointText}>Modern labs, expansive libraries, and dedicated innovation hubs designed for the future.</p>
              </div>
            </div>

            {/* Point 3 */}
            <div className={styles.point}>
              <div className={styles.icon}><FiBriefcase size={24} /></div>
              <div>
                <h3 className={styles.pointTitle}>Career Readiness</h3>
                <p className={styles.pointText}>Comprehensive career placement services and a vast alumni network opening doors worldwide.</p>
              </div>
            </div>
          </div>

          <div className={styles.linkWrapper}>
            <a href="@/about" className={styles.link}>
              Learn more about our vision <FiArrowRight />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutStrip;