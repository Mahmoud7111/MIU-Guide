import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './CustomCursor.module.css';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Use motion values for better performance
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for the ring lag
  const springConfig = { stiffness: 120, damping: 18, mass: 0.8 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const handleEnter = useCallback(() => setIsHovered(true), []);
  const handleLeave = useCallback(() => setIsHovered(false), []);
  const handleDown = useCallback(() => setIsClicking(true), []);
  const handleUp = useCallback(() => setIsClicking(false), []);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);

    // Initial attachment
    const attachListeners = () => {
      const targets = document.querySelectorAll('a, button, [data-cursor="hover"]');
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
      });
    };

    attachListeners();

    // Observe DOM changes to attach listeners to new elements
    const observer = new MutationObserver(() => {
      attachListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      observer.disconnect();
      
      const targets = document.querySelectorAll('a, button, [data-cursor="hover"]');
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [handleEnter, handleLeave, handleDown, handleUp, cursorX, cursorY]);

  return (
    <>
      {/* Outer ring — lagging */}
      <motion.div
        className={styles.ring}
        style={{ 
          x: ringX, 
          y: ringY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isClicking ? 0.8 : (isHovered ? 1.8 : 1),
          opacity: isHovered ? 0.6 : 1,
          borderColor: 'var(--color-primary)'
        }}
        transition={{ 
          duration: isClicking ? 0.1 : 0.2 
        }}
      />

      {/* Inner dot — instant */}
      <motion.div
        className={styles.dot}
        style={{ 
          x: cursorX, 
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: isClicking ? 2 : (isHovered ? 0 : 1),
          opacity: isHovered ? 0 : 1
        }}
        transition={{ 
          duration: isClicking ? 0.1 : 0.15 
        }}
      />
    </>
  );
};

export default CustomCursor;
