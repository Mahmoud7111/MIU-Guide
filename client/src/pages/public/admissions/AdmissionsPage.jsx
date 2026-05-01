import React from 'react';
import { motion } from 'framer-motion';
import { PageHero, HeroSection } from '@/components/ui';
import { pageTransition, fadeUp, staggerContainer, staggerItem } from '@/lib/motion/variants';
import styles from './AdmissionsPage.module.css';

// Import Assets
import admissionHero from '@/assets/images/tools/Addmision.jpg';

// Import Admissions Sections
import Requirements from './sections/Requirements';
import ApplySteps from './sections/ApplySteps';
import Scholarships from './sections/Scholarships';
import AdmissionsFAQ from './sections/AdmissionsFAQ';


/**
 * AdmissionsPage - A premium, academic hub for prospective students.
 * Features a professional split-layout for requirements and maintains consistent MIU branding.
 */
export default function AdmissionsPage() {
  return (
    <motion.main
      className={styles.pageContainer}
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <HeroSection 
        title="Admissions" 
        subtitle="Embark on your journey to a world-class education. Discover our academic programs, review our prerequisites, and take the first step toward your future at MIU."
        image={admissionHero}
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Admissions' }
        ]}
      />
      
      {/* 1. Requirements Section */}
      <Requirements />

      <div className={styles.sectionDivider} />
      
      {/* 2. How to Apply Section */}
      <ApplySteps />
      
      <div className={styles.sectionDivider} />
      
      {/* 3. Scholarships Section */}
      <Scholarships />
      
      <div className={styles.sectionDivider} />
      
      {/* 4. Frequently Asked Questions Section */}
      <AdmissionsFAQ />
      
    </motion.main>
  );
}
