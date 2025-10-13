"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface InterviewSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  isAvailable: boolean;
  bookings: {
    application: {
      firstName: string;
      lastName: string;
      email: string;
    };
  }[];
}

export default function AdminSlotsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [slots, setSlots] = useState<InterviewSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    slotDuration: "30"
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.email) {
      fetchSlots();
    }
  }, [session]);

  const fetchSlots = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await fetch("/api/admin/slots");
      
      if (response.status === 403) {
        setError("You don't have admin access");
        return;
      }
      
      if (!response.ok) throw new Error("Failed to fetch slots");
      
      const data = await response.json();
      setSlots(data.slots || []);
    } catch (err) {
      console.error("Error fetching slots:", err);
      setError("Failed to load slots");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const requestBody = isBulkMode
        ? {
            ...formData,
            isBulk: true,
            slotDuration: parseInt(formData.slotDuration)
          }
        : {
            date: formData.date,
            startTime: formData.startTime,
            endTime: formData.endTime,
            venue: formData.venue,
            isBulk: false
          };

      const response = await fetch("/api/admin/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create slot");
      }

      alert(data.message || "Interview slot(s) created successfully!");
      setShowCreateForm(false);
      setFormData({ date: "", startTime: "", endTime: "", venue: "", slotDuration: "30" });
      setIsBulkMode(false);
      fetchSlots();
    } catch (err) {
      console.error("Error creating slot:", err);
      alert(err instanceof Error ? err.message : "Failed to create slot");
    }
  };

  const handleDeleteSlot = async (slotId: string) => {
    if (!confirm("Are you sure you want to delete this slot?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/slots?id=${slotId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete slot");
      }

      alert("Slot deleted successfully!");
      fetchSlots();
    } catch (err) {
      console.error("Error deleting slot:", err);
      alert(err instanceof Error ? err.message : "Failed to delete slot");
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
              <h1 className="text-2xl font-bold text-gray-900">Interview Slots Management</h1>
              <p className="text-sm text-gray-600">Create and manage interview slots</p>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Slot Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            {showCreateForm ? "Cancel" : "+ Create New Slot"}
          </button>
        </div>

        {/* Create Slot Form */}
        {showCreateForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Interview Slot</h3>
            
            {/* Mode Toggle */}
            <div className="mb-6 flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Creation Mode:</span>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="mode"
                  checked={!isBulkMode}
                  onChange={() => setIsBulkMode(false)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Single Slot</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="mode"
                  checked={isBulkMode}
                  onChange={() => setIsBulkMode(true)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Bulk Slots</span>
              </label>
            </div>

            {isBulkMode && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Bulk Mode:</strong> Multiple slots will be automatically generated with the specified duration between the start and end times.
                </p>
              </div>
            )}

            <form onSubmit={handleCreateSlot} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Venue *
                  </label>
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="e.g., Admin Block Room 205 or Google Meet"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isBulkMode ? "Start Time (First Slot) *" : "Start Time *"}
                  </label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isBulkMode ? "End Time (Last Slot) *" : "End Time *"}
                  </label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                {isBulkMode && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slot Duration (minutes) *
                    </label>
                    <input
                      type="number"
                      value={formData.slotDuration}
                      onChange={(e) => setFormData({ ...formData, slotDuration: e.target.value })}
                      min="5"
                      max="180"
                      step="5"
                      required
                      placeholder="e.g., 30"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Slots will be created back-to-back with this duration (5-180 minutes)
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-success text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  {isBulkMode ? "Create Slots" : "Create Slot"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Slots List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">All Interview Slots ({slots.length})</h3>
          </div>
          
          {slots.length === 0 ? (
            <div className="p-12 text-center">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-500">No interview slots created yet</p>
              <p className="text-sm text-gray-400 mt-2">Create your first slot to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Venue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booked By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {slots.map((slot) => (
                    <tr key={slot.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(slot.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {slot.startTime} - {slot.endTime}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{slot.venue}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            slot.isAvailable
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {slot.isAvailable ? "Available" : "Booked"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {slot.bookings.length > 0 ? (
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">
                              {slot.bookings[0].application.firstName} {slot.bookings[0].application.lastName}
                            </div>
                            <div className="text-gray-500">{slot.bookings[0].application.email}</div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {slot.bookings.length === 0 && (
                          <button
                            onClick={() => handleDeleteSlot(slot.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
