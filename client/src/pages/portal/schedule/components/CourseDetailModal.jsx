import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { formatCourseCode, formatDuration, formatRoomCode } from '@/lib/formatters';
import { formatTime } from '@/lib/dateUtils';
import styles from '../SchedulePage.module.css';

/**
 * CourseDetailModal — detailed course information modal.
 */
const CourseDetailModal = ({ course, onClose, semesterLabel }) => {
  if (!course) return null;

  const toDateTime = (time) => {
    const [h, m] = time.split(':').map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  };

  const start = formatTime(toDateTime(course.startTime));
  const end = formatTime(toDateTime(course.endTime));
  const duration = formatDuration(
    (toDateTime(course.endTime) - toDateTime(course.startTime)) / 60000,
  );

  return (
    <Modal
      isOpen={!!course}
      onClose={onClose}
      title={`${formatCourseCode(course.courseCode)} — ${course.courseName}`}
      size="md"
      footer={
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      }
    >
      <div className={styles.modalStrip} style={{ background: course.color }} />

      <div className={styles.modalGrid}>
        <div className={styles.modalRow}>
          <span className={styles.modalLabel}>Credits</span>
          <span className={styles.modalValue}>{course.credits}</span>
        </div>
        <div className={styles.modalRow}>
          <span className={styles.modalLabel}>Instructor</span>
          <span className={styles.modalValue}>{course.instructor}</span>
        </div>
        <div className={styles.modalRow}>
          <span className={styles.modalLabel}>Schedule</span>
          <span className={styles.modalValue}>
            {course.days.join(', ')} • {start} → {end}
          </span>
        </div>
        <div className={styles.modalRow}>
          <span className={styles.modalLabel}>Room</span>
          <span className={styles.modalValue}>
            {formatRoomCode(course.room)} • {course.building}
          </span>
        </div>
        <div className={styles.modalRow}>
          <span className={styles.modalLabel}>Duration</span>
          <span className={styles.modalValue}>{duration}</span>
        </div>
        <div className={styles.modalRow}>
          <span className={styles.modalLabel}>Semester</span>
          <span className={styles.modalValue}>{semesterLabel}</span>
        </div>
      </div>
    </Modal>
  );
};

export default CourseDetailModal;
