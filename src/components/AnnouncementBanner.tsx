"use client";

import Link from "next/link";

export default function AnnouncementBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white py-2 overflow-hidden relative flex items-center">
      <div className="marquee-container flex-1">
        <div className="marquee-content">
          <span className="inline-block px-4">
            🎉 Cloud Study Jams have started! Registrations are open - Closing on 12th October EOD
          </span>
          <span className="inline-block px-4">
            🎉 Cloud Study Jams have started! Registrations are open - Closing on 12th October EOD
          </span>
          <span className="inline-block px-4">
            🎉 Cloud Study Jams have started! Registrations are open - Closing on 12th October EOD
          </span>
          <span className="inline-block px-4">
            🎉 Cloud Study Jams have started! Registrations are open - Closing on 12th October EOD
          </span>
        </div>
      </div>
      <Link
        href="/cloud-study-jams"
        className="bg-white text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-gray-100 transition-all whitespace-nowrap mr-4 flex-shrink-0"
      >
        Register Now
      </Link>
      <style jsx>{`
        .marquee-container {
          display: flex;
          overflow: hidden;
          white-space: nowrap;
        }
        .marquee-content {
          display: inline-block;
          animation: marquee 20s linear infinite;
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
