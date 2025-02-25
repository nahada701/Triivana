import React from 'react'
import { Link } from 'react-router-dom'

function Bookings() {
  return (
    <div className='container'>
      <div className="d-flex justify-content-between py-3">
        <h3>Upcoming Bookings</h3>
        <button className='black-btn'><Link className='text-light text-decoration-none' to={'/dashboard/bookings/history'}>View booking history</Link></button>
      </div>
      <table className="table">
  <thead>
    <tr>
      <th>SlNo</th>
      <th>Guest</th>
      <th>Property</th>
      <th>Room</th>
      <th>Check-in</th>
      <th>Check-out</th>
      <th>Amount</th>
      <th>Payment made</th>
      <th>Payment pedning</th>
      <th>Status</th>

      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>#12345</td>
      <td>John Doe</td>
      <td>Beach House</td>
      <td>Deluxe</td>
      <td>Mar 10, 2025</td>
      <td>Mar 15, 2025</td>
      <td>$500</td>
      <td>$500</td>
      <td>$0</td>
      <td className='text-warning'>Pending</td>
  

    
      <td>
        <button className="btn btn-primary btn-sm">View</button>
      </td>
    </tr>
    <tr>
      <td>#12345</td>
      <td>John Doe</td>
      <td>Beach House</td>
      <td>Deluxe</td>
      <td>Mar 10, 2025</td>
      <td>Mar 15, 2025</td>
      <td>$500</td>
      <td>$500</td>
      <td>$0</td>
      <td className='text-warning'>Pending</td>
  

    
      <td>
        <button className="btn btn-primary btn-sm">View</button>
      </td>
    </tr>
    <tr>
      <td>#12345</td>
      <td>John Doe</td>
      <td>Beach House</td>
      <td>Deluxe</td>
      <td>Mar 10, 2025</td>
      <td>Mar 15, 2025</td>
      <td>$500</td>
      <td>$500</td>
      <td>$0</td>
      <td className='text-warning'>Pending</td>
  

    
      <td>
        <button className="btn btn-primary btn-sm">View</button>
      </td>
    </tr>
    <tr>
      <td>#12345</td>
      <td>John Doe</td>
      <td>Beach House</td>
      <td>Deluxe</td>
      <td>Mar 10, 2025</td>
      <td>Mar 15, 2025</td>
      <td>$500</td>
      <td>$500</td>
      <td>$0</td>
      <td className='text-warning'>Pending</td>
  

    
      <td>
        <button className="btn btn-primary btn-sm">View</button>
      </td>
    </tr>
    <tr>
      <td>#12345</td>
      <td>John Doe</td>
      <td>Beach House</td>
      <td>Deluxe</td>
      <td>Mar 10, 2025</td>
      <td>Mar 15, 2025</td>
      <td>$500</td>
      <td>$500</td>
      <td>$0</td>
      <td className='text-warning'>Pending</td>
  

    
      <td>
        <button className="btn btn-primary btn-sm">View</button>
      </td>
    </tr>
  </tbody>
</table>

    </div>
  )
}

export default Bookings