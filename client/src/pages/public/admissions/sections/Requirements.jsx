import React from 'react';
import { motion } from 'framer-motion';
import { HiInformationCircle } from 'react-icons/hi';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion/variants';
import styles from './Requirements.module.css';

const REQUIREMENTS_DATA = [
  {
    id: 'academic',
    title: 'Academic Requirements',
    items: [
      {
        label: 'High School Certificate',
        value: 'Minimum required score in Thanaweya Amma or equivalent international certificates (IGCSE, American Diploma, etc.).'
      },
      {
        label: 'Faculty Specific Minimums',
        value: 'Engineering: 80%, Computer Science: 75%, Business: 70%, Pharmacy/Dentistry: 85% (Subject to change annually).'
      },
      {
        label: 'Prerequisite Subjects',
        value: 'Engineering candidates must have successfully completed Mathematics, Physics, and Chemistry at the advanced level.'
      }
    ]
  },
  {
    id: 'documents',
    title: 'Documents Required',
    items: [
      {
        label: 'Official Transcripts',
        value: 'Original High School Certificate stamped by the appropriate educational authorities.'
      },
      {
        label: 'Personal Identification',
        value: 'Original Birth Certificate, 6 recent passport-size photos, and a copy of National ID or Passport.'
      },
      {
        label: 'Military Documents',
        value: 'Namouzag 2 Jund and 6 Jund (for male Egyptian students only) are mandatory for final registration.'
      }
    ]
  },
  {
    id: 'language',
    title: 'Language Proficiency',
    items: [
      {
        label: 'MIU English Placement Test',
        value: 'All applicants are required to sit for the MIU English Placement Test (EPT) upon application.'
      },
      {
        label: 'Exemption Criteria',
        value: 'Students with high scores in TOEFL (iBT) or IELTS might be exempted from the EPT or specific English levels.'
      }
    ]
  }
];

export default function Requirements() {
  return (
    <section className={styles.sectionWrapper} id="requirements">
      <motion.div
        className={styles.container}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <div className={styles.pageWrapper}>
          <motion.div className={styles.leftSide} variants={fadeUp}>
            <h2 className={styles.mainTitle}>Admission Requirements</h2>
            <p className={styles.description}>
              MIU maintains high academic standards to ensure a diverse and capable student body.
              Please review the prerequisites for your intended program to ensure a smooth application process.
            </p>
          </motion.div>

          <motion.div className={styles.rightSide} variants={staggerItem}>
            {REQUIREMENTS_DATA.map((section) => (
              <div key={section.id} className={styles.requirementGroup}>
                <h3 className={styles.groupTitle}>{section.title}</h3>
                <ul className={styles.itemList}>
                  {section.items.map((item, idx) => (
                    <li key={idx} className={styles.item}>
                      <span className={styles.bullet}>&bull;</span>
                      <div className={styles.itemContent}>
                        <span className={styles.itemLabel}>{item.label}</span>
                        <p className={styles.itemValue}>{item.value}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <motion.div className={styles.noteBox} variants={fadeUp}>
              <h4 className={styles.noteTitle}>
                <HiInformationCircle /> Note for International Students
              </h4>
              <p className={styles.noteText}>
                Certificates obtained from outside Egypt must be authenticated by the Egyptian Ministry of Foreign Affairs
                and relevant educational authorities in the country of origin.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}