import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
function AddHotel() {
  const [step, setStep] = useState(1);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    //state to store files 

    const[images,setImages]=useState([])
console.log(images);

//hotel data

const[hotelData,setHotelData]=useState({
  propertyname:"",
  propertyType:"",
  phone:"",
  email:"",
  address:"",
  description:"",
  amenities:[],
  images:[]
})

console.log(hotelData);

const handleImageUpload = (e, type) => {
  const selectedImages = Array.from(e.target.files);
  if (type === 'hotel') {
      setHotelData({ ...hotelData, images: [...hotelData.images, ...selectedImages] });
  } 
  // else {
  //     setRoomData({ ...roomData, images: [...roomData.images, ...selectedImages] });
  // }
};
const handleAmenitiesChange=(e)=>{
  const{checked,value}=e.target
  if(checked){
    setHotelData({...hotelData,amenities:[...hotelData.amenities,value]})
  }
  else{
    setHotelData({...hotelData,amenities:hotelData.amenities.filter(amenity=>amenity!==value)})
  }
}

    const handleRemoveImageHotel=(index)=>{

    setHotelData({...hotelData,images:hotelData.images.filter((_,i)=>i!==index)})
  

    }

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
          <Modal.Title>{step==1?`Add new property`:`Add room detais`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    {step==1 ? 
    <div className='row'>
          <div className='col-lg-6'>
                <FloatingLabel
                controlId="floatingInput1"
                label="Property Name"
                className="mb-3"
              >
                <Form.Control onChange={(e)=>setHotelData({...hotelData,propertyname:e.target.value})} type="text" placeholder="Property Name" />
              </FloatingLabel>
            
          </div>
        <div className='col-lg-6'>
              <Form.Select onChange={(e)=>setHotelData({...hotelData,propertyType:e.target.value})} className='mb-3' style={{height:"58px"}} aria-label="Default select example">
          <option>Property type</option>
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
                <Form.Control  onChange={(e)=>setHotelData({...hotelData,phone:e.target.value})} type="number" placeholder="Phone" />
              </FloatingLabel>
        </div>
        <div className="col-lg-6">
        <FloatingLabel
                controlId="floatingInput4"
                label="Email"
                className="mb-3"
              >
                <Form.Control  onChange={(e)=>setHotelData({...hotelData,email:e.target.value})} type="email" placeholder="Email" />
              </FloatingLabel>
        </div>
        <div className="col-lg-12">
        <FloatingLabel
                controlId="floatingInput2"
                label="Address"
                className="mb-3"
              >
                <Form.Control onChange={(e)=>setHotelData({...hotelData,address:e.target.value})} type="text" placeholder="Address" />
              </FloatingLabel>
        </div>
      <div className='col-lg-12'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            
            <Form.Control onChange={(e)=>setHotelData({...hotelData,description:e.target.value})} placeholder='Description' as="textarea" rows={3} />
          </Form.Group>
      </div>
      <label className='ps-3' htmlFor="">
        Amenities
      </label>
      <div id='group1' className="col-lg-12 mb-3 ps-3" key="inline-checkbox" >
      
      <Form.Check
          inline
          label="Pool"
          value={"pool"}
          name="group1"
          type="checkbox"
          onChange={(e)=>handleAmenitiesChange(e)}
          id="inline-checkbox-1"
        />
        <Form.Check
          inline
          label="WiFi"
          value={"WiFi"}
          name="group1"
          type="checkbox"
          onChange={(e)=>handleAmenitiesChange(e)}
          id="inline-checkbox-2"
        />
        <Form.Check
          inline
          label="Parking"
          value={"Parking"}
          name="group1"
          type="checkbox"
          onChange={(e)=>handleAmenitiesChange(e)}
          id="inline-checkbox-3"
        />
        <Form.Check
          inline
          label="Gym"
          value={"Gym"}
          name="group1"
          type="checkbox"
          onChange={(e)=>handleAmenitiesChange(e)}
          id="inline-checkbox-4"
        />
         <Form.Check
          inline
          label=" Laundry service"
          value={"Laundry"}
          name="group1"
          type="checkbox"
          onChange={(e)=>handleAmenitiesChange(e)}
          id="inline-checkbox-5"
        />
      </div>
      <div className="col-lg-12  p-3  d-flex align-items-center justify-content-center ">
        <div className='w-75  ' style={{minHeight:"200px"}}> 
          <label style={{  display: "block",
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
          onChange={(e)=>handleImageUpload(e,"hotel")}
          style={{ display: "none" }}
          accept="image/*"
        />

          </label>
        </div> 
      
      </div>
      <div className='d-flex flex-wrap gap-2' >
         {hotelData.images.map((image,index)=>(
          <div key={index} style={{position:"relative"}}>
            <img src={URL.createObjectURL(image)} alt=""
            style={{width:"100px",height:"100px",objectFit: "cover", borderRadius: "5px"}}
            />
             <button
              onClick={() => handleRemoveImageHotel(index,"hotel")}
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
         ) )
            
          }
        </div>
     </div>:
    //  **************************************//
   <p>modal for room details here</p>
    //  **************************************//

   }
        </Modal.Body>
        <Modal.Footer>
         {step==1? <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>:
           <Button variant="secondary" onClick={()=>setStep(1)}>
           Back
         </Button>}
          {step==1?<Button variant="primary" onClick={()=>setStep(2)}>
            Next</Button>:
            <Button variant="primary">
            Upload</Button>
          }
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddHotel