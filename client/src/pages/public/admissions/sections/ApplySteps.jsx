import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../../../components/ui';
import { fadeUp, staggerContainer, staggerItem } from '../../../../lib/motion/variants';
import styles from './ApplySteps.module.css';

const STEPS_DATA = [
  {
    id: 'step1',
    title: 'Create Account',
    description: 'Start your journey by creating an account on our student portal to track your application progress.'
  },
  {
    id: 'step2',
    title: 'Fill Application',
    description: 'Complete the online application form with your personal details and academic history accurately.'
  },
  {
    id: 'step3',
    title: 'Upload Documents',
    description: 'Upload digital copies of your high school certificate, ID, and other required admission documents.'
  },
  {
    id: 'step4',
    title: 'Pay Fees',
    description: 'Pay the application and administrative fees through our secure online payment gateway or at the university.'
  },
  {
    id: 'step5',
    title: 'Admission Tests',
    description: 'Attend the required English placement test and faculty-specific interviews as scheduled.'
  },
  {
    id: 'step6',
    title: 'Receive Decision',
    description: 'Check your portal for the final admission decision. Successful applicants will receive an offer letter.'
  }
];

export default function ApplySteps() {
  return (
    <section className={styles.sectionWrapper} id="how-to-apply">
      <motion.div 
        className={styles.container}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.div className={styles.header} variants={fadeUp}>
          <h2 className={styles.title}>How to Apply</h2>
          <p className={styles.subtitle}>
            Follow these simple steps to complete your application and join the MIU community.
          </p>
        </motion.div>

        <div className={styles.timeline}>
          {STEPS_DATA.map((step, index) => (
            <motion.div key={step.id} variants={staggerItem} className={styles.stepItem}>
              <div className={styles.indicatorWrapper}>
                <div className={styles.circle}>{index + 1}</div>
                {index !== STEPS_DATA.length - 1 && <div className={styles.line} />}
              </div>
              <div className={styles.stepContent}>
                <Card variant="bordered" hoverable padding="lg" className={styles.stepCard}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}