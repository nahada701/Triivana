import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {  addRoomsApi, EditRoomApi, getRoomByRoomId } from '../../Services/allApi';
import { toast } from 'react-toastify';
import serverURL from '../../Services/serverURL';
import { addRoomResponseContext} from '../../context/ContextApi';
function AddNewRoom({hId}) {

    const{addRoomResponse,setaddRoomResponse}=useContext(addRoomResponseContext)
    
    const [show, setShow] = useState(false);
  
    const handleClose = () => {
    
     
      setShow(false)
    };
    const handleShow = () => setShow(true);
  
    const [roomData, setRoomData] = useState({
        roomType: '',
        numberOfRooms: '',
        occupancy:'',
        pricePerNight: '',
        description: "",
        amenities: [],
        images:[]
      })
      console.log("room", roomData);
   

   
        
       
        const handleAmenitiesChange = (amenity) => {
            // Ensure we are working with an object, not an array
            const updatedRoom = { ...roomData }; 
            const roomAmenities = updatedRoom.amenities || [];
          
            if (roomAmenities.includes(amenity)) {
              // Remove amenity if already selected
              updatedRoom.amenities = roomAmenities.filter(item => item !== amenity);
            } else {
              // Add amenity if not already selected
              updatedRoom.amenities = [...roomAmenities, amenity];
            }
          
            setRoomData(updatedRoom);
          };
          
      
      
      
        // Handle removal of new images (removes by file object)
        const handleRemoveImage = (index) => {
            const updatedImages = roomData?.images?.filter((_, i) => i !== index);
            setRoomData({ ...roomData, images: updatedImages });
        };
        const handleImageUploadRoom = (e) => {
          const selectedImages = Array.from(e.target.files);
          setRoomData({ ...roomData,images: [...roomData?.images, ...selectedImages]
          });
        }
      
        const handleRoomDataChange = (field, e) => {
            const updatedRoom = { ...roomData }; // Create a copy of the existing roomData object
            updatedRoom[field] = e.target.value; // Update the specific field
            setRoomData(updatedRoom); 
        }
      

        const handleAddRoom=async()=>{
               const { roomType, numberOfRooms, occupancy, pricePerNight, description,amenities, images } = roomData;
         
                 if (!roomType || !numberOfRooms || !occupancy || !pricePerNight || !description || !amenities ) {
                     toast.warning("Please fill all the required fields");
                     return;
                 }
             
                 const reqBody = new FormData();
                 reqBody.append("hotelId", hId);
                 reqBody.append("roomType", roomType);
                 reqBody.append("numberOfRooms", numberOfRooms);
                 reqBody.append("occupancy", occupancy);
                 reqBody.append("pricePerNight", pricePerNight);
                 reqBody.append("description", description);
             
                 amenities.forEach(amenity => reqBody.append("amenities", amenity));
             
                 images.forEach(image => reqBody.append("images", image));
             
                 const adminToken = sessionStorage.getItem("adminToken");
                 if (!adminToken) {
                     console.log("Cannot get admin token");
                     return;
                 }
             
                 const reqHeader = {
                     "Authorization": `Bearer ${adminToken}`,
                    "Content-Type": "multipart/form-data",
                 };
             
                 try {
                     const response = await addRoomsApi( reqBody, reqHeader);
              
             
                     if (response.status === 200) {
                         toast.success("Room added successfully!");
                         setaddRoomResponse(response.data)
                         handleClose()
                     } else {
                         toast.error("Failed to update Room");
                     }
                 } catch (err) {
                     console.error("Error Adding Room:", err);
                     toast.error("Something went wrong!");
                 }
        }
   
  return (
    
    <div>
            <div>
                <div className=''>
                <button className='btn btn-dark ' onClick={handleShow}>Add New Room +</button>
                </div>
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                  size='lg'
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Add New Room Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                   
                  <div>
              
            
                  <div className="row border py-3 mt-2 mb-3">
                  
                    <div className="col-lg-6">
                      <Form.Select value={roomData?.roomType} onChange={(e) => handleRoomDataChange("roomType", e)} className='mb-3' style={{ height: "58px" }} aria-label="Default select example">
                      <option>Room type</option>
                      <option value="Single">Single</option>
                      <option value="Double">Double</option>
                      <option value="Suite">Suite</option>
                      <option value="Deluxe">Deluxe</option>
                      <option value="Twin">Twin</option>
                      <option value="King">King</option>
                      <option value="Queen">Queen</option>

                      </Form.Select>
                    </div>
                    <div className="col-lg-6">
                      <FloatingLabel
                        controlId="floatingInput1"
                        label="No of rooms"
                        className="mb-3"
                      >
                        <Form.Control value={roomData?.numberOfRooms} onChange={(e) => handleRoomDataChange( "numberOfRooms", e)} type="number" placeholder="No of rooms" />
                      </FloatingLabel>
                    </div>
                    <div className="col-lg-6">
                      <FloatingLabel
                        controlId="floatingInput10"
                        label="Price per Night"
                        className="mb-3"
                      >
                        <Form.Control value={roomData.pricePerNight} onChange={(e) => handleRoomDataChange( "pricePerNight", e)} type="number" placeholder="Price per Night" />
                      </FloatingLabel>
                    </div>
                    <div className="col-lg-6">
                      <FloatingLabel
                        controlId="floatingInput12"
                        label="Max Occupancy"
                        className="mb-3"
                      >
                        <Form.Control value={roomData.occupancy} onChange={(e) => handleRoomDataChange( "occupancy", e)} type="text" placeholder="Occupancy" />
                      </FloatingLabel>
                    </div>
                    <div className="col-12">
                      <FloatingLabel
                        controlId="floatingInput11"
                        label="Description of Room"
                        className="mb-3"
                      >
                        <Form.Control value={roomData.description} onChange={(e) => handleRoomDataChange( "description", e)} type="text" placeholder="Description" />
                      </FloatingLabel>
                    </div>

                    <label className='ps-3' htmlFor="">
                      Amenities
                    </label>
                    <div id='group1' className="col-lg-12 mb-3 ps-3"  >

                      {[
                     "Balcony", "Air Conditioning", "Heating", "Smart TV", "Free WiFi",
                     "Mini-Bar", "Refrigerator", "Coffee Maker", "Microwave", "Work Desk",
                     "Safe", "Wardrobe", "Blackout Curtains", "Ensuite Bathroom",
                     "Bathtub", "Rain Shower", "Toiletries", "Hair Dryer", "Digital Key"
                      ].map((amenity, i) => (
                        <Button
                          key={i}
                          variant={roomData?.amenities?.includes(amenity) ? 'primary' : 'outline-secondary'}
                          size="sm"
                          className="m-1"
                          onClick={() => handleAmenitiesChange( amenity)}
                        >
                          {amenity}
                        </Button>
                      ))}
                    </div>
                    <div className="col-lg-12  p-3  d-flex align-items-center justify-content-center ">
                    <div className="w-75" style={{ minHeight: "200px" }}>
                    <label style={{
                        display: "block",
                        padding: "15%",
                        border: "2px dashed blue",
                        cursor: "pointer",
                        textAlign: "center",
                        marginBottom: "10px",
                    }}>
                        Click to add images
                        <input
                            type="file"
                            multiple
                            onChange={handleImageUploadRoom}
                            style={{ display: "none" }}
                            accept="image/*"
                        />
                    </label>
                </div>

                    </div>
                    <div className="d-flex flex-wrap gap-2">
                {/* Show Existing Images */}
           

                {/* Show New Images */}
                {roomData?.images?.map((image, index) => (
                    <div key={index} style={{ position: "relative" }}>
                        <img src={URL.createObjectURL(image)} alt="New Room"
                            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }}
                        />
                        <button
                            onClick={() => handleRemoveImage(index)}
                            style={{
                                position: "absolute",
                                top: "1%",
                                right: "1%",
                                background: "black",
                                color: "white",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            ✕
                        </button>
                    </div>
                ))}
              </div> 
                  </div>
        


            </div>
                    
        
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
          
                    </Button>
                  
                      <Button variant="primary" onClick={handleAddRoom} >
                        Add Room</Button>
                    
                  </Modal.Footer>
                </Modal>
              </div>
      
    </div>
  )
}

export default AddNewRoom