import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NEWS } from '@/data/news';
import { ROUTES } from '@/lib/constants';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion/variants';
import styles from './NewsSection.module.css';

/**
 * NewsSection Component
 * Displays the latest 3 news/events on the homepage.
 */
const NewsSection = () => {
  // Get top 3 news items
  const recentNews = NEWS.slice(0, 3);

  return (
    <section className={styles.section} id="news">
      <div className={styles.container}>
        <motion.header 
          className={styles.header}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className={styles.headerTitle}>
            <motion.h2 className={styles.title} variants={fadeUp}>Latest News & Events</motion.h2>
            <motion.div variants={fadeUp}>
              <Link to={ROUTES.NEWS} className={styles.viewAll}>
                View All <span>→</span>
              </Link>
            </motion.div>
          </div>
        </motion.header>

        <motion.div 
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {recentNews.map((item) => (
            <motion.article 
              key={item.id} 
              className={styles.card}
              variants={staggerItem}
            >
              <Link to={`${ROUTES.NEWS}/${item.id}`} className={styles.cardLink}>
                <div className={styles.imageWrapper}>
                  <img src={item.image} alt={item.title} className={styles.image} />
                  <span className={styles.category}>{item.category}</span>
                </div>
                <div className={styles.content}>
                  <h3 className={styles.newsTitle}>{item.title}</h3>
                  <p className={styles.excerpt}>{item.excerpt}</p>
                  <time className={styles.date}>
                    {new Date(item.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </time>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;