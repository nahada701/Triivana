import React, { useContext, useEffect, useState } from 'react'
import AddHotel from '../AddHotel'
import { deleteProperyApi, deleteRoomApi, getAdminHotelsDetailsApi } from '../../../Services/allApi'
import serverURL from '../../../Services/ServerURL'
import { addResponseContext, deleteResponseContext } from '../../../context/ContextApi'
import { toast } from 'react-toastify'

function ManageListings() {

  const{addResponse,setAddResponse}=useContext(addResponseContext)
  const{deleteResponse,setDeleteResponse}=useContext(deleteResponseContext)
  
  
  const [hotelsWithRoomData,setHotelsWithRoomsData]=useState([])
console.log(hotelsWithRoomData);

useEffect(() => {
 getHotelsAllData()
}, [addResponse,deleteResponse])

const getHotelsAllData=async()=>{

  
  const token=sessionStorage.getItem("adminToken")
  
  if(token){
    const reqHeader={
      "Authorization":`Bearer ${token}`
    }
      try {

        const result=await getAdminHotelsDetailsApi(reqHeader)

        if(result.status==200){
          setHotelsWithRoomsData(result.data)
        }
        else if (result.status==404){
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
  return (
    <div>
       <div className='container'>
           <AddHotel/> 

           {/* hotels list here     */}

           <h4 className='mt-5  '>Your listed properties</h4>
     { hotelsWithRoomData?.length>0? 
     hotelsWithRoomData.map(hotel=>(
      <div className='shadow mb-4 bg-light pb-3 p-3'>
      <div className=' p-2 row'>
       <div className="col-lg-6">
       <img className='mb-2' style={{width:"100%"}} src={`${serverURL}/uploads/${hotel.images[0]}`}
       alt="" />
     

       </div>
       <div className="col-lg-3 gap-2 d-flex flex-column">
       <img style={{width:"100%"}} className='mb-2' src={`${serverURL}/uploads/${hotel.images[1]}`}alt="" />
       <img style={{width:"100%"}} className='mb-2' src={`${serverURL}/uploads/${hotel.images[2]}`} alt="" />

       </div>
       <div className="col-lg-3 gap-2 d-flex flex-column">
       <img style={{width:"100%"}} className='mb-2' src={`${serverURL}/uploads/${hotel.images[3]}`} alt="" />
       <img style={{width:"100%"}} className='mb-2' src={`${serverURL}/uploads/${hotel.images[4]}`} alt="" />

       </div>
       <h4>{hotel.propertyname}</h4>
      <div className='d-flex flex-wrap justify-content-between'> 
       <h6>{hotel.address}</h6>
       <h6>{hotel.phone}</h6>
       <h6>{hotel.email}</h6>

       </div>
       <p>{hotel.description}</p>

      </div>
      {hotel.amenities.map(amenity => (
<button className='btn btn-dark ms-3 p-1' key={amenity}>{amenity}</button>
))}

<div className="p-4 ">
<h4>Rooms</h4>

{hotel.rooms.length>0?
hotel.rooms.map(room=>(
<div className='border rounded mb-3  p-3'>
  <h4>{room.roomType} Room</h4>
 <h6> ({room.numberOfRooms} Rooms)</h6>

 <h6 className='text-danger'> ₹ {room.pricePerNight} Per Night</h6>
 <div className="row pb-3">
   <div className="col-lg-4">
   <img style={{width:"100%"}} className='mb-2' src={`${serverURL}/uploads/${room.images[0]}`} alt="" />
   </div>
   <div className="col-lg-4">
   <img style={{width:"100%"}} className='mb-2' src={`${serverURL}/uploads/${room.images[1]}`} alt="" />
   </div>
   <div className="col-lg-4">
   <img style={{width:"100%"}} className='mb-2' src={`${serverURL}/uploads/${room.images[2]}`} alt="" />
   </div>
   
 </div>
 <p>
   {room.description}
 </p>
 {room.amenities.map(amenity => (
<button className='btn btn-light me-3 px-2 py-1' key={amenity}>{amenity}</button>

))}
<div className="d-flex justify-content-end">
<button className='btn btn-danger' onClick={()=>handleRoomDelete(room?._id)}>Delete</button>
<button className='btn btn-light ms-3'>Edit</button>

</div>

</div>
))

:
<p>No room data added</p>
}

</div>
<div className="d-flex justify-content-start">
<button className='btn btn-danger' onClick={()=>handleDeleteProperty(hotel?._id)} >Delete Property </button>
<button className='btn btn-light ms-3'>Edit Property</button>

</div>
</div>
     ))
    :
       <p>No property added yet</p>
       }
   
           
       </div>
    </div>
  )
}

export default ManageListings