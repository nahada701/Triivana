import { BorderColor } from '@mui/icons-material'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJs, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import React, { useState, useTransition } from 'react'
import { useEffect } from 'react'
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2'
import { dashboardDataApi } from '../../../Services/allApi'



function DashboardSuperAdmin() {

    const[numOfUsers,setNumOfUsers]=useState()
    const[numOfProperties,setNumOfProperties]=useState()
    const[numOfBookings,setNumOfBookings]=useState()

    const[monthlyUsers,setMonthlyUsers]=useState()
    const[userMonths,setUserMonths]=useState()

    const[monthlyBookings,setMonthlyBookings]=useState()
    const[bookingMonth,setBookingMonth]=useState()

    const[propertyTypes,setPropertyTypes]=useState()
    const[numOfPropertyType,setNumOfPropertyType]=useState()







    ChartJs.register(CategoryScale, LinearScale, LineElement, PointElement, BarElement, ArcElement, Title, Tooltip, Legend)

    const LineData = {
        labels: userMonths,
        datasets: [
            {
                label: "New Users",
                data:monthlyUsers ,
                borderColor: "#0a64f5",
                backgroundColor: "white",
                fill: true
            }
        ]
    }
    const LineOptions = {
        responsive: true,
        plugins: {
            legend: { display: true },
            tooltip: { enabled: true }
        }
    }

    const BarData = {
        labels: bookingMonth,
        datasets: [
            {
                label: "Total bookings",
                data: monthlyBookings,
                backgroundColor: [ "#0a64f5"]
            }
        ]


    }

    const barOptions = {
        responsive: true,
        plugins: {
            legend: { display: false }, // Show dataset label
            tooltip: { enabled: true }, // Show tooltip on hover
        },
        scales: {
            y: { title: { display: true, text: "Total Bookings" }, beginAtZero: true }, // Y-axis label
        },
    };


    const PieData = {
        labels: propertyTypes,
        datasets: [{

            data: numOfPropertyType,
            backgroundColor: ["#0a64f5", "#7ba7ed", "navy", "black"]

        }]
    }

    const pieOptions = {
        plugins: {
            legend: {
                display: true,
                position: "bottom", // Position of labels in Pie Chart
            },
            tooltip: {
                enabled: true,
            },
        },
    };


useEffect(() => {
  getData()
}, [])

const getData=async()=>{

    const token=sessionStorage.getItem("superAdminToken")
           const reqHeader = {
               "Authorization": `Bearer ${token}`,
               "Content-Type": "application/json"
     
             }
           if(token) {
               try {
               const result=await dashboardDataApi(reqHeader) 
              console.log(result);
              setNumOfBookings(result.data.totalBookings)
              setNumOfProperties(result.data.totalProperties)
              setNumOfUsers(result.data.totalUserCount)
              
              const propertyTypeArray=result.data.propertyTypesData.map(prop=>prop._id)
              const propertyTypeNumArray=result.data.propertyTypesData.map(prop=>prop.count)
              setNumOfPropertyType(propertyTypeNumArray)
              setPropertyTypes(propertyTypeArray)

              const usermonths=result.data.monthlyNewUserData.map(user=>user._id)
              const monthlyUserArray=result.data.monthlyNewUserData.map(user=>user.count)

              setMonthlyUsers(monthlyUserArray)
              console.log(monthlyUsers);
              
              
              setUserMonths(usermonths)

              const bookingmonths=result.data.monthlyBookingData.map(user=>user._id)
              const monthlyBookingArray=result.data.monthlyBookingData.map(user=>user.count)
              console.log(bookingmonths,monthlyBookingArray);
              
              setMonthlyBookings(monthlyBookingArray)
              setBookingMonth(bookingmonths)

              
              
           } catch (error) {
               console.log(error);
               
           }}
           
}

    return (
        <div>
            <div className="pb-5  pt-3">
                <div className="">

                    <div className='charts row '>
                        <div className='col-md-6'><Line data={LineData} options={LineOptions}></Line></div>
                        <div className='col-md-6 '><Bar style={{ width: "33%", height: "300px" }} data={BarData} options={barOptions} /></div>
                        <div className=" col-md-4   d-flex justify-content-center    "><Doughnut style={{ width: "33%", height: "300px" }} data={PieData} options={pieOptions} ></Doughnut></div>
                        <div className="col-md-8 p-2 gap-2 d-flex flex-wrap justify-content-center align-items-center  mt-5 ">
                          
                                <div style={{width:"180px",height:"150px"}} className="text-center border rounded border-primary border-4 d-flex flex-column  bg-dark text-light  justify-content-center col-md-3     mb-3 p-1  " >
                                    <h5>TOTAL USERS</h5>
                                    <h4 className='fw-bold '>{numOfUsers}</h4>
                                </div>
                               <div  style={{width:"180px",height:"150px"}} className="text-center  border rounded border-primary border-4  d-flex flex-column justify-content-center col-md-3  bg-dark text-light   mb-3 p-4  ">
                                    <h5>Number of Properies</h5>
                                    <h4 className='fw-bold'>{numOfProperties}</h4>
                                </div><div  style={{width:"180px",height:"150px"}} className="text-center border rounded border-primary border-4   d-flex flex-column justify-content-center col-md-3  bg-dark text-light   mb-3 p-4  ">
                                    <h5>Total booking</h5>
                                    <h4 className='fw-bold'>{numOfBookings}</h4>
                                </div>

                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardSuperAdmin