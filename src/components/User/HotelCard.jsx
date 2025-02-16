import { colors } from '@mui/material'
import React from 'react'
import serverURL from '../../Services/ServerURL'
import { useNavigate } from 'react-router-dom'

function HotelCard({hotel}) {
  const navigate=useNavigate()
  return (
    <div>
      <div className='d-flex flex-column mt-2 ' onClick={()=>navigate(`/hoteldetails/${hotel?._id}`)} >
        <img className={'hotelImg rounded'} src={`${serverURL}/uploads/${hotel?.images[0]}`} alt="" />
        <h6 className='text-dark mt-3 mb-2' >{hotel?.propertyname}</h6>
         <span style={{fontSize:"15px"}} ><i   className='fa-solid fa-location-dot'></i> {hotel?.address}</span>
        <span  style={{fontSize:"15px"}} ><i  className='fa-solid fa-star'></i>  4.9 (2.5k Reviews) </span>
        <h5 className='mt-1 mb-0' >₹ {hotel?.minPrice} </h5>
        <span style={{fontSize:"10px"}}>Includes all taxes & fee</span>
      </div>
    </div>
  )
}

export default HotelCard