import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function Settings() {
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate=useNavigate()
  const handleLogout=()=>{
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("admin");
    navigate("/"); 
  }
  return (
   
    <div className="container  my-4">
    <h2 className="mb-4">Settings</h2>
    
 
     <div className="d-flex align-items-center justify-content-center">
        <div className="card  w-75 p-4">
          <h3>Profile Update</h3>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="form-control"
            />
          </div>
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
            <label className="form-label">Phone</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="form-control"
            />
          </div>
          <button className=" btn border-2 border-dark border">Save Changes</button>
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