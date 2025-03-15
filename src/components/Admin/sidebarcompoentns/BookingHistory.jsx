import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { bookingHistoryApi } from '../../../Services/allApi'

function BookingHistory() {
    const [bookingHistory,setBookingHistory]=useState()
    const [filteredBookingHistory,setFilteredBookingHistory]=useState()
    const [guestName,setGuestName]=useState()


    useEffect(() => {
     getBookingHistory()
    }, [])


    
    const getBookingHistory=async()=>{
        const token = sessionStorage.getItem("adminToken")
        if (token) {
            const reqHeader = {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
            const result=await bookingHistoryApi(reqHeader)
            console.log(result);
            if(result.status==200){
                setBookingHistory(result.data)
                setFilteredBookingHistory(result.data)

            }
        }
    }

    const handleSearch=(e)=>{
      
        const filteredBooking=bookingHistory?.filter((booking)=>{
          return  booking?.name?.toLowerCase().includes((e.target.value).toLowerCase())
        })
        setFilteredBookingHistory(filteredBooking)
    }
    
  return (
    <div>
        <div className='container'>
            <Link className='text-dark text-decoration-none' to={'/dashboard/bookings'}> <i className='fa-solid fa-arrow-left'></i> Back</Link>
            <div className='d-flex my-4 justify-content-between'>
                <h3>Booking history</h3>
                <input onChange={(e)=>handleSearch(e)} type="text"  className='w-25 form-control' placeholder='Search By Guest Name' name="" id="" />
                </div>
          {filteredBookingHistory?.length>0?
            <table className='table'>
                <thead>
                    <tr>
                        <th>Sl no</th>
                        <th>Property</th>
                        <th>Room</th>
                        <th>Guests</th>
                        <th>Check in</th>
                        <th>Check out</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Payment</th>
    
    
                    </tr>           
                </thead>
                <tbody>
               { filteredBookingHistory?.map((booking,index)=>(
                <tr>
                        <td>{index+1}</td>
                        <td>{booking?.propertyname}</td>
                        <td>{booking?.roomType}</td>
                        <td>{booking?.name}</td>
                        <td>{booking?.checkInDate.split("T")[0]}</td>
                        <td>{booking?.checkOutDate.split("T")[0]}</td>
                        <td>{booking?.phone}</td>
                        <td className={`${booking?.status=="confirmed"?"text-success":"text-danger"} fw-bold`} >{booking?.status=="confirmed"?"CheckedOut":"Cancelled"}</td>
                        <td className={`fw-bold ${booking?.paymentMade === 0 ? "text-danger" : booking?.paymentMade >= booking?.totalprice ? "text-success" : "text-warning"}`}>
  {booking?.paymentMade === 0 
    ? "NA" 
    : booking?.paymentMade >= booking?.totalprice 
      ? "Paid" 
      : `Pending: ₹${booking?.totalprice - booking?.paymentMade}`}
</td>

    
                    </tr> 
               )) }   
                </tbody>
            </table>
            :
            <h4 className='text-center my-5 py-5'>No Customer found</h4>

            }
        </div>
    </div>
  )
}

export default BookingHistory