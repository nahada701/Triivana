import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HotelDetails from './pages/User/HotelDetails';
import MyBookings from './pages/User/MyBookings';
import Home from './pages/User/Home';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from './pages/Admin/AdminLogin';
import Dashboard from './pages/Admin/Dashboard';
import ScrollToTop from './components/Shared/ScrollToTop';
import SuperAdminLogin from './pages/SuperAdmin/SuperAdminLogin';
import SuperAdminDashboard from './pages/SuperAdmin/SuperAdminDashboard';
import SavedProperties from './pages/User/SavedProperties';


function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} theme="colored" />
        <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hoteldetails/:id" element={<HotelDetails />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/savedproperies" element={<SavedProperties />} />
        <Route path="/partner-register" element={<AdminLogin />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/superadmin-login" element={<SuperAdminLogin />} />
        <Route path="/superadmin-dashboard/*" element={<SuperAdminDashboard />} />


        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
