import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import serverURL from "../../Services/serverURL";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { bookingConfirmationEmailApi, BookRoomApi, checkRoomAvailabilityApi } from "../../Services/allApi";
import { toast } from "react-toastify";

import BeatLoader from '../../components/Shared/BeatLoader';

function BookingForm({isBookingConfirmed,setIsBookingConfirmed, hotel, room }) {
  // Get room and hotel data
  const [isOpen, setIsOpen] = useState(false);



  // Date Range State
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const [numOfDays, setNumOfDays] = useState(1)
  // Visibility State
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [numOfAdults, setNumOfAdults] = useState(2)
  const [numOfChildren, setNumOfChildren] = useState(0)
  const [numOfRoom, setNumOfRoom] = useState(1)
  const [numOfAvailableRooms, setNumofAvailableRooms] = useState()

  const [isRoomsAvailable, setIsRoomsAvailable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isBooking,setIsBooking]=useState(false)

  const [bookingUserData, setBookingUserData] = useState({ name: "", email: "", phone: "", request: "" })

  console.log(bookingUserData);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"))
    setBookingUserData({ ...bookingUserData, name: user?.name, email: user.email })
  }, [])


  const decrementAdult = () => {
    const newAdults = numOfAdults - 1
    setNumOfAdults(newAdults)
  }

  const incrementAdult = () => {
    const newAdults = numOfAdults + 1
    setNumOfAdults(newAdults)
  }

  const decrementChildren = () => {
    const newChildren = numOfChildren - 1
    setNumOfChildren(newChildren)
  }

  const incrementChildren = () => {
    const newChildren = numOfChildren + 1
    setNumOfChildren(newChildren)
  }

  const decrementRoom = () => {
    const newRoom = numOfRoom - 1
    setNumOfRoom(newRoom)
  }

  const incrementRoom = () => {
    const newRoom = numOfRoom + 1
    setNumOfRoom(newRoom)
  }


  const handleDateSelection = (item) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time for accurate date-only comparison

    const startDate = new Date(item.selection.startDate);
    const endDate = new Date(item.selection.endDate);

    console.log("Selected Dates:", item.selection); // Debugging
    console.log("Start Date:", startDate, "End Date:", endDate);

   
    // Always update the state before returning
    setDateRange([item.selection]);

    // Check if the start date is in the past
    if (startDate < today) {
      alert("You cannot select past dates! Please select a valid date.");
      return;
    }

    // If same start & end date, set 1 day
    if (startDate.getTime() === endDate.getTime()) {
      setNumOfDays(1);
      return;
    }

    // Calculate difference
    const differenceInMillisec = endDate - startDate;
    const days = differenceInMillisec / (1000 * 60 * 60 * 24);

    console.log("Calculated Days:", days); // Debugging

    setNumOfDays(days);
  };


  const handleRoomAvailability = async () => {


    const checkInDate = dateRange[0].startDate?.toISOString()
    const checkOutDate = dateRange[0].endDate?.toISOString()

    const userToken = sessionStorage.getItem("userToken")
    if (userToken && checkInDate && checkOutDate) {
      if (new Date(checkInDate).getTime() === new Date(checkOutDate).getTime()) {
        alert("Check-in and Check-out dates cannot be the same. Please select a valid date range.");
        setIsRoomsAvailable(false)
        return;
      }
      setIsLoading(true)
      const reqBody = { roomId: room?._id, propertyname:hotel?.propertyname, checkInDate, checkOutDate, numberOfRooms: numOfRoom }
      
      const reqHeader = {
        " Content-Type": "application/json",
        "Authorization": `Bearer ${userToken}`
      }
      try {

        const result = await checkRoomAvailabilityApi(reqBody, reqHeader)
        if (result.status == 200) {
          setNumofAvailableRooms(result.data)
          console.log(result.data);
          if (result.data >= numOfRoom) {
            setIsRoomsAvailable(true)
          }
        }
        else if(result.status==500){
          toast("Please Try again")
        }



      }
      catch (err) {
        console.log(err);

      }
      finally {
        setIsLoading(false)
      }
    }
    else {
      toast.warning("Select dates")
    }


  }

  const handleBookingRoom = async () => {
    const checkInDate = dateRange[0].startDate?.toISOString()
    const checkOutDate = dateRange[0].endDate?.toISOString()
   
    const userToken = sessionStorage.getItem("userToken")
    if(userToken){
      setIsBooking(true)
      const reqBody = {
        properytype:hotel.properytype,
        roomType:room.roomType,
        name: bookingUserData.name,
        email: bookingUserData.email,
        phone: bookingUserData.phone,
        request: bookingUserData.request,
        checkInDate, checkOutDate,
        numberOfRooms:numOfRoom,
        numberOfAdults:numOfAdults, 
        numberOfChildrens:numOfChildren,
        totalprice:(room.pricePerNight * numOfRoom * numOfDays)
      }
  
      const reqHeader = {
        " Content-Type": "application/json",
        "Authorization": `Bearer ${userToken}`
      }
      const params={hotelId:hotel?._id,roomId:room?._id}

      try{
        const result=await BookRoomApi(params,reqBody,reqHeader)
        if(result.status==200){
          try{

            const emailres=await bookingConfirmationEmailApi(reqBody,reqHeader)
            console.log(emailres);
            if(emailres.status==200){
              setIsBooking(false)
              toast.success("Room Booked Successfully")
              setIsBookingConfirmed(!isBookingConfirmed)


            }
            else{
              toast.warning("booking confirmed error sending email")
            }
          }
          catch(err){
            console.log(err);
            
          }
          
        }
        
      }
      catch(err){
        console.log(err);
        
      }
    }
    else{
      console.log("Unauthorised user");
      
    }
  
  }
  return (
    <div>
      <div className="container my-2">
        <div className="d-flex">
          <img style={{ height: "150px", width: "150px" }} src={`${serverURL}/uploads/${room.images[2]}`} alt="" />
          <div className="ms-3">
            <h5 className="text-light-dark">{hotel?.propertyname}</h5>
            <h6><span className="text-primary fs-4 fw-bold">₹{(room?.pricePerNight * numOfRoom * numOfDays)}</span></h6>
            <h6><strong>Room:</strong> {room?.roomType}</h6>
            <h6><strong>Checkin</strong> {hotel?.checkin} <strong>Checkout</strong>  {hotel?.checkout} </h6>

            <span> <span className="fw-bold">No payment needed</span><span>- pay a property</span></span>
          </div>
        </div>
        {/* Date Picker Input */}
        <div className="">
          <div className="my-3">
            <div className="row">
              <div className="col-md-6 position-relative">
                <h6>Check-in and Check-out Date</h6>
                <div
                  className="border p-2 d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  <i className="fa-solid fa-calendar me-2"></i>
                  <span>
                    {dateRange[0].startDate && dateRange[0].endDate
                      ? `${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`
                      : "Select Dates"}
                  </span>
                </div>

              </div>
              <div className="col-md-6 position-relative">
                <h6>Number of Guests</h6>
                <div className="d-flex ">
                  <span className="px-2 border d-flex align-items-center bg-light" style={{ height: "40px" }}>
                    <i className=" fa-solid fa-user"></i>
                  </span>
                  <div className="position-relative border w-100" onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer" }}>
                    <span className="position-absolute p-2">{numOfAdults} Adults {numOfChildren} Children {numOfRoom} Room</span>
                    <span className="position-absolute p-2 " style={{ right: "5px" }}>
                      <i className="fa-solid fa-angle-down"></i>
                    </span>
                  </div>
                  {isOpen && (

                    <ul className="p-md-3 shadow   position-absolute bg-white border" style={{ top: "65px", left: "45px", width: "85%" }}>

                      <li className="p-md-3 d-flex align-items-center justify-content-between">
                        <span>Adults</span>
                        <div className="border">
                          <button disabled={numOfAdults == 1} className="border-0 btn p-1 px-3 text-primary" onClick={decrementAdult}>-</button>
                          <input className="btn border-0" value={numOfAdults} style={{ width: "40px" }} readOnly type="text" name="" id="" />
                          <button disabled={numOfAdults == (numOfRoom * room.occupancy)} className="border-0 btn p-1 px-3  text-primary" onClick={incrementAdult}>+</button>
                        </div>
                      </li>
                      <li className="p-md-3">
                        <div className=" d-flex align-items-center justify-content-between">
                          <span>Children</span>
                          <div className="border">
                            <button disabled={numOfChildren == 0} className=" border-0 btn p-1 px-3 text-primary" onClick={decrementChildren}>-</button>
                            <input className="btn border-0" value={numOfChildren} style={{ width: "40px" }} readOnly type="text" name="" id="" />
                            <button className=" border-0 btn p-1 px-3 text-primary" onClick={incrementChildren} disabled={numOfChildren == (numOfRoom * 3)}>+</button>
                          </div>
                        </div>
                        <p className="py-0 my-0 text-primary" style={{ fontSize: "10px", textAlign: "end" }}>Only mention 3 years and above.</p>
                      </li>

                      <li className="p-md-3 d-flex align-items-center justify-content-between">
                        <span>Rooms</span>
                        <div className="border">
                          <button disabled={numOfRoom == 1} className=" border-0 btn p-1 px-3 text-primary" onClick={decrementRoom}>-</button>
                          <input className="btn border-0" value={numOfRoom} style={{ width: "40px" }} readOnly type="text" name="" id="" />
                          <button className="border-0 btn p-1 px-3 text-primary" onClick={incrementRoom}>+</button>
                        </div>
                      </li>
                    </ul>

                  )}
                </div>
              </div>
            </div>

            {/* Date Picker Component */}
            {showDatePicker && (
              <div
                className="position-absolute bg-white p-3 shadow rounded"
                style={{ zIndex: 1000 }}
              >
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => handleDateSelection(item)}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                />

              </div>
            )}
          </div>


        </div>
        <div className="d-flex  mt-4 justify-content-center">
          <button className=" gray-btn" onClick={handleRoomAvailability}>{
            isLoading ?
              <BeatLoader />
              : "Check Availability"}</button>
        </div>

        <div>
          {
            isRoomsAvailable&& numOfAvailableRooms !== undefined && numOfAvailableRooms !== null && numOfAvailableRooms >= numOfRoom && (
              <div className="my-4">
                <p className="fw-bold">Yay!! Rooms are available for this place, please fill your details.</p>
                <div className="row">
                  <div className="col-md-6">
                    <input value={bookingUserData.name} onChange={(e) => setBookingUserData({ ...bookingUserData, name: e.target.value })} type="text" className="form-control mb-3" placeholder="Name" />
                  </div>
                  <div className="col-md-6">
                    <input value={bookingUserData.phone} onChange={(e) => setBookingUserData({ ...bookingUserData, phone: e.target.value })} type="text" className="form-control mb-3" placeholder="Phone" />
                  </div>
                  <div className="col-md-6">
                    <input value={bookingUserData.email} onChange={(e) => setBookingUserData({ ...bookingUserData, email: e.target.value })} type="email" className="form-control mb-3" placeholder="Email" />
                  </div>
                  <div className="col-md-6">
                    <input value={bookingUserData.request} onChange={(e) => setBookingUserData({ ...bookingUserData, request: e.target.value })} type="text" className="form-control mb-3" placeholder="Special request (any)" />
                  </div>
                </div>
                <div className="d-flex justify-content-center"><button className="w-100 black-btn" onClick={handleBookingRoom}>
                  {isBooking?
                  <BeatLoader/>
                  :"Confirm Booking"}</button></div>
              </div>
            )
          }
          {numOfAvailableRooms !== undefined && numOfAvailableRooms !== null && numOfAvailableRooms < numOfRoom &&

            (
              <p className="fw-bold">Sorry, rooms are booked out at this place.</p>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
