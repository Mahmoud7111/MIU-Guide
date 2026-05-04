import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import styles from '../SchedulePage.module.css';

/**
 * ScheduleHeader — page title, view toggle, and week navigation.
 */
const ScheduleHeader = ({
  weekRange,
  view,
  onViewChange,
  onPrevWeek,
  onNextWeek,
  onThisWeek,
  isCurrentWeek,
  semesterLabel,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div>
          <h1 className={styles.title}>My Schedule</h1>
          <p className={styles.subtitle}>{weekRange}</p>
        </div>
        <Badge variant="primary" size="md">{semesterLabel}</Badge>
      </div>

      <div className={styles.headerControls}>
        <div className={styles.viewToggle}>
          <Button
            variant={view === 'grid' ? 'primary' : 'outlined'}
            size="sm"
            onClick={() => onViewChange('grid')}
          >
            Week Grid
          </Button>
          <Button
            variant={view === 'list' ? 'primary' : 'outlined'}
            size="sm"
            onClick={() => onViewChange('list')}
          >
            List View
          </Button>
        </div>

        {view === 'grid' && (
          <div className={styles.weekNav}>
            <Button variant="outlined" size="sm" onClick={onPrevWeek}>
              ← Previous Week
            </Button>
            <Button
              variant="outlined"
              size="sm"
              onClick={onThisWeek}
              disabled={isCurrentWeek}
            >
              This Week
            </Button>
            <Button variant="outlined" size="sm" onClick={onNextWeek}>
              Next Week →
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default ScheduleHeader;
