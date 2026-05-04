import { formatCourseCode, formatDuration, formatRoomCode } from '@/lib/formatters';
import { formatTime } from '@/lib/dateUtils';
import styles from '../SchedulePage.module.css';

/**
 * CourseListRow — single course row for list view.
 */
const CourseListRow = ({ course, onClick }) => {
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
    <button className={styles.courseRow} type="button" onClick={onClick}>
      <span
        className={styles.courseDot}
        style={{ background: course.color }}
      />
      <div className={styles.courseRowMain}>
        <div className={styles.courseRowTitle}>
          {formatCourseCode(course.courseCode)} — {course.courseName}
        </div>
        <div className={styles.courseRowMeta}>
          {start} → {end} • {duration} • {formatRoomCode(course.room)}
        </div>
        <div className={styles.courseRowInstructor}>{course.instructor}</div>
      </div>
    </button>
  );
};

export default CourseListRow;
