import React from 'react'
import { Link } from 'react-router-dom'

function DashboardContent() {
  return (
    <div>
      <div className="container pb-2">
        <div className="row">
          <div className="row col-md-6 ">
           <div className='col-12 p-4 rounded text-light  mb-3 bg-dark '>
            <h3 className='mb-4'>Earnings</h3>
              <div className='text-light d-flex align-items-center justify-content-between'>
                <h5>Total Earnings</h5>
                <h5>$ 22024</h5>
              </div>
              <div className='mt-3 mb-4 text-light d-flex align-items-center justify-content-between'>
              <h5>Last 30 days Earnings</h5>
              <h5>$ 2224</h5>
              </div>
              <div className="div d-flex justify-content-end align-items-center ">
  
              <button className='btn  '><Link className='text-light text-decoration-none' to={'/dashboard/earnings'}>View Detailed analysis</Link><i className='fa-solid fa-arrow-right text-light'></i></button>
              </div>
           </div>
           <div className='col-12 p-4 rounded text-dark bg-mustard'>
              <div className='text-dark'>
                <h3>New reviews</h3>
                <div className='mb-2 border rounded p-3 text-dark'>
                  <h5>Hotel amaz</h5>
                  <div className="d-flex text-dark justify-content-between">
                    <h6>Max miller</h6>
                    <div>
                      <i className='text-warning fa-solid fa-star'></i>
                      <i className='text-warning fa-solid fa-star'></i>
                      <i className='text-warning fa-solid fa-star'></i>
                      <i className='text-warning fa-solid fa-star'></i>

                    </div>
                  </div>
                  <p className='text-black'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non illo nemo tempore eaque </p>
                  </div>
             
              </div>
             
              <div className="div d-flex justify-content-end align-items-center ">
  
  <button className='btn text-light  '><Link className='text-light text-decoration-none' to={'/dashboard/reviews'}>View all review</Link> <i className='fa-solid fa-arrow-right text-light'></i></button>
  </div>
           </div>
           
          </div>
          <div className="col-md-6 ">
            <div className="row shadow mt-3 mt-md-0  ms-md-5">
              <div className="rounded p-4  col-12 p-1 bg-light-dark text-light">
                <h3 className='p-4'>Upcoming bookings</h3>
                <div className="table-responsive px-3">
                  <table className='table-dark table '>
                    <thead>
                      <tr>
                       <th> Property</th>
                       <th> Room</th>
                       <th> Checkin</th>
                       <th> Check Out</th>
                  

                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Hotel amaz</td>
                        <td>Deluxe</td>
                        <td>20-10-2023</td>
                        <td>22-10-2023</td>
                      </tr>
                      <tr>
                        <td>Hotel amaz</td>
                        <td>Deluxe</td>
                        <td>20-10-2023</td>
                        <td>22-10-2023</td>
                      </tr>
                      <tr>
                        <td>Hotel amaz</td>
                        <td>Deluxe</td>
                        <td>20-10-2023</td>
                        <td>22-10-2023</td>
                      </tr>
                      <tr>
                        <td>Hotel amaz</td>
                        <td>Deluxe</td>
                        <td>20-10-2023</td>
                        <td>22-10-2023</td>
                      </tr>
                      <tr>
                        <td>Hotel amaz</td>
                        <td>Deluxe</td>
                        <td>20-10-2023</td>
                        <td>22-10-2023</td>
                      </tr>
                      <tr>
                        <td>Hotel amaz</td>
                        <td>Deluxe</td>
                        <td>20-10-2023</td>
                        <td>22-10-2023</td>
                      </tr>
                      <tr>
                        <td>Hotel amaz</td>
                        <td>Deluxe</td>
                        <td>20-10-2023</td>
                        <td>22-10-2023</td>
                      </tr>
                      <tr>
                        <td>Hotel amaz</td>
                        <td>Deluxe</td>
                        <td>20-10-2023</td>
                        <td>22-10-2023</td>
                      </tr>
                     

                    </tbody>
                  </table>

                  <div className="div d-flex justify-content-end align-items-center ">
  
  <button className='btn text-light  '><Link className='text-light text-decoration-none' to={'/dashboard/bookings'}>View All Bookings</Link> <i className='fa-solid fa-arrow-right text-light'></i></button>
  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardContent