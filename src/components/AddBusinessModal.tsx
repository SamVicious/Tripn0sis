"use client";

import { useState } from "react";

interface AddBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddBusinessModal({ isOpen, onClose }: AddBusinessModalProps) {
  const [businessName, setBusinessName] = useState("");
  const [promotion, setPromotion] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just simulate submission
    console.log("Business submitted:", { businessName, promotion, contactInfo });
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">Add Your Business</h2>
        {submitted ? (
          <div>
            <p className="mb-4 text-green-600">Thank you for submitting your business details!</p>
            <button
              onClick={() => {
                setSubmitted(false);
                setBusinessName("");
                setPromotion("");
                setContactInfo("");
                onClose();
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="businessName" className="block font-medium mb-1">
                Business Name
              </label>
              <input
                id="businessName"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="promotion" className="block font-medium mb-1">
                Promotion / Discount Details
              </label>
              <textarea
                id="promotion"
                value={promotion}
                onChange={(e) => setPromotion(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="contactInfo" className="block font-medium mb-1">
                Contact Information
              </label>
              <input
                id="contactInfo"
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
