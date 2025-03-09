import React, {  useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { banUserApi, getAllUsersApi, getUserDetailsApi, unbanUserApi } from '../../../Services/allApi'
import Spinner from '../../../components/Shared/Spinner'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { all } from 'axios';

function UserManagement() {

    const[bookings,setBookings]=useState()
    const[canceledBookings,setCanceledBookings]=useState()
    const[confirmedBookings,setConfirmedBookings]=useState()
    const[totalSpend,setTotalSpend]=useState()

   


    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = async(userId) => {
        setShow(true);
        const token = sessionStorage.getItem("superAdminToken")
        if (token) {
          const reqHeader = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
    
          }
        try {
            
            const result=await getUserDetailsApi(userId,reqHeader)
            console.log(result);
            if(result.status==200){
                setBookings(result.data.bookings)
                setTotalSpend(result.data.totalPrice)
                setCanceledBookings(result.data.totalCanceled)
                setConfirmedBookings(result.data.totalConfirmed)
              
               
                
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }}
    const [allUsers,setAllUsers]=useState()
    console.log(allUsers);
    

    const [showBanForm, setShowBanForm] = useState(false);
    const[banningUser,setBanningUser]=useState()
    const [banReason,setBanReason]=useState()
    const [numberOfBanDays,setNumOfBanDays]=useState()

    console.log(banReason,numberOfBanDays);
    
    const handleShowBanningForm=(userId)=>{
        setBanningUser(userId)
        setShowBanForm(true)
      }
      const handleCloseBanningForm=()=>{
        setShowBanForm(false)
      }
      const [showUnBanForm, setShowUnBanForm] = useState(false);
      const[unBanningUser,setUnBanningUser]=useState()
     const handleShowUnBanningForm=(userId)=>{
        setUnBanningUser(userId)
        
        setShowUnBanForm(true)
     }
     const handleCloseUnBanningForm=()=>{
        setShowUnBanForm(false)
      }



    useEffect(() => {
     getAllUsers()
    }, [])
    
  
      const getAllUsers = async () => {
        const token = sessionStorage.getItem("superAdminToken")
        if (token) {
          const reqHeader = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
    
          }
    
          try {
    
            const result = await getAllUsersApi(reqHeader)
            setAllUsers(result.data)
           
    
          } catch (error) {
            console.log(error);
    
          }
        } else {
          console.log("permission denied");
    
        }
      }
    

      const handleBanUser=async()=>{
        const token = sessionStorage.getItem("superAdminToken")
        if (token) {
            const reqBody={
                userId:banningUser,banReason,numberOfBanDays:parseInt(numberOfBanDays)
            }
            console.log(reqBody);
            
          const reqHeader = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
          try {
            const result = await banUserApi(reqBody,reqHeader)
            setAllUsers(result.data)
            if(result.status==200){
                getAllUsers()
                toast.success("User banned successfully")
                handleCloseBanningForm()
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("permission denied");
        }
      }

      const handleUnBanUser=async()=>{
        const token = sessionStorage.getItem("superAdminToken")
        if (token) {
          const reqHeader = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
          try {
            const result = await unbanUserApi(unBanningUser,reqHeader)
            setAllUsers(result.data)
            if(result.status==200){
                getAllUsers()
                toast.success("User unbanned successfully")
                handleCloseUnBanningForm()
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("permission denied");
        }
      }
     
      
  return (
    <div>
           <div>
        <div className=' table-responsive' >
            <h3 className='text-center '>Users List</h3>
            {
                allUsers?.length>0?
            <table className='table'>
                <thead>
                    <tr>
                        <th>#id</th>
                        <th>Name</th>
                        <th>email</th>
                        <th>Registerd Date</th>
                        <th>Booking history</th>
                        <th>Action</th>
                       


                    </tr>
                </thead>
                 <tbody> 
                    {
                        allUsers?.length>0 &&
                        allUsers.map((user)=>(
                            <tr>
                            <td>{user?._id}</td>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>{user?.createdAt.split('T')[0]}</td>
                            <th><button className='btn text-primary' onClick={()=>handleShow(user?._id)}>Click</button></th>
    
                            <td>
                                <div className='d-flex gap-2 flex-wrap'>
                                    {
                                        user.isBanned?
                                    <button className='btn border border-success' onClick={()=>handleShowUnBanningForm(user?._id)} >Unban</button>

                                        :
                                    <button className='btn border border-danger ' onClick={()=>handleShowBanningForm(user?._id)}>Banuser</button>
                                    }
    
                                </div>
                            </td>
                            
    
                        </tr>
                        ))
                      
                 
                    }
                    
                </tbody>
                
            </table>
                :
                <Spinner/>
            }
        </div>
    </div>   
     <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <span className='fs-3 text-primary' style={{borderBottom:" 1px solid " }}>Booking Summary</span>
           <br />
          <div className='d-flex gap-3'>
               <div>
                   <h5 className='mt-2 d-flex gap-1'>  Total Bookings: {canceledBookings+confirmedBookings}</h5>
               <    h5 className='mt-2 d-flex gap-1'>  Canceled: {canceledBookings}</h5>
               </div>
               <div>
                   <h5 className='mt-2 d-flex gap-1'>  Completed: {confirmedBookings}</h5>
                   <h5 className='mt-2 d-flex gap-1'>  Total spend: ₹ {totalSpend}</h5>
               </div>
          </div>
         {
            bookings?.length>0&&
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                    <tr>
                        <th>Hotel</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Status</th>
                        <th>Spend</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings?.length>0&&
                        bookings.map((booking)=>(
                            <tr>
                            <td>{booking.hotel.propertyname}</td>
                            <td>{booking.checkInDate.split("T")[0]}</td>
                            <td>{booking.checkOutDate.split("T")[0]}</td>
                            <td className={`${booking.status=="confirmed"?"text-success":"text-danger"}`}>{booking.status}</td>
                            <td>{booking.totalprice}</td>
    
                        </tr>
                        ))
                       }
                </tbody>
              </table>
         </div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

        <Modal size='lg' show={showBanForm} onHide={handleCloseBanningForm}>
        <Modal.Header closeButton>
          <Modal.Title>Banning Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="d-flex gap-3 justify-content-between">
                <input onChange={(e)=>setBanReason(e.target.value)} placeholder='Reason' className='form-control' type="text" name="" id="" />
                <input onChange={(e)=>setNumOfBanDays(e.target.value)} placeholder='Number of days of ban'  className='form-control'  type="number" name="" id="" />

            </div>
           
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseBanningForm}>
            Close
          </Button>
          <Button variant="danger" onClick={handleBanUser}>
            Ban user
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size='lg' show={showUnBanForm} onHide={handleCloseUnBanningForm}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure You want to unban user?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {
  Array.isArray(allUsers) && allUsers.length > 0 ? (
    (() => {
      const user = allUsers.find(user => user?._id === unBanningUser);
      return user ? (
        <div className='d-flex justify-content-between'>
          <h5><span className='text-danger'>Banning Reason:</span> {user.banReason}</h5>
          <h5><span className='text-danger'>Banned Until: </span>{user.bannedUntil ? user.bannedUntil.split("T")[0] : "N/A"}</h5>
        </div>
      ) : (
        <p>User not found</p>
      );
    })()
  ) : (
    <p>Loading users...</p>
  )
}



           
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUnBanningForm}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUnBanUser}>
            Unban user
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UserManagement