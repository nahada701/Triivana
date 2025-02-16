import React from 'react'
import SuperAdminSidebar from './SuperAdminSidebar'
import { Route, Routes } from 'react-router-dom'
import DashboardSuperAdmin from './sidebarComponents/DashboardSuperAdmin'
import PropertOwners from './sidebarComponents/PropertOwners'
import UserManagement from './sidebarComponents/UserManagement'
import PropertyManagment from './sidebarComponents/PropertyManagment'
import ReviewsRatings from './sidebarComponents/ReviewsRatings'
import SuperAdminSettings from './sidebarComponents/SuperAdminSettings'

function SuperAdminDashboard() {
    return (
      <div  className="d-flex flex-column">
          <div className="superadmin-sidebar ">
              <SuperAdminSidebar />
              
          </div>
          <div className="content-wrapper flex-grow-1">
              <Routes>
                  <Route path="" element={<DashboardSuperAdmin />} />
                  <Route path="property-owners" element={<PropertOwners />} />
                  <Route path="user-management" element={<UserManagement />} />
                  <Route path="property-management" element={<PropertyManagment />} />
                  <Route path="reviews-ratings" element={<ReviewsRatings />} />
                  <Route path="settings" element={<SuperAdminSettings />} />
              </Routes>
          </div>
      </div>
    );
  }
  
  

export default SuperAdminDashboard

