import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { formatTime } from '@/lib/dateUtils';
import { truncate } from '@/lib/formatters';
import styles from '../CalendarPage.module.css';

/**
 * SidebarEventCard — single event item in sidebar.
 */
const SidebarEventCard = ({ event, onClick }) => {
  const typeLabel = event.type[0].toUpperCase() + event.type.slice(1);
  const timeLabel = formatTime(new Date(event.date));
  const colorMap = {
    academic: 'var(--color-primary)',
    holiday: 'var(--color-success)',
    activity: 'var(--color-warning)',
    deadline: 'var(--color-danger)',
    social: 'var(--color-info)',
  };

  return (
    <Card
      variant="bordered"
      hoverable
      clickable
      className={styles.sidebarEvent}
      onClick={onClick}
    >
      <span
        className={styles.eventColorStrip}
        style={{ background: colorMap[event.type] }}
      />
      <div className={styles.sidebarEventContent}>
        <div className={styles.sidebarEventTitle}>{event.title}</div>
        <div className={styles.sidebarEventMeta}>
          <Badge variant="default" size="sm">{typeLabel}</Badge>
          {event.allDay ? (
            <Badge variant="default" size="sm">All Day</Badge>
          ) : (
            <span>{timeLabel}</span>
          )}
          {event.location && <span>{event.location}</span>}
        </div>
        <div className={styles.sidebarEventDesc}>
          {truncate(event.description || '', 80)}
        </div>
      </div>
    </Card>
  );
};

export default SidebarEventCard;
