// All <Route> definitions

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import NotFoundPage from '../pages/error/NotFoundPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    {/* Add more routes here */}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
