import React from 'react'

function ReviewsRatings() {
  return (
    <div>
        <h3 className='text-center'>Review requests</h3>
        <div className='row'>
          
            <div className="col-lg-3">
            <div className="card p-2">
            <h6 style={{fontSize:"15px"}}>Hotel name(id)</h6>
        <h6 className='p-0 m-0'>Max miller</h6>
        <span style={{fontSize:"14px"}}>10/20/2024</span>
        <h6>
        <i className='fa-solid fa-star text-warning'></i>
        <i className='fa-solid fa-star text-warning'></i>


        </h6>
          <p style={{fontSize:"13px",color:"black"}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis ratione aspernatur perspiciatis necessitatibus sunt </p>
          <div className='d-flex gap-2 flex-wrap'>
                                    <button className='btn btn-success '>Aprove <i className='fa-solid fa-check text-light' ></i></button>
                                    <button className='btn btn-danger'>Decline <i className='fa-solid fa-xmark text-light'></i></button>

                                </div>
  
      </div>
            </div>
            </div>

         

            <div className='' >
                <h3 className='text-center '>Reviews table</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Hotel Name</th>
                            <th>Username </th>
                            <th>Review</th>
                            <th>Rating</th>
                         
                        </tr>
                    </thead>
                    <tbody>
                       <tr>
                       <td>1</td>
                            <td>Nextstay home</td>
                            <td>amala paul </td>
                            <td>amazing stay for family</td>
                            <td>5</td>
                       </tr>
                    </tbody>

                </table>
            </div>

    </div>
  )
}

export default ReviewsRatings