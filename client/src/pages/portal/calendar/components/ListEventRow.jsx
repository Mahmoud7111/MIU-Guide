import Badge from '@/components/ui/Badge';
import { formatDateShort, formatTime } from '@/lib/dateUtils';
import styles from '../CalendarPage.module.css';

/**
 * ListEventRow — single event row in list view.
 */
const ListEventRow = ({ event, onClick }) => {
  const typeLabel = event.type[0].toUpperCase() + event.type.slice(1);
  const timeLabel = event.allDay ? 'All Day' : formatTime(new Date(event.date));
  const colorMap = {
    academic: 'var(--color-primary)',
    holiday: 'var(--color-success)',
    activity: 'var(--color-warning)',
    deadline: 'var(--color-danger)',
    social: 'var(--color-info)',
  };

  return (
    <div className={styles.listEventRow} role="button" tabIndex={0} onClick={onClick}>
      <span
        className={styles.listEventDot}
        style={{ background: colorMap[event.type] }}
      />
      <div className={styles.listEventContent}>
        <div className={styles.listEventTitle}>
          {formatDateShort(event.date)} • {event.title}
        </div>
        <div className={styles.listEventMeta}>
          <Badge variant="default" size="sm">{typeLabel}</Badge>
          <span>{timeLabel}</span>
          {event.location && <span>{event.location}</span>}
        </div>
      </div>
    </div>
  );
};

export default ListEventRow;
