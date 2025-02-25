import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../../assets/logo trivana.png';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation(); // Get current route
  const [activeLink, setActiveLink] = useState("");

  // Update active link based on current URL
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setActiveLink(""); // Reset active link when on the dashboard home page
    } else if (location.pathname.includes("manage-listings")) {
      setActiveLink("Manage Listings");
    } else if (location.pathname.includes("bookings")) {
      setActiveLink("Bookings");
    } else if (location.pathname.includes("reviews")) {
      setActiveLink("Reviews & Ratings");
    } else if (location.pathname.includes("earnings")) {
      setActiveLink("Earnings");
    } else if (location.pathname.includes("settings")) {
      setActiveLink("Settings");
    }
  }, [location]);
  return (
    <Navbar expand="md" className="bg-dark mb-3">
      <Container fluid>
        <Navbar.Brand>
          <div className="ms-3 d-flex align-items-center" >
            <Link to="/dashboard" style={{textDecoration:"none"}}>
              <img src={logo} style={{ width: '50px' }} alt="" />
              <span className="fs-2 text-light">Dashboard</span>

            </Link>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle className="bg-light" aria-controls="offcanvasNavbar-expand-md" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-md"
          aria-labelledby="offcanvasNavbarLabel-expand-md"
          placement="end"
        >
          <Offcanvas.Header className="bg-dark text-light" closeButton />
          <Offcanvas.Body className="bg-dark">
            <Nav className="justify-content-center gap-4 flex-grow-1 pe-3">
              <Link to="/dashboard/manage-listings" className={`nav-link ${activeLink === "Manage Listings" ? "text-primary" : "text-light"}`}>
                Manage Listings
              </Link>
              <Link to="/dashboard/bookings" className={`nav-link ${activeLink === "Bookings" ? "text-primary" : "text-light"}`}>
                Bookings
              </Link>
              <Link to="/dashboard/reviews" className={`nav-link ${activeLink === "Reviews & Ratings" ? "text-primary" : "text-light"}`}>
                Reviews & Ratings
              </Link>
              <Link to="/dashboard/earnings" className={`nav-link ${activeLink === "Earnings" ? "text-primary" : "text-light"}`}>
                Earnings
              </Link>
              <Link to="/dashboard/settings" className={`nav-link ${activeLink === "Settings" ? "text-primary" : "text-light"}`}>
                Settings
              </Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Sidebar;
