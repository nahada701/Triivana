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
import { sendOTPApi, userLoginApi, userRegisterApi } from '../../Services/allApi';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode"; // Change jwt_decode to jwtDecode

import { googleAuthApi } from '../../Services/allApi';

import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from '../Shared/BeatLoader';

function UserNavbar() {
  const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

  const [userDetails,setUserDetails]=useState({name:"",email:"",password:"",confirmPassword:""})

const [username,setUsername]=useState("")
  console.log(userDetails);
  

  const [isLogedin,setIsLogedin]=useState(false)

  const[isAdminLogedin,setIsAdminLogedin]=useState()

  const[otp,setotp]=useState()
  
  
useEffect(() => {
if(sessionStorage.getItem("user")){
setUsername(JSON.parse(sessionStorage.getItem("user")).name)
setIsLogedin(true)



}
}, [isLogedin])

useEffect(() => {
  if(sessionStorage.getItem("adminToken")){
   setIsAdminLogedin(sessionStorage.getItem("adminToken"))
    
  }
}, [])



  const handleToggle = () => {
    setIsNavbarExpanded(!isNavbarExpanded);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setUserDetails({name:"",email:"",password:"",confirmPassword:""})
    setShow(false)
    setIsLoginLoading(false)
    setIsSignupLoading(false)

  };
  const handleShow = () => setShow(true);

  const[isSignupLoading,setIsSignupLoading]=useState(false)
  const[isLoginLoading,setIsLoginLoading]=useState(false)

  const [isSignup,setIsSignup]=useState(false)

  const handleSignupClick=()=>{
    setIsSignup(true)
  }
  const handleLoginClick=()=>{
    setIsSignup(false)

  }
  const [sendOTPClicked,setSendOTPClicked]=useState(false)

  const handleOtpGeneration=async()=>{
    const{name,email,password,confirmPassword}=userDetails
    if(name&&email&&password&&confirmPassword){
    setSendOTPClicked(true)
      // generate otp
      try{
       const result=await sendOTPApi({email})
       console.log(result);
       
      }catch(err){
        console.log(err);
        
      }
    }
    else{
      toast.warning("please enter all fields")
    }
  }
  const handleregister=async()=>{
    const{name,email,password,confirmPassword}=userDetails
    if(name&&email&&password&&confirmPassword&&otp){
      if(confirmPassword==password){
        setIsSignupLoading(true)
        const reqBody={name,email,password,otp}
        try{
          const result=await userRegisterApi(reqBody)
          setIsSignupLoading(false)
          if(result.status==200){
            toast.success("user registerd successfully")
            setIsSignup(false)
            setUserDetails({name:"",email:"",password:"",confirmPassword:""})
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
  setIsLoginLoading(true)
  if(email&&password){
    try{
      const reqBody={email,password}
      const result=await userLoginApi(reqBody)
    
      if(result.status==200){

        sessionStorage.setItem("user",JSON.stringify(result.data.user))
        sessionStorage.setItem("userToken",result.data.token)
        setIsLogedin(true)
        handleClose()
        toast.success("Welcome")
        setIsLoginLoading(false)

      }else if(result.status==404){
        toast.error("Invalid credentials")
        setIsLoginLoading(false)

      }
   
    }
    catch(err){
      if(err.response){
        setIsLoginLoading(false)
  
        
      }
      
    }
  }
  else{
    toast.warning('please enter all fields')
    setIsLoginLoading(false)
  }

  }
  
  const handleLogout=()=>{
    sessionStorage.clear()
    setIsLogedin(false)
  }


  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const decoded = jwt_decode(credentialResponse.credential);
      console.log(decoded); // User info from Google

      // Send to backend for JWT token creation
      const result = await googleAuthApi({
        name: decoded.name,
        email: decoded.email,
        googleId: decoded.sub,
      });

      if (result.status === 200) {
        sessionStorage.setItem("user", JSON.stringify(result.data.user));
        sessionStorage.setItem("userToken", result.data.token);
        setIsLogedin(true);
        handleClose();
        toast.success("Logged in successfully!");
      } else{
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Something went wrong!");
    }
  };
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
              
{/* Propert listing link */}
              
               <Link to={isAdminLogedin?'/dashboard':'/partner-register'} >
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
                <Dropdown.Item ><Link style={{textDecoration:"none",}} className='text-dark' to={'/savedproperies'}>Saved properties</Link></Dropdown.Item>
                <Dropdown.Item ><Link style={{textDecoration:"none",}} className='text-dark ' to={'/mybookings'}>Booking History</Link></Dropdown.Item>
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
        {isSignup && 
      
      <FloatingLabel controlId="name" label="Name">
        <Form.Control value={userDetails.name} onChange={(e)=>setUserDetails({...userDetails,name:e.target.value})} type="text" placeholder="name"   className="mb-3"/>
      </FloatingLabel>}
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
      
        <FloatingLabel controlId="floatingPassword2" label="Confirm Password">
          <Form.Control value={userDetails.confirmPassword} onChange={(e)=>setUserDetails({...userDetails,confirmPassword:e.target.value})} type="password" placeholder="Confirm Password" />
        </FloatingLabel>}
        {sendOTPClicked&&isSignup&&
 <>
    <FloatingLabel className='my-3' controlId="floatingPassword2" label="Type OTP">
    <Form.Control value={otp} onChange={(e)=>setotp(e.target.value)}  type="text" placeholder="Type OTP" />
  </FloatingLabel>
   
 </>
  }
 {isSignup? 
 <div className='d-flex align-items-center justify-content-center mt-4 w-100'>
  { sendOTPClicked?<button onClick={handleregister} style={{height:"50px"}} className='w-100 black-btn px-4 '>{isSignupLoading?<Spinner></Spinner>:"Signup"}</button> :
   <button onClick={handleOtpGeneration} style={{height:"50px"}} className='w-100 black-btn px-4 '>{"Send OTP"}</button>}
  

 
  </div>:
 <div className='d-flex align-items-center justify-content-center mt-4 w-100'>
  <button onClick={handlelogin}  style={{height:"50px"}} className='w-100 black-btn px-4 '>{isLoginLoading?<Spinner></Spinner>:"Login"}</button>
  </div>}

  <hr />
  <div className='d-flex align-items-center justify-content-center mt-4 w-100'>
  <GoogleOAuthProvider clientId="659194423703-qqskhlm3fgiv6m2c468fgib7ole89j0g.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={() => {
          toast.error("Google Sign-In Failed");
        }}
        theme="outline"  // Options: "outline", "filled_black", "filled_blue"
        size="large"          // Options: "small", "medium", "large"
        text="continue_with"  // Options: "sign_in", "sign_up", "continue_with"
        shape="round" 
        
     
      />
    </GoogleOAuthProvider>
  </div>
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
