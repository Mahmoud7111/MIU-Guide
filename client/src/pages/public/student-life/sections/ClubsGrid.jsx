import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Badge } from '@/components/ui';
import styles from './ClubsGrid.module.css';

// Import Assets
import campusImg from '@/assets/images/tools/campus.webp';
import cairoImg from '@/assets/images/tools/cairo1-large.jpg';
import trackerImg from '@/assets/images/tools/attendance-tracker.webp';
import gpaImg from '@/assets/images/tools/gpa.webp';
import admissionImg from '@/assets/images/tools/Addmision.jpg';
import socialOrgImg from '@/assets/images/clubs2/Social & Organizational.jpg';

// Club Specific Images
import AIESEC1Img from '@/assets/images/ClubsBanner/AIESEC1.png';
import AIESEC2Img from '@/assets/images/ClubsBanner/AIESEC2.png';
import AIESEC3Img from '@/assets/images/ClubsBanner/AIESEC3.png';
import IEEE1Img from '@/assets/images/ClubsBanner/IEEE1.png';
import IEEE2Img from '@/assets/images/ClubsBanner/IEEE2.png';
import ENACTUS1Img from '@/assets/images/ClubsBanner/ENACTUS1.png';
import ENACTUS2Img from '@/assets/images/ClubsBanner/ENACTUS2.png';
import ENACTUS3Img from '@/assets/images/ClubsBanner/ENACTUS3.png';
import LGSY1Img from '@/assets/images/ClubsBanner/LGSY1.png';
import LGSY2Img from '@/assets/images/ClubsBanner/LGSY2.png';
import MMC1Img from '@/assets/images/ClubsBanner/MMC1.png';
import MMC2Img from '@/assets/images/ClubsBanner/MMC2.png';
import MMC3Img from '@/assets/images/ClubsBanner/MMC3.png';
import Tuners1Img from '@/assets/images/ClubsBanner/Tuners1.png';
import Tuners2Img from '@/assets/images/ClubsBanner/Tuners2.png';
import Tuners3Img from '@/assets/images/ClubsBanner/Tuners3.png';
import UTOPIAImg from '@/assets/images/ClubsBanner/UTOPIA.jpeg';
import MSP1Img from '@/assets/images/ClubsBanner/MSP1.png';
import MSP2Img from '@/assets/images/ClubsBanner/MSP2.png';
import MSP3Img from '@/assets/images/ClubsBanner/MSP3.png';

const CLUBS_DATA = [
  {
    id: 'social',
    title: 'Social & Organizational',
    image: AIESEC2Img,
    description: 'Fostering leadership, community, and student engagement through events and social connections.',
    clubs: [
      {
        name: 'UTOPIA',
        badge: 'Most popular',
        image: UTOPIAImg,
        description: 'Organizing prestigious festivals and social gatherings.'
      }
    ]
  },
  {
    id: 'academic',
    title: 'Academic & Professional',
    image: IEEE2Img,
    description: 'Elevating academic excellence and professional growth with industry connections.',
    clubs: [
      {
        name: 'MSP Tech Club',
        logo: MSP1Img,
        description: 'MSP Tech Club is a student-led innovation community powered by the Microsoft Learn Student Ambassadors program. We explore cutting‑edge technologies, build real projects, and develop technical & leadership excellence together.',
        images: [MSP1Img, MSP2Img, MSP3Img]
      },
      {
        name: 'AIESEC',
        logo: AIESEC1Img,
        description: 'AIESEC offers talent solutions to a variety of organizations such as companies, start-ups and NGOs to find and bring on board the right candidate for the job from our pool of global talents.',
        images: [AIESEC1Img, AIESEC2Img,AIESEC3Img]
      },
      {
        name: 'IEEE',
        logo:IEEE1Img,
        description: 'IEEE is an academic association that targets computer science and ECE students. It aims at upgrading their technical skills to practical ones. As an on-campus club, IEEE arranges a number of events, starting with the Easter Event, ending with the Professional Week.',
        images: [IEEE1Img, IEEE2Img]
      },
      {
        name: 'ENACTUS',
        logo: ENACTUS1Img,
        description: 'Enactus is a worldwide organization that aims at raising awareness of entrepreneurship. This is done through sessions and participation in national competitions by our projects with the 56 other universities. Afterwards, we will join the world cup competition between 37 countries.',
        images: [ENACTUS1Img, ENACTUS2Img,ENACTUS3Img]
      }
    ]
  },
  {
    id: 'sports',
    title: 'Sports & Wellness',
    image: LGSY2Img,
    description: 'Promoting physical excellence and mental well-being for a balanced life.',
    clubs: [
      {
        name: 'LGSY',
        badge: 'Official Team',
        logo: LGSY1Img,
        description: 'Gamers Legacy is the first entertainment club at the MIU that organizes Gaming & Animi Events. It also gives academic sessions in “Gaming Development” Fields which use 3DSMAX & Unity Engine',
        images: [LGSY1Img, LGSY2Img]
      }
    ]
  },
  {
    id: 'arts',
    title: 'Arts & Media',
    image: Tuners1Img,
    description: 'A sanctuary for creative expression, storytelling, and sharing your voice.',
    clubs: [
      {
        name: 'MMC',
        logo: admissionImg,
        description: 'It provides opportunities for MIU students to explore various media outlets, organizations and programming at the local state and national levels.',
        images: [MMC1Img, MMC2Img,MMC3Img]
      },
      {
        name: 'Tuners',
        logo: Tuners1Img,
        description: 'The club aims to develop the musical and artistic skills of MIU students through training them to sing, play musical instruments and set up musical concerts.',
        images: [Tuners1Img, Tuners2Img, Tuners3Img]
      },
    ]
  }
];

