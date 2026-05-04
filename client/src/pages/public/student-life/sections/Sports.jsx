import React from 'react';
import { motion } from 'framer-motion';
import { Button, Badge } from '@/components/ui';
import { staggerContainer, staggerItem, fadeUp } from '@/lib/motion/variants';
import styles from './Sports.module.css';

// Import Assets
import footballImg from '@/assets/images/sports/football.png';
import bingbongImg from '@/assets/images/sports/bingbong.png';
import gymImg from '@/assets/images/sports/gym.png';
import volleyballImg from '@/assets/images/sports/Volleyball.png';
import generalSportsImg from '@/assets/images/tools/campus.webp';

const SPORTS_CATEGORIES = [
  {
    title: 'Football',
    description: 'Join the MIU Eagles football squad and compete in national university championships.',
    image: footballImg
  },
  {
    title: 'Bingbong',
    description: 'High-energy gameplay on our state-of-the-art courts. Open for both varsity and recreational play.',
    image: bingbongImg
  },
  {
    title: 'Gym & Fitness',
    description: 'Fully equipped fitness center with professional trainers to help you reach your health goals.',
    image: gymImg
  },
  {
    title: 'Volleyball',
    description: 'Teamwork and precision. Participate in internal leagues and inter-university tournaments.',
    image: volleyballImg
  }
];

const ACHIEVEMENTS = [
  { year: '2025', text: 'National University Football Champions' },
  { year: '2024', text: 'Best Sports Facilities Award (Regional)' },
  { year: '2023', text: 'Inter-University Basketball Silver Medal' },
  { year: '2022', text: 'Outstanding Athletics Program Excellence' }
];

const SportCard = ({ sport }) => (
  <motion.div variants={staggerItem} className={styles.sportCard}>
    <div className={styles.imageWrapper}>
      <img src={sport.image} alt={sport.title} className={styles.sportImage} loading="lazy" />
    </div>
    <div className={styles.cardContent}>
      <h3 className={styles.cardTitle}>{sport.title}</h3>
      <p className={styles.cardDescription}>{sport.description}</p>
    </div>
  </motion.div>
);

export default function Sports() {
  return (
    <section className={styles.sportsSection}>
      <div className={styles.container}>
        {/* Header Section */}
        <header className={styles.header}>
          <Badge variant="primary" className={styles.topBadge}>Athletics</Badge>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.sectionTitle}
          >
            Sports & Physical Activities
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={styles.sectionSubtitle}
          >
            Promoting a culture of health, teamwork, and competitive spirit. Our world-class facilities and dedicated coaching staff empower every student to excel beyond the classroom.
          </motion.p>
        </header>

        {/* Categories Grid */}
        <motion.div 
          className={styles.sportsGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {SPORTS_CATEGORIES.map((sport, index) => (
            <SportCard key={index} sport={sport} />
          ))}
        </motion.div>
        {/* Achievements Section */}
        <motion.div 
          className={styles.achievements}
          variants={fadeUp}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
        >
          <div className={styles.achievementsHeader}>
            <h3 className={styles.achievementsTitle}>Recent Achievements</h3>
            <Badge variant="outline">Excellence in Sports</Badge>
          </div>
          <div className={styles.achievementList}>
            {ACHIEVEMENTS.map((item, index) => (
              <div key={index} className={styles.achievementItem}>
                <span className={styles.achievementYear}>{item.year}</span>
                <span className={styles.achievementText}>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}