import { colors } from '@mui/material'
import React from 'react'

function HotelCard() {
  return (
    <div>
      <div className='d-flex flex-column mt-2 ' >
        <img className='hotelImg' style={{width:"100%" ,height:"250px",borderRadius:"10px"}} src="https://r1imghtlak.mmtcdn.com/19e6ce9a84fb11ec9db20a58a9feac02.jpg?&output-quality=75&downsize=520:350&crop=520:350;2,0&output-format=jpg&downsize=480:336&crop=480:336" alt="" />
        <h6 className='text-dark mt-3 mb-2' >Six Senses Fort Barwara</h6>
         <span style={{fontSize:"15px"}} ><i   className='fa-solid fa-location-dot'></i> Barwara,Rajastan</span>
        <span  style={{fontSize:"15px"}} ><i  className='fa-solid fa-star'></i>  4.9 (2.5k Reviews) </span>
        <h5 className='mt-1 mb-0' >₹ 92,137 </h5>
        <span style={{fontSize:"10px"}}>Includes all taxes & fee</span>
      </div>
    </div>
  )
}

export default HotelCard