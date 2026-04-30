import React from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiDocumentText, HiTranslate, HiInformationCircle } from 'react-icons/hi';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion/variants';
import styles from './Requirements.module.css';

const REQUIREMENTS_DATA = [
  {
    id: 'academic',
    title: 'Academic Requirements',
    icon: <HiAcademicCap />,
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
    icon: <HiDocumentText />,
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
    icon: <HiTranslate />,
    items: [
      {
        label: 'MIU English Placement Test',
        value: 'All applicants are required to sit for the MIU English Placement Test (EPT) upon application.'
      },
      {
        label: 'Exemption Criteria',
        value: 'Students with high scores in TOEFL (iBT) or IELTS might be exempted from the EPT or specific English levels.'
      },
      {
        label: 'Intensive Programs',
        value: 'Students who do not meet the minimum proficiency levels will be enrolled in Intensive English Programs.'
      }
    ]
  },
  {
    id: 'process',
    title: 'Additional Notes',
    icon: <HiInformationCircle />,
    items: [
      {
        label: 'Interview Process',
        value: 'Qualified candidates will be invited for a personal interview as part of the holistic evaluation process.'
      },
      {
        label: 'Medical Examination',
        value: 'Final admission is subject to passing the university-mandated medical examination.'
      },
      {
        label: 'Application Fee',
        value: 'A non-refundable application and administrative fee is required for processing your file.'
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
        <motion.div className={styles.header} variants={fadeUp}>
          <h2 className={styles.title}>Admission Requirements</h2>
          <p className={styles.subtitle}>
            MIU maintains high academic standards to ensure a diverse and capable student body. Review the prerequisites for your intended program.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {REQUIREMENTS_DATA.map((section) => (
            <motion.div key={section.id} className={styles.requirementSection} variants={staggerItem}>
              <div className={styles.sectionHeader}>
                <div className={styles.iconWrapper}>
                  {section.icon}
                </div>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
              </div>
              
              <ul className={styles.requirementsList}>
                {section.items.map((item, idx) => (
                  <li key={idx} className={styles.requirementItem}>
                    <span className={styles.bullet}>&bull;</span>
                    <div className={styles.itemContent}>
                      <span className={styles.itemTitle}>{item.label}</span>
                      <p className={styles.itemDescription}>{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div className={styles.additionalNotes} variants={fadeUp}>
          <h4 className={styles.notesTitle}>
            <HiInformationCircle /> Important Note for International Students
          </h4>
          <p className={styles.notesText}>
            Certificates obtained from outside Egypt must be authenticated by the Egyptian Ministry of Foreign Affairs and the relevant educational authorities in the country of origin. Equivalence certification from the Supreme Council of Egyptian Universities may also be required for certain international systems.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}