import React from 'react';
import { motion } from 'framer-motion';
import { Card, TagBadge } from '../../../../components/ui';
import { fadeUp, staggerContainer, staggerItem } from '../../../../lib/motion/variants';
import styles from './ProgramsDirectory.module.css';

const PROGRAMS_DATA = [
  {
    category: 'Undergraduate Programs',
    programs: [
      { id: 'cs', title: 'B.Sc. in Computer Science', faculty: 'Faculty of Computer Science', duration: '4 Years' },
      { id: 'se', title: 'B.Sc. in Software Engineering', faculty: 'Faculty of Computer Science', duration: '4 Years' },
      { id: 'ai', title: 'B.Sc. in Artificial Intelligence', faculty: 'Faculty of Computer Science', duration: '4 Years' },
      { id: 'ba', title: 'BBA in Business Administration', faculty: 'Faculty of Business Administration', duration: '4 Years' },
      { id: 'af', title: 'B.Sc. in Accounting & Finance', faculty: 'Faculty of Business Administration', duration: '4 Years' },
      { id: 'mc', title: 'B.A. in Mass Communication', faculty: 'Faculty of Mass Communication', duration: '4 Years' },
      { id: 'ph', title: 'Bachelor of Pharmacy (PharmD)', faculty: 'Faculty of Pharmacy', duration: '5 Years' },
      { id: 'ce', title: 'B.Sc. in Civil Engineering', faculty: 'Faculty of Engineering', duration: '5 Years' },
    ]
  },
  {
    category: 'Graduate Programs & Diplomas',
    programs: [
      { id: 'mba', title: 'Master of Business Administration (MBA)', faculty: 'Faculty of Business Administration', duration: '2 Years' },
      { id: 'msc-cs', title: 'M.Sc. in Computer Science', faculty: 'Faculty of Computer Science', duration: '2 Years' },
      { id: 'dip-ai', title: 'Professional Diploma in AI', faculty: 'Faculty of Computer Science', duration: '1 Year' },
    ]
  }
];

export default function ProgramsDirectory() {
  return (
    <div className={styles.contentWrapper}>
      <motion.div 
        className={styles.container}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.div className={styles.header} variants={fadeUp}>
          <h2 className={styles.title}>Programs Directory</h2>
          <p className={styles.subtitle}>
            Discover the comprehensive academic pathways offered at Misr International University, designed to build your future.
          </p>
        </motion.div>

        {PROGRAMS_DATA.map((section) => (
          <motion.div key={section.category} className={styles.categorySection} variants={fadeUp}>
            <div className={styles.categoryHeader}>
              <h3 className={styles.categoryTitle}>{section.category}</h3>
            </div>
            
            <div className={styles.grid}>
              {section.programs.map((program) => (
                <motion.div key={program.id} variants={staggerItem}>
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
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}