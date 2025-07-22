"use client";

import { useState } from "react";

interface AddBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddBusinessModal({ isOpen, onClose }: AddBusinessModalProps) {
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "cafe", // Default selection
    address: "",
    suburb: "",
    postcode: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    promotion: "",
    description: "",
    website: "",
    socialMedia: "",
    acceptTerms: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/submit-business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit business details');
      }

      // Success - show thank you message
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      businessName: "",
      businessType: "cafe",
      address: "",
      suburb: "",
      postcode: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      promotion: "",
      description: "",
      website: "",
      socialMedia: "",
      acceptTerms: false
    });
    setSubmitted(false);
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Add Your Business to Tripnosis</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        {submitted ? (
          <div className="text-center py-8">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
            <p className="mb-6 text-gray-600">
              Your business details have been submitted successfully. Our team will review your application and contact you soon!
            </p>
            <button
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-blue-800">
                Join our network of Sydney businesses and get featured on Tripnosis! 
                Our users are tourists and locals looking for authentic Sydney experiences.
              </p>
            </div>

            <div className="border-b pb-4 mb-4">
              <h3 className="font-semibold text-lg mb-4">Business Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="businessName" className="block font-medium mb-1 text-gray-700">
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="businessType" className="block font-medium mb-1 text-gray-700">
                    Business Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="cafe">Café</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="bar">Bar</option>
                    <option value="pub">Pub</option>
                    <option value="tour">Tour Company</option>
                    <option value="accommodation">Accommodation</option>
                    <option value="retail">Retail Shop</option>
                    <option value="attraction">Tourist Attraction</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="description" className="block font-medium mb-1 text-gray-700">
                  Business Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about your business..."
                />
              </div>
            </div>

            <div className="border-b pb-4 mb-4">
              <h3 className="font-semibold text-lg mb-4">Location</h3>
              
              <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <label htmlFor="address" className="block font-medium mb-1 text-gray-700">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="suburb" className="block font-medium mb-1 text-gray-700">
                    Suburb <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="suburb"
                    name="suburb"
                    type="text"
                    value={formData.suburb}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="postcode" className="block font-medium mb-1 text-gray-700">
                    Postcode <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="postcode"
                    name="postcode"
                    type="text"
                    value={formData.postcode}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{4}"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="border-b pb-4 mb-4">
              <h3 className="font-semibold text-lg mb-4">Contact Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="contactName" className="block font-medium mb-1 text-gray-700">
                    Contact Person <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contactName"
                    name="contactName"
                    type="text"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="contactPhone" className="block font-medium mb-1 text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contactEmail" className="block font-medium mb-1 text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="border-b pb-4 mb-4">
              <h3 className="font-semibold text-lg mb-4">Promotion Details</h3>
              
              <div>
                <label htmlFor="promotion" className="block font-medium mb-1 text-gray-700">
                  Discount or Offer for Tripnosis Users <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="promotion"
                  name="promotion"
                  value={formData.promotion}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 15% off, free coffee upgrade, 2-for-1 cocktails..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  Describe the special offer you'd like to provide to Tripnosis users
                </p>
              </div>
            </div>

            <div className="border-b pb-4 mb-4">
              <h3 className="font-semibold text-lg mb-4">Online Presence</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="website" className="block font-medium mb-1 text-gray-700">
                    Website URL
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label htmlFor="socialMedia" className="block font-medium mb-1 text-gray-700">
                    Social Media Handles
                  </label>
                  <input
                    id="socialMedia"
                    name="socialMedia"
                    type="text"
                    value={formData.socialMedia}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="@yourbusiness"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-start">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  required
                  className="mt-1 mr-2"
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                  I agree to Tripnosis terms and conditions, and confirm that I am authorized to submit this business information <span className="text-red-500">*</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 text-gray-700"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center justify-center min-w-[120px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Business'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
