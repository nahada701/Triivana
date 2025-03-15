import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllHotelsApi, updateHotelStatusApi } from '../../../Services/allApi'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import serverURL from '../../../Services/ServerURL';
import Spinner from '../../../components/Shared/Spinner';
function PropertyManagment() {

  const [allHotels, setAllHotel] = useState()
  const [selectedHotel, setSelectedHotel] = useState()


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (hotel) => {
    setSelectedHotel(hotel)
    setShow(true)
  }

  useEffect(() => {
    getAllHotels()
  }, [])

  const getAllHotels = async () => {
    const token = sessionStorage.getItem("superAdminToken")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"

      }

      try {

        const result = await getAllHotelsApi(reqHeader)
        console.log(result);
        setAllHotel(result.data)

      } catch (error) {
        console.log(error);

      }
    } else {
      console.log("permission denied");

    }
  }


  // 
  const updateHotelStatus = async(id,status) => {

 const token = sessionStorage.getItem("superAdminToken")
        const reqHeader = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"

        }
        if(token){
            try {
                const result =await updateHotelStatusApi({id,status},reqHeader)
                console.log(result);
                getAllHotels()
          
                
            } catch (error) {
                console.log(error);
                
            }
        }
  }
  return (
    <div>
      {
        allHotels?.length > 0 ?
          <div>
            <div className='table-responsive' >
              <h3 className='text-center '>All Properties</h3>
              <table className='table'>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Place</th>
                    <th>Owner</th>
                    <th>email</th>
                    <th>phone</th>
                    <th>Details</th>
                    <th>Aproval Status</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    allHotels?.length > 0 &&
                    allHotels.map((hotel, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{hotel?.propertyname}</td>
                        <td>{hotel?.place}</td>
                        <td>{hotel?.adminId?.firstname} {hotel?.adminId?.lastname}</td>
                        <td>{hotel?.email}</td>
                        <td>{hotel?.phone}</td>

                        <td><button className='btn' onClick={() => handleShow(hotel)}>view all details</button></td>
                        <td>
                         { hotel.status=="pending"&& <div className='d-flex gap-2 '>
                            <button className='btn btn-success ' onClick={() => updateHotelStatus(hotel._id,"approved")}><i className='fa-solid fa-check text-light' ></i></button>
                            <button className='btn btn-danger' onClick={() => updateHotelStatus(hotel._id,"rejected")}><i className='fa-solid fa-xmark text-light'></i></button>

                          </div>}
                          {
                            hotel.status=="approved"&&
                            <button className='btn btn-success ' >Approved</button>

                          }
                                             {
                            hotel.status=="rejected"&&
                            <button className='btn btn-danger ' >Rejected</button>

                          }
                        </td>
                      </tr>
                    ))}

                </tbody>

              </table>
            </div>



            <Modal size='xl' show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Property Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className=' mb-4 pb-3 p-3'>
                 <div className='d-flex justify-content-between'>
                    <h3>{selectedHotel?.propertyname}</h3>
                    <button className={`btn ${selectedHotel?.status == "pending" && 'btn-warning'} ${selectedHotel?.status == "approved" && 'btn-success'} ${selectedHotel?.status == "rejected" && 'btn-danger'} `} >{selectedHotel?.status}</button>
                    
                 </div>
                 <h6 >Check in :{selectedHotel?.checkin}   Check Out {selectedHotel?.checkout}</h6>
                 <div className="row my-3">
                    {selectedHotel?.images.map(image=>(
                        <div className="col-md-3 mb-2">
                        <img className='rounded' src={`${serverURL}/uploads/${image}`} style={{ width: "100%", height: "192px" }} alt="" />
                        </div>
                    ))}
                  </div>
                  <p>
                    {selectedHotel?.description}
                  </p>
                  {selectedHotel?.amenities.map(amenity => (
                            <span className=' me-3  py-1' key={amenity}> <i className='fa-solid fa-check text-success'></i> {amenity}</span>

                  ))}

                  <div className="p-4 ">
                    <h5>Rooms</h5>

                    {selectedHotel?.rooms?.length > 0 ?
                      selectedHotel?.rooms.map(room => (
                        <div className='border rounded mb-3  p-3'>
                          <div className='d-flex justify-content-between '>
                            <h5>{room?.roomType}   ({room?.numberOfRooms} Rooms)</h5>
  
                         
                             
                              <h5 className='text-danger'> ₹ {room?.pricePerNight} Per Night</h5>
                    
                          </div>
                          <div className="row my-3">
                            {
                              room?.images?.map(images=>(
                                <div className="col-md-3 mb-2">
                                <img className="rounded " src={`${serverURL}/uploads/${images}`} style={{ width: "100%", height: "192px" }} alt="" />
                                </div>
                              ))
                            }
                          
                          </div>
                          <p>
                            {room.description}
                          </p>
                          {room.amenities.map(amenity => (
                            <span className=' me-3  py-1' key={amenity}> <i className='fa-solid fa-check text-success'></i> {amenity}</span>

                          ))}
         

                        </div>
                      ))

                      :
                      <p>No room data added</p>
                    }

                  </div>
     
                </div>
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

          </div>
          :
          <Spinner/>

      }

    </div>
  )
}

export default PropertyManagment