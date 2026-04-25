import React from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../../lib/constants';
import { pageTransition, fadeUp } from '../../lib/motion/variants';
import Button from '../../components/ui/Button';
import styles from './ErrorPages.module.css';

/**
 * Global Error Boundary Page.
 * Handles unexpected application crashes and route errors.
 */
const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error('Application Error:', error);

  return (
    <motion.div 
      className={styles.container}
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div variants={fadeUp} className={styles.content}>
        <div className={styles.iconWrapper}>⚠️</div>
        <h2 className={styles.title}>Something went wrong</h2>
        <p className={styles.description}>
          An unexpected error occurred. Our engineering team has been notified.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <pre className={styles.errorStack}>
            {error.statusText || error.message}
          </pre>
        )}
        <div className={styles.actions}>
          <Button variant="primary" onClick={() => window.location.href = ROUTES.HOME}>
            Refresh Application
          </Button>
          <Button variant="outline" onClick={() => navigate(ROUTES.CONTACT)}>
            Report Issue
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ErrorPage;
