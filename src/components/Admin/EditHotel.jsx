import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addHotelApi, addRoomsApi, EditHotelApi, getHotelDetialsByIdApi } from '../../Services/allApi';
import { toast } from 'react-toastify';
import serverURL from '../../Services/ServerURL';
import { editHotelResponseContext } from '../../context/ContextApi';

function EditHotel({hId}) {
    const { editHotelResponse,setEditHotelResponse } = useContext(editHotelResponseContext)
  
    const [hotelData,setHotelData]=useState(
        { propertyname: "",
         propertytype: "",
         phone: "",
         email: "",
         address: "",
         place: "",
         minPrice: "",
         description: "",
         checkin: "",
         checkout: "",
         amenities: [],
         existingImages: [], // Already uploaded images (URLs from backend)
         newImages: [] }
     )
  
     
    useEffect(() => {
    getHotelDetialsById()
    }, [])

    const getHotelDetialsById=async()=>{
        const token = sessionStorage.getItem("adminToken")

        if (token) {
          const reqHeader = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
    
          try {

            const response=await getHotelDetialsByIdApi(hId,reqHeader)
            console.log(response);
            if (response.status === 200) {
                const hotel = response.data;
                setHotelData({
                    ...hotelData,
                    propertyname: hotel.propertyname,
                    propertytype: hotel.propertytype,
                    phone: hotel.phone,
                    email: hotel.email,
                    address: hotel.address,
                    place: hotel.place,
                    minPrice: hotel.minPrice,
                    description: hotel.description,
                    checkin: hotel.checkin,
                    checkout: hotel.checkout,
                    amenities: hotel.amenities,
                    existingImages: hotel.images // Load existing images from backend
                });
            }
          }
          catch(err){
            console.log(err);
            
          }

        }

    }


    const handleUpdateHotel = async () => {
      const { propertyname, propertytype, phone, email, address, place, minPrice, description, checkin, checkout, amenities, existingImages, newImages } = hotelData;
  
      if (!propertyname || !propertytype || !phone || !email || !address || !place || !minPrice || !description || !checkin || !checkout) {
          toast.warning("Please fill all the required fields");
          return;
      }
  
      const reqBody = new FormData();
      reqBody.append("propertyname", propertyname);
      reqBody.append("propertytype", propertytype);
      reqBody.append("phone", phone);
      reqBody.append("email", email);
      reqBody.append("address", address);
      reqBody.append("place", place);
      reqBody.append("minPrice", minPrice);
      reqBody.append("description", description);
      reqBody.append("checkin", checkin);
      reqBody.append("checkout", checkout);
  
      amenities.forEach(amenity => reqBody.append("amenities", amenity));
  
      // Add existing images (image URLs)
      existingImages.forEach(image => reqBody.append("existingImages", image));
  
      // Add new uploaded images (File objects)
      newImages.forEach(image => reqBody.append("newImages", image));
  
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
          const response = await EditHotelApi(hId, reqBody, reqHeader);
   
  
          if (response.status === 200) {
              toast.success("Hotel updated successfully!");
              setEditHotelResponse(response.data)
              handleClose()
          } else {
              toast.error("Failed to update hotel");
          }
      } catch (err) {
          console.error("Error updating hotel:", err);
          toast.error("Something went wrong!");
      }
  };
  

    
    const cities = [
      "Port Blair", "Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Kurnool", "Nellore",
      "Itanagar", "Tawang", "Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Patna", "Gaya",
      "Muzaffarpur", "Bhagalpur", "Raipur", "Bilaspur", "Durg", "Bhilai", "Panaji", "Vasco da Gama",
      "Margao", "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar",
      "Gurgaon", "Faridabad", "Panipat", "Karnal", "Hisar", "Shimla", "Manali", "Dharamshala",
      "Kullu", "Ranchi", "Jamshedpur", "Dhanbad", "Bangalore", "Mysore", "Mangalore",
      "Hubli-Dharwad", "Belgaum", "Kochi", "Thiruvananthapuram", "Kozhikode", "Kollam",
      "Thrissur", "Alappuzha", "Indore", "Bhopal", "Gwalior", "Jabalpur", "Ujjain", "Mumbai",
      "Pune", "Nagpur", "Nashik", "Aurangabad", "Kolhapur", "Imphal", "Shillong", "Aizawl",
      "Kohima", "Dimapur", "Bhubaneswar", "Cuttack", "Rourkela", "Puri", "Amritsar", "Ludhiana",
      "Jalandhar", "Patiala", "Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer", "Gangtok",
      "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Erode", "Hyderabad",
      "Warangal", "Agartala", "Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut", "Ghaziabad",
      "Prayagraj", "Dehradun", "Haridwar", "Nainital", "Rishikesh", "Kolkata", "Howrah",
      "Darjeeling", "Durgapur", "Asansol"
    ]
  
  

    const [show, setShow] = useState(false);
  
    const handleClose = () => {
    
     
      setShow(false)
    };
    const handleShow = () => setShow(true);
  
    const handleRemoveExistingImage = (index) => {
      const updatedExistingImages = hotelData?.existingImages?.filter((_, i) => i !== index);
      setHotelData({ ...hotelData, existingImages: updatedExistingImages });
  };


  // Handle removal of new images (removes by file object)
  const handleRemoveNewImage = (index) => {
      const updatedNewImages = hotelData?.newImages?.filter((_, i) => i !== index);
      setHotelData({ ...hotelData, newImages: updatedNewImages });
  };
  const handleImageUploadHotel = (e) => {
    const selectedImages = Array.from(e.target.files);
    setHotelData({ ...hotelData,newImages: [...hotelData.newImages, ...selectedImages]
    });
    
 
};
   
  
    //
 
  
    const handleAmenitiesChange = (index, amenity) => {
    
     
        if (hotelData.amenities.includes(amenity)) {
          setHotelData({ ...hotelData, amenities: hotelData.amenities.filter(ame => ame !== amenity) })
  
        }
        else {
          setHotelData({ ...hotelData, amenities: [...hotelData.amenities, amenity] })
        }
      
    };
  

  
      
    return (
      <div>
        <div className=''>
        <button className='btn btn-light ms-3' onClick={handleShow}>Edit Property</button>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size='lg'
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit property details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           
              <div className='row'>
                <div className='col-lg-6'>
                  <FloatingLabel
                    controlId="floatingInput1"
                    label="Property Name"
                    className="mb-3"
                  >
                    <Form.Control value={hotelData?.propertyname} onChange={(e) => setHotelData({ ...hotelData, propertyname: e.target.value })} type="text" placeholder="Property Name" />
                  </FloatingLabel>
  
                </div>
                <div className='col-lg-6'>
                  <Form.Select value={hotelData?.propertytype} onChange={(e) => setHotelData({ ...hotelData, propertytype: e.target.value })} className='mb-3' style={{ height: "58px" }} aria-label="Default select example">
                    <option>Property type</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Resort">Resort</option>
                    <option value="Cottage">Cottage</option>
  
  
                  </Form.Select>
                </div>
                <div className="col-lg-6">
                  <FloatingLabel
                    controlId="floatingInput3"
                    label="Phone"
                    className="mb-3"
                  >
                    <Form.Control value={hotelData?.phone} onChange={(e) => setHotelData({ ...hotelData, phone: e.target.value })} type="number" placeholder="Phone" />
                  </FloatingLabel>
                </div>
                <div className="col-lg-6">
                  <FloatingLabel
                    controlId="floatingInput4"
                    label="Email"
                    className="mb-3"
                  >
                    <Form.Control value={hotelData?.email} onChange={(e) => setHotelData({ ...hotelData, email: e.target.value })} type="email" placeholder="Email" />
                  </FloatingLabel>
                </div>
                <div className="col-lg-6">   <FloatingLabel
                  controlId="floatingInput4"
                  label="Check in"
                  className="mb-3"
                >
                  <Form.Control value={hotelData?.checkin} onChange={(e) => setHotelData({ ...hotelData, checkin: e.target.value })} type="time" placeholder="Check in" />
                </FloatingLabel></div>
                <div className="col-lg-6">
                  <FloatingLabel
                    controlId="floatingInput4"
                    label="Check out"
                    className="mb-3"
                  >
                    <Form.Control value={hotelData?.checkout} onChange={(e) => setHotelData({ ...hotelData, checkout: e.target.value })} type="time" placeholder="Check out" />
                  </FloatingLabel>
                </div>
                <div className="col-lg-6">
                <select value={hotelData?.place} onChange={(e)=>setHotelData({...hotelData,place:e.target.value})} style={{ height:"55px", outline: "none" }} className="border mb-3 rounded w-100" name="" id="">
                    <option value="">Place</option>
                    {cities.sort((a, b) => a.localeCompare(b)).map(city => (
                      <option value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-6">
                  <FloatingLabel
                    controlId="floatingInput4"
                    label="Minimum Price Per Night"
                    className="mb-3"
                  >
                    <Form.Control value={hotelData?.minPrice} onChange={(e) => setHotelData({ ...hotelData, minPrice: e.target.value })} type="email" placeholder="Email" />
                  </FloatingLabel>
                </div>
  
                <div className="col-lg-12">
                  <FloatingLabel
                    controlId="floatingInput2"
                    label="Address"
                    className="mb-3"
                  >
                    <Form.Control value={hotelData?.address} onChange={(e) => setHotelData({ ...hotelData, address: e.target.value })} type="text" placeholder="Address" />
                  </FloatingLabel>
                </div>
                <div className='col-lg-12'>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
  
                    <Form.Control value={hotelData?.description} onChange={(e) => setHotelData({ ...hotelData, description: e.target.value })} placeholder='Description' as="textarea" rows={3} />
                  </Form.Group>
                </div>
  
                <label className='ps-3' htmlFor="">
                  Amenities
                </label>
                <div id='group1' className="col-lg-12 mb-3 ps-3" key="inline-checkbox" >
  
                  {[
                     "Free WiFi", "24/7 Front Desk", "Luggage Storage", "Security",
                     "Daily Housekeeping", "Laundry Service", "Elevator", "Parking",
                     "Restaurant & Bar", "Breakfast Included", "Room Service", "Coffee Shop",
                     "Business Center", "Meeting Rooms", "High-Speed Internet",
                     "Spa", "Gym", "Swimming Pool", "Kids' Play Area",
                     "Live Entertainment", "Movie Theatre", "Airport Shuttle", "Car Rental",
                     "Eco-Friendly"
                  ].map((amenity, i) => (
                    <Button
                      key={i}
                      variant={hotelData.amenities.includes(amenity) ? 'primary' : 'outline-secondary'}
                      size="sm"
                      className="m-1"
                      onClick={() => handleAmenitiesChange("", amenity)}
                    >
                      {amenity}
                    </Button>
                  ))}
                </div>
                <div className="col-lg-12 p-3 d-flex align-items-center justify-content-center">
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
                            onChange={handleImageUploadHotel}
                            style={{ display: "none" }}
                            accept="image/*"
                        />
                    </label>
                </div>
            </div>
            <div className="d-flex flex-wrap gap-2">
                {/* Show Existing Images */}
                {hotelData?.existingImages?.map((image, index) => (
                    <div key={index} style={{ position: "relative" }}>
                        <img src={`${serverURL}/uploads/${image}`} alt="Existing Hotel"
                            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }}
                        />
                        <button
                            onClick={() => handleRemoveExistingImage(index)}
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

                {/* Show New Images */}
                {hotelData?.newImages?.map((image, index) => (
                    <div key={index} style={{ position: "relative" }}>
                        <img src={URL.createObjectURL(image)} alt="New Hotel"
                            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }}
                        />
                        <button
                            onClick={() => handleRemoveNewImage(index)}
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
            

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
  
            </Button>
          
              <Button variant="primary" onClick={handleUpdateHotel}>
                Submit</Button>
            
          </Modal.Footer>
        </Modal>
      </div>
    )
}

export default EditHotel