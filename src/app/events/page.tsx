"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  color: string;
}

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  const events: Event[] = [
    {
      id: "1",
      title: "Cloud Study Jams",
      date: "2025-10-12",
      time: "10:00 AM - 5:00 PM",
      location: "Online",
      description: "Join us for Google Cloud Study Jams! Learn cloud computing through hands-on labs and structured learning paths.",
      category: "Workshop",
      color: "bg-blue-500"
    },
    {
      id: "2",
      title: "Web Development Workshop",
      date: "2025-02-20",
      time: "2:00 PM - 4:00 PM",
      location: "Computer Lab 1",
      description: "Learn modern web development with React and Next.js",
      category: "Workshop",
      color: "bg-green-500"
    },
    {
      id: "3",
      title: "Tech Talk: AI & ML",
      date: "2025-02-25",
      time: "3:00 PM - 5:00 PM",
      location: "Auditorium",
      description: "Industry experts discuss the latest trends in AI and Machine Learning",
      category: "Tech Talk",
      color: "bg-purple-500"
    }
  ];

  const getCalendarDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const hasEventOnDate = (day: number | null) => {
    if (!day) return false;
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.some(event => event.date === dateStr);
  };

  const getEventsForDate = (day: number | null) => {
    if (!day) return [];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const calendarDays = getCalendarDays();
  const today = new Date();
  const monthName = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 font-display">Events</h1>
          <p className="text-lg text-gray-600">Stay updated with our upcoming events and workshops</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">{monthName}</h2>
              
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
                    {day}
                  </div>
                ))}
                {calendarDays.map((day, index) => {
                  const hasEvent = hasEventOnDate(day);
                  const eventsOnDay = getEventsForDate(day);
                  const isToday = day === today.getDate();
                  
                  return (
                    <div
                      key={index}
                      className={`relative aspect-square border rounded-lg p-2 transition-all ${
                        day
                          ? hasEvent
                            ? 'border-blue-500 bg-blue-50 cursor-pointer hover:bg-blue-100'
                            : isToday
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-200 hover:bg-gray-50 cursor-pointer'
                          : 'border-transparent'
                      }`}
                      onClick={() => day && hasEvent && setSelectedDate(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)}
                    >
                      {day && (
                        <>
                          <div className={`text-sm font-medium ${isToday ? 'text-gray-900' : 'text-gray-700'}`}>
                            {day}
                          </div>
                          {hasEvent && (
                            <div className="absolute bottom-1 left-1 right-1">
                              {eventsOnDay.slice(0, 2).map((event) => (
                                <div
                                  key={event.id}
                                  className={`text-xs ${event.color} text-white rounded px-1 py-0.5 mb-0.5 truncate`}
                                  title={event.title}
                                >
                                  {event.title}
                                </div>
                              ))}
                              {eventsOnDay.length > 2 && (
                                <div className="text-xs text-gray-600 font-medium">
                                  +{eventsOnDay.length - 2} more
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {selectedDate && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Events on {formatDate(selectedDate)}
                    </h3>
                    <button
                      onClick={() => setSelectedDate(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-3">
                    {getEventsForDate(parseInt(selectedDate.split('-')[2])).map(event => (
                      <div
                        key={event.id}
                        className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500"
                      >
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{event.time}</p>
                        <p className="text-sm text-gray-600">{event.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 font-display">Upcoming Events</h2>
            {events.map(event => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className={`${event.color} text-white text-xs font-medium px-2 py-1 rounded`}>
                    {event.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                <div className="space-y-1 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <span className="mr-2">📅</span>
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🕒</span>
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📍</span>
                    {event.location}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">{event.description}</p>
                {event.title === "Cloud Study Jams" && (
                  <Link
                    href="/cloud-study-jams"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Learn More
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-primary to-success rounded-full"></div>
              <span className="text-gray-600">GDGoC GITAM © 2025</span>
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
