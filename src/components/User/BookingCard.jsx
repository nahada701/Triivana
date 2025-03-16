import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import serverURL from "../../Services/serverURL";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import { cancelBookingsApi } from "../../Services/allApi";
const BookingCard = ({canceled, setCanceled,booking }) => {

  const navigate=useNavigate()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkInDate = new Date(booking.checkInDate);
  checkInDate.setHours(0, 0, 0, 0); // Normalize check-in date to start of the day
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today to start of the day
  
  // Allow cancellation on any day before the check-in date
  const canCancel = today < checkInDate;
  

  const handleCancelBooking=async()=>{
    const userToken = sessionStorage.getItem("userToken")
    const reqHeader = {
      " Content-Type": "application/json",
      "Authorization": `Bearer ${userToken}`
    }
    const bookingId=booking._id
    if(userToken){
      try {
        const result=await cancelBookingsApi(bookingId,reqHeader)
        if(result.status==200){
          setCanceled(!canceled)
          handleClose()

        }
        
        
      } catch (error) {
        console.log(error);
        
      }
    }
  }
  return (
    
 <>
      <Card className="mb-3 shadow-sm">
        <Card.Body className="d-flex  align-items-center">
          {/* Hotel Image */}
          <img
          src={`${serverURL}/uploads/${booking?.hotel?.images[0]}`}
            alt={booking?.hotel?.propertyname}
            className="img-fluid rounded"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
  
          {/* Booking Details */}
          <div className="ms-3 flex-grow-1">
            <h5 className="fw-bold">{booking?.hotel?.propertyname}</h5>
            <p className="mb-1">
              <strong>Check-in:</strong> {(booking.checkInDate.split("T")[0])} &nbsp; | &nbsp;
              <strong>Check-out:</strong> {(booking.checkOutDate.split("T")[0])}
            </p>
            <p className="mb-1">
              <strong>Room Type:</strong> {booking?.room?.roomType}
            </p>
           
            {/* Status & Price */}
            <div className="d-flex justify-content-between align-items-center">
              <Badge
                bg={
                  booking.status === "confirmed"
                    ? "success"
                    : booking.status === "canceled"
                    ? "danger"
                    : "secondary"
                }
              >
                {booking.status}
              </Badge>
            </div>
          </div>
  
          {/* Buttons */}
          <div className="d-flex  flex-column ms-3">
          <h4 className="fw-bold align-self-end text-primary">₹{booking.totalprice}</h4>
  
            <Button variant="outline-dark" size="sm" className="mb-2" onClick={()=>navigate(`/hoteldetails/${booking?.hotel._id}`)}>
              View Details
            </Button>
            {booking.status === "confirmed" && canCancel&&
              <Button variant="outline-danger" onClick={handleShow} size="sm">
                Cancel Booking
              </Button>
            }
          </div>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="fs-5">Are you sure you want to cancel?</Modal.Title>
          </Modal.Header>
         
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleCancelBooking}>
              Yes Cancel
            </Button>
          </Modal.Footer>
        </Modal>
 </>
  );
};

export default BookingCard;
