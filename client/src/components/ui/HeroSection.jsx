import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { staggerContainer, fadeUp } from '@/lib/motion/variants';
import styles from './HeroSection.module.css';

/**
 * Reusable Hero Section for top-level pages.
 * Features a background image, dark overlay, and centered content.
 */
const HeroSection = ({ 
  title, 
  subtitle, 
  image, 
  breadcrumbs = [], 
  height = '70vh',
  overlayOpacity = 0.55,
  titleColor = '#ffffff'
}) => {
  return (
    <section 
      className={styles.heroSection} 
      style={{ height }}
    >
      <div 
        className={styles.heroOverlay} 
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      />
      
      {image && (
        <img 
          src={image} 
          alt={title} 
          className={styles.heroBackground}
        />
      )}
      
      <motion.div 
        className={styles.heroContent}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {breadcrumbs.length > 0 && (
          <motion.nav variants={fadeUp} className={styles.breadcrumbs}>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.path || idx}>
                {crumb.path ? (
                  <a href={crumb.path} className={styles.crumb}>{crumb.label}</a>
                ) : (
                  <span className={styles.activeCrumb}>{crumb.label}</span>
                )}
                {idx < breadcrumbs.length - 1 && (
                  <span className={styles.separator}>/</span>
                )}
              </React.Fragment>
            ))}
          </motion.nav>
        )}
        
        <motion.h1 
          variants={fadeUp} 
          className={styles.heroTitle}
          style={{ color: titleColor }}
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p variants={fadeUp} className={styles.heroSubtitle}>
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
};

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  image: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    path: PropTypes.string
  })),
  height: PropTypes.string,
  overlayOpacity: PropTypes.number,
  titleColor: PropTypes.string
};

export default HeroSection;
