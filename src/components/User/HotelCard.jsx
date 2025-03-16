import { accordionActionsClasses, colors } from '@mui/material'
import React from 'react'
import serverURL from '../../Services/serverURL'
import { useNavigate } from 'react-router-dom'

function HotelCard({hotel}) {
  const navigate=useNavigate()
  return (
    <div>
      <div className='d-flex flex-column mt-2 ' onClick={()=>navigate(`/hoteldetails/${hotel?._id}`)} >
        <img className={'hotelImg rounded'} src={`${serverURL}/uploads/${hotel?.images[4]}`} alt="" />
        <h6 className='text-dark mt-3 mb-2' >{hotel?.propertyname}</h6>
         <span style={{fontSize:"15px"}} ><i   className='fa-solid fa-locatio n-dot'></i> {hotel?.place}</span>
        <span  style={{fontSize:"15px"}} ><i  className='fa-solid fa-star'></i> {Math.floor(hotel?.reviews.reduce((acc,rev)=>acc+rev.rating,0)/hotel.reviews.length)||0} ({hotel?.reviews.length}) </span>
        <h5 className='mt-1 mb-0' >₹ {hotel?.minPrice} </h5>
        <span style={{fontSize:"10px"}}>Includes all taxes & fee</span>
      </div>
    </div>
  )
}

export default HotelCard