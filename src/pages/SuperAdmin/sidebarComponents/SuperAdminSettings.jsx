import React from 'react'
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { toast } from 'react-toastify';
import { changeSuperAdminPasswordApi } from '../../../Services/allApi';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../components/Shared/Spinner';

function SuperAdminSettings() {
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const[superAdminData,setSuperAdminData]=useState({email:"superadmin@triivana.com", oldPassword:"", newPassword:"" })


    const updatePassword=async()=>{
      if(superAdminData.email && superAdminData.oldPassword && superAdminData.newPassword){
        const token = sessionStorage.getItem("superAdminToken")
        const reqHeader = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"

        }
        const reqBody=superAdminData
        if(token ){
       
            try {
              
                const result =await changeSuperAdminPasswordApi(reqBody,reqHeader)
                console.log(result);
               if(result.status==400){
                toast.warning("Invalaid old passwod")
               }
               else if(result.status==200){
                toast.success("password changed successfully")
                setSuperAdminData({email:"superadmin@triivana.com", oldPassword:"", newPassword:"" })
               }
                
            } catch (error) {
                console.log(error);
                
            }
        }
      }
      else{
        toast.warning("Please fill every field")
      }
           
   
    }

    const navigate=useNavigate()
    const [isLogginOut,setIsLoggingOut]=useState(false)
    const handleLogout=()=>{
      setIsLogoutOpen(false)
      setIsLoggingOut(true)
      sessionStorage.removeItem("superAdminToken")
      setTimeout(() => {
        setIsLoggingOut(false)
        navigate('/superadmin-login')
      }, 1000);
      
    }
  return (

    <div>
         <div className="container d-flex flex-column  w-75 mt-4">
      {/* Profile Settings */}
      {isLogginOut ?
      <Spinner></Spinner> 
       :
     <div>
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Profile Settings</Card.Title>
            <Form>
          
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" readOnly defaultValue={superAdminData.email} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Old Password</Form.Label>
                <Form.Control  value={superAdminData.oldPassword} onChange={(e)=>setSuperAdminData({...superAdminData,oldPassword:e.target.value})} type="password"  />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control value={setSuperAdminData.newPassword}  onChange={(e)=>setSuperAdminData({...superAdminData,newPassword:e.target.value})} type="password" />
              </Form.Group>
              <Button className="bg-light text-dark btn border-2 border-dark border w-100"onClick={updatePassword}>Save Changes</Button>

            </Form>
          </Card.Body>
        </Card>
        
        {/* Platform Rules */}
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Platform Rules</Card.Title>
            <p className="text-muted">Keep the platform fair and safe for all users. Respect guidelines.</p>
          </Card.Body>
        </Card>
  
        {/* Logout Button */}
       <div className='text-center'>
          <Button className="bg-dark black-btn px-5 py-2" onClick={() => setIsLogoutOpen(true)}>
            Logout
          </Button>
       </div>
        
     </div>
     }
      {/* Logout Confirmation Modal */}
      <Modal show={isLogoutOpen} onHide={() => setIsLogoutOpen(false)}>
      <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsLogoutOpen(false)}>Cancel</Button>
          <Button variant="dark" onClick={handleLogout}>Logout</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  )
}

export default SuperAdminSettings