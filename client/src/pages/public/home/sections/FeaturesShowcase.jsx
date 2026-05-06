import React from 'react';
import { motion } from 'framer-motion';
import { FiBarChart2, FiCheckCircle, FiMap } from 'react-icons/fi';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion/variants';
import styles from './FeaturesShowcase.module.css';

// Assets
import gpaImg from '@/assets/images/tools/gpa.webp';
import attendanceImg from '@/assets/images/tools/attendance-tracker.webp';
import mapImg from '@/assets/images/tools/campus.webp';

const features = [
    {
        id: 'gpa',
        title: 'Intelligent GPA Calculator',
        description: 'Take control of your academic future. Simulate grades, project your semester GPA, and set clear goals with our precision calculator.',
        icon: <FiBarChart2 size={24} />,
        image: gpaImg,
    },
    {
        id: 'attendance',
        title: 'Smart Attendance Tracker',
        description: 'Stay ahead of the curve. Monitor your attendance in real-time, get low-presence alerts, and manage your schedule effortlessly.',
        icon: <FiCheckCircle size={24} />,
        image: attendanceImg,
    },
    {
        id: 'map',
        title: 'Interactive Campus Map',
        description: 'Navigation made simple. Explore a detailed, interactive map of MIU buildings, facilities, and lecture halls right from your device.',
        icon: <FiMap size={24} />,
        image: mapImg,
    },
];

/**
 * FeaturesShowcase Component
 * Highlights the unique digital tools available in the MIU Guide portal.
 */
const FeaturesShowcase = () => {
    return (
        <section id="features" className={styles.section}>
            <div className={styles.container}>
                <motion.header
                    className={styles.header}
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.span className={styles.tagline} variants={fadeUp}>
                        The Ultimate Student Toolkit
                    </motion.span>
                    <motion.h2 className={styles.title} variants={fadeUp}>
                        Experience a Smarter <br /> University Journey
                    </motion.h2>
                    <motion.p className={styles.description} variants={fadeUp}>
                        MIU Guide provides exclusive tools designed to streamline your academic life.
                        From grade simulations to campus navigation, we’ve built what students actually need.
                    </motion.p>
                </motion.header>

                <motion.div
                    className={styles.grid}
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {features.map((feature) => (
                        <motion.div key={feature.id} className={styles.card} variants={staggerItem}>
                            <div className={styles.imageWrapper}>
                                <img src={feature.image} alt={feature.title} className={styles.image} />
                            </div>

                            <div className={styles.content}>
                                <div className={styles.iconWrapper}>
                                    {feature.icon}
                                </div>
                                <h3 className={styles.featureTitle}>{feature.title}</h3>
                                <p className={styles.featureText}>{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className={styles.cta}>
                    {/* CTA Button can be added here later */}
                </div>
            </div>
        </section>
    );
};

export default FeaturesShowcase;