import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import serverURL from '../../Services/serverURL'
import UserNavbar from '../../components/User/UserNavbar'
import { deleteUserSavedPropetyApi, getUserSavedPropetyApi } from '../../Services/allApi'

function SavedProperties() {

  const [allSavedProperties,setAllSavedProperties]=useState()


  
  const navigate=useNavigate()
  useEffect(() => {
   getSavedProperties()
  }, [])

  const getSavedProperties=async()=>{
    const userToken=sessionStorage.getItem("userToken")
    if(userToken){
      const reqHeader={
        "Authorization":`Bearer ${userToken}`,
        "Content-Type":"application/json"
      }
      try {
        const result=await getUserSavedPropetyApi(reqHeader)
        if(result.status=200){
          setAllSavedProperties(result.data[0].savedProperties)
        }
        
        
      } catch (error) {
        console.log(error);
        
      }
    }
    else{
      navigate("/")
    }
  }
  
  const handleRemoveHotel=async(hotelId)=>{
    const userToken=sessionStorage.getItem("userToken")
    if(userToken){
      const reqHeader={
        "Authorization":`Bearer ${userToken}`,
        "Content-Type":"application/json"
      }

      try {
        const result=await deleteUserSavedPropetyApi(hotelId,reqHeader)
        console.log(result);
        if(result.status==200){
          getSavedProperties()
        }
        
        
      } catch (error) {
        console.log(error);
        
      }
    }

  }
  return (
    <div>
      <div className="bg-dark">
        <UserNavbar/>
      </div>
        <div className="mt-4 mb-5 container">    
          <h2 className="mb-4">Saved properties</h2>
      <div className='mt-2 mb-5'>
     <div className='row'>
         {allSavedProperties?.length>0?
         allSavedProperties?.map(pro=>(

          <div className='col-md-3'>
              <div className='d-flex flex-column mt-2 '  >
                <img  style={{height:"200px"}} onClick={()=>navigate(`/hoteldetails/${pro?._id}`)} className={'hotelImg rounded'} src={`${serverURL}/uploads/${pro.images[0]}`} alt="" />
                <div className='d-flex justify-content-between align-items-center'>
                  <h6 className='text-dark mt-3 mb-2' >{pro?.propertyname}</h6>
                  <button className='btn' onClick={()=>handleRemoveHotel(pro?._id)}><i class="fa-solid fa-heart-circle-minus text-danger"></i></button>
                  </div>
                 <span style={{fontSize:"15px"}} ><i   className='fa-solid fa-location-dot'></i> {pro?.place}</span>
                <span  style={{fontSize:"15px"}} ><i  className='fa-solid fa-star'></i>  4.9 (2.5k Reviews) </span>
                <h5 className='mt-1 mb-0' >₹ {pro?.minPrice} </h5>
                <span style={{fontSize:"10px"}}>Includes all taxes & fee</span>
              </div>
          </div>
         ))
           :<h3>No property saved yet!!</h3>
          }
     </div>
      </div>
        </div>
    </div>
  )
}

export default SavedProperties