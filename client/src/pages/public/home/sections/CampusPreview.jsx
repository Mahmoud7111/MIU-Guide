import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp, fadeIn, staggerContainer } from '../../../../lib/motion/variants';
import Button from '../../../../components/ui/Button';
import Spinner from '../../../../components/ui/Spinner';
import { ROUTES } from '../../../../lib/constants';
import campusModel from '../../../../assets/3D-Models/Tcampus.glb';
import styles from './CampusPreview.module.css';

/**
 * CampusPreview Component
 * Interactive 3D model of the MIU campus.
 * Standout feature for the homepage allowing users to explore the campus in 3D.
 */
const CampusPreview = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load model-viewer script via CDN
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

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


          {/* model-viewer custom element */}
          <model-viewer
            src={campusModel}
            alt="MIU Campus 3D Model"
            auto-rotate
            auto-rotate-delay="1000"
            camera-controls
            camera-orbit="0deg 75deg 80%"
            field-of-view="60deg"
            shadow-intensity="1"
            shadow-softness="0.8"
            exposure="0.9"
            environment-image="neutral"
            rotation-per-second="15deg"
            onLoad={() => setLoaded(true)}
            style={{ width: '100%', height: '100%' }}
          />
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