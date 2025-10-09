"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

interface Event {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  description: string;
  category: string;
  color: string;
}

interface MultiDayEvent extends Event {
  startDay: number;
  endDay: number;
  startCol: number;
  endCol: number;
  startRow: number;
  endRow: number;
  span: number;
}

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  const events: Event[] = [
    {
      id: "1",
      title: "Cloud Study Jams",
      date: "2025-10-07",
      endDate: "2025-10-12",
      time: "10:00 AM - 5:00 PM",
      location: "Online",
      description: "Join us for Google Cloud Study Jams! Learn cloud computing through hands-on labs and structured learning paths.",
      category: "Workshop",
      color: "bg-blue-500"
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
    return events.some(event => {
      if (event.endDate) {
        // Check if date is within range
        return dateStr >= event.date && dateStr <= event.endDate;
      }
      return event.date === dateStr;
    });
  };

  const getEventsForDate = (day: number | null) => {
    if (!day) return [];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => {
      if (event.endDate) {
        // Check if date is within range
        return dateStr >= event.date && dateStr <= event.endDate;
      }
      return event.date === dateStr;
    });
  };

  const formatDate = (dateStr: string, endDateStr?: string) => {
    const date = new Date(dateStr);
    const formatted = date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    if (endDateStr) {
      const endDate = new Date(endDateStr);
      const endFormatted = endDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      return `${formatted} - ${endFormatted}`;
    }
    
    return formatted;
  };

  // Get multi-day events with their grid positions
  const getMultiDayEvents = (): (MultiDayEvent | null)[] => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    return events.filter(event => event.endDate).map(event => {
      const startDate = new Date(event.date);
      const endDate = new Date(event.endDate!);
      
      // Check if event is in current month
      if (startDate.getMonth() !== month || startDate.getFullYear() !== year) {
        return null;
      }
      
      const startDay = startDate.getDate();
      const endDay = endDate.getDate();
      
      // Calculate grid position (accounting for empty cells at start)
      const firstDayOfWeek = new Date(year, month, 1).getDay();
      const startCol = (startDay - 1 + firstDayOfWeek) % 7 + 1;
      const endCol = (endDay - 1 + firstDayOfWeek) % 7 + 1;
      const startRow = Math.floor((startDay - 1 + firstDayOfWeek) / 7) + 1;
      const endRow = Math.floor((endDay - 1 + firstDayOfWeek) / 7) + 1;
      
      return {
        ...event,
        startDay,
        endDay,
        startCol,
        endCol,
        startRow,
        endRow,
        span: endDay - startDay + 1
      } as MultiDayEvent;
    }).filter(Boolean);
  };

  const calendarDays = getCalendarDays();
  const today = new Date();
  const monthName = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const multiDayEvents = getMultiDayEvents();

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
              
              <div>
                <div className="grid grid-cols-7 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', position: 'relative' }}>
                  {calendarDays.map((day, index) => {
                    const hasEvent = hasEventOnDate(day);
                    const isToday = day === today.getDate();
                    
                    return (
                      <div
                        key={index}
                        className={`relative border transition-all ${
                          day
                            ? hasEvent
                              ? 'border-gray-200 cursor-pointer hover:bg-gray-50'
                              : isToday
                              ? 'border-gray-900 bg-gray-50'
                              : 'border-gray-200 hover:bg-gray-50 cursor-pointer'
                            : 'border-transparent'
                        }`}
                        style={{ aspectRatio: '1', minHeight: '60px', padding: '0.5rem' }}
                        onClick={() => day && hasEvent && setSelectedDate(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)}
                      >
                        {day && (
                          <div className={`text-sm font-medium ${isToday ? 'text-gray-900' : 'text-gray-700'}`}>
                            {day}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Render multi-day events as spanning bars using absolute positioning */}
                  {multiDayEvents.map((event) => {
                    if (!event) return null;
                    
                    // Calculate positioning
                    const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
                    const startIndex = event.startDay - 1 + firstDayOfWeek;
                    const endIndex = event.endDay - 1 + firstDayOfWeek;
                    
                    // Check if event spans multiple weeks
                    const startWeek = Math.floor(startIndex / 7);
                    const endWeek = Math.floor(endIndex / 7);
                    
                    // Calculate cell dimensions - assuming 7 columns and using percentages
                    const cellWidth = 100 / 7; // percentage
                    const cellHeight = 60; // minHeight in pixels
                    
                    if (startWeek === endWeek) {
                      // Single row event - use absolute positioning
                      const startCol = startIndex % 7;
                      const endCol = endIndex % 7;
                      const spanCols = endCol - startCol + 1;
                      
                      const left = `${startCol * cellWidth}%`;
                      const width = `${spanCols * cellWidth}%`;
                      const top = `${startWeek * cellHeight + cellHeight - 36}px`; // Position near bottom of cells
                      
                      return (
                        <div
                          key={event.id}
                          className={`${event.color} text-white text-xs font-medium px-2 py-1 rounded cursor-pointer hover:opacity-90 transition-opacity flex items-center`}
                          style={{
                            position: 'absolute',
                            left,
                            width,
                            top,
                            height: '28px',
                            zIndex: 10
                          }}
                          onClick={() => setSelectedDate(event.date)}
                        >
                          <span className="truncate block">{event.title}</span>
                        </div>
                      );
                    } else {
                      // Multi-row event - render as separate bars for each week
                      const bars = [];
                      for (let week = startWeek; week <= endWeek; week++) {
                        const weekStartIndex = week === startWeek ? startIndex : week * 7;
                        const weekEndIndex = week === endWeek ? endIndex : (week + 1) * 7 - 1;
                        
                        const startCol = weekStartIndex % 7;
                        const endCol = weekEndIndex % 7;
                        const spanCols = endCol - startCol + 1;
                        
                        const left = `${startCol * cellWidth}%`;
                        const width = `${spanCols * cellWidth}%`;
                        const top = `${week * cellHeight + cellHeight - 36}px`;
                        
                        bars.push(
                          <div
                            key={`${event.id}-week-${week}`}
                            className={`${event.color} text-white text-xs font-medium px-2 py-1 rounded cursor-pointer hover:opacity-90 transition-opacity flex items-center`}
                            style={{
                              position: 'absolute',
                              left,
                              width,
                              top,
                              height: '28px',
                              zIndex: 10
                            }}
                            onClick={() => setSelectedDate(event.date)}
                          >
                            <span className="truncate block">{event.title}</span>
                          </div>
                        );
                      }
                      return bars;
                    }
                  })}
                </div>
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
                    {formatDate(event.date, event.endDate)}
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
