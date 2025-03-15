import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { changeAdminPasswordApi } from "../../../Services/allApi";
function Settings() {
  const [profile, setProfile] = useState({ email: "", oldPassword: "", newPassword: "" });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate=useNavigate()
  const handleLogout=()=>{
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("admin");
    navigate("/"); 
  }

  const handlePasswordChange=async()=>{
    const token = sessionStorage.getItem("adminToken")
  if(profile.email&& profile.newPassword&& profile.oldPassword){
      if (token) {
        const reqHeader = {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
        const reqBody=profile
        try {
          
          const result=await changeAdminPasswordApi(reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            toast.success("Password has been chnaged")
          }
          
        } catch (error) {
          console.log(error);
          
        }
      }
    }
    else{
   alert.warning("plaese fill all details")
    }
  }
  return (
   
    <div className="container  my-4">
    <h2 className="mb-4">Settings</h2>
    
 
     <div className="d-flex align-items-center justify-content-center">
        <div className="card  w-75 p-4">
          <h3>Profile Update</h3>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Old Password</label>
            <input
              type="password"
              value={profile.oldPassword}
              onChange={(e) => setProfile({ ...profile, oldPassword: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              value={profile.newPassword}
              onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
              className="form-control"
            />
          </div>
          <button className=" btn border-2 border-dark border" onClick={handlePasswordChange}>Save Changes</button>
        </div>
     </div>
  
    <div className="mt-4 text-center">
      <button className=" black-btn px-5 py-2" onClick={handleShow}>Logout</button>
    </div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
  </div>
  )
}

export default Settings