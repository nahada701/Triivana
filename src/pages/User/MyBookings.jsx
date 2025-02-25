import React from 'react'
import { Container } from "react-bootstrap";
import BookingCard from '../../components/User/BookingCard';
import UserNavbar from '../../components/User/UserNavbar';

function MyBookings() {
  const bookings = [
    {
      hotelName: "The Grand Palace",
      hotelImage: "https://source.unsplash.com/200x200/?hotel",
      checkInDate: "2025-03-10",
      checkOutDate: "2025-03-15",
      roomType: "Deluxe Room",
      price: 7500,
      paymentStatus: "Paid",
      status: "Confirmed",
      bookingId: "BKG123456",
    },
    {
      hotelName: "Ocean View Resort",
      hotelImage: "https://source.unsplash.com/200x200/?beach,hotel",
      checkInDate: "2025-04-01",
      checkOutDate: "2025-04-05",
      roomType: "Suite",
      price: 12000,
      paymentStatus: "Pending",
      status: "Pending",
      bookingId: "BKG789012",
    },
  ];
  return (
    <div>
      <div className="bg-dark">
      < UserNavbar />
      </div>
      
       <Container className="mt-4">
      <h2 className="mb-4">My Bookings</h2>
      {bookings.map((booking, index) => (
        <BookingCard key={index} booking={booking} />
      ))}
    </Container>
    </div>
  )
}

export default MyBookings