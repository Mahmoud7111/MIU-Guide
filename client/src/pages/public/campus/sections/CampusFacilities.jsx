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
} from 'react-icons/fi';
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
};

const CampusFacilities = () => {
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
          <motion.span className={styles.eyebrow} variants={fadeUp}>
            What We Offer
          </motion.span>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Campus Facilities
          </motion.h2>
          <motion.p className={styles.subtitle} variants={fadeUp}>
            Everything you need, right on campus.
          </motion.p>
        </motion.header>

        {/* Facilities grid */}
        <motion.div
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
      </div>
    </section>
  );
};

export default CampusFacilities;
