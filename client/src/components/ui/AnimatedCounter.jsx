import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { motion, useInView, animate } from 'framer-motion';
import styles from './AnimatedCounter.module.css';

/**
 * AnimatedCounter component that ticks up when entering the viewport. 
 * It takes the following props: value, suffix, prefix, duration, label, and decimals.
 */
export const AnimatedCounter = ({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  label,
  decimals = 0,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: duration,
        onUpdate: (latest) => {
          setCount(latest);
        },
        ease: "easeOut"
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  const formattedCount = count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <div ref={ref} className={styles.container}>
      <div className={styles.numberRow}>
        {prefix && <span className={styles.symbol}>{prefix}</span>}
        <span className={styles.number}>{formattedCount}</span>
        {suffix && <span className={styles.symbol}>{suffix}</span>}
      </div>
      {label && <p className={styles.label}>{label}</p>}
    </div>
  );
};

AnimatedCounter.propTypes = {
  value: PropTypes.number.isRequired,
  suffix: PropTypes.string,
  prefix: PropTypes.string,
  duration: PropTypes.number,
  label: PropTypes.string,
  decimals: PropTypes.number,
};

export default AnimatedCounter;
