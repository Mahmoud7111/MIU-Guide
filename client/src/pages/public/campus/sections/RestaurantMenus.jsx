import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaMapLocationDot } from 'react-icons/fa6';
import { fadeUp, fadeIn, staggerContainer } from '@/lib/motion/variants';
import { restaurants } from '@/data/campusBuildings';
import styles from './RestaurantMenus.module.css';

const RestaurantMenus = () => {
  const [activeRestaurant, setActiveRestaurant] = useState(restaurants[0]);

  return (
    <section id="restaurants" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <motion.header
          className={styles.header}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span className={styles.eyebrow} variants={fadeUp}>
            Dining on Campus
          </motion.span>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Restaurant Menus
          </motion.h2>
          <motion.p className={styles.subtitle} variants={fadeUp}>
            All menus in one place — no more walking around to check what's available.
          </motion.p>
        </motion.header>

        {/* Restaurant tabs */}
        <motion.div
          className={styles.tabs}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {restaurants.map((r) => (
            <button
              key={r.id}
              className={`${styles.tab} ${activeRestaurant.id === r.id ? styles.tabActive : ''}`}
              onClick={() => setActiveRestaurant(r)}
            >
              {r.name}
            </button>
          ))}
        </motion.div>

        {/* Active restaurant panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRestaurant.id}
            className={styles.panel}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Info row */}
            <div className={styles.infoRow}>
              <h3 className={styles.restaurantName}>{activeRestaurant.name}</h3>
              <div className={styles.badges}>
                <span className={styles.badge}>
                  <FaMapLocationDot aria-hidden="true" />
                  <span>{activeRestaurant.location}</span>
                </span>
                <span className={styles.badge}>
                  <FaClock aria-hidden="true" />
                  <span>{activeRestaurant.hours}</span>
                </span>
                <span className={`${styles.badge} ${styles.badgeCuisine}`}>
                  {activeRestaurant.cuisine}
                </span>
              </div>
            </div>

            {/* Menu grid */}
            <div className={styles.menuGrid}>
              {activeRestaurant.menu.map((category) => (
                <div key={category.category} className={styles.menuCategory}>
                  <h4 className={styles.categoryTitle}>{category.category}</h4>
                  <ul className={styles.itemList}>
                    {category.items.map((item) => (
                      <li key={item.name} className={styles.menuItem}>
                        <span className={styles.itemName}>{item.name}</span>
                        <span className={styles.itemDots} />
                        <span className={styles.itemPrice}>EGP {item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RestaurantMenus;
