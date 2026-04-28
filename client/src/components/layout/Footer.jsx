import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../lib/motion/variants';
import { ROUTES } from '../../lib/constants';
import styles from './Footer.module.css';

/**
 * Global application footer.
 * Features a dark theme with staggered entrance animations.
 */
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <motion.div 
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Col 1: Logo & Social */}
          <motion.div variants={staggerItem} className={styles.column}>
            <div className={styles.logo}>
              <img src="/MIU.png" alt="MIU Logo" className={styles.footerLogo} />
            </div>
            <p className={styles.tagline}>
              Leading the future through academic excellence and innovative thinking.
            </p>
            <div className={styles.socials}>
              {['facebook', 'twitter', 'linkedin', 'youtube', 'instagram'].map((platform) => (
                <motion.a 
                  key={platform}
                  href={`#${platform}`}
                  whileHover={{ y: -3 }}
                  className={styles.socialIcon}
                >
                  <SocialIcon name={platform} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Col 2: Explore */}
          <motion.div variants={staggerItem} className={styles.column}>
            <h4 className={styles.colTitle}>Explore</h4>
            <ul className={styles.links}>
              <li><a href={ROUTES.ABOUT}>About MIU</a></li>
              <li><a href={ROUTES.ACADEMICS}>Academics</a></li>
              <li><a href={ROUTES.ADMISSIONS}>Admissions</a></li>
              <li><a href={ROUTES.CAMPUS}>Campus Map</a></li>
              <li><a href={ROUTES.STUDENT_LIFE}>Student Life</a></li>
            </ul>
          </motion.div>

          {/* Col 3: Portal */}
          <motion.div variants={staggerItem} className={styles.column}>
            <h4 className={styles.colTitle}>Student Portal</h4>
            <ul className={styles.links}>
              <li><a href={ROUTES.DASHBOARD}>Dashboard</a></li>
              <li><a href={ROUTES.GPA}>GPA Calculator</a></li>
              <li><a href={ROUTES.ATTENDANCE}>Attendance</a></li>
              <li><a href={ROUTES.SCHEDULE}>Class Schedule</a></li>
              <li><a href={ROUTES.PORTAL_CAMPUS}>Campus Map</a></li>
            </ul>
          </motion.div>

          {/* Col 4: Contact */}
          <motion.div variants={staggerItem} className={styles.column}>
            <h4 className={styles.colTitle}>Contact</h4>
            <div className={styles.contactInfo}>
              <p><MapPinIcon /> KM 28 Cairo-Ismailia Road, Egypt</p>
              <p><PhoneIcon /> +20 2 4477 0000</p>
              <p><MailIcon /> admissions@miuegypt.edu.eg</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            © {currentYear} Misr International University. All rights reserved.
          </div>
          <div className={styles.legal}>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* --- Icons --- */



const SocialIcon = ({ name }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {name === 'facebook' && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>}
    {name === 'twitter' && <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.2-17.4 10.6 0 0 4.4-.8 4.4-4.6 0 0-3.3-.8-4.4-4.2 0 0 1.6.1 2.2-.1 0 0-3.4-1.3-4-5 0 0 1.2.7 2.1.8 0 0-3.3-4.8-1.5-8.5 0 0 4.5 5.5 10.2 6.1 0 0-.4-2.1.8-3.4 1.2-1.3 3.3-1.3 4.5 0 0 0 1.3-.4 1.8-.8 0 0-.4 1.3-1.4 2.1 0 0 1.2-.3 1.9-.8-.2.2-1.1 1.2-1.8 1.8z"/>}
    {name === 'linkedin' && <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></>}
    {name === 'youtube' && <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"/><path d="m9.75 15.02 5.75-3.02-5.75-3.02v6.04z"/></>}
    {name === 'instagram' && <><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/></>}
  </svg>
);

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

export default Footer;
