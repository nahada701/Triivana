import React, { useContext, useEffect, useState } from "react";
import UserNavbar from "../../components/User/UserNavbar";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main CSS file for the DateRange picker
import "react-date-range/dist/theme/default.css"; // Default theme for the DateRange picker
import HotelCard from "../../components/User/HotelCard";
import Footer from "../../components/Shared/Footer";
import { getAllApprovedHotelsApi } from "../../Services/allApi";
import { addResponseContext } from "../../context/ContextApi";
import Spinner from "../../components/Shared/Spinner";
import { toast } from "react-toastify";

function Home() {


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
  const [selectedCity,setSelectedCity]=useState("")
  console.log("selected city",selectedCity);
  
  const [isSearching,setIsSearhing]=useState(false)
  const [searchResults,setSearchResult]=useState([])


  const { addResponse, setAddResponse } = useContext(addResponseContext)

  const [selectedBtn,setSelectedBtn]=useState("Hotels")
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

  const [allHotels, setAllHotels] = useState()
  console.log(allHotels);


  const getAllHotels = async () => {
    try {
      const result = await getAllApprovedHotelsApi()
      if (result.status == 200) {
        setAllHotels(result.data)
      }
    } catch (err) {
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


  const handleSearch=()=>{

    if(selectedCity){
      if(selectedBtn=="All"){
        console.log(selectedCity);
       
        const result=allHotels.filter(hotel=>(
          hotel.place==selectedCity 
         
          
        ))
        console.log(result,"result");
      setIsSearhing(true)
      setSearchResult(result)
      }
      else{
        console.log(selectedBtn);
        
        const result=allHotels.filter(hotel=>(
          hotel.place==selectedCity && hotel.propertytype==selectedBtn
        ))
        
      setIsSearhing(true)
      setSearchResult(result)
      }
    }
    else{
      toast.warning("Please select a City")
    }
   


  
  }
  return (
    <div>
      <div className="banner rounded" onClick={handleClickOutside}>
        <UserNavbar />

        <h1 className="heading text-white">Find Your Best Stay </h1>


        <div className="search-area">
          <div className="my-1 row m-0 d-flex align-items-end justify-content-between">
            <div className="col-md-4">
              <h6>Location</h6>
              <div className="d-flex justify-content-between">
                <span className="px-2 border d-flex align-items-center  bg-light" style={{ height: "40px" }}>
                  <i className="fa-solid fa-location-dot"></i>
                </span>
                <select value={selectedCity} onChange={(e)=>setSelectedCity(e.target.value)} style={{ height: "40px", outline: "none" }} className="border w-100" name="" id="">
                  <option value="">Find location</option>
                  {cities.sort((a, b) => a.localeCompare(b)).map(city => (
                    <option value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* <div className="col-md-4  position-relative">
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
                      left: "50px",
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
                <span className="px-2 border d-flex align-items-center bg-light" style={{ height: "40px" }}>
                  <i className=" fa-solid fa-user"></i>
                </span>
                <select style={{ height: "40px", outline: "none" }} className="border w-100">
                  <option value="">2 Guests 1 Room</option>
                  <option value="1-1">1 Guest 1 Room</option>
                  <option value="2-1">2 Guests 1 Room</option>
                  <option value="3-1">3 Guests 1 Room</option>
                  <option value="4-1">4 Guests 1 Room</option>
                  <option value="2-2">2 Guests 2 Rooms</option>
                  <option value="3-2">3 Guests 2 Rooms</option>
                  <option value="4-2">4 Guests 2 Rooms</option>
                  <option value="5-2">5 Guests 2 Rooms</option>
                  <option value="4-3">4 Guests 3 Rooms</option>
                  <option value="5-3">5 Guests 3 Rooms</option>
                  <option value="6-3">6 Guests 3 Rooms</option>
                  <option value="6-4">6 Guests 4 Rooms</option>
                  <option value="8-4">8 Guests 4 Rooms</option>
                  <option value="10-5">10 Guests 5 Rooms</option>
                </select>
              </div>
            </div> */}
            <div className="col-md-8 ">
            <div className="d-flex align-items-center text-dark flex-wrap gap-2">
              <h6 className="ms-2 mb-0 ">Filter: </h6>
              <button
        className={selectedBtn === "Hotel" ? "selectedBtn" : "nonselectedBtn"}
        onClick={() => setSelectedBtn("Hotel")}
      >
        Hotels
      </button>
      <button
        className={selectedBtn === "Villa" ? "selectedBtn" : "nonselectedBtn"}
        onClick={() => setSelectedBtn("Villa")}
      >
        Villas
      </button>
      <button
        className={selectedBtn === "Apartment" ? "selectedBtn" : "nonselectedBtn"}
        onClick={() => setSelectedBtn("Apartment")}
      >
        Apartments
      </button>
      <button
        className={selectedBtn === "Resort" ? "selectedBtn" : "nonselectedBtn"}
        onClick={() => setSelectedBtn("Resort")}
      >
        Resorts
      </button>
      <button
        className={selectedBtn === "Cottage" ? "selectedBtn" : "nonselectedBtn"}
        onClick={() => setSelectedBtn("Cottage")}
      >
        Cottages
      </button>
      <button
        className={selectedBtn === "All" ? "selectedBtn" : "nonselectedBtn"}
        onClick={() => setSelectedBtn("All")}
      >
        All
      </button>
            </div>
            </div>
          </div>
          <div className=" mt-4 d-flex justify-content-end align-items-center">
            
            <div>
              <button className="black-btn" onClick={handleSearch}>Search &#10152;</button>
            </div>
          </div>
        </div>




      </div>
     {isSearching?
      <div className="text-dark p-4 destination">
        <button className="btn " onClick={()=>setIsSearhing(false)}><i className="fa-solid fa-arrow-left me-2"></i>Back to Home</button>
      <h2>Search Results</h2>
      <p>Showing results for "{selectedCity}" in "{selectedBtn}"</p>
      <div className="row mt-4">
        {searchResults.length > 0 ? (
          searchResults.map(hotel => (
            <div className="col-lg-3 col-sm-6" key={hotel.id}>
              <HotelCard hotel={hotel} />
            </div>
          ))
        ) : (
          <p className="py-2 text-center">No results found.</p>
        )}
      </div>
    </div>
     :
      <div>
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
        
  
        <div className="text-dark p-4 destination">
          <h2>Top trending hotel In India</h2>
          <p>Discover the most trending hotels  in India for an unforgatable experice</p>
  
          {/* property type cards */}
  
          <div className="row mt-4">
  
            {allHotels?.length > 0 ?
              allHotels.map(hotel => (
                <div className="col-lg-3 col-sm-6">
                  <HotelCard hotel={hotel} />
                </div>
              )) :
              <Spinner />
            }
  
  
  
          </div>
  
        </div>
     </div>
     }

      <Footer />

    </div>
  );
}

export default Home;
