import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../lib/constants';
import { pageTransition } from '../lib/motion/variants';

// Layouts
import RootLayout from '../components/layout/RootLayout';
import PortalLayout from '../components/layout/Portal/PortalLayout';
import PrivateRoute from './PrivateRoute';

/**
 * PageStub component for rapid prototyping.
 * Replaces real page components until they are built.
 */
const PageStub = ({ name }) => (
  <motion.div
    variants={pageTransition}
    initial="hidden"
    animate="visible"
    exit="exit"
    style={{ 
      padding: '8rem 2rem', 
      textAlign: 'center', 
      fontFamily: 'var(--font-heading)',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <h1 style={{ fontSize: '3rem', color: 'var(--brand-primary)', marginBottom: '1rem' }}>{name}</h1>
    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>
      This page is under development. Please check back later.
    </p>
  </motion.div>
);

/**
 * Main application router configuration using createBrowserRouter.
 * Organizes routes into public, protected (portal), and auth groups.
 */
const router = createBrowserRouter([
  // Public routes (Home, About, etc.)
  {
    element: <RootLayout />,
    children: [
      { path: ROUTES.HOME, element: <PageStub name="Welcome to MIU" /> },
      { path: ROUTES.ABOUT, element: <PageStub name="About MIU" /> },
      { path: ROUTES.ACADEMICS, element: <PageStub name="Academics" /> },
      { path: ROUTES.FACULTY, element: <PageStub name="Faculty Detail" /> },
      { path: ROUTES.ADMISSIONS, element: <PageStub name="Admissions" /> },
      { path: ROUTES.STUDENT_LIFE, element: <PageStub name="Student Life" /> },
      { path: ROUTES.NEWS, element: <PageStub name="University News" /> },
      { path: ROUTES.CONTACT, element: <PageStub name="Contact Us" /> },
      { path: ROUTES.CAMPUS, element: <PageStub name="Campus Exploration" /> },
    ]
  },
  
  // Protected Portal routes
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <PortalLayout />,
        children: [
          { path: ROUTES.DASHBOARD, element: <PageStub name="Student Dashboard" /> },
          { path: ROUTES.GPA, element: <PageStub name="GPA Calculator" /> },
          { path: ROUTES.ATTENDANCE, element: <PageStub name="My Attendance" /> },
          { path: ROUTES.SCHEDULE, element: <PageStub name="Class Schedule" /> },
          { path: ROUTES.EXAMS, element: <PageStub name="Exam Results" /> },
          { path: ROUTES.CALENDAR, element: <PageStub name="Academic Calendar" /> },
          { path: ROUTES.PORTAL_CAMPUS, element: <PageStub name="Portal Campus Map" /> },
        ]
      }
    ]
  },

  // Auth routes
  { path: ROUTES.LOGIN, element: <PageStub name="Sign In" /> },
  { path: ROUTES.REGISTER, element: <PageStub name="Create Account" /> },

  // 404
  { path: '*', element: <PageStub name="404 - Not Found" /> },
]);

export default router;
