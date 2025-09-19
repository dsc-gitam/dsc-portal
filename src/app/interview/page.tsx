"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

export default function InterviewBookingPage() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);

  // Mock data for available interview slots
  const availableSlots: TimeSlot[] = [
    { id: "1", date: "2025-02-15", time: "09:00 AM", available: true },
    { id: "2", date: "2025-02-15", time: "10:00 AM", available: true },
    { id: "3", date: "2025-02-15", time: "11:00 AM", available: false },
    { id: "4", date: "2025-02-15", time: "02:00 PM", available: true },
    { id: "5", date: "2025-02-15", time: "03:00 PM", available: true },
    { id: "6", date: "2025-02-16", time: "09:00 AM", available: true },
    { id: "7", date: "2025-02-16", time: "10:00 AM", available: false },
    { id: "8", date: "2025-02-16", time: "11:00 AM", available: true },
    { id: "9", date: "2025-02-16", time: "02:00 PM", available: true },
    { id: "10", date: "2025-02-16", time: "03:00 PM", available: true },
  ];

  const handleBookSlot = () => {
    if (selectedSlot) {
      setIsBooked(true);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const groupSlotsByDate = (slots: TimeSlot[]) => {
    return slots.reduce((groups, slot) => {
      const date = slot.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(slot);
      return groups;
    }, {} as Record<string, TimeSlot[]>);
  };

  const groupedSlots = groupSlotsByDate(availableSlots);
  const selectedSlotData = availableSlots.find(slot => slot.id === selectedSlot);

  if (isBooked) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <Image
                  src="/gdgoc_logo.png"
                  alt="GDGoC Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
                <h1 className="text-xl font-semibold text-gray-900">GDGoC GITAM Portal</h1>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/recruitment" className="text-gray-700 hover:text-primary transition-colors">
                  Recruitment
                </Link>
                <Link href="/auth/signin" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Sign In
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Success Message */}
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Interview <span className="text-success">Booked!</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Your interview slot has been successfully booked. We&apos;ve sent a confirmation email with all the details.
            </p>

            {selectedSlotData && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                <h2 className="text-lg font-semibold text-green-900 mb-4">Interview Details</h2>
                <div className="text-left space-y-2">
                  <p><span className="font-medium text-green-900">Date:</span> <span className="text-green-700">{formatDate(selectedSlotData.date)}</span></p>
                  <p><span className="font-medium text-green-900">Time:</span> <span className="text-green-700">{selectedSlotData.time}</span></p>
                  <p><span className="font-medium text-green-900">Duration:</span> <span className="text-green-700">45 minutes</span></p>
                  <p><span className="font-medium text-green-900">Format:</span> <span className="text-green-700">Virtual (Google Meet link will be provided)</span></p>
                </div>
              </div>
            )}

            <Link 
              href="/"
              className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors inline-flex items-center shadow-lg hover:shadow-xl"
            >
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image
                src="/gdgoc_logo.png"
                alt="GDGoC Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <h1 className="text-xl font-semibold text-gray-900">GDGoC GITAM Portal</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/recruitment" className="text-gray-700 hover:text-primary transition-colors">
                Recruitment
              </Link>
              <Link href="/auth/signin" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Sign In
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary via-secondary to-success rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-lg font-bold">DSC</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Book Your <span className="text-primary">Interview Slot</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Congratulations on being shortlisted! Please select a convenient time slot for your interview.
          </p>
        </div>

        {/* Interview Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">Interview Information</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-blue-900">Format</h3>
              <p className="text-blue-800">Virtual interview via Google Meet</p>
            </div>
            <div>
              <h3 className="font-medium text-blue-900">Duration</h3>
              <p className="text-blue-800">Approximately 45 minutes</p>
            </div>
            <div>
              <h3 className="font-medium text-blue-900">What to Expect</h3>
              <p className="text-blue-800">Technical discussion, project review, and role-specific questions</p>
            </div>
            <div>
              <h3 className="font-medium text-blue-900">Requirements</h3>
              <p className="text-blue-800">Stable internet connection and quiet environment</p>
            </div>
          </div>
        </div>

        {/* Slot Selection */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Time Slots</h2>
          
          <div className="space-y-6">
            {Object.entries(groupedSlots).map(([date, slots]) => (
              <div key={date}>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {formatDate(date)}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {slots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => slot.available && setSelectedSlot(slot.id)}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        selectedSlot === slot.id
                          ? 'bg-primary text-white border-primary'
                          : slot.available
                          ? 'bg-white text-gray-700 border-gray-300 hover:border-primary hover:bg-blue-50'
                          : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                      {!slot.available && (
                        <div className="text-xs mt-1">Booked</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Selected Slot Display */}
          {selectedSlot && selectedSlotData && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Selected Slot</h3>
              <p className="text-blue-800">
                {formatDate(selectedSlotData.date)} at {selectedSlotData.time}
              </p>
            </div>
          )}

          {/* Book Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleBookSlot}
              disabled={!selectedSlot}
              className={`px-8 py-3 rounded-lg text-lg font-medium transition-colors shadow-lg hover:shadow-xl inline-flex items-center ${
                selectedSlot
                  ? 'bg-primary text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Book Interview Slot
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Important Notes</h3>
          <ul className="text-gray-700 space-y-2 text-sm">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Once booked, you&apos;ll receive a confirmation email with the Google Meet link
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Please join the meeting 5 minutes before your scheduled time
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              If you need to reschedule, contact us at least 24 hours in advance
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Prepare to discuss your projects, technical skills, and motivation
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-primary to-success rounded-full"></div>
              <span className="text-gray-600">DSC GITAM © 2025</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}