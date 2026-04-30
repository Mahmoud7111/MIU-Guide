import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, TagBadge } from '../../../../components/ui';
import { fadeUp, staggerContainer, staggerItem } from '../../../../lib/motion/variants';
import styles from './ProgramsSearch.module.css';

const PROGRAMS_DATA = [
  { id: 'cs', title: 'B.Sc. in Computer Science', faculty: 'Faculty of Computer Science', category: 'Undergraduate' },
  { id: 'se', title: 'B.Sc. in Software Engineering', faculty: 'Faculty of Computer Science', category: 'Undergraduate' },
  { id: 'ai', title: 'B.Sc. in Artificial Intelligence', faculty: 'Faculty of Computer Science', category: 'Undergraduate' },
  { id: 'ds', title: 'B.Sc. in Data Science', faculty: 'Faculty of Computer Science', category: 'Undergraduate' },
  { id: 'ba', title: 'BBA in Business Administration', faculty: 'Faculty of Business Administration', category: 'Undergraduate' },
  { id: 'af', title: 'B.Sc. in Accounting & Finance', faculty: 'Faculty of Business Administration', category: 'Undergraduate' },
  { id: 'mc', title: 'B.A. in Mass Communication', faculty: 'Faculty of Mass Communication', category: 'Undergraduate' },
  { id: 'ph', title: 'Bachelor of Pharmacy (PharmD)', faculty: 'Faculty of Pharmacy', category: 'Undergraduate' },
  { id: 'ce', title: 'B.Sc. in Civil Engineering', faculty: 'Faculty of Engineering', category: 'Undergraduate' },
  { id: 'mba', title: 'Master of Business Administration (MBA)', faculty: 'Faculty of Business Administration', category: 'Graduate' },
  { id: 'msc-cs', title: 'M.Sc. in Computer Science', faculty: 'Faculty of Computer Science', category: 'Graduate' }
];

export default function ProgramsSearch() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrograms = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return PROGRAMS_DATA;

    return PROGRAMS_DATA.filter((program) => 
      program.title.toLowerCase().includes(query) ||
      program.faculty.toLowerCase().includes(query) ||
      program.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

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
          <h2 className={styles.title}>Find Your Program</h2>
          <p className={styles.subtitle}>
            Search through our comprehensive list of undergraduate and graduate programs to find the perfect fit for your academic goals.
          </p>
          
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
            {filteredPrograms.length > 0 ? (
              <motion.div 
                key="results"
                className={styles.grid}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                {filteredPrograms.map((program) => (
                  <motion.div key={program.id} variants={staggerItem} layout>
                    <Card variant="bordered" hoverable padding="md" className={styles.card}>
                      <div className={styles.cardContent}>
                        <p className={styles.programFaculty}>{program.faculty}</p>
                        <h4 className={styles.programTitle}>{program.title}</h4>
                        <div style={{ marginTop: 'auto', paddingTop: 'var(--space-2)' }}>
                          <TagBadge label={program.category} size="sm" />
                        </div>
                      </div>
                    </Card>
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