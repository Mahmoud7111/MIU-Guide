import React from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiUser, FiBriefcase, FiCpu, FiSearch, FiPhoneCall } from 'react-icons/fi';
import { Button, Badge } from '@/components/ui';
import { staggerContainer, staggerItem, fadeUp } from '@/lib/motion/variants';
import styles from './SupportServices.module.css';

const SERVICES = [
  {
    title: 'Academic Support',
    description: 'Academic advising to help you master your coursework.',
    icon: <FiBook />
  },
  {
    title: 'Counseling Services',
    description: 'Professional mental health support and wellness resources in a confidential and safe environment.',
    icon: <FiUser />
  },
  {
    title: 'Career Services',
    description: 'Expert guidance on internships, resume building, and interview preparation for your future career.',
    icon: <FiBriefcase />
  },
  {
    title: 'IT Help Desk',
    description: 'Technical assistance for campus systems, software installations, and connectivity issues.',
    icon: <FiCpu />
  },
  {
    title: 'Library Services',
    description: 'Access to extensive digital databases, research assistance, and quiet study environments.',
    icon: <FiSearch />
  }
];

const ACCESS_STEPS = [
  { title: 'Identify Need', description: 'Determine which specific service best matches your current requirements.' },
  { title: 'Book Appointment', description: 'Use the MIU Student Portal to schedule a session with a specialized advisor.' },
  { title: 'Attend Session', description: 'Meet with your support specialist either in-person on campus or virtually.' }
];

const ServiceCard = ({ service }) => (
  <motion.div variants={staggerItem} className={styles.serviceCard}>
    <div className={styles.iconWrapper}>
      {service.icon}
    </div>
    <h3 className={styles.cardTitle}>{service.title}</h3>
    <p className={styles.cardDescription}>{service.description}</p>
  </motion.div>
);

export default function SupportServices() {
  return (
    <section className={styles.supportSection}>
      <div className={styles.container}>
        {/* Header Section */}
        <header className={styles.header}>
          <Badge variant="outline" className={styles.topBadge}>Student Success</Badge>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.sectionTitle}
          >
            Student Support Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={styles.sectionSubtitle}
          >
            We are dedicated to providing a comprehensive network of resources to ensure your academic success and personal well-being throughout your journey at MIU.
          </motion.p>
        </header>

        {/* Services Grid */}
        <motion.div 
          className={styles.servicesGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {SERVICES.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </motion.div>

        {/* Access Instructions */}
        <motion.div 
          className={styles.accessSection}
          variants={fadeUp}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
        >
          <h3 className={styles.accessTitle}>How to Access Support</h3>
          <div className={styles.stepsGrid}>
            {ACCESS_STEPS.map((step, index) => (
              <div key={index} className={styles.stepItem}>
                <div className={styles.stepNumber}>{index + 1}</div>
                <h4 className={styles.stepHeading}>{step.title}</h4>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div 
          className={styles.cta}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <FiPhoneCall size={32} style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }} />
          <h3 className={styles.ctaTitle}>Still need assistance?</h3>
          <p className={styles.ctaText}>
            Our central support team is available from 9:00 AM to 4:00 PM, Sunday through Thursday, to help guide you to the right resource.
          </p>
          <Button variant="primary" size="lg">
            Contact Support Office
          </Button>
        </motion.div>
      </div>
    </section>
  );
}