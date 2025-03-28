import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addHotelApi, addRoomsApi } from '../../Services/allApi';
import { toast } from 'react-toastify';
import { addResponseContext } from '../../context/ContextApi';
import axios from 'axios';
import Spinner from '../Shared/BeatLoader';

function AddHotel() {

  
  
  
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

  const { addResponse, setAddResponse } = useContext(addResponseContext)

  const [step, setStep] = useState(1);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setHotelData({
      propertyname: "",
      propertytype: "",
      phone: "",
      email: "",
      checkin: "",
      checkout: "",
      address: "",
      place: "",
      minPrice: "",
      description: "",
      amenities: [],
      images: []
    })
    setRoomData({
      roomType: '',
      numberOfRooms: '',
      occupancy:'',
      pricePerNight: '',
      description: "",
      amenities: [],
      images: []
    })
    setShow(false)
  };
  const handleShow = () => setShow(true);

  //hotel data

  const [hotelData, setHotelData] = useState({
    propertyname: "",
    propertytype: "",
    phone: "",
    email: "",
    checkin: "",
    checkout: "",
    address: "",
    place: "",
    minPrice: "",
    description: "",
    amenities: [],
    images: []
  })
  console.log("hotel", hotelData);

  const [hotelId, setHotelId] = useState("")
  const [submitingForm, setSubmitingForm] = useState(false)


  console.log(hotelId);


  const [roomData, setRoomData] = useState([{
    roomType: '',
    numberOfRooms: '',
    occupancy:'',
    pricePerNight: '',
    description: "",
    amenities: [],
    images: []
  }])
  console.log("room", roomData);


  const handleImageUploadHotel = (e) => {
    const selectedImages = Array.from(e.target.files);

    setHotelData({ ...hotelData, images: [...hotelData.images, ...selectedImages] });


  };
  const handleImageUploadRoom = (index, e) => {
    const selectedImages = Array.from(e.target.files);
    const updatedRooms = [...roomData];

    // Append new images to the existing images array
    updatedRooms[index].images = [...updatedRooms[index].images, ...selectedImages];

    setRoomData(updatedRooms);
  };
  const handleRemoveImageHotel = (index) => {

    setHotelData({ ...hotelData, images: hotelData.images.filter((_, i) => i !== index) })


  }

  const handleRemoveImageRoom = (index, imgIndex) => {
    const updatingRoom = [...roomData]
    updatingRoom[index].images = updatingRoom[index].images.filter((_, i) => i !== imgIndex)

    setRoomData(updatingRoom)
  }

  const handleNextClick = async () => {
    const { propertyname, propertytype, phone, email, address, place, minPrice, description, checkin, checkout, amenities, images } = hotelData
    if (propertyname && propertytype && phone && email && address && minPrice && description && checkin && checkout && images) {  // 

      const reqBody = new FormData()
      reqBody.append("propertyname", propertyname)
      reqBody.append("propertytype", propertytype)
      reqBody.append("phone", phone)
      reqBody.append("email", email)
      reqBody.append("address", address)
      reqBody.append("place", place)
      reqBody.append("minPrice", minPrice)
      reqBody.append("description", description)
      reqBody.append("checkin", checkin)
      reqBody.append("checkout", checkout)

      amenities.forEach(amenity => reqBody.append("amenities", amenity))
      images.forEach(image => reqBody.append("images", image))

      const adminToken = sessionStorage.getItem("adminToken")
      if (adminToken) {
        const reqHeader = {
          "Authorization": `Bearer ${adminToken}`,
          "Content-Type": "multipart/form-data"

        }
        try {
          const result = await addHotelApi(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            console.log(result.data);

            setHotelId(result.data._id);
            setStep(2)
          }
          else if (result.status == 406) {
            toast.warn("hotel already added")
          }

        } catch (err) {
          console.log(err);

        }
      }
      else {
        console.log("Cannot get admin token");

      }



    } else {
      toast.warning("please fill all the data required")
    }

  }

  //
  const addRoomType = () => {
    setRoomData([...roomData, { roomType: '', numberOfRooms: '',occupancy:'', pricePerNight: '', amenities: [], images: [] }]);
  };

  const handleAmenitiesChange = (index, amenity, type) => {
    if (type == "room") {
      const updatedRooms = [...roomData];
      const roomAmenities = updatedRooms[index].amenities || [];
      if (roomAmenities.includes(amenity)) {
        // Remove amenity if already selected
        updatedRooms[index].amenities = roomAmenities.filter(item => item !== amenity);
      } else {
        // Add amenity if not already selected
        updatedRooms[index].amenities = [...roomAmenities, amenity];
      }
      setRoomData(updatedRooms);
    }

    else if (type == "hotel") {
      if (hotelData.amenities.includes(amenity)) {
        setHotelData({ ...hotelData, amenities: hotelData.amenities.filter(ame => ame !== amenity) })

      }
      else {
        setHotelData({ ...hotelData, amenities: [...hotelData.amenities, amenity] })
      }
    }
  };


  const removeRoomType = (index) => {
    setRoomData(roomData.filter((_, i) => i !== index));
  };

  const handleRoomDataChange = (index, field, e) => {
    const updatedRoom = [...roomData]
    updatedRoom[index][field] = e.target.value
    setRoomData(updatedRoom)
  }

  const handleSubmitForm = async () => {
    // Check for missing room data
    setSubmitingForm(true)
    for (const room of roomData) {
      if (!room.roomType || !room.numberOfRooms || !room.occupancy || !room.pricePerNight) {
        toast.warning("Please fill all the room details before submitting.");
        return;
      }
    }

    try {
      const adminToken = sessionStorage.getItem("adminToken");
      if (!adminToken) {
        console.log("Cannot get admin token");
        return;
      }

      const reqHeader = {
        Authorization: `Bearer ${adminToken}`,
        "Content-Type": "multipart/form-data",
      };

      // Create an array of API call promises
      const roomRequests = roomData?.map(async (room) => {
        const reqBody = new FormData();
        reqBody.append("hotelId", hotelId);
        reqBody.append("roomType", room.roomType);
        reqBody.append("occupancy", room.occupancy);
        reqBody.append("numberOfRooms", room.numberOfRooms);
        reqBody.append("pricePerNight", room.pricePerNight);
        reqBody.append("description", room.description);
        room.amenities.forEach((amenity) => reqBody.append("amenities", amenity));
        room.images.forEach((image) => reqBody.append("images", image));

        return await addRoomsApi(reqBody, reqHeader);
      });

      // Wait for all API calls to complete
      const results = await Promise.all(roomRequests);
      console.log("API responses:", results);
      if (results?.map(result => result.status == 200)) {
        toast.success("Rooms added successfully!");
        handleClose()
        setStep(1)
        setAddResponse(results)
        setSubmitingForm(false)

      }

    } catch (err) {
      console.log(err);
      toast.error("Error adding rooms");
    }
  };

  return (
    <div>
      <div className='mt-4 d-flex align-items-center'>
        <h3 className='m-0'>New property listing</h3>
        <button className='black-btn ms-4' onClick={handleShow}>+</button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>{step == 1 ? `Add new property` : `Add room detais`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {step == 1 ?
            <div className='row'>
              <div className='col-lg-6'>
                <FloatingLabel
                  controlId="floatingInput1"
                  label="Property Name"
                  className="mb-3"
                >
                  <Form.Control onChange={(e) => setHotelData({ ...hotelData, propertyname: e.target.value })} type="text" placeholder="Property Name" />
                </FloatingLabel>

              </div>
              <div className='col-lg-6'>
                <Form.Select onChange={(e) => setHotelData({ ...hotelData, propertytype: e.target.value })} className='mb-3' style={{ height: "58px" }} aria-label="Default select example">
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
                  <Form.Control onChange={(e) => setHotelData({ ...hotelData, phone: e.target.value })} type="number" placeholder="Phone" />
                </FloatingLabel>
              </div>
              <div className="col-lg-6">
                <FloatingLabel
                  controlId="floatingInput4"
                  label="Email"
                  className="mb-3"
                >
                  <Form.Control onChange={(e) => setHotelData({ ...hotelData, email: e.target.value })} type="email" placeholder="Email" />
                </FloatingLabel>
              </div>
              <div className="col-lg-6">   <FloatingLabel
                controlId="floatingInput4"
                label="Check in"
                className="mb-3"
              >
                <Form.Control onChange={(e) => setHotelData({ ...hotelData, checkin: e.target.value })} type="time" placeholder="Check in" />
              </FloatingLabel></div>
              <div className="col-lg-6">
                <FloatingLabel
                  controlId="floatingInput4"
                  label="Check out"
                  className="mb-3"
                >
                  <Form.Control onChange={(e) => setHotelData({ ...hotelData, checkout: e.target.value })} type="time" placeholder="Check out" />
                </FloatingLabel>
              </div>
              <div className="col-lg-6">
              <select value={hotelData.place} onChange={(e)=>setHotelData({...hotelData,place:e.target.value})} style={{ height:"55px", outline: "none" }} className="border mb-3 rounded w-100" name="" id="">
                  <option value="">Place</option>
                  {cities.sort((a, b) => a.localeCompare(b))?.map(city => (
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
                  <Form.Control onChange={(e) => setHotelData({ ...hotelData, minPrice: e.target.value })} type="email" placeholder="Email" />
                </FloatingLabel>
              </div>

              <div className="col-lg-12">
                <FloatingLabel
                  controlId="floatingInput2"
                  label="Address"
                  className="mb-3"
                >
                  <Form.Control onChange={(e) => setHotelData({ ...hotelData, address: e.target.value })} type="text" placeholder="Address" />
                </FloatingLabel>
              </div>
              <div className='col-lg-12'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

                  <Form.Control onChange={(e) => setHotelData({ ...hotelData, description: e.target.value })} placeholder='Description' as="textarea" rows={3} />
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
                ]?.map((amenity, i) => (
                  <Button
                    key={i}
                    variant={hotelData.amenities.includes(amenity) ? 'primary' : 'outline-secondary'}
                    size="sm"
                    className="m-1"
                    onClick={() => handleAmenitiesChange("", amenity, "hotel")}
                  >
                    {amenity}
                  </Button>
                ))}
              </div>
              <div className="col-lg-12  p-3  d-flex align-items-center justify-content-center ">
                <div className='w-75  ' style={{ minHeight: "200px" }}>
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
                      onChange={(e) => handleImageUploadHotel(e)}
                      style={{ display: "none" }}
                      accept="image/*"
                    />

                  </label>
                </div>

              </div>

              <div className='d-flex flex-wrap gap-2' >
                {hotelData.images?.map((image, index) => (
                  <div key={index} style={{ position: "relative" }}>
                    <img src={URL.createObjectURL(image)} alt=""
                      style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }}
                    />
                    <button
                      onClick={() => handleRemoveImageHotel(index, "hotel")}
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
                ))

                }
              </div>
            </div> :
            //  **************************************//
            <div>
              {
                roomData?.map((room, index) => (
                  <div className="row border py-3 mt-2 mb-3">
                    <div className='pb-3 d-flex align-items-center justify-content-between'><h5>Room type {index + 1}</h5>
                      <Button
                        variant='danger'
                        size='sm'
                        onClick={() => removeRoomType(index)}
                      >Remove</Button>
                    </div>
                    <div className="col-lg-6">
                      <Form.Select value={roomData[index].roomType} onChange={(e) => handleRoomDataChange(index, "roomType", e)} className='mb-3' style={{ height: "58px" }} aria-label="Default select example">
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
                        <Form.Control value={roomData[index].numberOfRooms} onChange={(e) => handleRoomDataChange(index, "numberOfRooms", e)} type="number" placeholder="No of rooms" />
                      </FloatingLabel>
                    </div>
                    <div className="col-lg-6">
                      <FloatingLabel
                        controlId="floatingInput10"
                        label="Price per Night"
                        className="mb-3"
                      >
                        <Form.Control value={roomData[index].pricePerNight} onChange={(e) => handleRoomDataChange(index, "pricePerNight", e)} type="number" placeholder="Price per Night" />
                      </FloatingLabel>
                    </div>
                    <div className="col-lg-6">
                      <FloatingLabel
                        controlId="floatingInput12"
                        label="Max Occupancy"
                        className="mb-3"
                      >
                        <Form.Control value={roomData[index].occupancy} onChange={(e) => handleRoomDataChange(index, "occupancy", e)} type="text" placeholder="Occupancy" />
                      </FloatingLabel>
                    </div>
                    <div className="col-12">
                      <FloatingLabel
                        controlId="floatingInput11"
                        label="Description of Room"
                        className="mb-3"
                      >
                        <Form.Control value={roomData[index].description} onChange={(e) => handleRoomDataChange(index, "description", e)} type="text" placeholder="Description" />
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
                      ]?.map((amenity, i) => (
                        <Button
                          key={i}
                          variant={room.amenities.includes(amenity) ? 'primary' : 'outline-secondary'}
                          size="sm"
                          className="m-1"
                          onClick={() => handleAmenitiesChange(index, amenity, "room")}
                        >
                          {amenity}
                        </Button>
                      ))}
                    </div>
                    <div className="col-lg-12  p-3  d-flex align-items-center justify-content-center ">
                      <div className='w-75  ' style={{ minHeight: "200px" }}>
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
                            onChange={(e) => handleImageUploadRoom(index, e)}
                            style={{ display: "none" }}
                            accept="image/*"
                          />

                        </label>
                      </div>

                    </div>
                    <div className='d-flex flex-wrap gap-2' >
                      {roomData[index]?.images?.map((image, imgIndex) => (
                        <div key={imgIndex} style={{ position: "relative" }}>
                          <img src={URL.createObjectURL(image)} alt=""
                            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }}
                          />
                          <button
                            onClick={() => handleRemoveImageRoom(index, imgIndex)}
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
                      ))

                      }
                    </div>
                  </div>
                ))
              }
              <button className='black-btn2 p-2 ms-1' onClick={addRoomType} >+ Add Room </button>

            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close

          </Button>
          {step == 1 ? <Button variant="primary" onClick={handleNextClick}>
            Next</Button> :
            <Button variant="primary" onClick={handleSubmitForm}>
              {submitingForm?<Spinner></Spinner>:"Submit"}</Button>
          }
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddHotel