import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cancelBookingsApi, getupcomingBookingsApi, sendCancellationMailApi, settlePaymentApi, updatePaymentApi } from '../../../Services/allApi'
import Spinner from '../../Shared/Spinner'
import Modal from 'react-bootstrap/Modal';
import { Form, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function Bookings() {

  const [bookings, setBookings] = useState()

  const [filteredBookings,setFilteredBookings]=useState()

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setCancelEnabled(false)
    setCancelReason("")
    setSendMail(false)
    setPaymentDone(false);
    setAddPaymetClicked(false)
    setCancelBookingClicked(false)
    setPaymentMethod("")
  
  };
  const handleShow = (booking) => {
    setShow(true)
    setSelctedBooking(booking)
  };

  const [selectedBooking,setSelctedBooking]=useState()
  console.log(selectedBooking);
  
  const [cancelEnabled, setCancelEnabled] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [sendMail,setSendMail]=useState(false)

  console.log(cancelEnabled,cancelReason,sendMail);
  

  const [paymentDone, setPaymentDone] = useState(false);

  const[addPaymentClicked,setAddPaymetClicked]=useState(false)
  const[cancelBookingClicked,setCancelBookingClicked]=useState(false)


  const [enteredAmount, setEnteredAmount] = useState(0);
  const [paymentMethod,setPaymentMethod]=useState("")


  const [guestName,setGuestName]=useState("")
  const [isLoading,setIsLoading]=useState(false)


  useEffect(() => {
    getupcomingBookings()
  }, [])
  const getupcomingBookings = async () => {
    const token = sessionStorage.getItem("adminToken")
    setIsLoading(true)
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
      try {
        const result = await getupcomingBookingsApi(reqHeader)
        console.log(result);
        if(result.status==200){
          setIsLoading(false)
          setBookings(result.data)
          setFilteredBookings(result.data)
        }

      } catch (err) {
        console.log(err);

      }
    }
  }

  const handleCancelBooking=async()=>{
    const token = sessionStorage.getItem("adminToken")

    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
      const bookingId=selectedBooking?._id
      try{  
        const result=await cancelBookingsApi(bookingId,reqHeader)
        console.log("booking canceled")
        if(result.status==200)
          if(sendMail==true){
            {
              const reqBody={
                name:selectedBooking?.name,email:selectedBooking?.email,reason:cancelReason,propertyname:selectedBooking?.hotelName,checkInDate:selectedBooking?.checkInDate,checkOutDate:selectedBooking?.checkOutDate
        
              }
              try{
                const mailResult=await sendCancellationMailApi(reqBody,reqHeader)
                console.log(mailResult);
                if(mailResult.status==200){
                  handleClose()
                  toast.success("Booking cancelled Successfully")
                  getupcomingBookings()
                }
                

              }
              catch(err){
                console.log(err);
                toast.success("Booking cancelled Successfully")
                getupcomingBookings()
                
              }

            } 
          }
          else{
            handleClose()
          }
              
      }
      catch(err){
        console.log(err);
        
      }
      
    }

  }
  const getPaymentStatusMessage = () => {
  const totalAmount = selectedBooking?.totalprice || 0;
  
  if (enteredAmount == totalAmount) {
    return <p className=" text-center fw-bold mt-4 text-success">Amount Fully Paid</p>;
  } else if (enteredAmount > totalAmount) {
    return <p className="text-warning text-center mt-4  fw-bold ">Balance to be given: ₹{enteredAmount - totalAmount}</p>;
  } else {
    return <p className="text-danger text-center mt-4  fw-bold ">Balance to be paid: ₹{totalAmount - enteredAmount}</p>;
  }
};

const handleSearch=async(e)=>{
  setGuestName(e.target.value)

  const filteredBooking = bookings?.filter((booking) =>
    booking?.name?.toLowerCase().includes(e.target.value.toLowerCase())
  );
  setFilteredBookings(filteredBooking)
}

