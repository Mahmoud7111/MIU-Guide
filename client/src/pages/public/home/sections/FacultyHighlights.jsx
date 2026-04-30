import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FACULTIES } from '../../../../data/faculties';
import { ROUTES } from '../../../../lib/constants';
import { fadeUp, staggerContainer, staggerItem } from '../../../../lib/motion/variants';
import Button from '../../../../components/ui/Button';
import styles from './FacultyHighlights.module.css';

/**
 * FacultyHighlights Component
 * Horizontal scroll section showcasing university faculties.
 */
const FacultyHighlights = () => {
  return (
    <section className={styles.section} id="faculties">
      <div className={styles.container}>
        <motion.header 
          className={styles.header}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span className={styles.eyebrow} variants={fadeUp}>Academic Excellence</motion.span>
          <motion.h2 className={styles.title} variants={fadeUp}>World-Class Faculties</motion.h2>
          <motion.p className={styles.description} variants={fadeUp}>
            Explore our specialized colleges, each dedicated to innovation, research, and career-focused education.
          </motion.p>
        </motion.header>

        <motion.div 
          className={styles.scrollContainer}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className={styles.track}>
            {FACULTIES.map((faculty) => (
              <motion.div 
                key={faculty.id} 
                className={styles.card}
                variants={staggerItem}
              >
                <div className={styles.imageWrapper}>
                  <img src={faculty.image} alt={faculty.name} className={styles.image} />
                  <div className={styles.overlay} />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.facultyName}>{faculty.name}</h3>
                  <p className={styles.facultyDesc}>{faculty.description}</p>
                  <Link to={`${ROUTES.ACADEMICS}/${faculty.slug}`} className={styles.cardLink}>
                    Explore Faculty <span>→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className={styles.footer}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button variant="outlined" as={Link} to={ROUTES.ACADEMICS}>
            View All Academic Programs
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FacultyHighlights;