import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLocationDot, FaPhone } from 'react-icons/fa6';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion/variants';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import styles from './CampusContact.module.css';

const contactCards = [
  { icon: FaLocationDot, label: 'Address', value: '5th Settlement, New Cairo, Egypt' },
  { icon: FaPhone, label: 'Phone', value: '+20 2 2477-1200' },
  { icon: FaEnvelope, label: 'Email', value: 'info@miu.edu.eg' },
];

const subjectOptions = [
  'Campus Tour',
  'Building Info',
  'Dining',
  'General',
];

const CampusContact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    /* TODO: wire to backend */
    alert('Message sent! We will get back to you soon.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        {/* Heading */}
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get in Touch
        </motion.h2>

        {/* Contact cards */}
        <motion.div
          className={styles.cardRow}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {contactCards.map((card) => (
            <motion.div key={card.label} className={styles.contactCard} variants={staggerItem}>
              <card.icon className={styles.contactIcon} aria-hidden="true" />
              <span className={styles.contactLabel}>{card.label}</span>
              <span className={styles.contactValue}>{card.value}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Inquiry form */}
        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className={styles.formRow}>
            <Input
              label="Your Name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange('name')}
              required
            />
            <Input
              label="Email Address"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange('email')}
              required
              type="email"
            />
          </div>

          {/* Subject dropdown — native select styled to match Input */}
          <div className={styles.selectWrap}>
            <label className={styles.selectLabel}>Subject</label>
            <select
              className={styles.select}
              value={form.subject}
              onChange={handleChange('subject')}
              required
            >
              <option value="" disabled>Select a topic…</option>
              {subjectOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <Input
            variant="textarea"
            label="Message"
            placeholder="How can we help you?"
            value={form.message}
            onChange={handleChange('message')}
            rows={5}
            required
          />

          <Button type="submit" variant="primary" fullWidth>
            Send Message
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default CampusContact;
