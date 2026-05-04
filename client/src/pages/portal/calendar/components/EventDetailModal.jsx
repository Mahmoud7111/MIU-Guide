import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { formatDate, formatTime } from '@/lib/dateUtils';
import styles from '../CalendarPage.module.css';

/**
 * EventDetailModal — detailed modal for calendar events.
 */
const EventDetailModal = ({ event, onClose, onAddToCalendar, onShare }) => {
  if (!event) return null;

  const typeLabel = event.type[0].toUpperCase() + event.type.slice(1);
  const startDate = formatDate(event.date);
  const endDate = event.endDate ? formatDate(event.endDate) : null;
  const showRange = endDate && endDate !== startDate;
  const timeLabel = event.allDay ? 'All Day' : formatTime(new Date(event.date));
  const colorMap = {
    academic: 'var(--color-primary)',
    holiday: 'var(--color-success)',
    activity: 'var(--color-warning)',
    deadline: 'var(--color-danger)',
    social: 'var(--color-info)',
  };

  return (
    <Modal
      isOpen={!!event}
      onClose={onClose}
      title={event.title}
      size="md"
      footer={
        <>
          <Button variant="outlined" onClick={onShare}>
            Share Event
          </Button>
          <Button variant="primary" onClick={onAddToCalendar}>
            Add to My Calendar
          </Button>
        </>
      }
    >
      <div className={styles.modalStrip} style={{ background: colorMap[event.type] }} />
      <div className={styles.modalGrid}>
        <div className={styles.modalRow}>
          <span className={styles.modalLabel}>Type</span>
          <Badge variant="default" size="sm">{typeLabel}</Badge>
        </div>
        <div className={styles.modalRow}>
          <span className={styles.modalLabel}>Date</span>
          <span className={styles.modalValue}>
            {showRange ? `${startDate} → ${endDate}` : startDate}
          </span>
        </div>
        <div className={styles.modalRow}>
          <span className={styles.modalLabel}>Time</span>
          <span className={styles.modalValue}>{timeLabel}</span>
        </div>
        {event.location && (
          <div className={styles.modalRow}>
            <span className={styles.modalLabel}>Location</span>
            <span className={styles.modalValue}>{event.location}</span>
          </div>
        )}
        <div className={styles.modalRow}>
          <span className={styles.modalLabel}>Details</span>
          <span className={styles.modalValue}>{event.description}</span>
        </div>
      </div>
    </Modal>
  );
};

export default EventDetailModal;
