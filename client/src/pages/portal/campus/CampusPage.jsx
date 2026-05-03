import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiMapPin, FiLayers, FiUsers, FiCoffee, FiX,
  FiChevronDown, FiChevronUp, FiNavigation, FiShare2, FiBookOpen,
  FiClock, FiCheckCircle, FiInfo, FiCalendar, FiArrowRight
} from 'react-icons/fi';
import { MdOutlineRoomPreferences, MdMeetingRoom } from 'react-icons/md';
import CampusMap3D from '@/components/ui/CampusMap3D';
import { buildings, facilities, restaurants, professors } from '@/data/campusBuildings';
import styles from './CampusPage.module.css';

/**
 * Parses room codes like "PH 102" or "M304".
 */
const parseRoomCode = (query) => {
  const match = query.trim().match(/^([a-zA-Z]+)\s*(\d)(\d{2})$/);
  if (!match) return null;
  const [, code, floor, roomNumber] = match;
  return {
    code: code.toUpperCase(),
    floor: parseInt(floor, 10),
    room: roomNumber
  };
};

const CampusExplorer = () => {
  const [activeCategory, setActiveCategory] = useState('Buildings');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedFloor, setExpandedFloor] = useState(0);

  // Categories for Sidebar
  const categories = [
    { id: 'Buildings', icon: FiMapPin, label: 'Buildings' },
    { id: 'Facilities', icon: MdOutlineRoomPreferences, label: 'Facilities' },
    { id: 'Dining', icon: FiCoffee, label: 'Dining' },
    { id: 'Staff', icon: FiUsers, label: 'Staff' },
  ];

  // Search Results logic
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();
    const results = [];

    // Room Codes
    const roomInfo = parseRoomCode(query);
    if (roomInfo) {
      const b = buildings.find(b => b.code && b.code.toUpperCase() === roomInfo.code);
      if (b) {
        results.push({
          id: `room-${b.id}-${roomInfo.floor}-${roomInfo.room}`,
          type: 'Room',
          title: `Room ${roomInfo.floor}${roomInfo.room}`,
          subtitle: `${b.name}, Floor ${roomInfo.floor}`,
          icon: MdMeetingRoom,
          data: { ...b, targetFloor: roomInfo.floor, displayName: `Room ${roomInfo.floor}${roomInfo.room}`, displayType: 'Lecture Hall' }
        });
      }
    }

    // Professors
    professors?.forEach(prof => {
      if (prof.name.toLowerCase().includes(query) || prof.department.toLowerCase().includes(query)) {
        const b = buildings.find(b => b.id === prof.building);
        results.push({
          id: prof.id,
          type: 'Staff',
          title: prof.name,
          subtitle: `${prof.department}`,
          icon: FiUsers,
          data: { ...(b || buildings[0]), displayName: prof.name, displayType: 'Professor Office' }
        });
      }
    });

    // Buildings
    buildings.forEach(b => {
      if (b.name.toLowerCase().includes(query) || (b.code && b.code.toLowerCase().includes(query))) {
        results.push({
          id: b.id,
          type: 'Building',
          title: b.name,
          subtitle: b.description,
          icon: FiLayers,
          data: { ...b, displayType: 'Academic Hub' }
        });
      }
    });

    return results;
  }, [searchQuery]);

  // Items for selected category tab
  const categoryItems = useMemo(() => {
    switch (activeCategory) {
      case 'Buildings':
        return buildings.map(b => ({
          id: b.id, title: b.name, subtitle: b.description, icon: FiLayers, data: { ...b, displayType: 'Academic Hub' }
        }));
      case 'Facilities':
        return facilities.map(f => ({
          id: `fac-${f.id}`, title: f.name, subtitle: f.location, icon: FiBookOpen,
          data: { ...(buildings.find(b => f.location.includes(b.name)) || buildings[0]), displayName: f.name, displayType: 'Campus Facility' }
        }));
      case 'Dining':
        return restaurants.map(r => ({
          id: `din-${r.id}`, title: r.name, subtitle: `${r.cuisine} • ${r.location}`, icon: FiCoffee,
          data: { ...(buildings.find(b => r.location.includes(b.name)) || buildings[0]), displayName: r.name, displayType: 'Dining' }
        }));
      case 'Staff':
        return professors ? professors.map(p => ({
          id: p.id, title: p.name, subtitle: `${p.department}`, icon: FiUsers,
          data: { ...(buildings.find(b => b.id === p.building) || buildings[0]), displayName: p.name, displayType: 'Staff' }
        })) : [];
      default: return [];
    }
  }, [activeCategory]);

  const displayedItems = searchResults !== null ? searchResults : categoryItems;

  const handleSelectItem = (item) => {
    setSelectedItem(item.data);
    if (item.type === 'Room' && item.data.targetFloor !== undefined) {
      const floorIdx = item.data.floors?.findIndex(f => f.floor === item.data.targetFloor);
      if (floorIdx >= 0) setExpandedFloor(floorIdx);
    } else {
      setExpandedFloor(0);
    }
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.brandGroup}>
            <img src="/MIU.png" alt="MIU" style={{ width: '44px' }} />
            <div>
              <h2 className={styles.brandTitle}>MIU Campus</h2>
              <span className={styles.brandSubtitle}>Student Explorer</span>
            </div>
          </div>

          <div className={styles.searchWrapper}>
            <div className={styles.searchContainer}>
              <FiSearch className={styles.searchIcon} size={20} />
              <input
                type="text"
                placeholder="Find anything on campus..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && <FiX style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => setSearchQuery('')} />}
            </div>
          </div>
        </div>

        {!searchQuery && (
          <div className={styles.categoryGrid}>
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={`${styles.categoryCard} ${activeCategory === cat.id ? styles.categoryCardActive : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <cat.icon className={styles.categoryIcon} />
                <span className={styles.categoryLabel}>{cat.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className={styles.itemList}>
          <AnimatePresence mode="popLayout">
            {displayedItems.length > 0 ? (
              displayedItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  className={styles.sidebarItem}
                  onClick={() => handleSelectItem(item)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.02 }}
                >
                  <div className={styles.itemIconBox}>
                    <item.icon size={20} />
                  </div>
                  <div className={styles.itemContent}>
                    <div className={styles.itemTitle}>{item.title}</div>
                    <div className={styles.itemSubtitle}>{item.subtitle}</div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className={styles.emptyContainer}>
                <FiSearch className={styles.emptyIcon} />
                <h4 className={styles.emptyTitle}>No locations found</h4>
                <p className={styles.emptyText}>Check your spelling or try a different category.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </aside>

      {/* Main Content Area (Background) */}
      <main className={styles.mainContent}>
        <div 
          className={styles.mapWrapper}
          style={{}}
        >
          <CampusMap3D
            cameraOrbit={selectedItem?.cameraOrbit || "0deg 75deg 80%"}
            fieldOfView={selectedItem?.fieldOfView || "30deg"}
          />
        </div>

        {/* Right Detail Panel - IMPROVED DETAILS */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className={styles.detailPanel}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div
                className={styles.detailHeader}
                style={{ backgroundImage: `url(${selectedItem.image || '/images/main-building.jpg'})` }}
              >
                <div className={styles.headerOverlay} />
                <button className={styles.closeBtn} onClick={() => setSelectedItem(null)}>
                  <FiX size={20} />
                </button>
                <div className={styles.headerContent}>
                  <div className={styles.statusBadge}>
                    <FiCheckCircle size={12} />
                    <span>Active Hub</span>
                  </div>
                  <h3 className={styles.detailTitle}>{selectedItem.displayName || selectedItem.name}</h3>
                  <p className={styles.headerSubtitle}>{selectedItem.description}</p>
                </div>
              </div>

              <div className={styles.detailBody}>
                {/* Stats Cards Row */}
                <div className={styles.statsRow}>
                  <div className={styles.statCard}>
                    <FiLayers className={styles.statIcon} />
                    <div className={styles.statInfo}>
                      <span className={styles.statVal}>{selectedItem.floors?.length || 1}</span>
                      <span className={styles.statLabel}>Floors</span>
                    </div>
                  </div>
                  <div className={styles.statCard}>
                    <FiClock className={styles.statIcon} />
                    <div className={styles.statInfo}>
                      <span className={styles.statVal}>Open</span>
                      <span className={styles.statLabel}>8AM - 8PM</span>
                    </div>
                  </div>
                  <div className={styles.statCard}>
                    <FiUsers className={styles.statIcon} />
                    <div className={styles.statInfo}>
                      <span className={styles.statVal}>High</span>
                      <span className={styles.statLabel}>Occupancy</span>
                    </div>
                  </div>
                </div>

                <div className={styles.actionGrid}>
                  <button className={styles.actionButton + ' ' + styles.primaryAction} onClick={() => alert('Pathfinding initiated...')}>
                    <FiNavigation size={18} />
                    <span>Get Directions</span>
                  </button>
                  <button className={styles.actionButton} onClick={() => alert('Sharing building info...')}>
                    <FiShare2 size={18} />
                    <span>Share Location</span>
                  </button>
                </div>

                <div className={styles.detailSection}>
                  <div className={styles.sectionHeader}>
                    <FiInfo />
                    <span>Building Features</span>
                  </div>
                  <div className={styles.featuresList}>
                    <span className={styles.featureItem}>Free Wi-Fi</span>
                    <span className={styles.featureItem}>ADA Accessible</span>
                    <span className={styles.featureItem}>Student Study Lounges</span>
                    <span className={styles.featureItem}>Vending Machines</span>
                  </div>
                </div>

                {selectedItem.floors && (
                  <div className={styles.detailSection}>
                    <div className={styles.sectionHeader}>
                      <FiLayers />
                      <span>Floor Directory</span>
                    </div>
                    <div className={styles.directoryList}>
                      {selectedItem.floors.map((floor, idx) => (
                        <div key={idx} className={styles.floorItem}>
                          <div
                            className={styles.floorHeader}
                            onClick={() => setExpandedFloor(expandedFloor === idx ? -1 : idx)}
                          >
                            <div className={styles.floorTitleGroup}>
                              <span className={styles.floorNum}>0{floor.floor}</span>
                              <span className={styles.floorLabel}>{floor.label}</span>
                            </div>
                            {expandedFloor === idx ? <FiChevronUp /> : <FiChevronDown />}
                          </div>
                          <AnimatePresence>
                            {expandedFloor === idx && (
                              <motion.div
                                className={styles.floorBody}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                              >
                                {floor.departments.map((dept, dIdx) => (
                                  <div key={dIdx} className={styles.deptRow}>
                                    <FiArrowRight size={14} className={styles.deptIcon} />
                                    <span>{dept}</span>
                                  </div>
                                ))}
                                {professors?.filter(p => p.building === selectedItem.id && p.floor === floor.floor).map(prof => (
                                  <div key={prof.id} className={styles.profRow}>
                                    <FiUsers size={14} className={styles.profIcon} />
                                    <span>{prof.name} Office ({prof.room})</span>
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upcoming Events in this building */}
                <div className={styles.detailSection}>
                  <div className={styles.sectionHeader}>
                    <FiCalendar />
                    <span>Upcoming Events</span>
                  </div>
                  <div className={styles.miniEventCard}>
                    <div className={styles.eventDate}>MAY 25</div>
                    <div className={styles.eventInfo}>
                      <div className={styles.eventTitle}>Tech Innovation Workshop</div>
                      <div className={styles.eventMeta}>Level 2, Digital Library • 11:00 AM</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default CampusExplorer;
