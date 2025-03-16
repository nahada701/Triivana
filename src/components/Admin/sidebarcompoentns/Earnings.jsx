import React, { useEffect, useState } from 'react'
import { Bar, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement, 
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Doughnut } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';
import { propertyOwnerEarningsApi } from '../../../Services/allApi';
import { Handshake } from '@mui/icons-material';
import { backdropClasses } from '@mui/material';
import Spinner from '../../Shared/Spinner';

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement, 
  LineElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.register(ArcElement, Tooltip, Legend);



function Earnings() {



  const [lastThirtyDaysEarnings,setLastThirtyDaysEarnings]=useState()
  const [lastYearEarnings,setLastYearEarnings]=useState()
  const [lastYearHotelGraphData,setLastYearHotelGraphData]=useState()
  const [paymentModeData,setPaymentModeData]=useState()
  const [totalEarnings,setTotalEarnings]=useState()
  
  
  const[isDataLoading,setIsDataLoading]=useState(false)

  const[selectedLineData,setSelectedLineData]=useState("Total")
  const [monthlyLineData, setMonthlyLineData] = useState({
    labels: [],
    datasets: []
  });

  const [selecteddoughnutData,setSelecteddoughnutData]=useState("Total")
  const [monthlydoughnutData,setMonthlydoughnutData]=useState({
    labels:[],
    datasets:[]
  })

  useEffect(() => {
    getEarningsData()
  }, [])
  useEffect(() => {
    if (lastYearHotelGraphData?.length > 0) {
      updateLineChart("Total"); 
      updateDoughnutData("Total")
      
    }
  }, [lastYearHotelGraphData]);

  const getEarningsData=async()=>{
    setIsDataLoading(true)
    const token = sessionStorage.getItem("adminToken")

    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }

      try {

        const result=await propertyOwnerEarningsApi(reqHeader)
        console.log(result);
        

          if(result.status==200){
            setTotalEarnings(result.data.totalEarnings)
            setPaymentModeData(result.data.paymentModeData)
            setLastThirtyDaysEarnings(result.data.lastThirtyDaysEarnings)
            setLastYearEarnings(result.data.lastYearEarnings)
            setLastYearHotelGraphData(result.data.lastYearHotelGraphData)
            setIsDataLoading(false)

          }
      } catch (error) {
        console.log(error);
        
      }
    }
  }
  
const updateLineChart=(hotelName)=>{
  setSelectedLineData(hotelName);
  if (hotelName === "Total") {
    // Aggregate all hotels' monthly earnings
    let totalPayments = {};

    lastYearHotelGraphData.forEach((hotel) => {
      hotel.monthlyPayments.forEach(({ month, totalPayment }) => {
        totalPayments[month] = (totalPayments[month] || 0) + totalPayment;
      });
    });

    setMonthlyLineData({
      labels: Object.keys(totalPayments).sort(),
      datasets: [
        {
          label: "Earnings (₹)",
          data: Object.values(totalPayments),
          backgroundColor: "blue",
          borderWidth: 1
        }
      ]
    });
  } else {
    // Filter for selected hotel
    const selected = lastYearHotelGraphData.find(h => h.hotelName === hotelName);
    setMonthlyLineData({
      labels: selected?.monthlyPayments.map((p) => p.month) || [],
      datasets: [
        {
          label: `${hotelName} Earnings (₹)`,
          data: selected?.monthlyPayments.map((p) => p.totalPayment) || [],
          backgroundColor: "blue",
          borderWidth: 1
        }
      ]
    });
  }

}

