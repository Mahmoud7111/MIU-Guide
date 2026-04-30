import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../../../../data/testimonials';
import { fadeUp, fadeIn } from '../../../../lib/motion/variants';
import styles from './Testimonials.module.css';

/**
 * Testimonials Component
 * Shows real student quotes with a clean, focused layout.
 */
const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const current = TESTIMONIALS[activeIndex];

  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.container}>
        {/* Quote Icon */}
        <motion.div 
          className={styles.quoteIcon}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <svg width="60" height="45" viewBox="0 0 60 45" fill="none">
            <path d="M16.5 0C25.5 0 32 6.5 32 15.5C32 24.5 25.5 31 16.5 31C14.5 31 12.5 30.5 10.5 29.5C12.5 36.5 18.5 41.5 25.5 41.5V45C11.5 45 0 33.5 0 19.5C0 8.5 7.5 0 16.5 0ZM44.5 0C53.5 0 60 6.5 60 15.5C60 24.5 53.5 31 44.5 31C42.5 31 40.5 30.5 38.5 29.5C40.5 36.5 46.5 41.5 53.5 41.5V45C39.5 45 28 33.5 28 19.5C28 8.5 35.5 0 44.5 0Z" fill="var(--brand-primary)" opacity="0.1" />
          </svg>
        </motion.div>

        <div className={styles.contentWrapper}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={styles.testimonial}
            >
              <blockquote className={styles.quote}>
                "{current.quote}"
              </blockquote>

              <div className={styles.author}>
                <div className={styles.avatarWrapper}>
                  <img src={current.image} alt={current.name} className={styles.avatar} />
                </div>
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>{current.name}</h4>
                  <p className={styles.authorMeta}>{current.faculty}, {current.batch}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className={styles.controls}>
            <button onClick={prev} className={styles.navBtn} aria-label="Previous testimonial">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            
            <div className={styles.dots}>
              {TESTIMONIALS.map((_, idx) => (
                <button 
                  key={idx} 
                  className={`${styles.dot} ${idx === activeIndex ? styles.activeDot : ''}`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button onClick={next} className={styles.navBtn} aria-label="Next testimonial">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;