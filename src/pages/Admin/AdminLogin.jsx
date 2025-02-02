import React, { useState } from 'react'
import UserNavbar from '../../components/User/UserNavbar'
import hotelimage from '../../assets/luxury-beach-house-with-glass-windows-beautiful-scenery-sea_181624-9041.jpg'
import logo from '../../assets/logoT.png'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
function AdminLogin() {

  const[isSignedup,setIsSignedup]=useState(false)

  return (
    <div className=''>
        <div className=" bg-dark p-5  " style={{minHeight:"100vh",backgroundColor:"#1f2b37"}}>
            <div style={{minHeight:"80vh"}} className="bg-color shadow row rounded align-items-center  d-flex justify-contnent-center  ">
                <div className="position-relative col-lg-6 px-lg-5 d-flex pt-3 pt-lg-0 justify-content-center align-items-center  bg-color" >
                <img src={logo}  className='position-absolute  '  alt="" style={{width:"200px"}} />
                </div>
                <div className="col-lg-6  px-4 
                pt-4 bg-color " >
                  {isSignedup?
                    <h2 className='text-light py-2'>LOG IN TO YOUR ACCOUNT</h2>
                  :<h2 className='text-light py-2'>CREATE AN ACCOUNT</h2>}
                 {!isSignedup && <div className="row">
                <div className='col-lg-6 pe-lg-0 '>
                    <FloatingLabel
          controlId="floatingInput"
          label="First name"
          className="mb-3 "
  
  
        >
          <Form.Control  type="text" placeholder="First name" />
        </FloatingLabel>
                </div>
      <div className='col-lg-6 '>
        <FloatingLabel
          controlId="floatingInput"
          label="Last name"
          className="mb-3 "
  
  
        >
          <Form.Control  type="text" placeholder="Lsst name" />
        </FloatingLabel>
      </div>
                  </div>}
                  <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"


      >
        <Form.Control  type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword1" label="Password"  className="mb-3">
        <Form.Control  type="password" placeholder="Password" />
      </FloatingLabel>
    
 {isSignedup?<div className='d-flex align-items-center justify-content-center mt-4 w-100'>
  <button  style={{height:"50px",border:"3px white solid"}} className='w-100 black-btn px-4 '>Log in</button>
  </div>
 :<div className='d-flex align-items-center justify-content-center mt-4 w-100'>
  <button   style={{height:"50px",border:"3px white solid"}}  className='w-100 black-btn px-4 '>Sign up </button>
  </div>}

  

   { isSignedup? <p className='text-center pt-4'><span className='text-light' >Don't have an account?  <a  style={{cursor:"pointer"}} className='' onClick={()=>setIsSignedup(false)} >Sign up</a></span></p>
   :<p className='text-center  pt-4'><span className='text-light' >Already have an account?  <a  style={{cursor:"pointer"}} className='' onClick={()=>setIsSignedup(true)}>Log In</a></span></p>
  }
  

                </div>

            </div>
        </div>
    </div>
  )
}

export default AdminLogin