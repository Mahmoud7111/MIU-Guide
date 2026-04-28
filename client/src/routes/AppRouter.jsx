import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '../lib/constants';
import { Spinner } from '../components/ui';

/**
 * Loading wrapper for lazy-loaded components.
 */
const Loadable = (Component) => (props) => (
  <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Spinner size="large" /></div>}>
    <Component {...props} />
  </Suspense>
);

// Layouts
const RootLayout = Loadable(lazy(() => import('../components/layout/RootLayout')));
const PortalLayout = Loadable(lazy(() => import('../components/layout/Portal/PortalLayout')));
const PrivateRoute = Loadable(lazy(() => import('./PrivateRoute')));

// Error Pages
const NotFoundPage = Loadable(lazy(() => import('../pages/public/error/NotFoundPage')));
const ErrorPage = Loadable(lazy(() => import('../pages/public/error/ErrorPage')));

// Public Pages
const HomePage = Loadable(lazy(() => import('../pages/public/home/HomePage')));
const AboutPage = Loadable(lazy(() => import('../pages/public/about/AboutPage')));
const AcademicsPage = Loadable(lazy(() => import('../pages/public/academics/AcademicsPage')));
const FacultyPage = Loadable(lazy(() => import('../pages/public/faculty/FacultyPage')));
const AdmissionsPage = Loadable(lazy(() => import('../pages/public/admissions/AdmissionsPage')));
const StudentLifePage = Loadable(lazy(() => import('../pages/public/student-life/StudentLifePage')));
const NewsPage = Loadable(lazy(() => import('../pages/public/news/NewsPage')));
const ContactPage = Loadable(lazy(() => import('../pages/public/contact/ContactPage')));
const CampusPage = Loadable(lazy(() => import('../pages/public/campus/CampusPage')));

// Portal Pages
const DashboardPage = Loadable(lazy(() => import('../pages/portal/dashboard/DashboardPage')));
const GpaPage = Loadable(lazy(() => import('../pages/portal/gpa/GpaPage')));
const AttendancePage = Loadable(lazy(() => import('../pages/portal/attendance/AttendancePage')));
const SchedulePage = Loadable(lazy(() => import('../pages/portal/schedule/SchedulePage')));
const ExamsPage = Loadable(lazy(() => import('../pages/portal/exams/ExamsPage')));
const CalendarPage = Loadable(lazy(() => import('../pages/portal/calendar/CalendarPage')));
const PortalCampusPage = Loadable(lazy(() => import('../pages/portal/campus/CampusPage')));

// Auth Pages
const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));

/**
 * Main application router configuration.
 * Uses React.lazy for code splitting and better performance.
 */
const router = createBrowserRouter([
  // Public routes
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.ABOUT, element: <AboutPage /> },
      { path: ROUTES.ACADEMICS, element: <AcademicsPage /> },
      { path: ROUTES.FACULTY, element: <FacultyPage /> },
      { path: ROUTES.ADMISSIONS, element: <AdmissionsPage /> },
      { path: ROUTES.STUDENT_LIFE, element: <StudentLifePage /> },
      { path: ROUTES.NEWS, element: <NewsPage /> },
      { path: ROUTES.CONTACT, element: <ContactPage /> },
      { path: ROUTES.CAMPUS, element: <CampusPage /> },
    ]
  },
  
  // Protected Portal routes
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <PortalLayout />,
        children: [
          { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
          { path: ROUTES.GPA, element: <GpaPage /> },
          { path: ROUTES.ATTENDANCE, element: <AttendancePage /> },
          { path: ROUTES.SCHEDULE, element: <SchedulePage /> },
          { path: ROUTES.EXAMS, element: <ExamsPage /> },
          { path: ROUTES.CALENDAR, element: <CalendarPage /> },
          { path: ROUTES.PORTAL_CAMPUS, element: <PortalCampusPage /> },
        ]
      }
    ]
  },

  // Auth routes
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.REGISTER, element: <RegisterPage /> },

  // 404
  { path: '*', element: <NotFoundPage /> },
]);

export default router;