const updateDoughnutData = (hotelName) => {
  setSelecteddoughnutData(hotelName);

  let totalModeData = {};

  if (hotelName === "Total") {
    paymentModeData?.forEach(hotel => {
      hotel?.paymentMethods.forEach(({ method, count }) => {
        totalModeData[method] = (totalModeData[method] || 0) + count;
      });
    });

    setMonthlydoughnutData({
      labels: Object.keys(totalModeData),
      datasets: [
        {
          data: Object.values(totalModeData),
          backgroundColor: ['#1E3A8A', '#60A5FA', '#BFDBFE', "blue"],
        }
      ]
    });
  } else {
    let selected = paymentModeData.find(hotel => hotel.hotelName === hotelName);
    
    if (selected) {
      setMonthlydoughnutData({
        labels: selected.paymentMethods.map(p => p.method) || [],
        datasets: [
          {
            data: selected.paymentMethods.map(p => p.count) || [],
            backgroundColor: ['#1E3A8A', '#60A5FA', '#BFDBFE', "blue"]
          }
        ]
      })
    }
  }
};


  


 
  return (
  <>
  {
    isDataLoading?
   <Spinner></Spinner>
    :
     <div className="container">
      <div className="row g-3">
        <div className="col-md-4  ">  
          <Card className="p-2 shadow">
              <h5>Total </h5>
              <h4 className='text-primary'>₹ {totalEarnings?.reduce((acc,hotel)=>acc+hotel.totalEarnings,0)}</h4>
            { totalEarnings?.length>0 &&
            totalEarnings.map(h=>(
  
            <div className='d-flex justify-content-between'> 
              <p > {h?.hotel} </p>
              <p className=' fw-bold'>₹{h?.totalEarnings}</p>
              </div>
            ))}
            </Card></div>
        <div className="col-md-4">
        <Card className="p-2 shadow">
              <h5>Last Month </h5>
              <h4 className='text-primary'>₹ {lastThirtyDaysEarnings?.reduce((acc,hotel)=>acc+hotel.thirtyDaysEarnings,0)}</h4>
            { lastThirtyDaysEarnings?.length>0 &&
            lastThirtyDaysEarnings.map(h=>(
  
            <div className='d-flex justify-content-between'> 
              <p > {h?.hotel} </p>
              <p className=' fw-bold'>₹{h?.thirtyDaysEarnings}</p>
              </div>
            ))}
            </Card>
        </div>
        <div className="col-md-4 ">
        <Card className="p-2 shadow">
              <h5> Last Year </h5>
              <h4 className='text-primary'>₹ {lastYearEarnings?.reduce((acc,hotel)=>acc+hotel.oneYearEarning,0)}</h4>
            { lastYearEarnings?.length>0 &&
            lastYearEarnings.map(h=>(
  
            <div className='d-flex justify-content-between'> 
              <p > {h?.hotel} </p>
              <p className=' fw-bold'>₹{h?.oneYearEarning}</p>
              </div>
            ))}
            </Card>
        </div>
      
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
        <div className='d-flex justify-content-between align-items-center'>
          <h5>Total Monthly Earnings</h5>
            <select name="" value={selectedLineData} onChange={(e)=>updateLineChart(e.target.value)} id="" className='form-control w-25'>
              <option value="Total">Total</option>
              {lastYearHotelGraphData?.map((h) => (
      <option key={h._id} value={h.hotelName}>{h.hotelName}</option>
    ))}
    
            </select>
        </div>
       <Bar data={monthlyLineData} />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-5">
        <div className='d-flex justify-content-between align-items-center'>
          <h5>Mode of payment</h5>
            <select value={selecteddoughnutData} onChange={(e)=>updateDoughnutData(e.target.value)} className='form-control w-25' name="" id="">
              <option value="Total">Total</option>
            {
              lastYearHotelGraphData?.length>0 &&
              lastYearHotelGraphData?.map(h=>(
                <option value={h.hotelName}>{h.hotelName}</option>
              ))
            }
    
            </select>
        </div>
       <div className=' d-flex justify-content-center' style={{width:"64%"}}> <Doughnut data={monthlydoughnutData} /></div>
        </div>
    
      </div>
  
     </div>
  }
  </>
   
  )
}

export default Earnings