import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../../../lib/motion/variants';
import { PageHero } from '../../../components/ui';

// About Sections
import MissionVision from './sections/MissionVision';
import HistoryTimeline from './sections/HistoryTimeline';
import Leadership from './sections/Leadership';
import Accreditations from './sections/Accreditations';

import styles from './AboutPage.module.css';

/**
 * The official MIU About Page.
 * Acts purely as a compositional container for the standalone About sections.
 */
export default function AboutPage() {
  return (
    <motion.main
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={styles.aboutPage}
    >
      <PageHero 
        title="About MIU" 
        subtitle="A legacy of academic excellence, innovation, and international standards since 1996."
        align="center"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'About Us', path: '/about' }
        ]}
      />
      
      <div className={styles.sectionsContainer}>
        <MissionVision />
        <HistoryTimeline />
        <Leadership />
        <Accreditations />
      </div>
    </motion.main>
  );
}