"use client";

export default function AnnouncementBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white py-2 overflow-hidden relative">
      <div className="marquee-container">
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
