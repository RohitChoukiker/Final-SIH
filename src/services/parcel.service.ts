import { ParcelFormData } from "../components/parcel/AddParcelForm";
import { BackendService } from "./config";

export interface ParcelFormServiceData {
    senderPincode: string;
    senderName: string;
    senderPhoneNumber: string;
    receiverName: string;
    receiverPhoneNumber: string;
    pickupAddress: string;
    deliveryAddress: string;
    receiverPincode: string;
    weight: string;
    dimensions: string;
    status: string;
}

const ParcelService = {

    async getAllParcels() {
        return await BackendService.get("/parcels");
    },

    async getParcelsByPincode(pincode: string) {
        return await BackendService.get(`/parcels/${pincode}`);
    },

    async createParcel(parcelData: ParcelFormData) {
        const parcel: ParcelFormServiceData = {
            senderPincode: parcelData.sender.pinCode,
            senderName: parcelData.sender.fullName,
            senderPhoneNumber: parcelData.sender.contactNumber,
            receiverName: parcelData.receiver.fullName,
            receiverPhoneNumber: parcelData.receiver.contactNumber,
            pickupAddress: parcelData.sender.address,
            deliveryAddress: parcelData.receiver.address,
            receiverPincode: parcelData.receiver.pinCode,
            weight: parcelData.parcel.weight,
            dimensions: `${parcelData.parcel.dimensions.length}x${parcelData.parcel.dimensions.width}x${parcelData.parcel.dimensions.height}`,
            status: 'pre_transit',
        };
        return await BackendService.post("/parcels", parcel);
    },

    async updateParcelStatus(parcelId: string, status: string) {
        return await BackendService.patch(`/parcels/${parcelId}`, { status });
    },
};

export default ParcelService;
