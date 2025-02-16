import React from 'react'
import  { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logoT from '../../assets/logo trivana.png';
import { Link, useLocation } from 'react-router-dom';


function SuperAdminSidebar() {
      const location = useLocation(); // Get current route
      const [activeLink, setActiveLink] = useState("");
    
      // Update active link based on current URL
    useEffect(() => {
      if (location.pathname === "/superadmin-dashboard") {
        setActiveLink(""); // Reset active link when on the dashboard home page
      } else if (location.pathname.includes("property-owners")) {
        setActiveLink("property-owners");
      } else if (location.pathname.includes("user-management")) {
        setActiveLink("user-management");
      } else if (location.pathname.includes("property-management")) {
        setActiveLink("property-management");
      } else if (location.pathname.includes("reviews-ratings")) {
        setActiveLink("reviews-ratings");
      } else if (location.pathname.includes("settings")) {
        setActiveLink("settings");
      }
    }, [location]);
  return (
    <div className='text-light pt-5 superadmin-sidebar d-flex d-md-block align-items-center' >
        <Navbar.Brand>
          <div className="d-flex ms-4 align-items-center ">
           <Link to={'/superadmin-dashboard'} style={{textDecoration:"none"}} className='text-light d-flex align-items-center'> <img className='img-fluid ' src={logoT} style={{ width: '50px' }} alt="" /> <h3>Dashbaord</h3></Link>
          </div>
        </Navbar.Brand>
          <Navbar expand="md" className=" ms-auto">
          <Container fluid>
          
      <Navbar.Toggle className="bg-light" aria-controls="offcanvasNavbar-expand-md" />
<Navbar.Offcanvas
  id="offcanvasNavbar-expand-md"
  aria-labelledby="offcanvasNavbarLabel-expand-md"
  placement="end"
>
  <Offcanvas.Header className="bg-dark text-light" closeButton />
  <Offcanvas.Body className="bg-dark">
    <Nav  className=" d-flex  flex-column  justify-content-center gap-4 flex-grow-1 pe-3">
      <Link to="/superadmin-dashboard/property-owners" className={`nav-link ${activeLink === "property-owners" ? "text-primary" : "text-light"}`}>
      Property owners
      </Link>
      <Link to="/superadmin-dashboard/user-management" className={`nav-link ${activeLink === "user-management" ? "text-primary" : "text-light"}`}>
      User management
      </Link>
      <Link to="/superadmin-dashboard/property-management" className={`nav-link ${activeLink === "property-management" ? "text-primary" : "text-light"}`}>
      Property Management
      </Link>
      <Link to="/superadmin-dashboard/reviews-ratings" className={`nav-link ${activeLink === "reviews-ratings" ? "text-primary" : "text-light"}`}>
      Reviews & Ratings
      </Link>
      <Link to="/superadmin-dashboard/settings" className={`nav-link ${activeLink === "settings" ? "text-primary" : "text-light"}`}>
        Settings
      </Link>
    </Nav>
    
  </Offcanvas.Body>
</Navbar.Offcanvas>
</Container>
</Navbar>


    </div>
  )
}

export default SuperAdminSidebar
