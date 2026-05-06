import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiMapPin, FiBriefcase, FiUser } from 'react-icons/fi';
import { professors as initialStaff } from '@/data/campusBuildings';
import { FACULTY_DETAILS } from '@/data/facultyDetails';
import { pageTransition, staggerContainer, staggerItem, fadeUp } from '@/lib/motion/variants';
import styles from './StaffPage.module.css';

/**
 * StaffPage — Portal staff directory with faculty-based filtering.
 */
export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('All');

  // Derive faculties from data
  const faculties = useMemo(() => {
    const list = ['All'];
    Object.values(FACULTY_DETAILS).forEach(f => {
      if (!list.includes(f.shortName)) {
        list.push(f.shortName);
      }
    });
    return list;
  }, []);

  // Filter staff based on faculty and search query
  const filteredStaff = useMemo(() => {
    return initialStaff.filter(staff => {
      const matchesFaculty = selectedFaculty === 'All' || 
                           staff.department.toLowerCase().includes(selectedFaculty.toLowerCase()) ||
                           (selectedFaculty === 'Engineering' && staff.department.includes('Engineering')) ||
                           (selectedFaculty === 'Computer Science' && staff.department.includes('Computer Science'));
      
      const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          staff.department.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesFaculty && matchesSearch;
    });
  }, [searchQuery, selectedFaculty]);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <motion.div 
      className={styles.page}
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <header className={styles.header}>
        <h1 className={styles.title}>Staff Directory</h1>
        <p className={styles.subtitle}>Find and locate faculty members and academic staff.</p>
      </header>

      <section className={styles.controls}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search by name or department..." 
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.filterSection}>
          <p className={styles.filterLabel}>Filter by Faculty</p>
          <div className={styles.facultyGrid}>
            {faculties.map(faculty => (
              <button
                key={faculty}
                className={`${styles.facultyChip} ${selectedFaculty === faculty ? styles.activeChip : ''}`}
                onClick={() => setSelectedFaculty(faculty)}
              >
                {faculty}
              </button>
            ))}
          </div>
        </div>
      </section>

      <motion.div 
        className={styles.staffGrid}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode='popLayout'>
          {filteredStaff.length > 0 ? (
            filteredStaff.map((staff) => (
              <motion.div 
                key={staff.id} 
                layout
                variants={staggerItem}
                className={styles.staffCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.avatar}>
                    {getInitials(staff.name)}
                  </div>
                  <div className={styles.info}>
                    <h3 className={styles.name}>{staff.name}</h3>
                    <p className={styles.dept}>{staff.department}</p>
                  </div>
                </div>

                <div className={styles.details}>
                  <div className={styles.detailItem}>
                    <FiBriefcase className={styles.detailIcon} />
                    <span>{staff.department}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <FiMapPin className={styles.detailIcon} />
                    <span>{staff.building} Building, Room {staff.room} (Floor {staff.floor})</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              className={styles.emptyState}
              variants={fadeUp}
            >
              <FiUser className={styles.emptyIcon} style={{ fontSize: '3rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }} />
              <h3 className={styles.emptyTitle}>No staff found</h3>
              <p className={styles.emptyText}>Try adjusting your search or faculty filter.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
