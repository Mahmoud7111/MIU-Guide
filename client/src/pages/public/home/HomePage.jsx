import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../../../lib/motion/variants';
import HeroSection from './sections/HeroSection';
import StatsBar from './sections/StatsBar';
import AboutStrip from './sections/AboutStrip';
import FacultyHighlights from './sections/FacultyHighlights';
import CampusPreview from './sections/CampusPreview';
import FeaturesShowcase from './sections/FeaturesShowcase';
import NewsSection from './sections/NewsSection';
import Testimonials from './sections/Testimonials';
import styles from './HomePage.module.css';

/**
 * MIU Home Page component.
 * Orchestrates all main sections of the landing page.
 */
const HomePage = () => {
  return (
    <motion.main
      className={styles.home}
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <HeroSection />
      
      {/* Container for subsequent sections */}
      <div className={styles.contentWrapper}>
        <StatsBar />
        <AboutStrip />
        <FacultyHighlights />
        <CampusPreview />
        <FeaturesShowcase />
        <NewsSection />
        <Testimonials />
      </div>
    </motion.main>
  );
};

export default HomePage;