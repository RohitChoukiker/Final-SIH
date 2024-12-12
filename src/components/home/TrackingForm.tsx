import React, { useState } from 'react';
import { Search } from 'lucide-react';
import ParcelService from '../../services/parcel.service';

export const TrackingForm: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [parcel, setParcel] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parcel = await ParcelService.getParcel(trackingId);
    setParcel(parcel);
  };

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="relative">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter Tracking ID"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              <Search onClick={handleSubmit} size={20} />
            </button>
          </div>
        </form>
        <div className="mt-4 w-full max-w-md">
          {parcel ? (
            <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
              <p><strong>Parcel ID:</strong> {parcel.parcelId}</p>
              <p><strong>Status:</strong> {parcel.status}</p>
              <p><strong>Sender Name:</strong> {parcel.senderName}</p>
              <p><strong>Sender Phone Number:</strong> {parcel.senderPhoneNumber || "N/A"}</p>
              <p><strong>Receiver Name:</strong> {parcel.receiverName}</p>
              <p><strong>Receiver Phone Number:</strong> {parcel.receiverPhoneNumber}</p>
              <p><strong>Pickup Address:</strong> {parcel.pickupAddress}</p>
              <p><strong>Delivery Address:</strong> {parcel.deliveryAddress}</p>
              <p><strong>Sender Pincode:</strong> {parcel.senderPincode}</p>
              <p><strong>Receiver Pincode:</strong> {parcel.receiverPincode}</p>
              <p><strong>Weight:</strong> {parcel.weight} kg</p>
              <p><strong>Type:</strong> {parcel.type}</p>
              <p><strong>Dimensions:</strong> {parcel.dimensions}</p>
              <p><strong>NSH Pincode:</strong> {parcel.nshPincode}</p>
              <p><strong>Created At:</strong> {new Date(parcel.createdAt).toLocaleString()}</p>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
