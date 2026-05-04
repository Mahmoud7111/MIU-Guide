import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui';
import { 
  staggerContainer, 
  staggerItem, 
  modalVariant, 
  backdropVariant 
} from '@/lib/motion/variants';
import styles from './Gallery.module.css';

// Import Assets
import campusImg from '@/assets/images/tools/campus.webp';
import eventsImg from '@/assets/images/tools/cairo1-large.jpg';
import graduationImg from '@/assets/images/tools/cairo3-large.jpg';
import studentsImg from '@/assets/images/tools/Addmision.jpg';
import lifeImg from '@/assets/images/clubs2/Social & Organizational.jpg';
import aboutImg from '@/assets/images/About/about.webp';

const GALLERY_DATA = [
  { id: 1, title: 'Summer Festival 2026', category: 'Events', image: eventsImg },
  { id: 2, title: 'Main Campus Plaza', category: 'Campus', image: graduationImg },
  { id: 3, title: 'Social Gathering', category: 'Activities', image: lifeImg },
  { id: 4, title: 'Library Study Sessions', category: 'Campus', image: aboutImg },
  { id: 5, title: 'Freshmen Orientation', category: 'Events', image: studentsImg },
  { id: 6, title: 'Evening Walkways', category: 'Campus', image: campusImg },
  { id: 7, title: 'Winter Gala', category: 'Events', image: graduationImg },
  { id: 8, title: 'Club Fair Interactions', category: 'Activities', image: studentsImg },
  { id: 9, title: 'Central Garden View', category: 'Campus', image: lifeImg },
];

const CATEGORIES = ['All', 'Events', 'Campus', 'Activities'];

const GalleryCard = ({ item, onOpen }) => (
  <motion.div
    variants={staggerItem}
    layout
    className={styles.galleryCard}
    onClick={() => onOpen(item)}
  >
    <div className={styles.imageWrapper}>
      <img src={item.image} alt={item.title} className={styles.galleryImage} loading="lazy" />
    </div>
    <div className={styles.overlay}>
      <span className={styles.cardCategory}>{item.category}</span>
      <h4 className={styles.cardTitle}>{item.title}</h4>
    </div>
  </motion.div>
);

const Lightbox = ({ item, onClose }) => (
  <motion.div 
    className={styles.lightbox}
    variants={backdropVariant}
    initial="hidden"
    animate="visible"
    exit="exit"
    onClick={onClose}
  >
    <motion.div 
      className={styles.lightboxContent}
      variants={modalVariant}
      onClick={(e) => e.stopPropagation()}
    >
      <button className={styles.closeBtn} onClick={onClose}>&times;</button>
      <img src={item.image} alt={item.title} className={styles.lightboxImage} />
      <div className={styles.lightboxInfo}>
        <h3 className={styles.lightboxTitle}>{item.title}</h3>
        <p className={styles.lightboxCategory}>{item.category}</p>
      </div>
    </motion.div>
  </motion.div>
);

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = useMemo(() => {
    if (activeTab === 'All') return GALLERY_DATA;
    return GALLERY_DATA.filter(item => item.category === activeTab);
  }, [activeTab]);

  return (
    <section className={styles.gallerySection}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Badge variant="primary" className={styles.topBadge}>Moments</Badge>
          <h2 className={styles.sectionTitle}>Campus Gallery</h2>
          
          <div className={styles.filterTabs}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeTab === cat ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <motion.div 
          className={styles.galleryGrid}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <GalleryCard 
                key={item.id} 
                item={item} 
                onOpen={setSelectedItem} 
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <Lightbox 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}