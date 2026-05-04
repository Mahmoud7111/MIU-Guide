import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiAward, FiBookOpen, FiActivity, FiEdit3, FiFileText, FiHelpCircle } from 'react-icons/fi';
import { HeroSection, Button, Badge, Card } from '@/components/ui';
import { pageTransition, staggerContainer, staggerItem } from '@/lib/motion/variants';
import styles from './StudentFilePage.module.css';

// Import Assets (Reusing existing for consistency)
import studentHeroImg from '@/assets/images/ClubsBanner/banner.jpg';
import campusImg from '@/assets/images/tools/campus.webp';
import eventsImg from '@/assets/images/tools/cairo1-large.jpg';

const STUDENT_INFO = {
  name: 'Ahmed Mahmoud',
  id: '2023/12345',
  faculty: 'Computer Science',
  major: 'Software Engineering',
  level: 'Level 3 (Junior)',
  gpa: '3.85',
  status: 'Active'
};

const ENROLLED_ACTIVITIES = [
  { title: 'UTOPIA Club', category: 'Social', image: eventsImg, role: 'Active Member' },
  { title: 'IEEE Student Branch', category: 'Academic', image: campusImg, role: 'Volunteer' }
];

const RECENT_COURSES = [
  { code: 'CS301', name: 'Software Engineering II', credits: 3, grade: 'A' },
  { code: 'CS305', name: 'Database Systems', credits: 3, grade: 'A-' },
  { code: 'MA202', name: 'Discrete Mathematics', credits: 3, grade: 'B+' }
];

export default function StudentFilePage() {
  return (
    <motion.main
      className={styles.pageContainer}
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <HeroSection 
        title="Student File" 
        subtitle="Manage your academic records, track your campus activities, and access essential university services all in one professional portal."
        image={studentHeroImg}
        height="350px"
        overlayOpacity={0.6}
        breadcrumbs={[
          { label: 'Portal', path: '/portal' },
          { label: 'Student File' }
        ]}
      />

      <div className={styles.mainSection}>
        <div className={styles.container}>
          
          {/* 1. Overview Section */}
          <div className={styles.overviewGrid}>
            <aside className={styles.profileCard}>
              <div className={styles.avatarWrapper}>
                <FiUser />
              </div>
              <h2 className={styles.studentName}>{STUDENT_INFO.name}</h2>
              <p className={styles.studentId}>ID: {STUDENT_INFO.id}</p>
              <Badge variant="success" size="sm">{STUDENT_INFO.status}</Badge>
              
              <div className={styles.infoGrid} style={{ marginTop: '2rem' }}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Faculty</span>
                  <span className={styles.infoValue}>{STUDENT_INFO.faculty}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Major</span>
                  <span className={styles.infoValue}>{STUDENT_INFO.major}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Year</span>
                  <span className={styles.infoValue}>{STUDENT_INFO.level}</span>
                </div>
              </div>
            </aside>

            <div className={styles.mainContent}>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <FiAward size={24} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
                  <span className={styles.infoLabel}>Cumulative GPA</span>
                  <h3 className={styles.studentName}>{STUDENT_INFO.gpa}</h3>
                </div>
                <div className={styles.statCard}>
                  <FiBookOpen size={24} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
                  <span className={styles.infoLabel}>Completed Credits</span>
                  <h3 className={styles.studentName}>84</h3>
                </div>
                <div className={styles.statCard}>
                  <FiActivity size={24} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
                  <span className={styles.infoLabel}>Active Clubs</span>
                  <h3 className={styles.studentName}>02</h3>
                </div>
              </div>

              {/* 2. Activities Section */}
              <section style={{ marginTop: '3rem' }}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}><FiActivity /> Campus Life Involvement</h3>
                  <Button variant="link" size="sm">Explore More</Button>
                </div>
                <div className={styles.activityGrid}>
                  {ENROLLED_ACTIVITIES.map((act, idx) => (
                    <div key={idx} className={styles.activityCard}>
                      <img src={act.image} alt={act.title} className={styles.activityImage} />
                      <div className={styles.activityBody}>
                        <Badge variant="outline" size="xs" style={{ marginBottom: '0.5rem' }}>{act.category}</Badge>
                        <h4 style={{ margin: 0, fontSize: '1rem' }}>{act.title}</h4>
                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                          {act.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 3. Academic Records Section */}
              <section style={{ marginTop: '3rem' }}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}><FiFileText /> Academic Performance</h3>
                  <Badge variant="secondary">Spring 2026</Badge>
                </div>
                <div className={styles.tableContainer}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Credits</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RECENT_COURSES.map((course, idx) => (
                        <tr key={idx}>
                          <td style={{ fontFamily: 'var(--font-mono)' }}>{course.code}</td>
                          <td>{course.name}</td>
                          <td>{course.credits}</td>
                          <td style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{course.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 4. Quick Actions Section */}
              <div className={styles.actionsWrapper}>
                <Button variant="outline" icon={<FiEdit3 />}>Edit Profile</Button>
                <Button variant="primary" icon={<FiFileText />}>View Transcript</Button>
                <Button variant="secondary" icon={<FiHelpCircle />}>Contact Support</Button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </motion.main>
  );
}
