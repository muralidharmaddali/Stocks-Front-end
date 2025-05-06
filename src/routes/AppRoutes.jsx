import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import Dashboard from '../pages/Dashboard';
import StocksPage from '../pages/StocksPage';
import ProfilePage from '../pages/ProfilePage';
import ContactPage from '../pages/ContactPage';
import AdminDashboard from '../pages/AdminDashboard';
import BorrowList from '../pages/Borrowlist';
import PendingList from '../pages/pendinglist';

const AppRoutes = ({ setIsLoggedIn }) => (
  <Routes>
    <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/adminDashboard" element={<AdminDashboard />} />
    <Route path="/stocks" element={<StocksPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/PendingList" element = {<PendingList/>}/>
    <Route path="/BorrowList" element = {<BorrowList/>}/>
  </Routes>
);

export default AppRoutes;
