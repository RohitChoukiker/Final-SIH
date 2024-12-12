import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

interface PostageForm {
  weight: string; // Weight as a string
  type: string;
  origin: string;
  destination: string;
}

export const PostageCalculator: React.FC = () => {
  const [form, setForm] = useState<PostageForm>({
    weight: '',
    type: 'parcel',
    origin: '',
    destination: '',
  });

  const [postageResult, setPostageResult] = useState<number | null>(null);

  const calculatePostage = () => {
    const baseRate = 10; // Base rate for postage
    const weightRate = 2; // Per kg rate

    let totalRate = baseRate;

    // Additional charges based on package type
    switch (form.type) {
      case 'parcel':
        totalRate += 5; // Add extra charge for parcel
        break;
      case 'speed-post':
        totalRate += 10; // Add extra charge for speed post
        break;
      case 'express':
        totalRate += 15; // Add extra charge for express
        break;
      default:
        break;
    }

    // Calculating postage
    const totalPostage = totalRate + parseFloat(form.weight) * weightRate;
    setPostageResult(totalPostage);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculatePostage();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Package Weight (kg)
          </label>
          <input
            type="number"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            step="0.1"
            min="0"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Package Type
          </label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="parcel">Parcel</option>
            <option value="speed-post">Speed Post</option>
            <option value="express">Express</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Origin PIN
            </label>
            <input
              type="text"
              value={form.origin}
              onChange={(e) => setForm({ ...form, origin: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Destination PIN
            </label>
            <input
              type="text"
              value={form.destination}
              onChange={(e) => setForm({ ...form, destination: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <Calculator size={20} />
          <span>Calculate Postage</span>
        </button>
      </form>

      {postageResult !== null && (
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">Postage Details</h2>
          <table className="w-full border-collapse border border-gray-400 mt-4">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Parameter</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Weight (kg)</td>
                <td className="border border-gray-300 px-4 py-2">{form.weight}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Type</td>
                <td className="border border-gray-300 px-4 py-2">{form.type}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Origin PIN</td>
                <td className="border border-gray-300 px-4 py-2">{form.origin}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Destination PIN</td>
                <td className="border border-gray-300 px-4 py-2">{form.destination}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Total Postage</td>
                <td className="border border-gray-300 px-4 py-2">₹{postageResult.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};