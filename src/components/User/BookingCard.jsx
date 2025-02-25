import React from "react";
import { Card, Button, Badge } from "react-bootstrap";

const BookingCard = ({ booking }) => {
  return (
    
    <Card className="mb-3 shadow-sm">
      <Card.Body className="d-flex  align-items-center">
        {/* Hotel Image */}
        <img
          src={booking.hotelImage}
          alt={booking.hotelName}
          className="img-fluid rounded"
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />

        {/* Booking Details */}
        <div className="ms-3 flex-grow-1">
          <h5 className="fw-bold">{booking.hotelName}</h5>
          <p className="mb-1">
            <strong>Check-in:</strong> {booking.checkInDate} &nbsp; | &nbsp;
            <strong>Check-out:</strong> {booking.checkOutDate}
          </p>
          <p className="mb-1">
            <strong>Room Type:</strong> {booking.roomType}
          </p>
         
          {/* Status & Price */}
          <div className="d-flex justify-content-between align-items-center">
            <Badge
              bg={
                booking.status === "Confirmed"
                  ? "success"
                  : booking.status === "Canceled"
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
        <h4 className="fw-bold align-self-end text-primary">₹{booking.price}</h4>

          <Button variant="outline-dark" size="sm" className="mb-2">
            View Details
          </Button>
          {booking.status === "Confirmed" && (
            <Button variant="outline-danger" size="sm">
              Cancel Booking
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookingCard;
