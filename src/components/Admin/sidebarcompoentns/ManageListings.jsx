import React, { useContext, useEffect, useState } from 'react'
import AddHotel from '../AddHotel'
import { deleteProperyApi, deleteRoomApi, getAdminHotelsDetailsApi } from '../../../Services/allApi'
import serverURL from '../../../Services/serverURL'
import { addResponseContext, addRoomResponseContext, deleteResponseContext, editHotelResponseContext, editRoomResponseContext } from '../../../context/ContextApi'
import { toast } from 'react-toastify'
import EditHotel from '../EditHotel'
import EditRoom from '../EditRoom'
import Spinner from '../../Shared/Spinner'
import AddNewRoom from '../AddNewRoom'

function ManageListings() {

  const{addResponse,setAddResponse}=useContext(addResponseContext)
  const{deleteResponse,setDeleteResponse}=useContext(deleteResponseContext)
  const { editHotelResponse,setEditHotelResponse } = useContext(editHotelResponseContext)
  const {editRoomResponse,setEditRoomResponse}=useContext(editRoomResponseContext)
  const{addRoomResponse,setaddRoomResponse}=useContext(addRoomResponseContext)
  
  const [hotelsWithRoomData,setHotelsWithRoomsData]=useState([])
   console.log(hotelsWithRoomData);

const[isLoading,setIsloading]=useState(false)

useEffect(() => {
 getHotelsAllData()
}, [addResponse,deleteResponse,editHotelResponse,editRoomResponse,addRoomResponse])

const getHotelsAllData=async()=>{

  setIsloading(true)
  const token=sessionStorage.getItem("adminToken")
  
  if(token){
    const reqHeader={
      "Authorization":`Bearer ${token}`,
      "Content-Type":"application/json"
    }
      try {

        const result=await getAdminHotelsDetailsApi(reqHeader)

        if(result.status==200){
          setIsloading(false)

          setHotelsWithRoomsData(result.data)
        }
        else if (result.status==404){
          setIsloading(false)

          console.log(result.response.data);
          
        }
        
        
    }

    
    catch (error) {
      console.log(error);
      
    }
    
  }
}



const handleDeleteProperty = async (id) => {
  const token = sessionStorage.getItem("adminToken");

  if (token) {
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await deleteProperyApi(id, reqHeader);
      console.log(result);

      if (result.status === 200) {
        toast.success(`Property removed successfully`);

        // **Manually update state to remove the hotel**
        setHotelsWithRoomsData((prevHotels) =>
          prevHotels.filter((hotel) => hotel._id !== id)
        );

        // **Ensure re-fetching happens to stay in sync with backend**
        setDeleteResponse((prev) => !prev);
      }
    } catch (err) {
      console.log(err);
    }
  }
};


const handleRoomDelete=async(id)=>{
  const token=sessionStorage.getItem("adminToken")
  
  if(token){
    const reqHeader={
      "Authorization":`Bearer ${token}`
    }

    try{

      const result=await deleteRoomApi(id,reqHeader)
      console.log(result);
      if(result.status==200){
        toast.success(`Room removed successfully`)

        setDeleteResponse(result.data)
   
      }
  
      
    }
    catch(err){
      console.log(err);
      
    }

  }
}

