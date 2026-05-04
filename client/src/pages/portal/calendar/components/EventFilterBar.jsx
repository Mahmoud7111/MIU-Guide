import styles from '../CalendarPage.module.css';

/**
 * EventFilterBar — type filter chips for calendar events.
 */
const EventFilterBar = ({ filter, onChange, className = '' }) => {
  const filters = ['All', 'Academic', 'Holiday', 'Activity', 'Deadline', 'Social'];
  const colorMap = {
    Academic: 'var(--color-primary)',
    Holiday: 'var(--color-success)',
    Activity: 'var(--color-warning)',
    Deadline: 'var(--color-danger)',
    Social: 'var(--color-info)',
  };

  return (
    <div className={`${styles.filterBar} ${className}`}>
      {filters.map((label) => {
        const active = filter === label;
        const activeColor = label === 'All' ? 'var(--color-primary)' : colorMap[label];
        return (
          <button
            key={label}
            type="button"
            className={`${styles.filterChip} ${active ? styles.filterChipActive : ''}`}
            style={active ? { background: activeColor } : {}}
            onClick={() => onChange(label)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default EventFilterBar;
