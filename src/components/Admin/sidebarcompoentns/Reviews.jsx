import React, { useEffect, useState } from 'react'
import { propertyOwnerReviewsApi } from '../../../Services/allApi'
import Spinner from '../../Shared/BeatLoader'

function Reviews() {

  const [allReview,setAllReviews]=useState( { })
  const [isloading,setIsLoading]=useState(false)
useEffect(() => {
     getReviews()
    }, [])
const getReviews=async()=>{
    const token = sessionStorage.getItem("adminToken")
          if (token) {
              const reqHeader = {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
              }
              try{
                setIsLoading(true)
                const result=await propertyOwnerReviewsApi(reqHeader) 
                console.log(result);
                if(result.status==200){
                  setIsLoading(false)
                  setAllReviews(result.data)
                }                
              }
              catch(err){
                console.log(err)
              }
            }
}




  return (
    <div>
      <div className='container'>
        <h3 className='py-3 '>Reviews & Ratings</h3>

       {
        isloading?<Spinner></Spinner>
        :
        allReview?.length>0?
        allReview?.map(hotel=>(

        <div>
          <h4 className='py-2'>{hotel?.propertyname} ( {hotel?.averageRating} <i className='fa-solid fa-star text-warning'></i>) </h4>
          <div className="row">
  
          <div className="row">
  {hotel?.reviews?.map(review => (
    <div className="col-lg-3 mb-3 d-flex" key={review?._id}>
      <div className="card p-2 w-100 d-flex flex-column">
        <h6 className="p-0 m-0">{review?.userName}</h6>
        <span style={{ fontSize: "14px" }}>
          {review?.createdAt.split("T")[0]}
        </span>
        <h6>
          {Array.from({ length: review?.rating }).map((_, i) => (
            <i key={i} className="fa-solid fa-star text-warning"></i>
          ))}
        </h6>
        <p className="flex-grow-1" style={{ fontSize: "13px", color: "black" }}>
          {review?.comment}
        </p>
      </div>
    </div>
  ))}
</div>

          
           
            
          </div>
        </div>
        ))
        :
        <p className='text-center fs-2 my-5 py-5'>No bookings yet</p>
       
     }


      </div>
    </div>
  )
}

export default Reviews