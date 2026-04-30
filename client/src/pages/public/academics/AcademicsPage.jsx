import React from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '../../../components/ui';
import { pageTransition } from '../../../lib/motion/variants';
import styles from './AcademicsPage.module.css';

// Import Sections
import FacultiesGrid from './sections/FacultiesGrid';
import ProgramsSearch from './sections/ProgramsSearch';
import ProgramsDirectory from './sections/ProgramsDirectory';
import AcademicCalendar from '../../../components/sections/academic/AcademicCalendar';

export default function AcademicsPage() {
  return (
    <motion.main
      className={styles.pageContainer}
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <PageHero 
        title="Academics at MIU" 
        subtitle="Explore our world-class faculties, comprehensive programs, and stay updated with the university academic calendar."
        align="center"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Academics', path: '/academics' }
        ]}
      />
      
      <FacultiesGrid />
      <div className={styles.sectionDivider} />
      
      <ProgramsSearch />
      <div className={styles.sectionDivider} />
      
      <ProgramsDirectory />
      <div className={styles.sectionDivider} />
      
      <AcademicCalendar />
      
    </motion.main>
  );
}