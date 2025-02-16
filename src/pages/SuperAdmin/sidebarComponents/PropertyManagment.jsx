import React from 'react'
import { Link } from 'react-router-dom'

function PropertyManagment() {
  return (
    <div>
         <div className='' >
                <h3 className='text-center '>New Property Requests</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Owner</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>Photo</th>
                            <th>view all details</th>
                            <th>Aproval Status</th>



                        </tr>
                    </thead>
                    <tbody>
                       <tr>
                       <td>1</td>
                            <td>Ocean retreat</td>
                            <td>123 Beach road Goa</td>
                            <td>Amal shaji</td>
                            <td>oceanretreate@contact.com</td>
                            <td>90403989</td>
                            <td>
                                <img style={{width:"100px"}} src="https://tse1.mm.bing.net/th?id=OIP.FtudhIBH-HYhxMpS4TU-sAHaE8&pid=Api" alt="" />
                            </td>
                            <td><Link>view all details</Link></td>
                            <td>
                            <div className='d-flex gap-2 flex-wrap'>
                                    <button className='btn btn-success '><i className='fa-solid fa-check text-light' ></i></button>
                                    <button className='btn btn-danger'><i className='fa-solid fa-xmark text-light'></i></button>

                                </div>
                            </td>
                       </tr>
                       
                    </tbody>

                </table>
            </div>

            {/* added hotels list */}
         <h3 className='text-center mt-3'>Added properties</h3>
         <div className="row">
            <div className="col-lg-3 col-sm 6">
            {/* <div className='d-flex flex-column mt-2 ' onClick={()=>navigate(`/hoteldetails/${hotel?._id}`)} >
        <img className={'hotelImg rounded'} src={`${serverURL}/uploads/${hotel?.images[0]}`} alt="" />
        <h6 className='text-dark mt-3 mb-2' >{hotel?.propertyname}</h6>
         <span style={{fontSize:"15px"}} ><i   className='fa-solid fa-location-dot'></i> {hotel?.address}</span>
        <span  style={{fontSize:"15px"}} ><i  className='fa-solid fa-star'></i>  4.9 (2.5k Reviews) </span>
        <h5 className='mt-1 mb-0' >₹ {hotel?.minPrice} </h5>
        <span style={{fontSize:"10px"}}>Includes all taxes & fee</span>
      </div> */}
          <div className='d-flex flex-column mt-2 '  >
        <img className={'hotelImg rounded'} src="https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?cs=srgb&dl=architecture-building-chairs-2034335.jpg&fm=jpg" alt="" />
        <h6 className='text-dark mt-3 mb-2' >Ocean retreat</h6>
         <span style={{fontSize:"15px"}} ><i   className='fa-solid fa-location-dot'></i> Palayam kozhikode</span>
        <span  style={{fontSize:"15px"}} ><i  className='fa-solid fa-star'></i>  4.9 (2.5k Reviews) </span>
        <h5 className='mt-1 mb-0' >₹ 8999 </h5>
      </div>
            </div>
         </div>

    </div>
  )
}

export default PropertyManagment