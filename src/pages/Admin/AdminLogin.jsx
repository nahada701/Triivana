import React, { useState } from 'react'
import logo from '../../assets/logoT.png'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { adminLoginApi, adminRegisterApi } from '../../Services/allApi';
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';

function AdminLogin() {
  const[isSignedup,setIsSignedup]=useState(false)
  const[adminDetails,setAdminDetails]=useState({firstname:"",lastname:"",email:"",password:""})
console.log(adminDetails);
const navigate= useNavigate()

  const handleregister=async()=>{
    const{firstname,lastname,email,password}=adminDetails
    if(firstname&&lastname&&email&&password){
      const reqBody={firstname,lastname,email,password}

      try{
        const result=await adminRegisterApi(reqBody)
        console.log(result);
        if(result.status==200){
          setIsSignedup(true)
          setAdminDetails({firstname:"",lastname:"",email:"",password:""})
        }
        else if(result.status==406){
          toast.error(result.response.data)
        }
        
      }
      catch(err){
        console.log(err);
        
      }
    }
    else{
      toast.warning("please enter all fields")
    }
  }
  const handleLogin=async()=>{
    const{email,password}=adminDetails
    if(email&& password){
      try {
        const result=await adminLoginApi({email,password})
        if(result.status==200){
          sessionStorage.setItem("adminToken",result.data.token)
          sessionStorage.setItem("admin",JSON.stringify(result.data.admin))
          setAdminDetails({firstname:"",lastname:"",email:"",password:""})
          navigate('/dashboard/manage-listings')
        }
        else if(result.status==404){
          toast.error(result.response.data)
        }
        

      } catch (error) {
        console.log(error);
        
      }

    }
    else{
      toast.warning("please enter both fields")
    }
  }

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
                  :<h2 className='text-light py-2'>CREATE YOUR PARTNER ACCOUNT</h2>}
                 {!isSignedup && <div className="row">
                <div className='col-lg-6 pe-lg-0 '>
                    <FloatingLabel
          controlId="floatingInput"
          label="First name"
          className="mb-3 "
  
  
        >
          <Form.Control value={adminDetails.firstname} onChange={(e)=>setAdminDetails({...adminDetails,firstname:e.target.value})}  type="text" placeholder="First name" />
        </FloatingLabel>
                </div>
      <div className='col-lg-6 '>
        <FloatingLabel
          controlId="floatingInput"
          label="Last name"
          className="mb-3 "
  
  
        >
          <Form.Control value={adminDetails.lastname}  onChange={(e)=>setAdminDetails({...adminDetails,lastname:e.target.value})}  type="text" placeholder="Lsst name" />
        </FloatingLabel>
      </div>
                  </div>}
                  <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"


      >
        <Form.Control value={adminDetails.email}  onChange={(e)=>setAdminDetails({...adminDetails,email:e.target.value})}  type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword1" label="Password"  className="mb-3">
        <Form.Control  value={adminDetails.password} onChange={(e)=>setAdminDetails({...adminDetails,password:e.target.value})}   type="password" placeholder="Password" />
      </FloatingLabel>
    
 {isSignedup?<div className='d-flex align-items-center justify-content-center mt-4 w-100'>
  <button   onClick={handleLogin} style={{height:"50px",border:"3px white solid"}} className='w-100 black-btn px-4 '>Log in</button>
  </div>
 :<div className='d-flex align-items-center justify-content-center mt-4 w-100'>
  <button onClick={handleregister}  style={{height:"50px",border:"3px white solid"}}  className='w-100 black-btn px-4 '>Sign up </button>
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