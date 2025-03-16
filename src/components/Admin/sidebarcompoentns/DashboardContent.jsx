import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPropertyDashboardDataApi } from '../../../Services/allApi'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import BeatLoader from '../../Shared/BeatLoader'


function DashboardContent() {

  const [upcomingBookingCount, setUpcomingBookingCount] = useState()
  const [lastThreeDaysReviews, setLastThreeDaysReviews] = useState()
  const [lastMonthEarnings, setLastMonthEarnings] = useState()
  const [allTimeEarnings, setAllTimeEarnings] = useState()
  const [availableRooms, setAvailableRooms] = useState()
  const [cardDataISLoading, setCardDataIsLoading] = useState(false)

  useEffect(() => {
    getPropertyDashboardData()
  }, [])
  const getPropertyDashboardData = async () => {
    setCardDataIsLoading(true)
    const token = sessionStorage.getItem("adminToken")

    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
      try {
        const result = await getPropertyDashboardDataApi(reqHeader)
        if(result.status==200){
          setAllTimeEarnings(result.data.allTimeEarnings)
          setLastMonthEarnings(result.data.lastMonthEarnings)
          setLastThreeDaysReviews(result.data.lastThreeDaysReviewsCount)
          setUpcomingBookingCount(result.data.upcomingBookingCount)
          setAvailableRooms(result.data.availableRooms)
          setCardDataIsLoading(false)
        }
      }
      catch (err) {
        console.log(err);

      }
    }

    else {
      console.log("property owner is not loged in");

    }
  }

  return (
    <div>
      <div className="container">
      <div className="container mt-4">
  <div className="row g-3"> {/* g-3 adds spacing between grid items */}
    <div className="col-12 col-sm-6 col-lg-3">
      <div className="cards text-light p-3 text-center">
        <h4>New Bookings</h4>
        {cardDataISLoading? <BeatLoader /> :<h4>  { upcomingBookingCount ||0}</h4>}
        <Link className="text-light" style={{ textDecoration: "none" }} to="/dashboard/bookings">See all bookings</Link>
      </div>
    </div>

    <div className="col-12 col-sm-6 col-lg-3">
      <div className="cards text-light p-3 text-center">
        <h4>New Reviews</h4>
        {cardDataISLoading? <BeatLoader /> :<h4>  { lastThreeDaysReviews ||0}</h4>}
        <Link className="text-light" style={{ textDecoration: "none" }} to="/dashboard/reviews">See all reviews</Link>
      </div>
    </div>

    <div className="col-12 col-sm-6 col-lg-3">
      <div className="cards text-light p-3 text-center">
        <h4>Total Earnings</h4>
        {cardDataISLoading? <BeatLoader /> :<h4>  { allTimeEarnings ||0}</h4>}

        <Link className="text-light" style={{ textDecoration: "none" }} to="/dashboard/earnings">See details</Link>
      </div>
    </div>

    <div className="col-12 col-sm-6 col-lg-3">
      <div className="cards text-light p-3 text-center">
        <h4>30 day Earnings</h4>
       {cardDataISLoading? <BeatLoader /> :<h4>  { lastMonthEarnings ||0}</h4>}
        <Link className="text-light" style={{ textDecoration: "none" }} to="/dashboard/earnings">See details</Link>
      </div>
    </div>
  </div>
</div>

        <div className="row">
          <div className="col-md-7 d-flex justify-content-center">
          <div className="card bg-dark-blue text-light mt-5 p-5" style={{ width: "93%" }}>
  {availableRooms && availableRooms.length > 0 ? (
    availableRooms.map((hotelData, index) => (
      <div key={index} className="text-light">
        <h4 className="my-1 text-light">{hotelData?.hotel}</h4>
        <hr />
        {Object.entries(hotelData.rooms).map(([roomType, count]) => (
          <div key={roomType} className="d-flex text-light justify-content-between">
            <h6>{roomType}</h6>
            <h6>{count} rooms left</h6>
          </div>
        ))}
      </div>
    ))
  ) : (
   <div className='d-flex w-100 justify-content-center h-100 align-items-center'>
     <h4 className="text-center text-light">No hotels added yet</h4>
   </div>
  )}
</div>

          </div>
          <div className="col-md-5 d-flex justify-content-center mt-5">
            <Calendar
             tileClassName={({ date, view }) =>
              view === 'month' && date.toDateString() === new Date().toDateString()
                ? 'custom-today'
                : null
            }
            ></Calendar>
          </div>
        </div>
      </div>


    </div>
  )
}

export default DashboardContent