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
      <div className='shadow  mb-4 bg-light pb-3 p-3'>
        <button className={`btn ${hotel.status=="pending" && 'btn-warning' } ${hotel.status=="approved" && 'btn-success' } ${hotel.status=="rejected" && 'btn-danger'} `} >{hotel?.status}</button>
     <div className="row my-3">
          <div className="col-md-6 " style={{position:"relative"}}>
            <img className='firstImg mt-3 mt-md-0' src={`${serverURL}/uploads/${hotel?.images[0]}`} style={{width:"100%"}} alt="" />
          </div> 
          <div className="col-md-3 gap-3 d-flex flex-column ">
          <img className='mt-3 mt-md-0' src={`${serverURL}/uploads/${hotel?.images[1]}`} style={{width:"100%",height:"192px"}} alt="" />
          <img className='' src={`${serverURL}/uploads/${hotel?.images[2]}`} style={{width:"100%",height:"192px"}} alt="" />
            
          </div>
          <div className="col-md-3 gap-3 d-flex flex-column ">
          <img className="rightTop mt-3 mt-md-0" src={`${serverURL}/uploads/${hotel?.images[3]}`} style={{width:"100%",height:"192px"}} alt="" />
          <img className="rightBottom " src={`${serverURL}/uploads/${hotel?.images[4]}`} style={{width:"100%",height:"192px"}} alt="" />
          </div>
        </div>
      {hotel.amenities.map(amenity => (
<button className='btn btn-dark mb-2 ms-3 p-1' key={amenity}>{amenity}</button>
))}

<div className="p-4 ">
<h4>Rooms</h4>

{hotel.rooms.length>0?
hotel.rooms.map(room=>(
<div className='border rounded mb-3  p-3'>
  <h4>{room.roomType} Room</h4>
 <h6> ({room.numberOfRooms} Rooms)</h6>

 <h6 className='text-danger'> ₹ {room.pricePerNight} Per Night</h6>
 <div className="row my-3">
          <div className="col-md-8 " style={{position:"relative"}}>
            <img className='firstImg mt-3 mt-md-0' src={`${serverURL}/uploads/${room?.images[0]}`} style={{width:"100%"}} alt="" />
          </div> 
       
          <div className="col-md-4 gap-3 d-flex flex-column ">
          <img className="rightTop mt-3 mt-md-0" src={`${serverURL}/uploads/${room?.images[3]}`} style={{width:"100%",height:"192px"}} alt="" />
          <img className="rightBottom " src={`${serverURL}/uploads/${hotel?.images[4]}`} style={{width:"100%",height:"192px"}} alt="" />
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
       <div className='text-center'>
        <img className='img-fluid w-25' src="https://img.freepik.com/free-vector/flat-hotel-review-background_23-2148156492.jpg?t=st=1740416524~exp=1740420124~hmac=c66189622e805bac62d6d04a6b9e6622dd1094ef5c80a1269d2f493d5dd64b51&w=740" alt="" />
        <h3 className='text-center'><i className='fa-solid fa-x text-danger'></i> No property added yet ! </h3>
       </div>
       }
   
           
       </div>
    </div>
  )
}

export default ManageListings