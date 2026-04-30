import React from 'react';
import { FiBarChart2, FiCheckCircle, FiMap } from 'react-icons/fi';
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
                <header className={styles.header}>
                    <span className={styles.tagline}>The Ultimate Student Toolkit</span>
                    <h2 className={styles.title}>
                        Experience a Smarter <br /> University Journey
                    </h2>
                    <p className={styles.description}>
                        MIU Guide provides exclusive tools designed to streamline your academic life.
                        From grade simulations to campus navigation, we’ve built what students actually need.
                    </p>
                </header>

                <div className={styles.grid}>
                    {features.map((feature) => (
                        <div key={feature.id} className={styles.card}>
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
                        </div>
                    ))}
                </div>

                <div className={styles.cta}>
                    {/* CTA Button can be added here later */}
                </div>
            </div>
        </section>
    );
};

export default FeaturesShowcase;