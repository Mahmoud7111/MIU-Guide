import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp, fadeIn, staggerContainer } from '@/lib/motion/variants';
import Button from '@/components/ui/Button';
import CampusMap3D from '@/components/ui/CampusMap3D';
import { ROUTES } from '@/lib/constants';
import styles from './CampusPreview.module.css';

const CampusPreview = () => {
  return (
    <section className={styles.section} id="campus-3d">
      <div className={styles.container}>
        {/* Part 1: Section Header */}
        <motion.header 
          className={styles.header}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span className={styles.eyebrow} variants={fadeUp}>
            Discover Our Campus
          </motion.span>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Discover Our World-Class Campus
          </motion.h2>
          <motion.p className={styles.subtext} variants={fadeUp}>
            Explore the modern architecture, lush greenery, and state-of-the-art facilities that define the MIU experience.
          </motion.p>
        </motion.header>

        {/* Part 2: 3D Model Viewer Container */}
        <motion.div 
          className={styles.modelContainer}
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          whileHover={{ boxShadow: '0 8px 48px rgba(139,0,0,0.15)' }}
        >
          <CampusMap3D />
        </motion.div>

        {/* Part 3: Footer Controls Hint + CTA */}
        <div className={styles.footer}>
          <motion.div 
            className={styles.hint}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <span>🖱 Drag to rotate</span>
            <span className={styles.hintDot}>•</span>
            <span>Scroll to zoom</span>
            <span className={styles.hintDot}>•</span>
            <span>Pinch on mobile</span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Button 
              variant="outlined" 
              as={Link} 
              to={ROUTES.CAMPUS}
            >
              Explore Full Campus Map
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CampusPreview;