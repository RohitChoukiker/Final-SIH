import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ServiceRequestForm {
  name: string;
  contact: string;
  email: string;
  message: string;
}

export const ServiceRequest: React.FC = () => {
  const [form, setForm] = useState<ServiceRequestForm>({
    name: '',
    contact: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'f689c157-2620-4c6b-b931-e90b7f6c5fd0', // Replace with your API key
          name: form.name,
          contact: form.contact,
          email: form.email,
          message: form.message,
        }),
      });

      const result = await res.json();
      if (result.success) {
        setResponseMessage('Your request has been submitted successfully!');
        setForm({ name: '', contact: '', email: '', message: '' }); // Reset form
      } else {
        setResponseMessage('Failed to submit your request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponseMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Full Name
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Contact Number
        </label>
        <input
          type="tel"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email ID
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Message
        </label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 h-32 resize-none"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full flex items-center justify-center space-x-2 py-2 rounded-md text-white transition-colors ${
          isSubmitting
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        <Send size={20} />
        <span>{isSubmitting ? 'Submitting...' : 'Submit Request'}</span>
      </button>
      {responseMessage && (
        <p className="text-center text-sm mt-2">{responseMessage}</p>
      )}
    </form>
  );
};