import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/dashboard';
import Messages from '../pages/messages';
import Payments from '../pages/payments';
import Profile from '../pages/profile';
import Settings from '../pages/settings';
import TopDonators from '../pages/topDonators';
import WithdrawMoney from '../pages/withdrawMoney';
import CollectMoney from '../pages/collectMoney';
import DonatPage from '../pages/donatPage';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

const RootRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="login" element={<Login />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="profile" element={<Profile />} />
    <Route path="messages" element={<Messages />} />
    <Route path="top-donators" element={<TopDonators />} />
    <Route path="payment-history" element={<Payments />} />
    <Route path="withdraw-money" element={<WithdrawMoney />} />
    <Route path="collect-money" element={<CollectMoney />} />
    <Route path="donat-page" element={<DonatPage />} />
    <Route path="settings" element={<Settings />} />
    <Route path="register" element={<Register/>} />
  </Routes>
);

export default RootRoutes;
