import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageTransition, staggerContainer, staggerItem } from '@/lib/motion/variants';
import { buildings } from '@/data/campusBuildings';
import TagBadge from '@/components/ui/TagBadge';
import styles from './RoomsPage.module.css';

/* Flatten all buildings → floors → departments into searchable room rows */
const allRooms = buildings.flatMap((b) =>
  b.floors.flatMap((f) =>
    f.departments.map((dept, idx) => ({
      id: `${b.id}-${f.floor}-${idx}`,
      building: b.name,
      floor: f.label,
      department: dept,
    }))
  )
);

const RoomsPage = () => {
  const [query, setQuery] = useState('');

  const filtered = allRooms.filter(
    (room) =>
      room.department.toLowerCase().includes(query.toLowerCase()) ||
      room.building.toLowerCase().includes(query.toLowerCase()) ||
      room.floor.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.main
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={styles.page}
    >
      {/* Page header */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <nav className={styles.breadcrumb}>
            <Link to="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.sep}>›</span>
            <Link to="/campus" className={styles.breadcrumbLink}>Campus</Link>
            <span className={styles.sep}>›</span>
            <span>Rooms & Departments</span>
          </nav>
          <h1 className={styles.heroTitle}>Rooms & Departments</h1>
          <p className={styles.heroSub}>
            Find which floor and building hosts every faculty department at MIU.
          </p>
        </div>
      </section>

      {/* Search + table */}
      <section className={styles.section}>
        <div className={styles.container}>
          {/* Search bar */}
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              className={styles.searchInput}
              type="search"
              placeholder="Search by department, building, or floor…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <p className={styles.empty}>No results found for "{query}"</p>
          ) : (
            <motion.div
              className={styles.tableWrap}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Department / Faculty</th>
                    <th className={styles.th}>Floor</th>
                    <th className={styles.th}>Building</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((room) => (
                    <motion.tr key={room.id} className={styles.row} variants={staggerItem}>
                      <td className={styles.td}>
                        <TagBadge label={room.department} color="var(--brand-primary)" />
                      </td>
                      <td className={styles.td}>{room.floor}</td>
                      <td className={styles.td}>{room.building}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              <p className={styles.resultCount}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
            </motion.div>
          )}
        </div>
      </section>
    </motion.main>
  );
};

export default RoomsPage;
