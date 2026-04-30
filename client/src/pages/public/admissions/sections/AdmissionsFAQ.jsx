import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion/variants';
import styles from './AdmissionsFAQ.module.css';

const FAQ_DATA = [
  {
    id: 'q1',
    question: 'What are the basic admission requirements for MIU?',
    answer: 'Applicants must have a high school certificate (Thanaweya Amma) or an equivalent international certificate (IGCSE, American Diploma, etc.) with a minimum score defined by the Ministry of Higher Education each year. Each faculty might have specific subject requirements.'
  },
  {
    id: 'q2',
    question: 'How do I start my application process?',
    answer: 'You can start by creating an account on our student portal, filling out the online application form, and uploading the required digital documents for initial review. Once approved, you will be invited for an entrance interview and placement tests.'
  },
  {
    id: 'q3',
    question: 'What documents do I need to provide?',
    answer: 'Essential documents include your original high school certificate, birth certificate, 6 recent passport-size photos, a copy of your National ID or Passport, and for male Egyptian students, the military form (Namouzag 2 Jund).'
  },
  {
    id: 'q4',
    question: 'Is there an English language proficiency requirement?',
    answer: 'Yes, all applicants must take the MIU English Placement Test. Depending on the results, students may be placed in intensive English courses or directly into their academic programs to ensure they can succeed in an English-speaking environment.'
  },
  {
    id: 'q5',
    question: 'Are there any scholarships available for new students?',
    answer: 'MIU offers various scholarships based on academic excellence in high school, sports achievements, and social circumstances. We encourage high achievers to apply early to benefit from these opportunities.'
  },
  {
    id: 'q6',
    question: 'When is the application deadline?',
    answer: 'Deadlines vary depending on the semester (Fall or Spring). Applications usually close once the capacity for each faculty is reached, so we recommend submitting your application as early as possible.'
  }
];

export default function AdmissionsFAQ() {
  return (
    <section className={styles.contentWrapper} id="faq">
      <motion.div 
        className={styles.container}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.div className={styles.header} variants={fadeUp}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            Find answers to common questions about our admission process, requirements, and life at Misr International University.
          </p>
        </motion.div>

        <div className={styles.faqList}>
          {FAQ_DATA.map((item, index) => (
            <motion.div key={item.id} variants={staggerItem}>
              <Card variant="bordered" hoverable padding="lg" className={styles.faqCard}>
                <div className={styles.questionWrapper}>
                  <span className={styles.questionIcon}>?</span>
                  <h3 className={styles.question}>{item.question}</h3>
                </div>
                <p className={styles.answer}>{item.answer}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}