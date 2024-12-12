import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SourceGunnyService from '../services/gunny.service';

export const SourceGunnyBagDetails: React.FC = () => {
    const { id } = useParams();
    const [bag, setBag] = React.useState<any>()
    useEffect(() => {
        const fetchBag = async () => {
            try {
                const bag: any = await SourceGunnyService.getGunnyBag(id || "");
                setBag(bag);
            } catch (error) {
                console.error('Error fetching bag:', error);
            }
        };
        fetchBag();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                {bag ? <>
                    <h1 className="text-2xl font-bold mb-4">Baggage (ID: {bag.gunnyID})</h1>
                    <p><strong>NSH:</strong> {bag.nsh.name}</p>
                    <p><strong>Package Count:</strong> {bag.parcels.length}</p>
                    <p><strong>Weight:</strong> {bag.weight}</p>
                    <p><strong>Status:</strong> {bag.status}</p>
                    <p><strong>Type:</strong> {bag.type}</p>
                    <h2 className="text-xl font-bold mt-4">Parcels:</h2>
                    {bag.parcels.map((parcel: any, index: number) => (
                        <div key={index} className="border-b py-2">
                            <p><strong>Parcel ID:</strong> {parcel._id}</p>
                            <p><strong>Sender Name:</strong> {parcel.senderName}</p>
                            <p><strong>Sender Phone:</strong> {parcel.senderPhoneNumber}</p>
                            <p><strong>Sender Email:</strong> {parcel.senderEmail}</p>
                            <p><strong>Pickup Address:</strong> {parcel.pickupAddress}</p>
                            <p><strong>Destination:</strong> {parcel.destination}</p>
                            <p><strong>Delivery Address:</strong> {parcel.deliveryAddress}</p>
                            <p><strong>Receiver Name:</strong> {parcel.receiverName}</p>
                            <p><strong>Receiver Phone:</strong> {parcel.receiverPhoneNumber}</p>
                            <p><strong>Receiver Pincode:</strong> {parcel.receiverPincode}</p>
                            <p><strong>Weight:</strong> {parcel.weight} kg</p>
                        </div>
                    ))}
                </> : <p className="text-gray-600">Loading...</p>}
            </div>
        </div>
    );
}