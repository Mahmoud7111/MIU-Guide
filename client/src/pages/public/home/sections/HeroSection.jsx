import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp, fadeIn, staggerContainer } from '../../../../lib/motion/variants';
import Button from '../../../../components/ui/Button';
import { ROUTES } from '../../../../lib/constants';
import campusVideo from '../../../../assets/videos/Discover-MIU1.mp4';
import styles from './HeroSection.module.css';

/**
 * Hero Section component for the Home page.
 * Featuring a dual-column layout with text content and a cinematic video.
 */
const HeroSection = () => {
  const videoRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className={styles.hero}>
      {/* Background Video */}
      <div className={styles.videoWrapper}>
        <video 
          ref={videoRef}
          className={styles.video}
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src={campusVideo} type="video/mp4" />
        </video>
        <div className={styles.videoOverlay} />
      </div>

      {/* Content Overlay */}
      <motion.div 
        className={styles.content}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className={styles.accentLine} 
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        />

        <motion.h1 
          className={styles.heading}
          variants={fadeUp}
        >
          University of <span className={styles.highlight}>MIU</span>
        </motion.h1>

        <motion.p 
          className={styles.description}
          variants={fadeUp}
        >
          Providing world-class research and education to benefit society on a local, regional, national and global scale.
        </motion.p>

        <motion.div 
          className={styles.buttons}
          variants={fadeUp}
        >
          <Button 
            variant="primary" 
            as={Link} 
            to="/apply"
            style={{ padding: 'var(--space-4) var(--space-8)' }}
          >
            ADMISSIONS
          </Button>
          <Button 
            variant="outlined" 
            as={Link} 
            to="/news"
            style={{ color: 'white', borderColor: 'white' }}
          >
            LATEST NEWS
          </Button>
        </motion.div>
      </motion.div>

      {/* Video Controls */}
      <div className={styles.controls}>
        <button 
          className={styles.playPauseBtn} 
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
        </button>
      </div>
    </section>
  );
};

const PauseIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
  </svg>
);

const PlayIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

export default HeroSection;