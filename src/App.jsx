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

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hoteldetails" element={<HotelDetails />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
