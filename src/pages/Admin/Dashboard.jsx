import React from 'react';
import Sidebar from '../../components/Admin/Sidebar';
import { Routes, Route } from 'react-router-dom';
import ManageListings from '../../components/Admin/sidebarcompoentns/ManageListings';
import Bookings from '../../components/Admin/sidebarcompoentns/Bookings';
import Reviews from '../../components/Admin/sidebarcompoentns/Reviews';
import Earnings from '../../components/Admin/sidebarcompoentns/Earnings';
import Settings from '../../components/Admin/sidebarcompoentns/Settings';
import DashboardContent from '../../components/Admin/sidebarcompoentns/DashboardContent';
import BookingHistory from '../../components/Admin/sidebarcompoentns/BookingHistory';
function Dashboard() {
  return (
    <div>
      <Sidebar />
      <div className='main-content'>
        
        <Routes>
          <Route path="" element={<DashboardContent />} />
          <Route path="manage-listings" element={<ManageListings />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="settings" element={<Settings />} />
          <Route path="bookings/history" element={<BookingHistory />} />

        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
