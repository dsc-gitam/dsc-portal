"use client";

import Link from "next/link";

export default function AnnouncementBanner() {
  return (
    <div className="text-white bg-black border-y-[1.5px] border-black py-2 overflow-hidden relative text-sm">
      <div className="marquee-container">
        <div className="marquee-content">
          <span className="inline-block px-4">
            ☁️ Cloud Study Jams have started! Registrations are open - Closing
            on 15th October 12 noon.
          </span>
          <Link
            href="/cloud-study-jams"
            className="inline-block bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-gray-100 hover:text-gray-800 transition-all whitespace-nowrap mx-2"
          >
            Register Now
          </Link>
          <span className="inline-block px-4">
            ☁️ Cloud Study Jams have started! Registrations are open - Closing
            on 15th October 12 noon.
          </span>
          <Link
            href="/cloud-study-jams"
            className="inline-block bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-gray-100 hover:text-gray-800 transition-all whitespace-nowrap mx-2"
          >
            Register Now
          </Link>

          <span className="inline-block px-4">
            ☁️ Cloud Study Jams have started! Registrations are open - Closing
            on 15th October 12 noon.
          </span>
          <Link
            href="/cloud-study-jams"
            className="inline-block  bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-gray-100 hover:text-gray-800 transition-all whitespace-nowrap mx-2"
          >
            Register Now
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
