import React from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '@/components/ui';
import { pageTransition } from '@/lib/motion/variants';
import styles from './AdmissionsPage.module.css';

// Import Admissions Sections
import Requirements from './sections/Requirements';
import ApplySteps from './sections/ApplySteps';
import Scholarships from './sections/Scholarships';
import AdmissionsFAQ from './sections/AdmissionsFAQ';

/**
 * AdmissionsPage - The main hub for prospective students.
 * Integrates all admissions-related information into a professional academic experience.
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
      {/* Hero Section */}
      <PageHero 
        title="Admissions at MIU" 
        subtitle="Your path to a world-class education. Discover our programs, understand our requirements, and start your application journey today."
        align="center"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Admissions', path: '/admissions' }
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
