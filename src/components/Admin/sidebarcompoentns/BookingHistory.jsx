import React from 'react'
import { Link } from 'react-router-dom'

function BookingHistory() {
  return (
    <div>
        <div className='container'>
            <Link className='text-dark text-decoration-none' to={'/dashboard/bookings'}> <i className='fa-solid fa-arrow-left'></i> Back</Link>
            <div className='d-flex my-4 justify-content-between'>
                <h3>Booking history</h3>
                <input type="text"  className='w-25 form-control' placeholder='Search By Guest Name' name="" id="" />
                </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Sl no</th>
                        <th>Property</th>
                        <th>Room</th>
                        <th>Guests</th>
                        <th>Check in</th>
                        <th>Check out</th>
                        <th>Remark</th>
                        <th>Status</th>
                        <th>Payment</th>
    
    
                    </tr>           
                </thead>
                <tbody>
                <tr>
                        <td>1</td>
                        <td>Hotl amax</td>
                        <td>Double</td>
                        <td>Amin ahashan, Nahada</td>
                        <td>10/10/2024</td>
                        <td>11/10/2024</td>
                        <td>Made fractures paid $40</td>
                        <td className="text-success fw-bold">Checkout</td>
                        <td className="text-success fw-bold">Fully paid</td>
    
    
                    </tr>    
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default BookingHistory