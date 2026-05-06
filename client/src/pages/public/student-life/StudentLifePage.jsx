import React from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '@/components/ui';
import { pageTransition } from '@/lib/motion/variants';
import styles from './StudentLifePage.module.css';

// Import Assets
import studentLifeHero from '@/assets/images/ClubsBanner/banner.jpg';

// Import Sections
import ClubsGrid from './sections/ClubsGrid';
import Gallery from './sections/Gallery';
import Sports from './sections/Sports';
import SupportServices from './sections/SupportServices';

/**
 * StudentLifePage - Showcases the vibrant campus culture, clubs, and activities at MIU.
 */
export default function StudentLifePage() {
  return (
    <motion.main
      className={styles.pageContainer}
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <HeroSection 
        title="Student Life" 
        subtitle="Beyond the classroom, MIU offers a rich tapestry of experiences. Join clubs, participate in sports, and build lifelong friendships in our vibrant campus community."
        image={studentLifeHero}
        height="380px"
        overlayOpacity={0.5}
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Student Life' }
        ]}
      />
      
      {/* 1. Clubs & Organizations Section */}
      <div id="clubs" className={styles.mainSection}>
        <ClubsGrid />
      </div>

      <div className={styles.largeDivider} />
      
      {/* 2. Sports & Athletics Section */}
      <div id="sports" className={styles.mainSection}>
        <Sports />
      </div>
      
      <div className={styles.largeDivider} />
      
      {/* 3. Campus Gallery Section */}
      <div id="gallery" className={styles.mainSection}>
        <Gallery />
      </div>
      
      <div className={styles.largeDivider} />
      
      {/* 4. Support Services Section */}
      <div id="services" className={styles.mainSection}>
        <SupportServices />
      </div>
      
    </motion.main>
  );
}