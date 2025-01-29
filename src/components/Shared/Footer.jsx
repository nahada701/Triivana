import React from 'react'
import logo from '../../assets/logoT.png';

function Footer() {
  return (
    <div>
        <div className='bg-dark text-light rounded ' style={{margin:"1vh"}}>
            <div className="py-5 px-3 d-flex flex-wrap gap-5 justify-content-between">
                <div className="col">
                     <img src={logo} style={{ width: '150px' }} alt="Logo" />
                     <p style={{fontSize:"14px"}} className='ps-2 text-light'>Our mission at Triivana is to make hotel booking simple, stress-free, and convenient. Find your perfect stay and book with confidence!</p>
                </div>
                <div className="col">
                    <h6 className='text-light mb-3 d-flex flex-column gap-3'>Quick Links</h6>
                    <a href="" className='pb-4' style={{textDecoration:"none",color:"white"}}>About us</a>
                    <br />
                    <br />                    
                    <a href=""  className='pb-1' style={{textDecoration:"none",color:"white"}}>List your property</a>
                    <br />
                    <br />
                    <a href=""  className='pb-1' style={{textDecoration:"none",color:"white"}}>Careers</a>


                </div>
                <div className="col">
                <h6 className='text-light mb-3 d-flex flex-column gap-3'>Help & Support</h6>
                    <a href="" className='pb-4' style={{textDecoration:"none",color:"white"}}>FAQs</a>
                    <br />
                    <br />                    
                    <a href=""  className='pb-1' style={{textDecoration:"none",color:"white"}}>Cancellation & Refund Policy</a>
                    <br />
                    <br />
                    <a href=""  className='pb-1' style={{textDecoration:"none",color:"white"}}>Booking Guide</a>


                </div>
                <div className="col">
                <h6 className='text-light mb-3 d-flex flex-column gap-3'>Get updates</h6>
                <div  className='py-2 pe-2 w-100 position-relative  d-flex'>
                <input placeholder='Enter Your Email' style={{backgroundColor:"#353535",borderRadius:"10px",border:"0",outline:"0"}}  type="text" className='p-2 w-100  ' />
                <button className='position-absolute mt-2' style={{right:"10px",borderRadius:"10px",backgroundColor:"white",color:"black",border:"0",outline:"0"}}>Subscribe</button>

                </div>

                <div className='d-flex justify-content-between mt-2'>
                    <i className='fa-brands fa-instagram text-light p-2 ' style={{borderRadius:"50%",backgroundColor:"#353535"}} ></i>
                    <i className='fa-brands fa-facebook text-light p-2 ' style={{borderRadius:"50%",backgroundColor:"#353535"}} ></i>
                    <i className='fa-brands fa-reddit text-light p-2 ' style={{borderRadius:"50%",backgroundColor:"#353535"}} ></i>
                    <i className='fa-brands fa-discord text-light p-2 ' style={{borderRadius:"50%",backgroundColor:"#353535"}} ></i>
                    <i className='fa-brands fa-x text-light p-2 ' style={{borderRadius:"50%",backgroundColor:"#353535"}} ></i>
                    
                </div>
 
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer