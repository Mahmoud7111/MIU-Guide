import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';
import { Spinner } from '@/components/ui';
import LoadingScreen from '@/components/ui/LoadingScreen';

/**
 * Loading wrapper for lazy-loaded components.
 */
const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen message="Loading..." fullScreen={true} />}>
    <Component {...props} />
  </Suspense>
);

// Layouts
import RootLayout from '@/components/layout/RootLayout';
import PortalLayout from '@/components/layout/Portal/PortalLayout';
import PrivateRoute from './PrivateRoute';

// Error Pages
const NotFoundPage = Loadable(lazy(() => import('../pages/public/error/NotFoundPage')));
const ErrorPage = Loadable(lazy(() => import('../pages/public/error/ErrorPage')));

// Public Pages
import HomePage from '@/pages/public/home/HomePage';
const AboutPage = Loadable(lazy(() => import('../pages/public/about/AboutPage')));
const AcademicsPage = Loadable(lazy(() => import('../pages/public/academics/AcademicsPage')));
const FacultyPage = Loadable(lazy(() => import('../pages/public/faculty/FacultyPage')));
const AdmissionsPage = Loadable(lazy(() => import('../pages/public/admissions/AdmissionsPage')));
const StudentLifePage = Loadable(lazy(() => import('../pages/public/student-life/StudentLifePage')));
const NewsPage = Loadable(lazy(() => import('../pages/public/news/NewsPage')));
const NewsDetailPage = Loadable(lazy(() => import('../pages/public/news/NewsDetailPage')));
const ContactPage = Loadable(lazy(() => import('../pages/public/contact/ContactPage')));
const CampusPage = Loadable(lazy(() => import('../pages/public/campus/CampusPage')));
const BuildingsPage = Loadable(lazy(() => import('../pages/public/campus/BuildingsPage')));
const RoomsPage = Loadable(lazy(() => import('../pages/public/campus/RoomsPage')));

// Portal Pages
import DashboardPage from '../pages/portal/dashboard/DashboardPage';
import GpaPage from '../pages/portal/gpa/GpaPage';
import AttendancePage from '../pages/portal/attendance/AttendancePage';
import SchedulePage from '../pages/portal/schedule/SchedulePage';
import ExamsPage from '../pages/portal/exams/ExamsPage';
import CalendarPage from '../pages/portal/calendar/CalendarPage';
import PortalCampusPage from '../pages/portal/campus/CampusPage';

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
      { path: ROUTES.NEWS_DETAIL, element: <NewsDetailPage /> },
      { path: ROUTES.CONTACT, element: <ContactPage /> },
      { path: ROUTES.CAMPUS, element: <CampusPage /> },
      { path: ROUTES.CAMPUS_BUILDINGS, element: <BuildingsPage /> },
      { path: ROUTES.CAMPUS_ROOMS, element: <RoomsPage /> },
    ]
  },
  
  // Protected Portal routes
  {
    element: <PrivateRoute />,
    children: [
      { path: '/portal', element: <Navigate to={ROUTES.DASHBOARD} replace /> },
      { path: ROUTES.DASHBOARD, element: <PortalLayout><DashboardPage /></PortalLayout> },
      { path: ROUTES.GPA, element: <PortalLayout><GpaPage /></PortalLayout> },
      { path: ROUTES.ATTENDANCE, element: <PortalLayout><AttendancePage /></PortalLayout> },
      { path: ROUTES.SCHEDULE, element: <PortalLayout><SchedulePage /></PortalLayout> },
      { path: ROUTES.EXAMS, element: <PortalLayout><ExamsPage /></PortalLayout> },
      { path: ROUTES.CALENDAR, element: <PortalLayout><CalendarPage /></PortalLayout> },
      { path: ROUTES.PORTAL_CAMPUS, element: <PortalLayout><PortalCampusPage /></PortalLayout> },
    ]
  },

  // Auth routes
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.REGISTER, element: <RegisterPage /> },

  // 404
  { path: '*', element: <NotFoundPage /> },
]);

export default router;
