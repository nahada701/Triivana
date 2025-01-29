import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/logoT.png';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function UserNavbar() {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  const handleToggle = () => {
    setIsNavbarExpanded(!isNavbarExpanded);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isSignup,setIsSignup]=useState(false)

  const handleSignupClick=()=>{
    setIsSignup(true)
  }
  const handleLoginClick=()=>{
    setIsSignup(false)

  }
  return (
    <div className="">
      <Navbar expand="lg" style={{ backgroundColor: 'transparent' }}>
        <Container>
          <Link to={'/'}>
            <Navbar.Brand>
              <img src={logo} style={{ width: '150px' }} alt="Logo" />
            </Navbar.Brand>
          </Link>
          
          {/* search btn here  */}
          <button 
            className="btn text-light d-lg-none" 
            onClick={handleToggle}
            aria-controls="basic-navbar-nav"
            aria-expanded={isNavbarExpanded}
          >
            <i className={`fa-solid ${isNavbarExpanded ? 'fa-xmark' : 'fa-bars'}`} />
          </button>

          <Navbar.Collapse id="basic-navbar-nav" className={isNavbarExpanded ? 'show' : ''}>
            <Nav className="ms-auto">
              <button className="btn text-light">
                <i className="fa-solid fa-globe"></i> EN
              </button>
{/* Propert listing link */}
              
                <button className="btn text-light">
                List Your Property
                </button>
            
             

            <button className="white-btn py-2" onClick={handleShow}  >Log in</button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="login-modal">
        <Modal.Header closeButton>
          <Modal.Title>{isSignup?`Sign up`:`Log in`}</Modal.Title>
      
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword1" label="Password"  className="mb-3">
        <Form.Control type="password" placeholder="Password" />
      </FloatingLabel>
      {isSignup && 
      
        <FloatingLabel controlId="floatingPassword2" label="Password">
          <Form.Control type="password" placeholder="Confirm Password" />
        </FloatingLabel>}

 {isSignup? 
 <div className='d-flex align-items-center justify-content-center mt-4 w-100'><button style={{height:"50px"}} className='w-100 black-btn px-4 '>Sign up</button></div>:
 <div className='d-flex align-items-center justify-content-center mt-4 w-100'><button style={{height:"50px"}} className='w-100 black-btn px-4 '>Sign up</button></div>}
{
  isSignup?
  <p className='text-center pt-4'><span >Already have an account?  <a onClick={handleLoginClick} style={{cursor:"pointer"}} className=''>Log In</a></span></p>

  :
  <p className='text-center pt-4'><span >Dont have an account?  <a onClick={handleSignupClick} style={{cursor:"pointer"}} className=''>Sign up</a></span></p>

}

        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserNavbar;
