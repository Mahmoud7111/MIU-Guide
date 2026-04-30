import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { modalVariant, backdropVariant } from '@/lib/motion/variants';
import styles from './Modal.module.css';

/**
 * Accessible Modal component using React Portal.
 * Includes backdrop, focus trap, and keyboard support.
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  closeOnBackdrop = true,
  showCloseButton = true,
  children,
  footer,
}) => {
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent scroll
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Focus trap: focus first element on open
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className={styles.wrapper}>
          <motion.div
            className={styles.backdrop}
            variants={backdropVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleBackdropClick}
          />
          
          <div className={styles.panelContainer} onClick={handleBackdropClick}>
            <motion.div
              ref={modalRef}
              className={`${styles.panel} ${styles[size]}`}
              variants={modalVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <header className={styles.header}>
                <h2 id="modal-title" className={styles.title}>{title}</h2>
                {showCloseButton && (
                  <button 
                    onClick={onClose} 
                    className={styles.closeBtn}
                    aria-label="Close modal"
                  >
                    &times;
                  </button>
                )}
              </header>

              <div className={styles.body}>
                {children}
              </div>

              {footer && (
                <footer className={styles.footer}>
                  {footer}
                </footer>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'fullscreen']),
  closeOnBackdrop: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

export default Modal;
