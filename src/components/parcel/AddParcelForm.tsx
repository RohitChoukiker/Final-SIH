import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddressForm } from "./AddressForm";
import { ParcelDetailsForm } from "./ParcelDetailsForm";
import { useGeolocation } from "../../hooks/useGeolocation";
import ParcelService from "../../services/parcel.service";
import OptimizationService from "../../services/optimization.service";

export interface ParcelFormData {
  st?: string;
  att?: string;
  abt?: string;
  sender: {
    fullName: string;
    address: string;
    pinCode: string;
    contactNumber: string;
  };
  receiver: {
    fullName: string;
    address: string;
    pinCode: string;
    contactNumber: string;
  };
  parcel: {
    type: string;
    weight: string;
    dimensions: {
      length: string;
      width: string;
      height: string;
    };
  };
}

const initialFormData: ParcelFormData = {
  st: "35",
  att: "2",
  abt: "1",
  sender: {
    fullName: "",
    address: "",
    pinCode: "",
    contactNumber: "",
  },
  receiver: {
    fullName: "",
    address: "",
    pinCode: "",
    contactNumber: "",
  },
  parcel: {
    type: "speedpost",
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
  },
};

export const AddParcelForm: React.FC = () => {
  const [formData, setFormData] = useState<ParcelFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { getCurrentLocation } = useGeolocation();
  const [rres, setRees] = useState<any>();
  const [qr, showqr] = useState(false);
  ``
  const handleSenderLocationClick = async () => {
    const location = await getCurrentLocation();
    if (location) {
      setFormData((prev) => ({
        ...prev,
        sender: {
          ...prev.sender,
          address: location.address,
          pinCode: location.pinCode,
        },
      }));
    }
  };

  const handleReceiverLocationClick = async () => {
    const location = await getCurrentLocation();
    if (location) {
      setFormData((prev) => ({
        ...prev,
        receiver: {
          ...prev.receiver,
          address: location.address,
          pinCode: location.pinCode,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await ParcelService.createParcel(formData);
      console.log(res);
      const path_data = {
        st: "3",
        att: "2",
        abt: "2",
        s_pin: formData.sender.pinCode,
        d_pin: formData.receiver.pinCode,
      };
      console.log(path_data);
      const res2 = await OptimizationService.getpath(path_data);
      console.log(res2);
      setRees(res2);
      // navigate("/spo-dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="bg-white dark:bg-white-100 rounded-lg shadow-2xl p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex items-center ${step < 3 ? "flex-1" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step <= currentStep
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
                  }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`flex-1 h-1 mx-4 ${step < currentStep ? "bg-blue-600" : "bg-gray-200"
                    }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-black-900">Sender Details</span>
          <span className="text-black-900">Parcel Details</span>
          <span className="text-black-900">Receiver Details</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && (
          <AddressForm
            title="Sender's Details"
            data={formData.sender}
            onChange={(data) =>
              setFormData((prev) => ({ ...prev, sender: data }))
            }
            onLocationClick={handleSenderLocationClick}
          />
        )}

        {currentStep === 2 && (
          <ParcelDetailsForm
            data={formData.parcel}
            onChange={(data) =>
              setFormData((prev) => ({ ...prev, parcel: data }))
            }
          />
        )}

        {currentStep === 3 && (
          <AddressForm
            title="Receiver's Details"
            data={formData.receiver}
            onChange={(data) =>
              setFormData((prev) => ({ ...prev, receiver: data }))
            }
            onLocationClick={handleReceiverLocationClick}
          />
        )}

        <div className="flex justify-between pt-4">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 text-blue-600 hover:text-blue-700"
            >
              Previous
            </button>
          )}
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto px-4 py-2 text-blue-700 "
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
            >
              Add Parcel
            </button>
          )}
        </div>
      </form>
      {rres ? (
        <div className="p-4 bg-gray-100 rounded-lg border border-gray-300">
          <h3 className="text-lg font-semibold mb-2">Parcel Details:</h3>
          {rres.map((item: any, index: any) => (
            <div key={index} className="mb-4">
              <p><strong>Arrival:</strong> {new Date(item.arrival).toLocaleString()}</p>
              <p><strong>Departure:</strong> {new Date(item.departure).toLocaleString()}</p>
              <p><strong>Day:</strong> {item.data.Day}</p>
              <p><strong>Departure Time:</strong> {item.data["Departure Time"]}</p>
              <p><strong>Destination:</strong> {item.data.Destination}</p>
              <p><strong>Airline Name:</strong> {item.data.Name}</p>
              <p><strong>Flight Number:</strong> {item.data["Number "]}</p>
              <p><strong>Origin:</strong> {item.data.Origin}</p>
              <p><strong>Weight (w):</strong> {item.w.toFixed(2)}</p>
            </div>
          ))}
          <button
            onClick={async () => {
              await OptimizationService.sendSms({ message: `Your parcel has been sent using speedpost` });
              showqr(true)
            }
            }
            type="button"
            className="ml-auto px-4 py-2 text-blue-700 "
          >
            Speedpost
          </button>

          <button
            onClick={async () => {
              showqr(true)
              await OptimizationService.sendSms({ message: "Your parcel has been sent using regular post" })
            }
            }
            type="button"
            className="ml-auto px-4 py-2 text-blue-700"
          >
            Regular Post
          </button>
          {qr ?
            <a href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-loSNj_1Rplc-oOn_5mZZrcSzFRvHsrvfiw&s">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-loSNj_1Rplc-oOn_5mZZrcSzFRvHsrvfiw&s" alt="rr" />
            </a>
            : undefined}
        </div>
      ) : null}
    </div>
  );
};
