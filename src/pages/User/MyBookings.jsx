import React ,{useEffect, useState} from 'react'
import { Container } from "react-bootstrap";
import BookingCard from '../../components/User/BookingCard';
import UserNavbar from '../../components/User/UserNavbar';
import { getAlluserBookingsApi } from '../../Services/allApi';

function MyBookings() {
 const [bookings,setBookings]=useState([])
 
 const [canceled,setCanceled]=useState()
console.log(bookings);

 useEffect(() => {
  getAlluserBookings()
 }, [canceled])

 const getAlluserBookings=async()=>{
  const userToken=sessionStorage.getItem("userToken")
  if(userToken){
    const reqHeader={
      "Authorization":`Bearer ${userToken}`,
      "Content-Type":"application/json"
    }
    try{

      const result=await getAlluserBookingsApi(reqHeader)
      const hotelArray=[]
      result.data.forEach(hotel=>{
        hotelArray.push(hotel)
     })

      setBookings(hotelArray)
 console.log(bookings);
      
      
    }catch(err){
      console.log(err);
      
    }
  }
 }
 
  return (
    <div>
      <div className="bg-dark">
      < UserNavbar />
      </div>
      
       <Container className="mt-4">
      <h2 className="mb-4">My Bookings</h2>
      {bookings.map((booking, index) => (
        <BookingCard canceled={canceled} setCanceled={setCanceled} key={index} booking={booking} />
      ))}
    </Container>
    </div>
  )
}

export default MyBookings