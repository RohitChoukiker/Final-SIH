import React from "react";

// Table data interface
interface RouteData {
  source: string;
  transitHub: string;
  destination: string;
  distanceSourceToTransit: string;
  modeSourceToTransit: string;
  distanceTransitToDestination: string;
  modeTransitToDestination: string;
  overallTime: string;
}

// Table data
const routeData: RouteData[] = [
  {
    source: "Delhi",
    transitHub: "Jaipur",
    destination: "Mumbai",
    distanceSourceToTransit: "280 km",
    modeSourceToTransit: "Road",
    distanceTransitToDestination: "1148 km",
    modeTransitToDestination: "Road",
    overallTime: "22 hours",
  },
  {
    source: "Kolkata",
    transitHub: "Patna",
    destination: "Lucknow",
    distanceSourceToTransit: "588 km",
    modeSourceToTransit: "Rail",
    distanceTransitToDestination: "530 km",
    modeTransitToDestination: "Rail",
    overallTime: "18 hours",
  },
  {
    source: "Bengaluru",
    transitHub: "Hyderabad",
    destination: "Pune",
    distanceSourceToTransit: "569 km",
    modeSourceToTransit: "Road",
    distanceTransitToDestination: "559 km",
    modeTransitToDestination: "Air",
    overallTime: "6 hours",
  },
  {
    source: "Chennai",
    transitHub: "Vijayawada",
    destination: "Visakhapatnam",
    distanceSourceToTransit: "430 km",
    modeSourceToTransit: "Rail",
    distanceTransitToDestination: "350 km",
    modeTransitToDestination: "Road",
    overallTime: "12 hours",
  },
  {
    source: "Ahmedabad",
    transitHub: "Udaipur",
    destination: "Jaipur",
    distanceSourceToTransit: "261 km",
    modeSourceToTransit: "Road",
    distanceTransitToDestination: "420 km",
    modeTransitToDestination: "Rail",
    overallTime: "10 hours",
  },
];

// Table component
const RouteTable: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Route Table</h1>
      <table className="table-auto border-collapse border border-gray-400 w-full text-left">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">Source</th>
            <th className="border border-gray-400 px-4 py-2">Transit Hub</th>
            <th className="border border-gray-400 px-4 py-2">Destination</th>
            <th className="border border-gray-400 px-4 py-2">Distance (Source to Transit Hub)</th>
            <th className="border border-gray-400 px-4 py-2">Mode (Source to Transit Hub)</th>
            <th className="border border-gray-400 px-4 py-2">Distance (Transit Hub to Destination)</th>
            <th className="border border-gray-400 px-4 py-2">Mode (Transit Hub to Destination)</th>
            <th className="border border-gray-400 px-4 py-2">Overall Time</th>
          </tr>
        </thead>
        <tbody>
          {routeData.map((route, index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">{route.source}</td>
              <td className="border border-gray-400 px-4 py-2">{route.transitHub}</td>
              <td className="border border-gray-400 px-4 py-2">{route.destination}</td>
              <td className="border border-gray-400 px-4 py-2">{route.distanceSourceToTransit}</td>
              <td className="border border-gray-400 px-4 py-2">{route.modeSourceToTransit}</td>
              <td className="border border-gray-400 px-4 py-2">{route.distanceTransitToDestination}</td>
              <td className="border border-gray-400 px-4 py-2">{route.modeTransitToDestination}</td>
              <td className="border border-gray-400 px-4 py-2">{route.overallTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RouteTable;
