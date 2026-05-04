import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, TagBadge } from '@/components/ui';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion/variants';
import styles from './ProgramsSearch.module.css';

const PROGRAMS_DATA = [
  {
    category: 'Undergraduate Programs',
    programs: [
      { id: 'cs', title: 'B.Sc. in Computer Science', faculty: 'Faculty of Computer Science', duration: '4 Years' },
      { id: 'se', title: 'B.Sc. in Software Engineering', faculty: 'Faculty of Computer Science', duration: '4 Years' },
      { id: 'ai', title: 'B.Sc. in Artificial Intelligence', faculty: 'Faculty of Computer Science', duration: '4 Years' },
      { id: 'ds', title: 'B.Sc. in Data Science', faculty: 'Faculty of Computer Science', duration: '4 Years' },
      { id: 'ba', title: 'BBA in Business Administration', faculty: 'Faculty of Business Administration', duration: '4 Years' },
      { id: 'af', title: 'B.Sc. in Accounting & Finance', faculty: 'Faculty of Business Administration', duration: '4 Years' },
      { id: 'mc', title: 'B.A. in Mass Communication', faculty: 'Faculty of Mass Communication', duration: '4 Years' },
      { id: 'ph', title: 'Bachelor of Pharmacy (PharmD)', faculty: 'Faculty of Pharmacy', duration: '5 Years' },
      { id: 'ce', title: 'B.Sc. in Civil Engineering', faculty: 'Faculty of Engineering', duration: '5 Years' }
    ]
  },
  {
    category: 'Graduate Programs & Diplomas',
    programs: [
      { id: 'mba', title: 'Master of Business Administration (MBA)', faculty: 'Faculty of Business Administration', duration: '2 Years' },
      { id: 'msc-cs', title: 'M.Sc. in Computer Science', faculty: 'Faculty of Computer Science', duration: '2 Years' },
      { id: 'dip-ai', title: 'Professional Diploma in AI', faculty: 'Faculty of Computer Science', duration: '1 Year' }
    ]
  }
];

export default function ProgramsSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const totalPrograms = PROGRAMS_DATA.reduce((total, section) => total + section.programs.length, 0);
  const categoryCount = PROGRAMS_DATA.length;

  const filteredSections = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return PROGRAMS_DATA;

    return PROGRAMS_DATA.map((section) => {
      const programs = section.programs.filter((program) => 
        program.title.toLowerCase().includes(query) ||
        program.faculty.toLowerCase().includes(query) ||
        section.category.toLowerCase().includes(query)
      );

      return { ...section, programs };
    }).filter((section) => section.programs.length > 0);
  }, [searchQuery]);

  const hasResults = filteredSections.length > 0;

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className={styles.kicker}>Programs Directory</span>
          <div className={styles.headerRow}>
            <div className={styles.headerText}>
              <h2 className={styles.title}>Find Your Program</h2>
              <p className={styles.subtitle}>
                Search or browse our programs directory to find the right path for your academic goals.
              </p>
            </div>
            <div className={styles.stats}>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{totalPrograms}</span>
                <span className={styles.statLabel}>Programs</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{categoryCount}</span>
                <span className={styles.statLabel}>Levels</span>
              </div>
            </div>
          </div>
          
          <div className={styles.searchContainer}>
            <input 
              type="text" 
              className={styles.searchInput}
              placeholder="Search by program name, faculty, or level..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        <div className={styles.resultsArea}>
          <AnimatePresence mode="wait">
            {hasResults ? (
              <motion.div 
                key="results"
                className={styles.sections}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                {filteredSections.map((section) => (
                  <motion.div key={section.category} className={styles.categorySection} variants={fadeUp}>
                    <div className={styles.categoryHeader}>
                      <h3 className={styles.categoryTitle}>{section.category}</h3>
                    </div>

                    <motion.div 
                      className={styles.grid}
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      {section.programs.map((program) => (
                        <motion.div key={program.id} variants={staggerItem} layout>
                          <Card variant="bordered" hoverable padding="md" className={styles.card}>
                            <div className={styles.cardContent}>
                              <p className={styles.programFaculty}>{program.faculty}</p>
                              <h4 className={styles.programTitle}>{program.title}</h4>
                              <div className={styles.programDetails}>
                                <TagBadge label={program.duration} size="sm" />
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                className={styles.emptyState}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className={styles.emptyTitle}>No programs found</h3>
                <p className={styles.emptyDesc}>
                  We couldn't find any programs matching "{searchQuery}". Try adjusting your search terms.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}