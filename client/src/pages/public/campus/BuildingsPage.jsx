/*
This is the page that lists all MIU buildings + floor details
*/

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageTransition, fadeUp, staggerContainer, staggerItem } from '@/lib/motion/variants';
import { buildings } from '@/data/campusBuildings';
import TagBadge from '@/components/ui/TagBadge';
import styles from './BuildingsPage.module.css';

const BuildingsPage = () => {
  const [expandedFloor, setExpandedFloor] = useState({});

  const toggleFloor = (buildingId, floorIdx) => {
    const key = `${buildingId}-${floorIdx}`;
    setExpandedFloor((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.main
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={styles.page}
    >
      {/* Page header */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <nav className={styles.breadcrumb}>
            <Link to="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.sep}>›</span>
            <Link to="/campus" className={styles.breadcrumbLink}>Campus</Link>
            <span className={styles.sep}>›</span>
            <span>Buildings</span>
          </nav>
          <h1 className={styles.heroTitle}>Campus Buildings</h1>
          <p className={styles.heroSub}>
            Browse all academic buildings, floors, and departments at MIU.
          </p>
        </div>
      </section>

      {/* Buildings list */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div
            className={styles.buildingList}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {buildings.map((building) => (
              <motion.article
                key={building.id}
                className={styles.buildingCard}
                variants={staggerItem}
              >
                <div className={styles.buildingHeader}>
                  <div>
                    <h2 className={styles.buildingName}>{building.name}</h2>
                    <p className={styles.buildingDesc}>{building.description}</p>
                  </div>
                  <span className={styles.floorCount}>
                    {building.floors.length} {building.floors.length === 1 ? 'Floor' : 'Floors'}
                  </span>
                </div>

                <div className={styles.floors}>
                  {building.floors.map((floor, idx) => {
                    const key = `${building.id}-${idx}`;
                    const isOpen = expandedFloor[key];
                    return (
                      <div key={floor.floor} className={styles.floorRow}>
                        <button
                          className={styles.floorToggle}
                          onClick={() => toggleFloor(building.id, idx)}
                          aria-expanded={isOpen}
                        >
                          <span className={styles.floorLabel}>{floor.label}</span>
                          <span className={`${styles.floorChevron} ${isOpen ? styles.chevronOpen : ''}`}>
                            ›
                          </span>
                        </button>

                        {isOpen && (
                          <motion.div
                            className={styles.floorDepts}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            {floor.departments.map((dept) => (
                              <TagBadge key={dept} label={dept} color="var(--brand-primary)" />
                            ))}
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
};

export default BuildingsPage;
