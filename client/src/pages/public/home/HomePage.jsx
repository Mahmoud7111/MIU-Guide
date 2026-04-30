import React from 'react';
import HeroSection from './sections/HeroSection';
import StatsBar from './sections/StatsBar';
import AboutStrip from './sections/AboutStrip';
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
    <main className={styles.home}>
      <HeroSection />
      
      {/* Container for subsequent sections */}
      <div className={styles.contentWrapper}>
        <StatsBar />
        <FeaturesShowcase />
        <AboutStrip />

        {/* <NewsSection /> */}
        {/* <Testimonials /> */}
      </div>
    </main>
  );
};

export default HomePage;