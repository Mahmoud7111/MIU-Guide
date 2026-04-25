import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeUp } from '../../lib/motion/variants';
import styles from './PageHero.module.css';

//! Might delete it 

/**
 * Hero section for top-level pages.
 * Features an optional background image with overlay and staggered content animations.
 */
export const PageHero = ({
  title,
  subtitle,
  breadcrumbs = [],
  image,
  size = 'md',
  align = 'left',
  overlay = true,
  children,
}) => {
  return (
    <section 
      className={`
        ${styles.hero} 
        ${styles[size]} 
        ${styles[align]} 
        ${image ? styles.hasImage : ''}
      `}
      style={image ? { backgroundImage: `url(${image})` } : {}}
    >
      {image && overlay && <div className={styles.overlay} />}

      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className={styles.content}
        >
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <motion.nav variants={staggerItem} className={styles.breadcrumbs}>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.path}>
                  <a href={crumb.path} className={styles.crumb}>{crumb.label}</a>
                  {idx < breadcrumbs.length - 1 && <span className={styles.separator}>/</span>}
                </React.Fragment>
              ))}
            </motion.nav>
          )}

          {/* Decorative Red Line */}
          <motion.div 
            variants={staggerItem} 
            className={styles.accentLine} 
          />

          {/* Title */}
          <motion.h1 variants={staggerItem} className={styles.title}>
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p variants={staggerItem} className={styles.subtitle}>
              {subtitle}
            </motion.p>
          )}

          {/* Optional CTA buttons */}
          {children && (
            <motion.div variants={staggerItem} className={styles.actions}>
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

PageHero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  })),
  image: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  align: PropTypes.oneOf(['left', 'center']),
  overlay: PropTypes.bool,
  children: PropTypes.node,
};

export default PageHero;