const ClubGalleryModal = ({ club, onClose }) => {
  if (!club) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.modalBackdrop}
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{club.name} Gallery</h3>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.imageGrid}>
            {club.images?.map((img, index) => (
              <div key={index} className={styles.galleryImageWrapper}>
                <img src={img} alt={`${club.name} ${index}`} className={styles.galleryImage} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.modalFooter}>
          <Button variant="outlined" size="sm" onClick={onClose}>Close</Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CategoryCard = ({ category, isActive, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className={`${styles.categoryCard} ${isActive ? styles.active : ''}`}
    onClick={() => onClick(category.id)}
  >
    <div className={styles.imageWrapper}>
      <img src={category.image} alt={category.title} className={styles.cardImage} />
    </div>
    <div className={styles.cardContent}>
      <h3 className={styles.cardTitle}>{category.title}</h3>
      <p className={styles.cardDescription}>{category.description}</p>
      <Button 
        variant={isActive ? 'primary' : 'outlined'} 
        size="sm" 
        className={styles.exploreBtn}
        onClick={(e) => {
          e.stopPropagation();
          onClick(category.id);
        }}
      >
        {isActive ? 'Active' : 'Explore Clubs'}
      </Button>
    </div>
  </motion.div>
);

const ClubItem = ({ club, onViewImages }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className={styles.clubItem}
  >
    <div className={styles.clubLogoWrapper}>
      <img src={club.logo} alt={club.name} className={styles.clubLogo} />
    </div>
    <div className={styles.clubInfo}>
      <div className={styles.clubHeader}>
        <h4 className={styles.clubName}>{club.name}</h4>
        {club.badge && <Badge variant="secondary" size="sm">{club.badge}</Badge>}
      </div>
      <p className={styles.clubSmallDesc}>{club.description}</p>
      {club.images && club.images.length > 0 && (
        <Button 
          variant="outlined" 
          size="sm" 
          className={styles.viewImagesBtn}
          onClick={() => onViewImages(club)}
        >
          View Gallery
        </Button>
      )}
    </div>
  </motion.div>
);

export default function ClubsGrid() {
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const clubsDisplayRef = useRef(null);

  const activeCategory = useMemo(() => 
    CLUBS_DATA.find(c => c.id === activeCategoryId),
    [activeCategoryId]
  );

  const handleCategoryClick = (id) => {
    setActiveCategoryId(prevId => prevId === id ? null : id);
  };

  useEffect(() => {
    if (!activeCategoryId || !clubsDisplayRef.current) return;

    const scrollToSection = () => {
      clubsDisplayRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const raf = requestAnimationFrame(scrollToSection);
    return () => cancelAnimationFrame(raf);
  }, [activeCategoryId]);

  return (
    <section className={styles.clubsSection}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Badge variant="primary" className={styles.topBadge}>Community</Badge>
          <h2 className={styles.sectionTitle}>University Clubs & Activities</h2>
          <p className={styles.sectionSubtitle}>
            Join a vibrant ecosystem of student-led organizations designed to enrich your university experience.
          </p>
        </header>

        <div className={styles.categoryGrid}>
          {CLUBS_DATA.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isActive={activeCategoryId === category.id}
              onClick={handleCategoryClick}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={styles.clubsDisplay}
              ref={clubsDisplayRef}
            >
              <div className={styles.displayHeader}>
                <h3 className={styles.displayTitle}>{activeCategory.title} Clubs</h3>
                <div className={styles.displayDivider} />
              </div>
              <div className={styles.clubListGrid}>
                {activeCategory.clubs.map((club, index) => (
                  <ClubItem 
                    key={index} 
                    club={club} 
                    onViewImages={setSelectedClub}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedClub && (
          <ClubGalleryModal 
            club={selectedClub} 
            onClose={() => setSelectedClub(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}