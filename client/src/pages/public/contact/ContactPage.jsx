import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiMail, FiPhone, FiClock, FiSend } from 'react-icons/fi';
import { HeroSection, Input, Button } from '@/components/ui';
import { pageTransition, fadeUp, staggerContainer } from '@/lib/motion/variants';
import styles from './ContactPage.module.css';

// Import Assets
import contactHero from '@/assets/images/contact-hero.png';

/**
 * ContactPage - Professional contact interface for Misr International University (MIU).
 */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Thank you for contacting MIU. Your message has been sent successfully.');
      setFormData({ fullName: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      title: "Our Campus",
      content: "KM 28 Cairo – Ismailia Road (Ahmed Orabi Port), Cairo, Egypt.",
      link: "https://www.google.com/maps/dir/?api=1&destination=Misr+International+University+MIU"
    },
    {
      icon: FiMail,
      title: "Email Us",
      content: "info@miu.edu.eg",
      link: "mailto:info@miu.edu.eg"
    },
    {
      icon: FiPhone,
      title: "Call Us",
      content: "+202 24772033 - 38",
      link: "tel:+20224772033"
    },
    {
      icon: FiClock,
      title: "Working Hours",
      content: "Sunday - Thursday: 8:30 AM - 4:00 PM",
      link: null
    }
  ];

  return (
    <motion.main
      className={styles.pageContainer}
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <HeroSection 
        title="Contact Us" 
        subtitle="Have questions? We're here to help. Reach out to our admissions office or general inquiry department."
        image={contactHero}
        height="400px"
        overlayOpacity={0.6}
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Contact Us' }
        ]}
      />

      <section className={styles.contentSection}>
        <div className={styles.layoutGrid}>
          
          {/* LEFT: University Information */}
          <motion.div 
            className={styles.contactInfo}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className={styles.infoCard}>
              <h2 className={styles.universityName}>Misr International University</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)' }}>
                Established in 1996, MIU is committed to providing a high-quality academic environment that fosters excellence and innovation.
              </p>
              
              <div className={styles.contactDetails}>
                {contactInfo.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    className={styles.detailItem}
                    variants={fadeUp}
                  >
                    <div className={styles.iconWrapper}>
                      <item.icon size={20} />
                    </div>
                    <div className={styles.detailText}>
                      <h3>{item.title}</h3>
                      {item.link ? (
                        <a href={item.link} target={item.link.startsWith('http') ? '_blank' : '_self'} rel="noreferrer">
                          {item.content}
                        </a>
                      ) : (
                        <p>{item.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Contact Form */}
          <motion.div 
            className={styles.formSection}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className={styles.formHeader}>
              <h2>Send us a Message</h2>
              <p>Fill out the form below and our team will get back to you within 24 hours.</p>
            </div>

            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <Input
                label="Full Name"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Subject"
                name="subject"
                placeholder="How can we help you?"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <Input
                variant="textarea"
                label="Message"
                name="message"
                placeholder="Write your message here..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />
              
              <Button 
                type="submit" 
                variant="primary" 
                className={styles.submitButton}
                disabled={isSubmitting}
                icon={FiSend}
              >
                {isSubmitting ? 'Sending...' : 'Submit Message'}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* GOOGLE MAP SECTION */}
        <motion.div 
          className={styles.mapContainer}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <iframe 
            title="MIU Campus Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3450.418465714392!2d31.583344675545537!3d30.14088927487441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458197777777777%3A0x6b446a6f6c6f6c6f!2sMisr+International+University+(MIU)!5e0!3m2!1sen!2seg!4v1714900000000!5m2!1sen!2seg" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          
          <div className={styles.mapOverlay}>
            <Button 
              as="a" 
              href="https://www.google.com/maps/dir/?api=1&destination=Misr+International+University+MIU" 
              target="_blank"
              variant="primary"
              icon={FiMapPin}
            >
              Get Directions to MIU
            </Button>
          </div>
        </motion.div>
      </section>
    </motion.main>
  );
}
