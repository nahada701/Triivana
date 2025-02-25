import React from 'react'
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Doughnut } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.register(ArcElement, Tooltip, Legend);
function Earnings() {
  const MonthlyData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May","June", "July", "Aug", "Sept", "Oct","Nov","Dec"],
    datasets: [
      {
        label: "Earnings (₹)",
        data: [120000, 150000, 180000,  180000, 200000, 250000,180000,180000, 200000, 250000,180000,180000, 200000, 250000,180000, 200000, 250000],
        borderColor: "blue",
        borderWidth: 2,
      },
    ],
  };

  const payoutData = {
    labels: ['Completed Payouts', 'Pending Payouts'],
    datasets: [
      {
        data: [420000, 120000],
        backgroundColor: ['blue', 'black'],
      },
    ],
  };


 
  return (
   <div className="container">
    <div className="row">
      <div className="col-md-3">  
        <Card className="p-3">
            <h5>Total Earnings</h5>
            <h3>₹ 5,400,00</h3>
          </Card></div>
      <div className="col-md-3">
      <Card className="p-3">
            <h5>Total Bookings</h5>
            <h3>120</h3>
          </Card>
      </div>
      <div className="col-md-3">
      <Card className="p-3">
            <h5>Pending Payouts</h5>
            <h3>₹ 1,2000</h3>
          </Card>
      </div>
      <div className="col-md-3">
      <Card className="p-3">
            <h5>Completed Payouts</h5>
            <h3>₹ 4,200,00</h3>
          </Card>
      </div>
    </div>
    <div className="row mt-5">
      <div className="col-md-6">
        <h4>Monthly Earnings</h4>
     <Line data={MonthlyData} />
      </div>
      <div className="col-md-4">
      <Doughnut data={payoutData} />;
      </div>
  
    </div>

   </div>
   
  )
}

export default Earnings