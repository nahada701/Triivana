import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import hotelimg from '../../assets/r3.jpg'
import serverURL from '../../Services/ServerURL';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Footer from '../../components/Shared/Footer';
import { toast } from 'react-toastify';
import { addReviewApi, getSingleHotelsApi, savePropetyApi } from '../../Services/allApi';
import { updateReviewContext } from '../../context/ContextApi';
import UserNavbar from '../../components/User/UserNavbar';
import BookingForm from '../../components/User/BookingForm';

const labels = {

  1: 'Useless',

  2: 'Poor',

  3: 'Ok',

  4: 'Good',

  5: 'Excellent',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


function HotelDetails() {
 
  const selectRoomRef=useRef(null)

  const navigate=useNavigate()
const{updateReview,setUpdateReview}=useContext(updateReviewContext)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showRoom, setShowRoom] = useState(false);
  const handleCloseRoom = () => setShowRoom(false);
  const handleShowRoom = () => setShowRoom(true);
  

  const [showBookingForm, setShowBookingForm] = useState(false);
  const handleCloseBookingForm = () => setShowBookingForm(false);
  const handleShowBookingForm = () => setShowBookingForm(true);

  const [selectedRoom,setSelectedRoom]=useState()
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);

  const [review,setReview]=useState("")
console.log(review);
const { id } = useParams();
console.log(id);

const[isBookingConfirmed,setIsBookingConfirmed]=useState(false)

const[hotel,setHotel]=useState()
console.log("hotel detials",hotel);



useEffect(() => {
if(id){getHotelDetilas()}
}, [id,updateReview])

useEffect(() => {
  handleCloseBookingForm()
}, [isBookingConfirmed])

const getHotelDetilas=async()=>{
  try{
    const result=await getSingleHotelsApi(id)
    console.log(result,"result");
    if(result.status==200){
      setHotel(result.data)
    }
    
    
  }catch(err){
    console.log(err);
    
  }
}

  const handleReviewSubmit=async()=>{
    const userToken=sessionStorage.getItem("userToken")
    if(userToken){
   const reqBody={hotelId:hotel?._id,rating:value,comment:review}
   const reqHeader={
   "Content-Type":"application/json",
   "Authorization":`Bearer ${userToken}`
   }
   try {

    const result=await addReviewApi(reqBody,reqHeader)
    console.log(result);
    
    if(result.status==200){
      toast.success("Thanks for the honest review")
      setReview("")
      setUpdateReview(result.data)
     
    }
    
   } catch (error) {
    console.log(error);
    
   }
      
    }
    else{
    
      toast.warning("please login")
    }

  }

const scrollToSelectRoom =()=>{
  if(selectRoomRef.current){
    selectRoomRef.current.scrollIntoView({ behavior: 'smooth' });

  }
}


const handleBooking=(room)=>{

  const token=sessionStorage.getItem("userToken")
  if(token){
   //open modal
   handleShowBookingForm()
   setSelectedRoom(room)
  }
  else{
    toast.warning("Plese login to proceed booking")
    

  }
}

