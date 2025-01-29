
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HotelDetails from './pages/User/HotelDetails'
import MyBookings from './pages/User/MyBookings'
import Home from './pages/User/Home'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

function App() {

  return (
    <>
    
    <Routes>
      <Route path='/' element={<Home/>} ></Route>
      <Route path='/hoteldetails' element={<HotelDetails/>} ></Route>
      <Route path='/mybookings' element={<MyBookings/>} ></Route>
      <Route path={'/*'} element={<Navigate to={'/'} />} ></Route>




    </Routes>

    </>
   
  )
}

export default App
