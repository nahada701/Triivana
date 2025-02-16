import React, { useContext, useEffect, useState } from "react";
import UserNavbar from "../../components/User/UserNavbar";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main CSS file for the DateRange picker
import "react-date-range/dist/theme/default.css"; // Default theme for the DateRange picker
import HotelCard from "../../components/User/HotelCard";
import Footer from "../../components/Shared/Footer";
import { getAllHotelsApi } from "../../Services/allApi";
import { addResponseContext } from "../../context/ContextApi";
function Home() {
    const{addResponse,setAddResponse}=useContext(addResponseContext)
  
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  useEffect(() => {
    getAllHotels()
  }, [addResponse])

  const[allHotels,setAllHotels]=useState()
console.log(allHotels);


  const getAllHotels=async()=>{
   try{const result=await getAllHotelsApi()
   if(result.status==200){
    setAllHotels(result.data)
   }
  }catch(err){
    console.log(err);
    
   }
   
   
  }

  
  const [show, setShow] = useState(false);

  const handleShowDate = () => {
    setShow(!show);
  };

  const handleCloseDatePicker = (e) => {
    e.stopPropagation(); // Prevent the event from closing the date picker
  };

  const handleClickOutside = () => {
    setShow(false); // Close the date picker when clicking outside
  };

  return (
   <div>
      <div className="banner rounded" onClick={handleClickOutside}>
        <UserNavbar />
  
        <h1 className="heading">Find Your Best Stay</h1>
  
        <div className="search-area">
         <div className="my-1 row m-0 d-flex align-items-center justify-content-between">
            <div className="col-md-4">
              <h6>Location</h6>
              <div className="d-flex justify-content-between">
                <span className="px-2 border d-flex align-items-center  bg-light"  style={{ height: "40px" }}>
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                <select  style={{ height: "40px",outline:"none"  }} className="border w-100" name="" id="">
                  <option value="">Find location</option>
                </select>
              </div>
            </div>
    
            <div className="col-md-4  position-relative">
              <h6>Check-in and Check-out Date</h6>
              <div
                className="d-flex align-items-center w-100"
                onClick={(e) => e.stopPropagation()} // Prevent click event from closing the picker
              >
                <span
                  className="px-2 border d-flex align-items-center  bg-light"
                  style={{ height: "40px" }}
                >
                  <i className="fa-solid fa-calendar"></i>
                </span>
                <div

                  onClick={handleShowDate}
                  className="border bg-light d-flex align-items-center w-100"
                  style={{ height: "40px", cursor: "pointer", position: "relative", }}
                >
                  <p className="m-0 ps-2">
                    {state[0].startDate && state[0].endDate
                      ? `${state[0].startDate.toLocaleDateString()} - ${state[0].endDate.toLocaleDateString()}`
                      : "Check-in - Check-out"}
                  </p>
                </div>
                {show && (
                  <div
                    className="position-absolute"
                    style={{
                      top: "70px",
                      left:"50px",
                      zIndex: 1000,
                      background: "white",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                      borderRadius: "8px",
                    }}
                    onClick={handleCloseDatePicker} // Prevent closing when interacting with DateRange
                  >
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setState([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={state}
                    />
                  </div>
                )}
              </div>
            </div>
    
            <div className="col-md-4 position-relative">
              <h6>Guests and Rooms</h6>
              <div className="d-flex justify-content-between">
                <span className="px-2 border d-flex align-items-center bg-light"  style={{ height: "40px" }}>
                  <i className=" fa-solid fa-user"></i>
                </span>
                <select  style={{ height: "40px",outline:"none" }} className="border w-100" name="" id="">
                  <option value="">2 Guests 1 Room</option>
                </select>
              </div>
            </div>
         </div>
         <div className="mt-4 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center text-dark flex-wrap gap-2">
            <h6 className="ms-2 mb-0 ">Filter: </h6>
            <button className="selectedBtn">Hotels</button>
            <button className="nonselectedBtn">Villas</button>
            <button className="nonselectedBtn">Apartments</button>
            <button className="nonselectedBtn">Resorts</button>
            <button className="nonselectedBtn">Cottages</button>
  
          </div>
          <div>
            <button className="black-btn">Search &#10152;</button>
          </div>
        </div>
        </div>
  
      
  
       
      </div>
        <div className="text-dark p-4 destination">
        <h2>Discover Your destination</h2>
        <p>Explore our range of property types for every traveler's preference</p>

        {/* property type cards */}

        <div className="row mt-4">
          <div className="col-lg-3 col-sm-6">
            <div className="d-flex justify-content-between">
              <div>
                <h5>Villas</h5>
                <p className="mb-0">  <i className="me-2 fa-solid fa-house"></i> 12,903 available</p>
              </div>
              <button className="btn rounded border">&#x2192;</button>
            </div>
            <div>
              <img className="destinationIMG" src="https://i.pinimg.com/736x/91/0c/c8/910cc875f5a485d5346788d7fa3cee73.jpg" alt="" />
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="d-flex justify-content-between">
              <div>
                <h5>Apartments</h5>
                <p className="mb-0">  <i class="fa-regular fa-building me-2"></i>  12,903 available</p>
              </div>
              <button className="btn rounded border">&#x2192;</button>
            </div>
            <div>
              <img className="destinationIMG" src="https://i.pinimg.com/736x/e1/8d/36/e18d361a4a5b82d4f0086306f24fa0a4.jpg" alt="" />
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="d-flex justify-content-between">
              <div>
                <h5>Resorts</h5>
                <p className="mb-0">  <i class="fa-solid fa-warehouse"></i> 12,903 available</p>
              </div>
              <button className="btn rounded border">&#x2192;</button>
            </div>
            <div>
              <img className="destinationIMG" src="https://i.pinimg.com/736x/ea/5d/db/ea5ddb9c1d8ffa7e342ffb4e09ae2d43.jpg" alt="" />
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="d-flex justify-content-between">
              <div>
                <h5>Cottages</h5>
                <p className="mb-0"> <i class="fa-solid fa-city"></i> 12,903 available</p>
              </div>
              <button className="btn rounded border">&#x2192;</button>
            </div>
            <div>
              <img className="destinationIMG" src="https://i.pinimg.com/736x/bf/99/9e/bf999ecad28e4e37d4e505cf5894ddb7.jpg" alt="" />
            </div>
          </div>
        </div>

      </div>
        {/* Top treding hotels */}

        <div className="text-dark p-4 destination">
        <h2>Top trending hotel In India</h2>
        <p>Discover the most trending hotels  in India for an unforgatable experice</p>

        {/* property type cards */}

        <div className="row mt-4">
        
         {allHotels?.length>0&& 
         allHotels.map(hotel=>(
          <div className="col-lg-3 col-sm-6">
          <HotelCard hotel={hotel} />
         </div>
         ))
         }
        
        
        
        </div>

      </div>

      {/* most visited */}
{/*       
      <div className="text-dark p-4 destination">
        <h2>Most visited hotels this month</h2>
        <p>Trending and excpetional hospitality that captivated travelers this month</p> */}

        {/* property type cards */}
{/* 
        <div className="row mt-4">
          <div className="col-lg-3">
           <HotelCard/>
          </div>
          <div className="col-lg-3">
           <HotelCard/>
          </div> <div className="col-lg-3">
           <HotelCard/>
          </div> <div className="col-lg-3">
           <HotelCard/>
          </div>
        
        </div>

      </div> */}
      <Footer/>

   </div>
  );
}

export default Home;
