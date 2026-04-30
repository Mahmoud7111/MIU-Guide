import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, Button, TagBadge } from '../../../../components/ui';
import { fadeUp, staggerContainer, staggerItem } from '../../../../lib/motion/variants';
import { ROUTES } from '../../../../lib/constants';
import styles from './FacultiesGrid.module.css';

const FACULTIES_DATA = [
  {
    id: 'engineering',
    name: 'Faculty of Engineering',
    description: 'Fostering innovation and technical excellence through comprehensive engineering programs designed to meet global industry standards.',
    programs: 4,
    slug: 'engineering'
  },
  {
    id: 'computer-science',
    name: 'Faculty of Computer Science',
    description: 'Equipping students with cutting-edge computing skills, artificial intelligence principles, and software development methodologies.',
    programs: 3,
    slug: 'computer-science'
  },
  {
    id: 'business',
    name: 'Faculty of Business Administration',
    description: 'Developing future business leaders and entrepreneurs with strong foundations in management, finance, and international business.',
    programs: 5,
    slug: 'business'
  },
  {
    id: 'mass-comm',
    name: 'Faculty of Mass Communication',
    description: 'Empowering creative communicators with practical experience in journalism, broadcasting, and digital media production.',
    programs: 3,
    slug: 'mass-communication'
  },
  {
    id: 'pharmacy',
    name: 'Faculty of Pharmacy',
    description: 'Advancing healthcare through rigorous pharmaceutical education, clinical practice, and innovative medical research.',
    programs: 2,
    slug: 'pharmacy'
  },
  {
    id: 'dentistry',
    name: 'Faculty of Dentistry',
    description: 'Providing world-class dental education and clinical training to produce highly skilled oral healthcare professionals.',
    programs: 1,
    slug: 'dentistry'
  },
  {
    id: 'alsun',
    name: 'Faculty of Alsun (Languages)',
    description: 'Bridging cultures through advanced linguistic studies, translation, and comprehensive literature programs.',
    programs: 4,
    slug: 'alsun'
  }
];

export default function FacultiesGrid() {
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
          <h2 className={styles.title}>Our Faculties</h2>
          <p className={styles.subtitle}>
            Explore our diverse academic offerings designed to prepare you for a successful and impactful career.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {FACULTIES_DATA.map((faculty) => (
            <motion.div key={faculty.id} variants={staggerItem}>
              <Card variant="bordered" hoverable padding="md" className={styles.card}>
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.facultyName}>{faculty.name}</h3>
                    <TagBadge label={`${faculty.programs} Programs`} size="sm" />
                  </div>
                  <p className={styles.facultyDescription}>{faculty.description}</p>
                  <div className={styles.actions}>
                    <Button 
                      as={Link} 
                      to={ROUTES.FACULTY.replace(':facultyId', faculty.slug)} 
                      variant="outlined" 
                      size="sm"
                    >
                      View Programs
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}