import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import trivanaLogo from '../../assets/logoT.png'
import { LoginSuperAdminApi } from '../../Services/allApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function SuperAdminLogin() {

    const navigate=useNavigate()
    const [adminDetails,setAdminDetails]=useState({email:"",password:""})

const handleSuperAdminLogin=async()=>{
    if(adminDetails.email && adminDetails.password)
{    try {
        const result=await LoginSuperAdminApi(adminDetails)
        if(result.status==200){
            toast.success("welcome")
            setAdminDetails({email:"",password:""})
            navigate('/superadmin-dashboard')

        }
        else if(result.status==400){
            toast.error("invalid credentials")
        }
        else if(result.status==404){
            toast.error("No admin found")
        }
        
    } catch (error) {
       console.log(error);
        
    }}
    else{
        toast.warning("Please enter all fields")
    }
}
    
  return (
    <div>
        <div className="d-flex flex-column m-auto w-50  align-items-center justify-content-center" style={{minHeight:"80vh"}}>
      <h2>Admin Login Triivana</h2>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3 mt-5  w-100"
      >
        <Form.Control onChange={(e)=>setAdminDetails({...adminDetails,email:e.target.value})} type="email" placeholder="name@example.com"
         />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password"
        className="mb-3 w-100"
        >
        <Form.Control onChange={(e)=>setAdminDetails({...adminDetails,password:e.target.value})} type="password" placeholder="Password" />
      </FloatingLabel>
      <button className='black-btn w-100' onClick={handleSuperAdminLogin}>Login</button>

        </div>
    </div>
  )
}

export default SuperAdminLogin