const handleSaveProperty=async()=>{
  const userToken=sessionStorage.getItem("userToken")
  if(userToken){
    const reqBody={hotelId:id}
 const reqHeader={
 "Content-Type":"application/json",
 "Authorization":`Bearer ${userToken}`
 }
      if(id){
        console.log(reqBody,reqHeader);
        
        try {
          const result=await savePropetyApi(reqBody,reqHeader)
          if(result.status==200){
            toast.success("Property added to saved properties")
          }
          else if (result.status==406){
            toast.warning("Property already saved")
          }
          
        } catch (error) {
          console.log(error,"error from front end");
          
        }
      }
      else{
        console.log("id undefined");
        
      }
   
  }
  else{
    toast.warning("Please login")
  }
}
  return (

  <div className=''>
      <div className="bg-dark">
          <UserNavbar></UserNavbar>
        </div>
      <div className='mt-3 mb-5 container '>
      
     <div className=''> 
      <i className='fa-solid fa-star text-warning '></i>
      <i className='fa-solid fa-star text-warning '></i>
      <i className='fa-solid fa-star text-warning '></i>
      <i className='fa-solid fa-star text-warning '></i>
  
  
  
  
  
    
      <div className='d-flex '>
       <div>
          <h3>{hotel?.propertyname}</h3>
          <h6>  {hotel?.propertytype}</h6>
          
       </div>
        
        <h5 className='mt-2 ms-3'><i className='text-primary fa-solid fa-location-dot me-2'></i>{hotel?.address}</h5>
      </div>
  
      </div>
        <div className="row mt-3">
          <div className="col-md-6 " style={{position:"relative"}}>
            <img className='firstImg mt-3 mt-md-0' src={`${serverURL}/uploads/${hotel?.images[0]}`} style={{width:"100%"}} alt="" />
            <button onClick={handleShow} className='btn border border-primary text-primary bg-light ' style={{position:"absolute" ,right:"5%",bottom:"2%"}}> <i className='fa-solid fa-camera text-primary'></i> See all photos</button>
          </div> 
          <div className="col-md-3 gap-3 d-flex flex-column ">
          <img className='mt-3 mt-md-0' src={`${serverURL}/uploads/${hotel?.images[1]}`} style={{width:"100%",height:"192px"}} alt="" />
          <img className='' src={`${serverURL}/uploads/${hotel?.images[2]}`} style={{width:"100%",height:"192px"}} alt="" />
            
          </div>
          <div className="col-md-3 gap-3 d-flex flex-column ">
          <img className="rightTop mt-3 mt-md-0" src={`${serverURL}/uploads/${hotel?.images[3]}`} style={{width:"100%",height:"192px"}} alt="" />
          <img className="rightBottom " src={`${serverURL}/uploads/${hotel?.images[4]}`} style={{width:"100%",height:"192px"}} alt="" />
          </div>
        </div>
  
       
  
        <div className='row mt-3'>
        <div className='col-md-8'>
            <p>{hotel?.description} </p>
  
            <h5>Most Popular facilities </h5>
            <div className='mt-3 '>
         {hotel?.amenities.map(aminity=>(
              <button className="btn btn-light me-2 mb-2 ">  <i className='fa-solid fa-check text-success me-2 '></i>{aminity}</button>
           
         ))}
          
          
        </div>
        </div>
        <div className='col-md-4'>
          <div className=" bg-primary-light p-3">
            
            <p style={{fontSize:"15px"}} className='mb-0'> <i className='fa-solid fa-location-dot'></i> Top location: Highly rated by recent guests </p>
  
            <span style={{fontSize:"14px"}}>From </span><span style={{fontSize:"24px",fontWeight:"500",}} className='text-danger' >₹{hotel?.minPrice}</span>
            <div className="mt-2 d-flex justify-content-between">
              <span className='text-black '>Check in  : {hotel?.checkin}
              </span>
              <span className='text-black'>Check out  : {hotel?.checkout}
              </span>
            </div>
            <div className="col-12">
              <button onClick={scrollToSelectRoom} className='w-100 btn btn-primary mt-3'>Reserve</button>
              <button className='w-100 btn  border-primary mt-3' onClick={handleSaveProperty}>
              <i className='fa-solid fa-heart text-primary'></i>  Save the property
              </button>
  
            </div>
  
  
  
          </div>
        </div>
        </div>
  
        <section id="selectRoom" ref={selectRoomRef}>
          <div className="container mt-3">
            <h4>Select Room</h4>
            <div className="container">
      {/* Table Header */}
      <div className="d-none d-lg-grid grid-container bg-light p-2">
        <div>Type</div>
        <div>Photo</div>
        <div>Occupancy</div>
        <div>Price</div>
        <div>Description</div>
        <div>Amenities</div>
        <div>Reserve</div>
    
      </div>
    
      {/* Table Body */}
      {hotel?.rooms.map((room, index) => (
        <div key={index} className="grid-container border-bottom py-2">
          <div><h6>{room?.roomType}</h6></div>
          <div>
            <img
              src={`${serverURL}/uploads/${room?.images[0]}`}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
              alt="Room"
            />
            <button className='btn' onClick={handleShowRoom}> <i className='fa-solid fa-camera'></i> See all photos</button>
          </div>
          <div><h6 className='ps-3'>  {room?.occupancy} Adults</h6></div>

          <div><h6>₹ {room?.pricePerNight}</h6></div>
          <div><p>{room?.description}</p></div>
          <div>
            {room?.amenities.map((amenity, i) => (
              <span key={i} className="d-block">
                <i className="fa-solid fa-check text-success"></i> {amenity}
              </span>
            ))}
          </div>
          <div><button className='btn border-primary' onClick={()=>handleBooking(room)} >Book Room</button></div>
    
          
        </div>
      ))}
    </div>
    {/* reviews */}
    <div className="my-3">
    <h4>Reviews</h4>
    <div className="row">
      {
        hotel?.reviews?.filter(review=>review.status=="approved").map(review=>(
  <div className="col-md-3 mb-3">
        <div className="card p-3">
          <h6>{review.userId?.name} </h6>
          <span>{review.createdAt.split("T")[0]}</span>
          <h6>
           {Array.from({length:review.rating}).map((_,index)=>(
            <i className='fa-solid fa-star text-warning'></i>
           ))}
          </h6>
            <p>{review.comment}</p>
    
        </div>
      </div>
        ))
      }
      
     
    
    </div>
    
    {/* add review */}
    <h6>Add review</h6>
    <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
          <Rating
            name="hover-feedback"
            value={value}
            precision={1}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Box>
    <textarea value={review} onChange={(e)=>setReview(e.target.value)} name="" style={{minHeight:"150px"}} className='input form-control' placeholder='Write your review here...' id=""></textarea>
    <button onClick={handleReviewSubmit} className='black-btn mt-3 text-end '> Submit</button>
    </div>
          </div>
        </section>
        {/* images modal */}
        <Modal show={show} size='xl' onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>All images</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
                {
                  hotel?.images.map(image=>(
                    <div className="col-md-4">
                    <img style={{width:"100%",height:"192px"}} className='img-fluid mb-3' src={`${serverURL}/uploads/${image} `}alt="" />
  
              </div>
                  ))
                }
            </div>
          </Modal.Body>
          
        </Modal>
        <Modal show={showRoom} size='lg' onHide={handleCloseRoom}>
          <Modal.Header closeButton>
            <Modal.Title>All images</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
                {
                  hotel?.rooms.map(room=>(
                    room.images.map(image=>(
                      <div className="col-md-4">
                      <img style={{width:"100%",height:"192px"}} className='img-fluid mb-3' src={`${serverURL}/uploads/${image} `}alt="" />
    
                </div>
                    ))
                  ))
                
                }
            </div>
          </Modal.Body>
          
        </Modal>

        <Modal size='lg' show={showBookingForm} onHide={handleCloseBookingForm}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/*booking form  */}
          <BookingForm isBookingConfirmed={isBookingConfirmed} setIsBookingConfirmed={setIsBookingConfirmed}  hotel={hotel} room={selectedRoom}/>
        </Modal.Body>

      </Modal>
      </div>
        <Footer></Footer>
  </div>
  )
}

export default HotelDetails