import { useLocation } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';

/**
 * Hook to map the current pathname to a human-readable page title.
 * Used in the Portal topbar to show the active section name.
 * 
 * @returns {string} The display title for the current route.
 */
export const usePageTitle = () => {
  const { pathname } = useLocation();

  const titleMap = {
    [ROUTES.DASHBOARD]: 'Dashboard',
    [ROUTES.GPA]: 'GPA Calculator',
    [ROUTES.ATTENDANCE]: 'Attendance Tracking',
    [ROUTES.SCHEDULE]: 'Class Schedule',
    [ROUTES.EXAMS]: 'Exams & Results',
    [ROUTES.CALENDAR]: 'Academic Calendar',
    [ROUTES.PORTAL_CAMPUS]: 'Campus Map',
    [ROUTES.PROFILE]: 'Student Profile',
  };

  return titleMap[pathname] || 'Student Portal';
};

export default usePageTitle;
