// import React from 'react';

// export const SpoParcelTable = () => {
//   const parcelData = [
//     { id: 'P001', origin: 'Mumbai', destination: 'Delhi', weight: '5 kg' },
//     { id: 'P002', origin: 'Bangalore', destination: 'Chennai', weight: '3 kg' },
//     { id: 'P003', origin: 'Kolkata', destination: 'Hyderabad', weight: '7 kg' },
//     { id: 'P004', origin: 'Pune', destination: 'Lucknow', weight: '8 kg' },
//     { id: 'P004', origin: 'Pune', destination: 'Lucknow', weight: '8 kg' },
//     { id: 'P004', origin: 'Pune', destination: 'Lucknow', weight: '8 kg' },
//     { id: 'P004', origin: 'Pune', destination: 'Lucknow', weight: '8 kg' },
//     { id: 'P004', origin: 'Pune', destination: 'Lucknow', weight: '8 kg' },
//     { id: 'P004', origin: 'Pune', destination: 'Lucknow', weight: '8 kg' },

//   ];

//   return (
//     <div className="container mx-auto p-6">
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <table className="min-w-full table-auto">
//           <thead className="bg-gray-800 text-white">
//             <tr>
//               <th className="px-4 py-2 text-left">Parcel ID</th>
//               <th className="px-4 py-2 text-left">Origin</th>
//               <th className="px-4 py-2 text-left">Destination</th>
//               <th className="px-4 py-2 text-left">Weight</th>
//             </tr>
//           </thead>
//           <tbody>
//             {parcelData.map((parcel, index) => (
//               <tr key={index} className="border-b hover:bg-gray-100">
//                 <td className="px-4 py-2">{parcel.id}</td>
//                 <td className="px-4 py-2">{parcel.origin}</td>
//                 <td className="px-4 py-2">{parcel.destination}</td>
//                 <td className="px-4 py-2">{parcel.weight}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParcelService, { ParcelFormServiceData } from '../services/parcel.service';

export const SpoParcelTable = () => {
  const [parcelData, setParcelData] = useState<ParcelFormServiceData[]>([]);

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const res = await ParcelService.getAllParcels();
        setParcelData(res);
      } catch(e) {
        console.log("Could not fetch parcels", e);
      }
    };

    fetchParcels();
  }, []);

  const navigate = useNavigate();

  const handleShowDetails = (id: string) => {
    navigate(`/parcel-details/${id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Parcel ID</th>
              <th className="px-4 py-2 text-left">Origin</th>
              <th className="px-4 py-2 text-left">Destination</th>
              <th className="px-4 py-2 text-left">Weight</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcelData.map((parcel, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{parcel.parcelId}</td>
                <td className="px-4 py-2">{parcel.pickupAddress}</td>
                <td className="px-4 py-2">{parcel.deliveryAddress}</td>
                <td className="px-4 py-2">{parcel.weight}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleShowDetails(parcel._id || "nf")}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Show Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

