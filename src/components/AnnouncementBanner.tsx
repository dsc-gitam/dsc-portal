"use client";

import Link from "next/link";

export default function AnnouncementBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white py-2 overflow-hidden relative">
      <div className="marquee-container">
        <div className="marquee-content">
          <span className="inline-block px-4">
            🎉 Cloud Study Jams have started! Registrations are open - Closing on 12th October EOD
          </span>
          <Link
            href="/cloud-study-jams"
            className="inline-block bg-white text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-gray-100 transition-all whitespace-nowrap mx-2"
          >
            Register Now
          </Link>
          <span className="inline-block px-4">
            📝 Core Team Recruitment closing on 12th October 2025 at 5:00 PM
          </span>
          <Link
            href="/recruitment"
            className="inline-block bg-white text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-gray-100 transition-all whitespace-nowrap mx-2"
          >
            Apply Now
          </Link>
          <span className="inline-block px-4">
            🎉 Cloud Study Jams have started! Registrations are open - Closing on 12th October EOD
          </span>
          <Link
            href="/cloud-study-jams"
            className="inline-block bg-white text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-gray-100 transition-all whitespace-nowrap mx-2"
          >
            Register Now
          </Link>
          <span className="inline-block px-4">
            📝 Core Team Recruitment closing on 12th October 2025 at 5:00 PM
          </span>
          <Link
            href="/recruitment"
            className="inline-block bg-white text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-gray-100 transition-all whitespace-nowrap mx-2"
          >
            Apply Now
          </Link>
        </div>
      </div>
      <style jsx>{`
        .marquee-container {
          display: flex;
          overflow: hidden;
          white-space: nowrap;
        }
        .marquee-content {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
