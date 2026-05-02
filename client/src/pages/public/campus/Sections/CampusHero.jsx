import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBuilding, FaCalendarDays, FaDumbbell, FaMapLocationDot, FaUtensils } from 'react-icons/fa6';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion/variants';
import campusHeroImg from '@/assets/images/tools/cairo3-large.jpg';
import styles from './CampusHero.module.css';

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const navPills = [
  { id: 'buildings', label: 'Buildings', icon: FaBuilding },
  { id: 'restaurants', label: 'Restaurants', icon: FaUtensils },
  { id: 'facilities', label: 'Facilities', icon: FaDumbbell },
  { id: 'events', label: 'Events', icon: FaCalendarDays },
  { id: 'contact', label: 'Contact', icon: FaMapLocationDot },
];

const CampusHero = () => {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${campusHeroImg})` }}
    >
      <div className={styles.overlay} />

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumb */}
          <motion.nav className={styles.breadcrumb} variants={fadeUp}>
            <Link to="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span className={styles.breadcrumbCurrent}>Campus</span>
          </motion.nav>

          {/* Eyebrow */}
          <motion.span className={styles.eyebrow} variants={fadeUp}>
            Misr International University
          </motion.span>

          {/* Heading */}
          <motion.h1
            className={styles.heading}
            variants={fadeUp}
            transition={{ delay: 0.2 }}
          >
            Our Campus
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className={styles.subtitle}
            variants={fadeUp}
            transition={{ delay: 0.35 }}
          >
            Explore buildings, facilities, dining, and everything MIU has to offer.
          </motion.p>

          {/* Quick-nav pills */}
          <motion.div
            className={styles.pillRow}
            variants={staggerContainer}
            transition={{ delay: 0.5 }}
          >
            {navPills.map((pill) => (
              <motion.button
                key={pill.id}
                className={styles.pill}
                variants={staggerItem}
                onClick={() => scrollToSection(pill.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <pill.icon aria-hidden="true" />
                <span>{pill.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CampusHero;
