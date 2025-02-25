import React from 'react'
import { Link } from 'react-router-dom'
import serverURL from '../../Services/ServerURL'
import UserNavbar from '../../components/User/UserNavbar'

function SavedProperties() {
  return (
    <div>
      <div className="bg-dark">
        <UserNavbar/>
      </div>
        <div className="mt-4 mb-5 container">    
          <h2 className="mb-4">Saved properties</h2>
      <div className='mt-2 mb-5'>
     <div className='row'>
          <div className='col-md-3'>
              <div className='d-flex flex-column mt-2 '  >
                <img  style={{height:"200px"}} className={'hotelImg rounded'} src={`${serverURL}/uploads/image-1738645629787-.jpg`} alt="" />
                <div className='d-flex justify-content-between align-items-center'>
                  <h6 className='text-dark mt-3 mb-2' >Hotel ocean retreat</h6>
                  <button className='btn'><i class="fa-solid fa-heart-circle-minus text-danger"></i></button>
                  </div>
                 <span style={{fontSize:"15px"}} ><i   className='fa-solid fa-location-dot'></i> Kozhikode Near baby memorial hospital</span>
                <span  style={{fontSize:"15px"}} ><i  className='fa-solid fa-star'></i>  4.9 (2.5k Reviews) </span>
                <h5 className='mt-1 mb-0' >₹ 1666 </h5>
                <span style={{fontSize:"10px"}}>Includes all taxes & fee</span>
              </div>
          </div>
     </div>
      </div>
        </div>
    </div>
  )
}

export default SavedProperties