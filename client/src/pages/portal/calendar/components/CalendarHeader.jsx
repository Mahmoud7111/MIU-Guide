import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import EventFilterBar from './EventFilterBar';
import styles from '../CalendarPage.module.css';

/**
 * CalendarHeader — page title, view toggle, and month navigation.
 */
const CalendarHeader = ({
  monthLabel,
  semesterLabel,
  view,
  onViewChange,
  onPrevMonth,
  onNextMonth,
  onToday,
  filter,
  onFilterChange,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div>
          <h1 className={styles.title}>Calendar</h1>
          <p className={styles.subtitle}>
            {monthLabel} • {semesterLabel}
          </p>
        </div>
        <Badge variant="primary" size="md">{semesterLabel}</Badge>
      </div>

      <div className={styles.viewToggle}>
        <Button
          variant={view === 'month' ? 'primary' : 'outlined'}
          size="sm"
          onClick={() => onViewChange('month')}
        >
          Month View
        </Button>
        <Button
          variant={view === 'list' ? 'primary' : 'outlined'}
          size="sm"
          onClick={() => onViewChange('list')}
        >
          List View
        </Button>
      </div>

      {view === 'month' && (
        <>
          <div className={styles.calendarHeader}>
            <div className={styles.monthNav}>
              <Button variant="outlined" size="sm" onClick={onPrevMonth}>
                ← Previous Month
              </Button>
              <span className={styles.monthLabel}>{monthLabel}</span>
              <Button variant="outlined" size="sm" onClick={onNextMonth}>
                Next Month →
              </Button>
            </div>
            <Button variant="outlined" size="sm" onClick={onToday}>
              Today
            </Button>
          </div>

          <EventFilterBar
            filter={filter}
            onChange={onFilterChange}
          />
        </>
      )}
    </header>
  );
};

export default CalendarHeader;
