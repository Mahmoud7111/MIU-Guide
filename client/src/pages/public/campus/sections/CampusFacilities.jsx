import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion/variants';
import { facilities } from '@/data/campusBuildings';
import {
  FiBook,
  FiActivity,
  FiHeart,
  FiUsers,
  FiMapPin,
  FiCreditCard,
  FiCoffee,
  FiMusic,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { 
  IoFitness, 
  IoFootball, 
  IoBasketball, 
} from 'react-icons/io5';
import { FaDumbbell } from 'react-icons/fa6';
import { MdSportsHandball } from 'react-icons/md';
import styles from './CampusFacilities.module.css';

const iconMap = {
  book: <FiBook size={26} />,
  activity: <FiActivity size={26} />,
  heart: <FiHeart size={26} />,
  users: <FiUsers size={26} />,
  'map-pin': <FiMapPin size={26} />,
  'credit-card': <FiCreditCard size={26} />,
  coffee: <FiCoffee size={26} />,
  music: <FiMusic size={26} />,
  fitness: <IoFitness size={26} />,
  football: <IoFootball size={26} />,
  basketball: <IoBasketball size={26} />,
  dumbbell: <FaDumbbell size={26} />,
  handball: <MdSportsHandball size={26} />,
};

const CampusFacilities = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="facilities" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <motion.header
          className={styles.header}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className={styles.headerContent}>
            <motion.span className={styles.eyebrow} variants={fadeUp}>
              What We Offer
            </motion.span>
            <motion.h2 className={styles.heading} variants={fadeUp}>
              Campus Facilities
            </motion.h2>
          </div>
          <motion.p className={styles.subtitle} variants={fadeUp}>
            Everything you need, right on campus.
          </motion.p>
        </motion.header>

        {/* Facilities grid */}
        <div className={styles.gridWrapper}>
          <button 
            className={`${styles.scrollBtn} ${styles.left}`} 
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <FiChevronLeft />
          </button>

          <motion.div
            ref={scrollRef}
            className={styles.grid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {facilities.map((facility) => (
              <motion.div
                key={facility.id}
                className={styles.card}
                variants={staggerItem}
                whileHover={{ y: -6, boxShadow: 'var(--shadow-hover)' }}
              >
                <div className={styles.iconWrap}>
                  {iconMap[facility.icon] ?? <FiMapPin size={26} />}
                </div>
                <h3 className={styles.cardName}>{facility.name}</h3>
                <p className={styles.cardDesc}>{facility.description}</p>
                <span className={styles.locationPill}>
                  <FiMapPin size={11} style={{ flexShrink: 0 }} />
                  {facility.location}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <button 
            className={`${styles.scrollBtn} ${styles.right}`} 
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CampusFacilities;
