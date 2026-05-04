// BuildingFinder — interactive 3D campus viewer + building selector
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion/variants';
import TagBadge from '@/components/ui/TagBadge';
import CampusMap3D from '@/components/ui/CampusMap3D';
import { buildings, restaurants } from '@/data/campusBuildings';
import {
  FiMapPin,
  FiLayers,
  FiChevronRight,
  FiBookOpen,
  FiCoffee,
  FiClock,
} from 'react-icons/fi';
import styles from './BuildingFinder.module.css';

const BuildingFinder = () => {
  const [activeTab, setActiveTab] = useState('buildings');
  const [selectedItem, setSelectedItem] = useState(buildings[0]);
  const [selectedFloor, setSelectedFloor] = useState(0);

  useEffect(() => {
    setSelectedFloor(0);
  }, [selectedItem]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedItem(tab === 'buildings' ? buildings[0] : restaurants[0]);
  };

  return (
    <section id="buildings" className={styles.section}>
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
            Interactive 3D Map
          </motion.span>
          <motion.h2 className={styles.heading} variants={fadeUp}>
            Find Your Building
          </motion.h2>
          <motion.p className={styles.subtext} variants={fadeUp}>
            Select a building to zoom the 3D model and explore its departments floor by floor.
          </motion.p>
        </motion.header>

        {/* Main grid */}
        <div className={styles.mainGrid}>
          {/* LEFT — Building selector + floor detail */}
          <motion.div
            className={styles.selectorCol}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Type selector tabs */}
            <div className={styles.typeSelector}>
              <button
                className={`${styles.typeTab} ${activeTab === 'buildings' ? styles.typeTabActive : ''}`}
                onClick={() => handleTabChange('buildings')}
              >
                Buildings
              </button>
              <button
                className={`${styles.typeTab} ${activeTab === 'restaurants' ? styles.typeTabActive : ''}`}
                onClick={() => handleTabChange('restaurants')}
              >
                Restaurants
              </button>
            </div>

            {/* List cards */}
            <div className={styles.cardList}>
              {(activeTab === 'buildings' ? buildings : restaurants).map((item) => {
                const isSelected = selectedItem.id === item.id;
                return (
                  <motion.button
                    key={item.id}
                    className={`${styles.buildingCard} ${isSelected ? styles.buildingCardActive : ''}`}
                    variants={fadeUp}
                    onClick={() => setSelectedItem(item)}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={styles.cardIconWrap}>
                      {activeTab === 'buildings' ? <FiMapPin size={16} /> : <FiCoffee size={16} />}
                    </div>
                    <div className={styles.cardText}>
                      <span className={styles.buildingCardName}>{item.name}</span>
                      <span className={styles.buildingCardDesc}>
                        {activeTab === 'buildings' ? item.description : item.cuisine}
                      </span>
                    </div>
                    {isSelected && (
                      <span className={styles.cardArrowIcon}>
                        <FiChevronRight size={16} />
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Detail panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedItem.id}
                className={styles.detailPanel}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'buildings' ? (
                  <>
                    <div className={styles.detailHeader}>
                      <FiLayers size={15} />
                      <span className={styles.detailTitle}>{selectedItem.name}</span>
                    </div>

                    {/* Floor tabs */}
                    <div className={styles.floorTabs}>
                      {selectedItem.floors.map((floor, idx) => (
                        <button
                          key={floor.floor}
                          className={`${styles.floorTab} ${selectedFloor === idx ? styles.floorTabActive : ''}`}
                          onClick={() => setSelectedFloor(idx)}
                        >
                          Floor {floor.floor}
                        </button>
                      ))}
                    </div>

                    {/* Departments */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${selectedItem.id}-${selectedFloor}`}
                        className={styles.floorContent}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={styles.floorLabelRow}>
                          <FiBookOpen size={12} />
                          <span className={styles.floorLabel}>
                            {selectedItem.floors[selectedFloor]?.label}
                          </span>
                        </div>
                        <div className={styles.departmentList}>
                          {selectedItem.floors[selectedFloor]?.departments.map((dept) => (
                            <TagBadge
                              key={dept}
                              label={dept}
                              color="var(--brand-primary)"
                            />
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </>
                ) : (
                  <>
                    <div className={styles.detailHeader}>
                      <FiCoffee size={15} />
                      <span className={styles.detailTitle}>{selectedItem.name}</span>
                    </div>
                    <div className={styles.floorContent}>
                      <div className={styles.floorLabelRow}>
                        <FiMapPin size={12} />
                        <span className={styles.floorLabel} style={{ textTransform: 'none', letterSpacing: 'normal' }}>
                          {selectedItem.location}
                        </span>
                      </div>
                      <div className={styles.floorLabelRow}>
                        <FiClock size={12} />
                        <span className={styles.floorLabel} style={{ textTransform: 'none', letterSpacing: 'normal' }}>
                          {selectedItem.hours}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* RIGHT — 3D Model viewer */}
          <motion.div
            className={styles.viewerCol}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.viewerWrapper}>
              {/* Zoom badge overlay */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedItem.id}
                  className={styles.zoomBadge}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'buildings' ? <FiMapPin size={11} /> : <FiCoffee size={11} />}
                  Viewing: {selectedItem.name}
                </motion.div>
              </AnimatePresence>

              <CampusMap3D
                cameraOrbit={selectedItem.cameraOrbit}
                fieldOfView={selectedItem.fieldOfView}
                height="100%"
                minHeight="420px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BuildingFinder;
