import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Badge } from '@/components/ui';
import styles from './Gallery.module.css';

// Import Campus Assets
import mainBuldingImg from '@/assets/images/bulding/mainBulding.jpg';
import kBImg from '@/assets/images/bulding/KB.png';
import pharmacyImg from '@/assets/images/bulding/pharmacy.png';
import NBImg from '@/assets/images/bulding/NB.png';
import SBImg from '@/assets/images/bulding/SB.png';
import RBImg from '@/assets/images/bulding/RB.png';

// Import Other Assets
import F2024Img from '@/assets/images/bulding/F2024.png';
import Grad2025 from '@/assets/images/bulding/Grad2025.jpg';
import LGSY2Img from '@/assets/images/ClubsBanner/LGSY2.png';



const CATEGORIES = ['All', 'Events', 'Campus', 'Activities'];

const GALLERY_DATA = [
  // Campus Buildings (Exactly 6 as requested)
  { id: 'c1', title: 'Main Building', category: 'Campus', image: mainBuldingImg, desc: 'The heart of our academic excellence.' },
  { id: 'c2', title: 'K Building', category: 'Campus', image: kBImg, desc: ' faculty offices.' },
  { id: 'c3', title: 'Pharmacy Building', category: 'Campus', image: pharmacyImg, desc: 'Advanced laboratories and research centers.' },
  { id: 'c4', title: 'N Building', category: 'Campus', image: NBImg, desc: 'Engineering and technology hub.' },
  { id: 'c5', title: 'S Building', category: 'Campus', image: SBImg, desc: 'Student services and administrative offices.' },
  { id: 'c6', title: 'R Building', category: 'Campus', image: RBImg, desc: 'Research and development wing.' },
  
  // Events
  { id: 'e1', title: 'Annual Festival', category: 'Events', image: F2024Img, desc: 'Student Welcome Celebration 2024.' },
  { id: 'e2', title: 'Graduation 2026', category: 'Events', image: Grad2025, desc: 'Honoring our newest alumni.' },
  
  // Activities
  { id: 'a1', title: 'Sports Day', category: 'Activities', image: LGSY2Img, desc: 'Team spirit and athletic excellence.' },
];

const FilterTab = ({ category, isActive, onClick }) => (
  <button
    className={`${styles.filterBtn} ${isActive ? styles.active : ''}`}
    onClick={() => onClick(category)}
  >
    {category}
    {isActive && (
      <motion.div
        layoutId="activeTab"
        className={styles.activeIndicator}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      />
    )}
  </button>
);

const GalleryCard = ({ item }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    className={styles.card}
  >
    <div className={styles.imageContainer}>
      <img src={item.image} alt={item.title} className={styles.image} />
      <div className={styles.overlay}>
        <div className={styles.overlayContent}>
          <span className={styles.categoryTag}>{item.category}</span>
          <h3 className={styles.cardTitle}>{item.title}</h3>
          <p className={styles.cardDesc}>{item.desc}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredItems = useMemo(() => {
    if (activeTab === 'All') return GALLERY_DATA;
    return GALLERY_DATA.filter(item => item.category === activeTab);
  }, [activeTab]);

  return (
    <section className={styles.gallerySection}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.sectionHeader}>
          <div className={styles.titleArea}>
            <Badge variant="primary" className={styles.badge}>Visual Journey</Badge>
            <h2 className={styles.mainTitle}>Campus & Student Life Gallery</h2>
            <p className={styles.subtitle}>
              Experience the vibrant atmosphere of MIU through our curated collection of moments.
            </p>
          </div>
          
          {/* Controls Area */}
          <div className={styles.controlsArea}>
            <LayoutGroup>
              <div className={styles.filterGroup}>
                {CATEGORIES.map(cat => (
                  <FilterTab
                    key={cat}
                    category={cat}
                    isActive={activeTab === cat}
                    onClick={setActiveTab}
                  />
                ))}
              </div>
            </LayoutGroup>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Gallery Grid */}
        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Info Footer */}
        <div className={styles.galleryFooter}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>500+</span>
            <span className={styles.statLabel}>Captivating Moments</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>15+</span>
            <span className={styles.statLabel}>Annual Events</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>100%</span>
            <span className={styles.statLabel}>Campus Life</span>
          </div>
        </div>
      </div>
    </section>
  );
}