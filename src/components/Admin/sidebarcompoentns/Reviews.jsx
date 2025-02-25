import React from 'react'

function Reviews() {

  const review = {
    _id: "12345",
    hotelId: { propertyname: "Grand Hotel" },
    userId: { name: "John Doe" },
    createdAt: "2025-02-24T12:34:56Z",
    rating: 4,
    overAllRating:4.4,
    comment: "Great experience, wonderful stay!",
  };


  return (
    <div>
      <div className='container'>
        <h3 className='py-3 '>Reviews & Ratings</h3>

        <h4 className='py-2'>{review.hotelId.propertyname} ( {review.overAllRating} <i className='fa-solid fa-star text-warning'></i>) </h4>
        <div className="row">

          <div className="col-lg-3 mb-3">
            <div className="card p-2">
              <h6 style={{ fontSize: "15px" }}></h6>
              <h6 className="p-0 m-0">{review.userId.name}</h6>
              <span style={{ fontSize: "14px" }}>{review.createdAt.split("T")[0]}</span>
              <h6>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <i key={i} className="fa-solid fa-star text-warning"></i>
                ))}
              </h6>
              <p style={{ fontSize: "13px", color: "black" }}>{review.comment}</p>
            
            </div>
          </div>
          <div className="col-lg-3 mb-3">
            <div className="card p-2">
              <h6 style={{ fontSize: "15px" }}></h6>
              <h6 className="p-0 m-0">{review.userId.name}</h6>
              <span style={{ fontSize: "14px" }}>{review.createdAt.split("T")[0]}</span>
              <h6>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <i key={i} className="fa-solid fa-star text-warning"></i>
                ))}
              </h6>
              <p style={{ fontSize: "13px", color: "black" }}>{review.comment}</p>
            
            </div>
          </div>
         
          
        </div>
        <h4 className='py-2'>{review.hotelId.propertyname} ( {review.overAllRating} <i className='fa-solid fa-star text-warning'></i>) </h4>

        <div className="row">

          <div className="col-lg-3 mb-3">
            <div className="card p-2">
              <h6 style={{ fontSize: "15px" }}></h6>
              <h6 className="p-0 m-0">{review.userId.name}</h6>
              <span style={{ fontSize: "14px" }}>{review.createdAt.split("T")[0]}</span>
              <h6>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <i key={i} className="fa-solid fa-star text-warning"></i>
                ))}
              </h6>
              <p style={{ fontSize: "13px", color: "black" }}>{review.comment}</p>
            
            </div>
          </div>
          <div className="col-lg-3 mb-3">
            <div className="card p-2">
              <h6 style={{ fontSize: "15px" }}></h6>
              <h6 className="p-0 m-0">{review.userId.name}</h6>
              <span style={{ fontSize: "14px" }}>{review.createdAt.split("T")[0]}</span>
              <h6>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <i key={i} className="fa-solid fa-star text-warning"></i>
                ))}
              </h6>
              <p style={{ fontSize: "13px", color: "black" }}>{review.comment}</p>
            
            </div>
          </div>
         
          
        </div>



      </div>
    </div>
  )
}

export default Reviews