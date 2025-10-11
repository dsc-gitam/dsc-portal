"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Registration {
  id: string;
  email: string;
  fullName: string;
  gender: string;
  graduationYear: string;
  hasLaptop: string;
  newAccountVerified: string;
  skillsBoostEmail: string;
  profileUrl: string;
  termsAccepted: string;
  dataAcknowledgement: string;
  completionAgreement: string;
  status: string;
  submittedAt: string;
  shortlistedAt: string | null;
}

interface Stats {
  total: number;
  byGender: {
    male: number;
    female: number;
    other: number;
    notSpecified: number;
  };
  byGraduationYear: Record<string, number>;
  withLaptop: number;
  withoutLaptop: number;
  verified: number;
  notVerified: number;
}

export default function CloudStudyJamsAdmin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState("submitted");
  const [genderFilter, setGenderFilter] = useState("");
  const [graduationYearFilter, setGraduationYearFilter] = useState("");
  
  // View mode
  const [viewMode, setViewMode] = useState<"registrations" | "stats">("registrations");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.email) {
      fetchRegistrations();
      fetchStats();
    }
  }, [session, statusFilter, genderFilter, graduationYearFilter]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError("");
      
      const params = new URLSearchParams();
      if (statusFilter) params.append("status", statusFilter);
      if (genderFilter) params.append("gender", genderFilter);
      if (graduationYearFilter) params.append("graduationYear", graduationYearFilter);

      const response = await fetch(`/api/admin/cloud-study-jams?${params.toString()}`);
      
      if (response.status === 403) {
        setError("You don't have admin access");
        return;
      }
      
      if (!response.ok) throw new Error("Failed to fetch registrations");
      
      const data = await response.json();
      setRegistrations(data.registrations || []);
    } catch (err) {
      console.error("Error fetching registrations:", err);
      setError("Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/admin/cloud-study-jams/stats?status=${statusFilter}`);
      
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const handleShortlist = async (registrationId: string) => {
    if (!confirm("Are you sure you want to shortlist this participant?")) {
      return;
    }

    try {
      const response = await fetch("/api/admin/cloud-study-jams/shortlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId }),
      });

      if (!response.ok) throw new Error("Failed to shortlist");

      alert("Participant shortlisted successfully!");
      fetchRegistrations();
      fetchStats();
      setSelectedRegistration(null);
    } catch (err) {
      console.error("Error shortlisting:", err);
      alert("Failed to shortlist participant");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            href="/"
            className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Cloud Study Jams Admin</h1>
              <p className="text-sm text-gray-600">Manage Cloud Study Jams registrations</p>
            </div>
            <Link
              href="/admin"
              className="text-sm text-primary hover:text-blue-600 transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setViewMode("registrations")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                viewMode === "registrations"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Registrations ({registrations.length})
            </button>
            <button
              onClick={() => setViewMode("stats")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                viewMode === "stats"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Statistics
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === "registrations" && (
          <div>
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">All</option>
                    <option value="submitted">Submitted</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">All</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Graduation Year
                  </label>
                  <input
                    type="text"
                    value={graduationYearFilter}
                    onChange={(e) => setGraduationYearFilter(e.target.value)}
                    placeholder="e.g., 2025, 2026"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Registrations Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gender
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Graduation Year
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Has Laptop
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {registrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{reg.fullName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{reg.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{reg.gender}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{reg.graduationYear}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              reg.hasLaptop?.toLowerCase() === "yes" || reg.hasLaptop?.toLowerCase() === "true"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {reg.hasLaptop}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              reg.status === "shortlisted"
                                ? "bg-green-100 text-green-800"
                                : reg.status === "submitted"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {reg.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => setSelectedRegistration(reg)}
                            className="text-primary hover:text-blue-600 mr-4"
                          >
                            View
                          </button>
                          {reg.status !== "shortlisted" && (
                            <button
                              onClick={() => handleShortlist(reg.id)}
                              className="text-success hover:text-green-600"
                            >
                              Shortlist
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {viewMode === "stats" && stats && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Registrations</h3>
                <p className="text-4xl font-bold text-primary">{stats.total}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">With Laptop</h3>
                <p className="text-4xl font-bold text-green-600">{stats.withLaptop}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Verified</h3>
                <p className="text-4xl font-bold text-blue-600">{stats.verified}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Gender Distribution</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Male:</span>
                    <span className="font-semibold">{stats.byGender.male}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Female:</span>
                    <span className="font-semibold">{stats.byGender.female}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Other:</span>
                    <span className="font-semibold">{stats.byGender.other}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Not Specified:</span>
                    <span className="font-semibold">{stats.byGender.notSpecified}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">By Graduation Year</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {Object.entries(stats.byGraduationYear).map(([year, count]) => (
                    <div key={year} className="flex justify-between">
                      <span>{year}:</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Registration Detail Dialog */}
      {selectedRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">{selectedRegistration.fullName}</h2>
              <button
                onClick={() => setSelectedRegistration(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedRegistration.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-medium">{selectedRegistration.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Graduation Year</p>
                    <p className="font-medium">{selectedRegistration.graduationYear}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Has Laptop</p>
                    <p className="font-medium">{selectedRegistration.hasLaptop}</p>
                  </div>
                </div>
              </div>

              {/* Skills Boost Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Google Cloud Skills Boost</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Skills Boost Email</p>
                    <p className="font-medium">{selectedRegistration.skillsBoostEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Profile URL</p>
                    <p className="font-medium">
                      {selectedRegistration.profileUrl ? (
                        <a
                          href={selectedRegistration.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {selectedRegistration.profileUrl}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Account Verified</p>
                    <p className="font-medium">{selectedRegistration.newAccountVerified}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {selectedRegistration.status !== "shortlisted" && (
                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setSelectedRegistration(null)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleShortlist(selectedRegistration.id)}
                    className="px-6 py-2 bg-success text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Shortlist Participant
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
