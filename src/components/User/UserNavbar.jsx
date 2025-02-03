import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/logoT.png';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { userLoginApi, userRegisterApi } from '../../Services/allApi';
import Dropdown from 'react-bootstrap/Dropdown';

function UserNavbar() {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  const [userDetails,setUserDetails]=useState({email:"",password:"",confirmPassword:""})

const [username,setUsername]=useState("")
  console.log(userDetails);
  

  const [isLogedin,setIsLogedin]=useState(false)
  console.log(isLogedin);
  
useEffect(() => {
if(sessionStorage.getItem("user")){
setUsername(JSON.parse(sessionStorage.getItem("user")).email)
setIsLogedin(true)

}
}, [])


  const handleToggle = () => {
    setIsNavbarExpanded(!isNavbarExpanded);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setUserDetails({email:"",password:"",confirmPassword:""})
    setShow(false)
  };
  const handleShow = () => setShow(true);


  const [isSignup,setIsSignup]=useState(false)

  const handleSignupClick=()=>{
    setIsSignup(true)
  }
  const handleLoginClick=()=>{
    setIsSignup(false)

  }

  const handleregister=async()=>{
    const{email,password,confirmPassword}=userDetails

    if(email&&password&&confirmPassword){
      if(confirmPassword==password){
        const reqBody={email,password}
        try{
          const result=await userRegisterApi(reqBody)
          if(result.status==200){
            toast.success("user registerd successfully")
            setIsSignup(false)
            setUserDetails({email:"",password:"",confirmPassword:""})
          }
          else if(result.status==406){
            toast.error("user already exists")
          }
          
        }catch(err){
          console.log(err);
          
        }
      }
      else{
        toast.warning("passwords don't match")
      }
    }else{
      toast.error("please enter all fields")
    }
  }


  const handlelogin=async()=>{
  const{email,password}=  userDetails
  if(email&&password){
    try{
      const reqBody={email,password}
      const result=await userLoginApi(reqBody)

      if(result.status==200){
        sessionStorage.setItem("user",JSON.stringify(result.data.user))
        sessionStorage.setItem("userToken",result.data.token)
        setIsLogedin(true)
        handleClose()

      }
      else if(result.status==404){
        toast(result.response.data)
      }
    }
    catch(err){
      console.log(err);
      
    }
  }
  else{
    toast.warning('please enter all fields')
  }

  }
  
  const handleLogout=()=>{
    sessionStorage.clear()
    setIsLogedin(false)
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
              
               <Link to={'/admin-login'} >
                  <button className="btn text-light">
                  List Your Property
                  </button>
               </Link>
            
             {
              isLogedin?
              <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
             <i className='fa-solid text-light fa-user' ></i>
              </Dropdown.Toggle>
        
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">{username}</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout} >Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

              :<button className="white-btn py-2" onClick={handleShow}  >Log in</button>

             }
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
        <Form.Control value={userDetails.email} onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}  type="email" placeholder="name@example.com" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword1" label="Password"  className="mb-3">
        <Form.Control value={userDetails.password} onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})} type="password" placeholder="Password" />
      </FloatingLabel>
      {isSignup && 
      
        <FloatingLabel controlId="floatingPassword2" label="Password">
          <Form.Control value={userDetails.confirmPassword} onChange={(e)=>setUserDetails({...userDetails,confirmPassword:e.target.value})} type="password" placeholder="Confirm Password" />
        </FloatingLabel>}

 {isSignup? 
 <div className='d-flex align-items-center justify-content-center mt-4 w-100'>
  <button onClick={handleregister} style={{height:"50px"}} className='w-100 black-btn px-4 '>Sign up</button>
  </div>:
 <div className='d-flex align-items-center justify-content-center mt-4 w-100'>
  <button onClick={handlelogin}  style={{height:"50px"}} className='w-100 black-btn px-4 '>Log in</button>
  </div>}
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
