"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentId: string;
  yearOfStudy: string;
  branch: string;
  cgpa: string;
  selectedRole: string;
  programmingLanguages: string;
  githubProfile: string;
  linkedinProfile: string;
  whyJoin: string;
  howContribute: string;
  previousExperience: string;
  leadershipExperience: string;
  selectedTask: string;
  taskSubmission: string;
  availability: string;
  hoursPerWeek: string;
  passionProject: string;
  challengeProposal: string;
  additionalInfo: string;
  status: string;
  submittedAt: string;
  shortlistedAt: string | null;
  gender: string | null;
  interviewBooking: {
    slot: {
      date: string;
      startTime: string;
      endTime: string;
      venue: string;
    };
  } | null;
}

interface Stats {
  total: number;
  byGender: {
    male: number;
    female: number;
    other: number;
    notSpecified: number;
  };
  byYear: {
    '1st': number;
    '2nd': number;
    '3rd': number;
    '4th': number;
  };
  byRole: Record<string, number>;
  byBranch: Record<string, number>;
  technical: number;
  nonTechnical: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  
  // Filters
  const [yearFilter, setYearFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("submitted");
  const [roleFilter, setRoleFilter] = useState("");
  
  // View mode
  const [viewMode, setViewMode] = useState<"applications" | "stats" | "slots">("applications");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.email) {
      fetchApplications();
      fetchStats();
    }
  }, [session, yearFilter, branchFilter, statusFilter, roleFilter]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");
      
      const params = new URLSearchParams();
      if (yearFilter) params.append("year", yearFilter);
      if (branchFilter) params.append("branch", branchFilter);
      if (statusFilter) params.append("status", statusFilter);
      if (roleFilter) params.append("role", roleFilter);

      const response = await fetch(`/api/admin/applications?${params.toString()}`);
      
      if (response.status === 403) {
        setError("You don't have admin access");
        return;
      }
      
      if (!response.ok) throw new Error("Failed to fetch applications");
      
      const data = await response.json();
      setApplications(data.applications || []);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/admin/stats?status=${statusFilter}`);
      
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const handleShortlist = async (applicationId: string) => {
    if (!confirm("Are you sure you want to shortlist this candidate? They will receive an email to book their interview slot.")) {
      return;
    }

    try {
      const response = await fetch("/api/admin/shortlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId }),
      });

      if (!response.ok) throw new Error("Failed to shortlist");

      alert("Candidate shortlisted successfully! Email sent.");
      fetchApplications();
      fetchStats();
      setSelectedApplication(null);
    } catch (err) {
      console.error("Error shortlisting:", err);
      alert("Failed to shortlist candidate");
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
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Manage recruitment applications</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{session?.user?.email}</span>
              <Link
                href="/"
                className="text-sm text-primary hover:text-blue-600 transition-colors"
              >
                Exit Admin
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setViewMode("applications")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                viewMode === "applications"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Applications ({applications.length})
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
            <button
              onClick={() => setViewMode("slots")}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                viewMode === "slots"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Interview Slots
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === "applications" && (
          <div>
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    <option value="under_review">Under Review</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <select
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">All Years</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch
                  </label>
                  <input
                    type="text"
                    value={branchFilter}
                    onChange={(e) => setBranchFilter(e.target.value)}
                    placeholder="e.g., CSE, ECE"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    placeholder="e.g., Technical, Marketing"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Applications Table */}
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
                        Year/Branch
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
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
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {app.firstName} {app.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{app.studentId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{app.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{app.yearOfStudy}</div>
                          <div className="text-sm text-gray-500">{app.branch}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{app.selectedRole}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              app.status === "shortlisted"
                                ? "bg-green-100 text-green-800"
                                : app.status === "submitted"
                                ? "bg-blue-100 text-blue-800"
                                : app.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => setSelectedApplication(app)}
                            className="text-primary hover:text-blue-600 mr-4"
                          >
                            View
                          </button>
                          {app.status !== "shortlisted" && (
                            <button
                              onClick={() => handleShortlist(app.id)}
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Applications</h3>
                <p className="text-4xl font-bold text-primary">{stats.total}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical</h3>
                <p className="text-4xl font-bold text-blue-600">{stats.technical}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Non-Technical</h3>
                <p className="text-4xl font-bold text-green-600">{stats.nonTechnical}</p>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Year Distribution</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>1st Year:</span>
                    <span className="font-semibold">{stats.byYear['1st']}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2nd Year:</span>
                    <span className="font-semibold">{stats.byYear['2nd']}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>3rd Year:</span>
                    <span className="font-semibold">{stats.byYear['3rd']}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>4th Year:</span>
                    <span className="font-semibold">{stats.byYear['4th']}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">By Role</h3>
                <div className="space-y-2">
                  {Object.entries(stats.byRole).map(([role, count]) => (
                    <div key={role} className="flex justify-between">
                      <span>{role}:</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">By Branch</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {Object.entries(stats.byBranch).map(([branch, count]) => (
                    <div key={branch} className="flex justify-between">
                      <span>{branch}:</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === "slots" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Interview Slots Management</h3>
              <Link
                href="/admin/slots"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Manage Slots
              </Link>
            </div>
            <p className="text-gray-600">
              Create and manage interview slots for shortlisted candidates. Click "Manage Slots" to access the slot management interface.
            </p>
          </div>
        )}
      </main>

      {/* Application Detail Dialog */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedApplication.firstName} {selectedApplication.lastName}
              </h2>
              <button
                onClick={() => setSelectedApplication(null)}
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
                    <p className="font-medium">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{selectedApplication.phone || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Student ID</p>
                    <p className="font-medium">{selectedApplication.studentId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-medium">{selectedApplication.gender || "Not specified"}</p>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Academic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Year of Study</p>
                    <p className="font-medium">{selectedApplication.yearOfStudy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Branch</p>
                    <p className="font-medium">{selectedApplication.branch}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">CGPA</p>
                    <p className="font-medium">{selectedApplication.cgpa || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Preferred Role</p>
                    <p className="font-medium">{selectedApplication.selectedRole}</p>
                  </div>
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Skills</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Programming Languages</p>
                    <p className="font-medium">{selectedApplication.programmingLanguages || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">GitHub Profile</p>
                    <p className="font-medium">
                      {selectedApplication.githubProfile ? (
                        <a
                          href={selectedApplication.githubProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {selectedApplication.githubProfile}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">LinkedIn Profile</p>
                    <p className="font-medium">
                      {selectedApplication.linkedinProfile ? (
                        <a
                          href={selectedApplication.linkedinProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {selectedApplication.linkedinProfile}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Motivation */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Motivation</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Why do you want to join DSC GITAM?</p>
                    <p className="mt-1 text-gray-900 whitespace-pre-wrap">{selectedApplication.whyJoin || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">How will you contribute?</p>
                    <p className="mt-1 text-gray-900 whitespace-pre-wrap">{selectedApplication.howContribute || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Projects & Ideas</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Passion Project</p>
                    <p className="mt-1 text-gray-900 whitespace-pre-wrap">{selectedApplication.passionProject || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Challenge Proposal</p>
                    <p className="mt-1 text-gray-900 whitespace-pre-wrap">{selectedApplication.challengeProposal || "N/A"}</p>
                  </div>
                  {selectedApplication.taskSubmission && (
                    <div>
                      <p className="text-sm text-gray-600">Task Submission</p>
                      <p className="mt-1 font-medium">
                        <a
                          href={selectedApplication.taskSubmission}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {selectedApplication.taskSubmission}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Interview Booking Status */}
              {selectedApplication.interviewBooking && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Interview Scheduled</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">Interview Details:</p>
                    <p className="font-medium">
                      {new Date(selectedApplication.interviewBooking.slot.date).toLocaleDateString()} at{" "}
                      {selectedApplication.interviewBooking.slot.startTime} - {selectedApplication.interviewBooking.slot.endTime}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Venue: {selectedApplication.interviewBooking.slot.venue}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              {selectedApplication.status !== "shortlisted" && (
                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleShortlist(selectedApplication.id)}
                    className="px-6 py-2 bg-success text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Shortlist Candidate
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
