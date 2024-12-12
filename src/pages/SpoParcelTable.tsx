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
import SourceGunnyService from '../services/gunny.service';

export const SpoParcelTable = () => {
  const [sourceGunnyData, destinationGunnyData] = useState<[]>([]);

  const fetchParcels = async () => {
    try {
      const res: any = await SourceGunnyService.getPreDispatched();
      destinationGunnyData(res);
    } catch (e) {
      console.log("Could not fetch parcels", e);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  const navigate = useNavigate();

  const handleShowDetails = (id: string) => {
    navigate(`/source-gunny-bag-details/${id}`);
  };

  const handleDispatch = async (id: string) => {
    try {
      await SourceGunnyService.patchGunnyBag(id);
      fetchParcels();
    } catch (e) {
      alert("Bag weight should be 50kg");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Baggage ID</th>
              <th className="px-4 py-2 text-left">NSH</th>
              <th className="px-4 py-2 text-left">Package Count</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Weight</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sourceGunnyData.map((bag: any, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{bag.gunnyID}</td>
                <td className="px-4 py-2">{bag.nsh.name}</td>
                <td className="px-4 py-2">{bag.parcels.length}</td>
                <td className="px-4 py-2">{bag.type}</td>
                <td className="px-4 py-2">{bag.weight}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleShowDetails(bag._id || "nf")}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Show Details
                  </button>

                  <button
                    onClick={() => handleDispatch(bag._id || "nf")}
                    className="ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Dispatch
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