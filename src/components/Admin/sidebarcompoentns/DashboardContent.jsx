import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPropertyDashboardDataApi } from '../../../Services/allApi'
import { Spinner } from 'react-bootstrap'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


function DashboardContent() {

  const [upcomingBookingCount, setUpcomingBookingCount] = useState()
  const [lastThreeDaysReviews, setLastThreeDaysReviews] = useState()
  const [lastMonthEarnings, setLastMonthEarnings] = useState()
  const [allTimeEarnings, setAllTimeEarnings] = useState()
  const [availableRooms, setAvailableRooms] = useState()
  useEffect(() => {
    getPropertyDashboardData()
  }, [])
  const getPropertyDashboardData = async () => {
    const token = sessionStorage.getItem("adminToken")

    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
      try {
        const result = await getPropertyDashboardDataApi(reqHeader)
        setAllTimeEarnings(result.data.allTimeEarnings)
        setLastMonthEarnings(result.data.lastMonthEarnings)
        setLastThreeDaysReviews(result.data.lastThreeDaysReviewsCount)
        setUpcomingBookingCount(result.data.upcomingBookingCount)
        setAvailableRooms(result.data.availableRooms)
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
        <div className="d-flex align-items-center gap-5 flex-wrap justify-content-center">
          <div className="cards text-light p-3  text-center  ">
            <h4>New Bookings</h4>
            <h4>{upcomingBookingCount ? upcomingBookingCount : <Spinner></Spinner>}</h4>
            <Link className='text-light ' style={{ textDecoration: "none" }} to={'/dashboard/bookings'}>See all bookings</Link>
          </div>
          <div className="cards text-light p-3  text-center  ">
            <h4>New Reviews</h4>
            <h4>{lastThreeDaysReviews ? lastThreeDaysReviews : <Spinner></Spinner>}</h4>
            <Link className='text-light ' style={{ textDecoration: "none" }} to={'/dashboard/reviews'}>See all reviews</Link>

          </div>
          <div className="cards text-light p-3  text-center  ">
            <h4>Total Earnings</h4>
            <h4>{allTimeEarnings ? allTimeEarnings : <Spinner></Spinner>}</h4>
            <Link className='text-light ' style={{ textDecoration: "none" }} to={'/dashboard/earnings'}>See details</Link>

          </div>
          <div className="cards text-light p-3  text-center  ">
            <h4>Last month Earnings</h4>
            <h4>{lastMonthEarnings ? lastMonthEarnings : <Spinner></Spinner>}</h4>
            <Link className='text-light ' style={{ textDecoration: "none" }} to={'/dashboard/earnings'}>See details</Link>

          </div>
        </div>
        <div className="row">
          <div className="col-md-7 d-flex justify-content-end">
            <div className="card bg-dark text-light mt-5 p-5  " style={{ width: "93%" }}>
              {
                availableRooms ?
                  availableRooms.map((hotelData, index) => (

                    <div key={index} className='text-light'>
                      <h4 className='my-1 text-light'>{hotelData?.hotel}</h4>
                      <hr />
                      {Object.entries(hotelData.rooms).map(([roomType, count]) => (
                        <div key={roomType} className="d-flex text-light justify-content-between">
                          <h6> {roomType}</h6>
                          <h6>{count} rooms left</h6>
                        </div>
                      ))}

                    </div>
                  ))
                  :
                  <div className='d-flex w-100 h-100 justify-content-center align-items-center'>

                    <h4 className='text-center text-light'>No available rooms</h4>
                  </div>
              }
            </div>
          </div>
          <div className="col-md-5 d-flex justify-content-center mt-5">
            <Calendar
            ></Calendar>
          </div>
        </div>
      </div>


    </div>
  )
}

export default DashboardContent