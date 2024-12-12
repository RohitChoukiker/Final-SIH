// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
// import { Package, Truck, Clock } from 'lucide-react';
// import { StatsCard } from '../components/dashboard/StatsCard';
// import { ParcelTable } from '../components/dashboard/ParcelTable'; 
// import { Parcel } from '../types';

// const mockParcels: Parcel[] = [
//   {
//     id: 'NSH001',
//     senderId: 'S001',
//     receiverId: 'R001',
//     weight: 2.5,
//     type: 'document',
//     status: 'in_transit',
//     origin: 'Mumbai',
//     destination: 'Delhi',
//   },
//   {
//     id: 'NSH002',
//     senderId: 'S002',
//     receiverId: 'R002',
//     weight: 3.0,
//     type: 'parcel',
//     status: 'delivered',
//     origin: 'Bangalore',
//     destination: 'Chennai',
//   },
//   {
//     id: 'NSH003',
//     senderId: 'S003',
//     receiverId: 'R003',
//     weight: 1.5,
//     type: 'document',
//     status: 'in_transit',
//     origin: 'Kolkata',
//     destination: 'Hyderabad',
//   },
//   {
//     id: 'NSH004',
//     senderId: 'S004',
//     receiverId: 'R004',
//     weight: 4.0,
//     type: 'parcel',
//     status: 'pending',
//     origin: 'Pune',
//     destination: 'Mumbai',
//   }
// ];

// export const NSHDashboard: React.FC = () => {
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   // Handle navigation to InvertParcelTable with parcels data
//   const handleNextPage = () => {
//     navigate("/InvertParcelTable", { state: { parcels: mockParcels } });
//   };

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold text-gray-900 dark:text-white">NSH Dashboard</h1>
      
//       <div className="flex justify-end">
//         <button
//           onClick={handleNextPage}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
//         >
//           Inward
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatsCard
//           title="Received Parcels"
//           value={25} // Replace with dynamic data if available
//           icon={Package}
//           trend={{ value: 12, isPositive: true }}
//         />
//         <StatsCard
//           title="Active Routes"
//           value={8} // Replace with dynamic data if available
//           icon={Truck}
//           trend={{ value: 5, isPositive: true }}
//         />
//         <StatsCard
//           title="Average Delivery Time"
//           value="2.588 days" // Replace with dynamic data if available
//           icon={Clock}
//           trend={{ value: 10, isPositive: false }}
//         />
//       </div>

//       <div>
//         <h2 className="text-xl font-semibold text-gray-900 dark:text-red">Incoming Parcels</h2>
//         <ParcelTable parcels={mockParcels} />
//       </div>
//     </div>
//   );
// };



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, Clock } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { ParcelTable } from '../components/dashboard/ParcelTable';
import { Parcel } from '../types';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const mockParcels: Parcel[] = [
  {
    id: 'NSH001',
    senderId: 'S001',
    receiverId: 'R001',
    weight: 2.5,
    type: 'document',
    status: 'in_transit',
    origin: 'Mumbai',
    destination: 'Delhi',
  },
  {
    id: 'NSH002',
    senderId: 'S002',
    receiverId: 'R002',
    weight: 3.0,
    type: 'parcel',
    status: 'delivered',
    origin: 'Bangalore',
    destination: 'Chennai',
  },
  {
    id: 'NSH003',
    senderId: 'S003',
    receiverId: 'R003',
    weight: 1.5,
    type: 'document',
    status: 'in_transit',
    origin: 'Kolkata',
    destination: 'Hyderabad',
  },
  {
    id: 'NSH004',
    senderId: 'S004',
    receiverId: 'R004',
    weight: 4.0,
    type: 'parcel',
    status: 'pending',
    origin: 'Pune',
    destination: 'Mumbai',
  }
];

export const NSHDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate("/InvertParcelTable", { state: { parcels: mockParcels } });
  };

  // Data for graphs
  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Received Bags',
        data: [20, 25, 30, 35],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'Delivered Bags',
        data: [5, 8, 12, 15],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const barData = {
    labels: ['Received', 'Delivered', 'Efficiency'],
    datasets: [
      {
        label: 'Stats Overview',
        data: [25, 8, 88],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 206, 86, 0.8)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray">NSH Dashboard System</h1>

      <div className="flex justify-end">
        <button
          onClick={handleNextPage}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Inward
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Received Bags"
          value={25}
          icon={Package}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Delivered Bags"
          value={8}
          icon={Truck}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Expected Efficiency Ratio"
          value="88%"
          icon={Clock}
          trend={{ value: 10, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray">Trend Over Time</h2>
          <Line data={lineData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray">Summary Overview</h2>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-red">Incoming Parcels</h2>
        <ParcelTable parcels={mockParcels} />
      </div>
    </div>
  );
};