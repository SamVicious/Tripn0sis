"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BusinessSubmission {
  id: string;
  businessName: string;
  businessType: string;
  address: string;
  suburb: string;
  postcode: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  promotion: string;
  description: string;
  website?: string;
  socialMedia?: string;
  submissionDate: string;
}

export default function AdminBusinessPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<BusinessSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<BusinessSubmission | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = sessionStorage.getItem("adminAuthenticated") === "true";

    if (!isAuthenticated) {
      // Redirect to admin login if not authenticated
      router.push("/admin");
      return;
    }

    const fetchSubmissions = async () => {
      try {
        const response = await fetch('/api/admin/business-submissions');
        if (!response.ok) {
          throw new Error('Failed to fetch business submissions');
        }

        const data = await response.json();
        setSubmissions(data.submissions);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching submissions:', err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [router]);

  const handleLogout = () => {
    // Clear admin authentication
    sessionStorage.removeItem("adminAuthenticated");
    // Redirect to admin login
    router.push("/admin");
  };

  // Filter submissions based on search term and business type
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch =
      submission.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.contactEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.suburb.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || submission.businessType === filterType;

    return matchesSearch && matchesType;
  });

  // Sort submissions by date (newest first)
  const sortedSubmissions = [...filteredSubmissions].sort((a, b) =>
    new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-lg text-gray-700">Loading business submissions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h1 className="text-2xl font-bold text-red-700 mb-2">Error Loading Submissions</h1>
            <p className="text-red-600">{error}</p>
            <Link href="/dashboard" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-800 text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Tripnosis Admin</h1>
              <p className="text-blue-100">Business Partnership Submissions</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded text-sm font-medium"
              >
                Back to Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="w-full md:w-1/2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Submissions
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by name, email, or suburb..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-full md:w-1/3">
              <label htmlFor="filterType" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Business Type
              </label>
              <select
                id="filterType"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
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

          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {sortedSubmissions.length} of {submissions.length} submissions
            </p>
          </div>
        </div>

        {sortedSubmissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500 text-lg">No business submissions found.</p>
            {searchTerm || filterType !== "all" ? (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("all");
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Clear Filters
              </button>
            ) : null}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedSubmissions.map((submission) => (
                    <tr
                      key={submission.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{submission.businessName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {submission.businessType.charAt(0).toUpperCase() + submission.businessType.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{submission.suburb}</div>
                        <div className="text-sm text-gray-500">{submission.postcode}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{submission.contactName}</div>
                        <div className="text-sm text-gray-500">{submission.contactEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(submission.submissionDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSubmission(submission);
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Modal for viewing submission details */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto" onClick={() => setSelectedSubmission(null)}>
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

          <div
            className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedSubmission.businessName}</h2>
                <p className="text-sm text-blue-600 mt-1">
                  {selectedSubmission.businessType.charAt(0).toUpperCase() + selectedSubmission.businessType.slice(1)} Business
                </p>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-blue-800">
                  Submission received on {formatDate(selectedSubmission.submissionDate)}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Business Information</h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex">
                      <dt className="w-32 font-medium text-gray-500">Name:</dt>
                      <dd className="text-gray-900 flex-1">{selectedSubmission.businessName}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-32 font-medium text-gray-500">Type:</dt>
                      <dd className="text-gray-900 flex-1">
                        {selectedSubmission.businessType.charAt(0).toUpperCase() + selectedSubmission.businessType.slice(1)}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500 mb-1">Description:</dt>
                      <dd className="text-gray-900 bg-white p-2 rounded border border-gray-200">
                        {selectedSubmission.description}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Location</h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="font-medium text-gray-500 mb-1">Address:</dt>
                      <dd className="text-gray-900">{selectedSubmission.address}</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <dt className="font-medium text-gray-500 mb-1">Suburb:</dt>
                        <dd className="text-gray-900">{selectedSubmission.suburb}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-500 mb-1">Postcode:</dt>
                        <dd className="text-gray-900">{selectedSubmission.postcode}</dd>
                      </div>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Contact Details</h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex">
                      <dt className="w-32 font-medium text-gray-500">Contact Name:</dt>
                      <dd className="text-gray-900 flex-1">{selectedSubmission.contactName}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-32 font-medium text-gray-500">Email:</dt>
                      <dd className="text-gray-900 flex-1">
                        <a href={`mailto:${selectedSubmission.contactEmail}`} className="text-blue-600 hover:underline">
                          {selectedSubmission.contactEmail}
                        </a>
                      </dd>
                    </div>
                    <div className="flex">
                      <dt className="w-32 font-medium text-gray-500">Phone:</dt>
                      <dd className="text-gray-900 flex-1">
                        <a href={`tel:${selectedSubmission.contactPhone}`} className="text-blue-600 hover:underline">
                          {selectedSubmission.contactPhone}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Promotion Details</h3>
                  <div className="text-sm">
                    <p className="font-medium text-gray-500 mb-1">Offer for Tripnosis Users:</p>
                    <div className="bg-white p-2 rounded border border-gray-200 text-gray-900">
                      {selectedSubmission.promotion}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Online Presence</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex">
                    <dt className="w-32 font-medium text-gray-500">Website:</dt>
                    <dd className="text-gray-900 flex-1">
                      {selectedSubmission.website ? (
                        <a href={selectedSubmission.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {selectedSubmission.website}
                        </a>
                      ) : (
                        <span className="text-gray-500 italic">Not provided</span>
                      )}
                    </dd>
                  </div>
                  <div className="flex">
                    <dt className="w-32 font-medium text-gray-500">Social Media:</dt>
                    <dd className="text-gray-900 flex-1">
                      {selectedSubmission.socialMedia || <span className="text-gray-500 italic">Not provided</span>}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => window.location.href = `mailto:${selectedSubmission.contactEmail}?subject=Regarding your Tripnosis Business Submission: ${selectedSubmission.businessName}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Contact Business
                </button>

                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