const handleEditProperty=async(id)=>{

}
  return (
    <div>
       <div className='container'>
           <AddHotel/> 

           {/* hotels list here     */}

           <h5 className='mt-5 mb-4  '>Your listed properties ({hotelsWithRoomData.length})</h5>
     { 
     isLoading?<Spinner></Spinner>:
     hotelsWithRoomData?.length>0? 
     hotelsWithRoomData.map(hotel=>(
      <div className='shadow  mb-4 bg-light pb-3 p-5'>
        <div className='d-flex justify-content-between'>
          <h3>{hotel.propertyname}</h3>
          <h5 className={`fw-bold  ${hotel.status=="pending" && 'text-warning' } ${hotel.status=="approved" && 'text-success' } ${hotel.status=="rejected" && 'text-danger'} `} >{hotel?.status}</h5>
        </div>
     <div className="row my-3">
       <div className='col-md-6 row g-1'>
            <div className="col-md-6  " style={{position:"relative"}}>
              <img className='firstImg mt-3 mt-md-0' src={`${serverURL}/uploads/${hotel?.images[4]}`} style={{width:"100%",height:"300px"}} alt="" />
            </div> 
            <div className="col-md-3 gap-1 d-flex flex-column ">
            <img className='mt-3  mt-md-0' src={`${serverURL}/uploads/${hotel?.images[3]}`} style={{width:"100%",height:"148px"}} alt="" />
            <img className='' src={`${serverURL}/uploads/${hotel?.images[2]}`} style={{width:"100%",height:"148px"}} alt="" />
              
            </div>
            <div className="col-md-3 gap-1 d-flex flex-column ">
            <img className="rightTop mt-3 mt-md-0" src={`${serverURL}/uploads/${hotel?.images[1]}`} style={{width:"100%",height:"148px"}} alt="" />
            <img className="rightBottom " src={`${serverURL}/uploads/${hotel?.images[0]}`} style={{width:"100%",height:"148px"}} alt="" />
            </div>
       </div>
<div className='col-md-6'>
        {hotel.amenities.map(amenity => (
  <span style={{fontSize:"15px"}}  className='fw-bold mb-2 me-3 p-1' key={amenity}> <i className='fa-solid fa-check text-success'></i> {amenity}</span>
  
  ))}
  <p style={{fontSize:"15px"}} >{hotel?.description}</p>
</div>
        </div>

<div className="p-1 ">
<h4>Rooms</h4>

{hotel?.rooms.length>0?
hotel?.rooms?.map(room=>(
<div className='border rounded mb-3  p-3'>
  <h4>{room?.roomType} Room</h4>
 <h6> ({room.numberOfRooms} Rooms)</h6>

 <h6 className='text-danger'> ₹ {room?.pricePerNight} Per Night</h6>
<div className='row'>
  <div className='col-md-7'>
     <div className="row g-1 mb-3">
              <div className="col-md-8 " style={{position:"relative"}}>
                <img className='firstImg mt-md-0' src={`${serverURL}/uploads/${room?.images[2]}`} style={{width:"100%",height:"300px"}} alt="" />
              </div> 
           
              <div className="col-md-4 gap-1 d-flex flex-column ">
              <img className="rightTop  mt-md-0" src={`${serverURL}/uploads/${room?.images[1]}`} style={{width:"100%",height:"148px"}} alt="" />
              <img className="rightBottom " src={`${serverURL}/uploads/${room?.images[0]}`} style={{width:"100%",height:"148px"}} alt="" />
              </div>
            </div>
  </div>
  <div className='col-md-5'>
     <p style={{fontSize:"15px"}} >
       {room.description}
     </p>
     {room.amenities.map(amenity => (
  <span style={{fontSize:"15px"}} className='fw-bold mb-2 me-3 p-1' key={amenity}> <i className='fa-solid fa-check text-success'></i> {amenity}</span>

    
    ))}
    <div className="d-flex justify-content-end">
    <button className='btn btn-danger' onClick={()=>handleRoomDelete(room?._id)}>Delete</button>
    <button className='btn btn-light ms-3'><EditRoom rId={room?._id}></EditRoom></button>
    
    </div>
  </div>
</div>

</div>
))

:
<p>No room data added</p>
}

</div>
<div className='d-flex justify-content-between'>
  <div className="d-flex justify-content-start">
  <button className='btn btn-danger' onClick={()=>handleDeleteProperty(hotel?._id)} >Delete Property </button>
  <EditHotel hId={hotel?._id}></EditHotel>
  </div>
  <AddNewRoom hId={hotel?._id}></AddNewRoom>

</div>
</div>
     ))
    :
       <div className='text-center'>
        <p className='text-center  fs-2  my-5 py-5'><i className='fa-solid fa-x text-danger'></i> No property added yet ! </p>
       </div>
       }
   
           
       </div>
    </div>
  )
}

export default ManageListings