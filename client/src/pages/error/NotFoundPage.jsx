import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '@/lib/constants';
import { pageTransition, fadeUp } from '@/lib/motion/variants';
import Button from '@/components/ui/Button';
import styles from './ErrorPages.module.css';

/**
 * 404 - Not Found Page.
 */
const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className={styles.container}
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div variants={fadeUp} className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Lost in Campus?</h2>
        <p className={styles.description}>
          The page you are looking for doesn't exist or has been moved to a new building.
        </p>
        <div className={styles.actions}>
          <Button variant="primary" onClick={() => navigate(ROUTES.HOME)}>
            Return Home
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NotFoundPage;
