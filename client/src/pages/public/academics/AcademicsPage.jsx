import React from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '@/components/ui';
import { pageTransition } from '@/lib/motion/variants';
import styles from './AcademicsPage.module.css';

// Import Assets
import cairoHero from '@/assets/images/tools/cairo1-large.jpg';

// Import Sections
import FacultiesGrid from './sections/FacultiesGrid';
import ProgramsSearch from './sections/ProgramsSearch';
import AcademicCalendar from '@/components/sections/academic/AcademicCalendar';

export default function AcademicsPage() {
  return (
    <motion.main
      className={styles.pageContainer}
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <HeroSection 
        title="Academics at MIU" 
        subtitle="Explore our world-class faculties, comprehensive programs, and stay updated with the university academic calendar."
        image={cairoHero}
        titleColor="#ffffff"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Academics' }
        ]}
      />
      
      <div id="faculties"><FacultiesGrid /></div>
      <div className={styles.sectionDivider} />
      
      <div id="programs"><ProgramsSearch /></div>
      <div className={styles.sectionDivider} />
      
      <div id="calendar"><AcademicCalendar /></div>
      
    </motion.main>
  );
}