const handlePayment=async()=>{
  const token = sessionStorage.getItem("adminToken")

  if (token) {
    const reqHeader = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
    const bookingId=selectedBooking?._id
    const reqBody={paymentMade:enteredAmount,paymentMethod,amountToBePaid:selectedBooking?.totalprice}
    console.log(reqBody);
    
    const result=await updatePaymentApi(bookingId,reqBody,reqHeader)

    console.log(result);
    if(result.status==200){
      getupcomingBookings()
      handleClose()
      toast.success("Payment added")
    }
     
    

  }
}

const handleMarkAsPaid=async()=>{
  const token = sessionStorage.getItem("adminToken")

  if (token) {
    const reqHeader = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
    const bookingId=selectedBooking?._id
    const result=await settlePaymentApi(bookingId,reqHeader)
    console.log(result);
    if(result.status==200){
      handleClose()
      toast.success("Payment settled Successfully")
      getupcomingBookings()
    }
    
  }
}

  return (
    <div className='container'>
      <div className="d-flex justify-content-between py-3">
        <h3>Upcoming Bookings</h3>
        <input type="text" className='form-control w-50 '    value={guestName} placeholder='Search Guest Name' onChange={(e)=>handleSearch(e)} />
        <button className='black-btn'><Link className='text-light text-decoration-none' to={'/dashboard/bookings/history'}>View booking history</Link></button>
      </div>
    { isLoading?<Spinner></Spinner>: 
    bookings?.length > 0 ?
        <table className="table">
          <thead>
            <tr>
              <th>SlNo</th>
              <th>Guest</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Property</th>
              <th>Room</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Amount</th>
              <th>Status</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {

              filteredBookings?.map((booking, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{booking?.name}</td>
                  <td>{booking?.email}</td>
                  <td>{booking?.phone}</td>
                  <td>{booking?.hotelName}</td>
                  <td>{booking?.roomType}</td>
                  <td>{booking?.checkInDate.split("T")[0]}</td>
                  <td>{booking?.checkOutDate.split("T")[0]}</td>
                  <td>₹{booking?.totalprice}</td>

                  <td className={booking.status == "confirmed" ? `text-success` : "text-danger"}>{booking.status}</td>



                  <td>
                    <button className="btn  btn-dark btn-sm" onClick={()=>handleShow(booking)}>
                      Click
                    </button>
                  </td>
                </tr>
              ))
            }


          </tbody>
        </table>
        :
        <p className='text-center fs-2 my-5 py-5'>No Bookings Found</p>
      }
      <Modal   show={show} onHide={handleClose}   backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='detials'>
            <div className='d-flex justify-content-between'>
              <h6>Guest Name</h6>
              <h6 className='text-primary'>{selectedBooking?.name}</h6>
            </div>
            <div className='d-flex justify-content-between'>
              <h6>Email</h6>
              <h6 >{selectedBooking?.email}</h6>
            </div>
            <div className='d-flex justify-content-between'>
              <h6>Phone</h6>
              <h6 >{selectedBooking?.phone}</h6>
            </div>
            <div className='d-flex justify-content-between'>
              <h6>Request (any)</h6>
              <h6 >{selectedBooking?.request?selectedBooking?.request:"No request"}</h6>
            </div>
           {selectedBooking?.status=="confirmed" &&   <div className='d-flex justify-content-between mt-3'>
              <button className={`btn border border-dark border-2 ${addPaymentClicked&&"btn-dark"}`}onClick={()=>setAddPaymetClicked(!addPaymentClicked)}>Add payment <i className='fa-solid fa-arrow-right'></i></button>
              <button disabled={selectedBooking?.paymentStatus=="paid"||selectedBooking?.paymentStatus=="partial"} className={`btn border border-dark border-2 ${cancelBookingClicked&&"btn-dark"}`} onClick={()=>setCancelBookingClicked(!cancelBookingClicked)}>Cancel Booking <i className='fa-solid fa-arrow-right'></i></button>
            </div>}
        </div>
   {selectedBooking?.status=="confirmed" && selectedBooking?.paymentStatus=="pending" && addPaymentClicked &&  
   <div className='payment-status'>
            <hr />
            <h5>Payment Status </h5> 
        <div className=' my-4 d-flex justify-content-between align-items-center'>
              <Form.Check
            type="switch"
            id="payment-status"
            label="Payment Done"
            checked={paymentDone}
            onChange={() => setPaymentDone(!paymentDone)}
            className={paymentDone ? "switch-red" : ""}
          />
            { paymentDone &&
          <select className='form-control w-50' value={paymentMethod} onChange={(e)=>setPaymentMethod(e.target.value)} >
            <option value="" hidden>Payment Method</option>

            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="UPI">UPI</option>
          </select>
           
          }  

      
          </div>
          { paymentDone &&      <FloatingLabel controlId="floatingAmount" label="₹ Amount Paid">
        <Form.Control type="number" placeholder="₹ Amount Paid"  value={enteredAmount}
                onChange={(e) => setEnteredAmount(Number(e.target.value))}
 />
      </FloatingLabel>
           
          }  
        
       
              {paymentDone && getPaymentStatusMessage()}
              <div className='d-flex justify-content-center my-4'>     <button className='btn border  border-primary border-2 ' disabled={!paymentDone} onClick={handlePayment}>Save Changes</button></div>
                </div> 
     }
       {selectedBooking?.status=="confirmed" && selectedBooking?.paymentStatus=="partial" && addPaymentClicked &&  
   <div className='payment-status'>
            <hr />
            <h5>Payment status </h5> 
            
           
              <p  className='text-danger fw-bold'>Amount to be paid:{ selectedBooking?.totalprice-selectedBooking?.paymentMade }</p>
              <button className='btn border border-2 border-success' onClick={handleMarkAsPaid}>Mark as paid</button>
            
                </div> 
     }
          
          {selectedBooking?.status=="confirmed" && selectedBooking?.paymentStatus=="paid" && addPaymentClicked &&  
   <div className='payment-status'>
            <hr />
            <h5>Payment status </h5> 

            {
              selectedBooking?.totalPrice<selectedBooking?.paymentMade ?
             <div>
                <p  className='text-warning fw-bold'>Amount to be given:{ selectedBooking?.paymentMade-selectedBooking?.totalprice }</p>
  
                <button className='btn border border-2 border-success' onClick={handleMarkAsPaid}>Mark as paid</button>
             </div>
              :
              <p className='text-success fw-bold'>Amount fully paid</p>
            }
      
       
          
      
                </div> 
     }
  { cancelBookingClicked&& <div className='cancel-booking'>
            <hr />
            <h5>Cancel booking</h5>
            <div className='d-flex justify-content-between align-items-center mt-2'>
              <h6>Current Booking Status</h6>
              <btn className={selectedBooking?.status=="confirmed"?"btn  fw-bold text-success":"fw-bold btn text-danger"} >{selectedBooking?.status}</btn>
  
            </div>
  
            <div className='d-flex justify-content-between align-items-center mt-2' >
          {selectedBooking?.status!="canceled"&&  <div className="d-flex align-items-center">
        <Form.Check
          type="switch"
          id="cancel-switch"
          label="Enable Cancellation"
          checked={cancelEnabled}
          onChange={() => setCancelEnabled(!cancelEnabled)}
          className={cancelEnabled ? "switch-red" : ""}
        />
            </div>}
              {cancelEnabled && <select value={cancelReason} onChange={(e)=>setCancelReason(e.target.value)} className='form-control w-50 p-1 ' name="" id="">
                <option  hidden>Select Reason</option>
                {["Guest Didn't Show Up", "Guest Requested Cancellation", "Payment Issue", "Double Booking", "Property Maintenance Issue", "Fraudulent Booking"].map((reason, index)=>(
                <option  key={index} value={reason} >{reason}</option>
                ))}
              </select>}
            </div>
  
         
          {cancelEnabled &&  <div className='d-flex justify-content-between align-items-center mt-2 '>
              <Form.Check
            type="switch"
            id="email-switch"
            label="Send Email to the customer"
            checked={sendMail}
            onChange={() => setSendMail(!sendMail)}
            className={sendMail ? "switch-red" : ""}
          />
          </div>}
         <div  className='d-flex justify-content-end'>
            <Button className='ms-auto' disabled={!cancelEnabled} variant="danger" style={{fontSize:"13px"}} onClick={handleCancelBooking}>
                
                Cancel Booking
              </Button>
         </div>
    </div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" style={{fontSize:"13px"}} onClick={handleClose}>
            Close
          </Button>
       
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Bookings