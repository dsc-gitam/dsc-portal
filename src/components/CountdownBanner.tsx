"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Recruitment deadline: October 12, 2025 at 5:00 PM
const RECRUITMENT_DEADLINE = new Date("2025-10-12T17:00:00");

export default function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [isRecruitmentClosed, setIsRecruitmentClosed] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const deadline = RECRUITMENT_DEADLINE.getTime();
      const difference = deadline - now;

      if (difference <= 0) {
        setIsRecruitmentClosed(true);
        return null;
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    // Initial calculation
    const time = calculateTimeLeft();
    setTimeLeft(time);
    if (time === null) {
      setIsRecruitmentClosed(true);
    }

    // Update every second
    const timer = setInterval(() => {
      const time = calculateTimeLeft();
      setTimeLeft(time);
      if (time === null) {
        setIsRecruitmentClosed(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isRecruitmentClosed) {
    return null; // Don't show banner if recruitment is closed
  }

  if (!timeLeft) {
    return null; // Loading state
  }

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b-2 border-red-200 py-3 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">⏰</span>
            <span className="text-sm font-semibold text-red-900">Core Team Recruitment Closes Soon!</span>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex gap-2">
              <div className="text-center">
                <div className="bg-white rounded-lg px-2 py-1 shadow-sm border border-red-200 min-w-[40px]">
                  <div className="text-lg font-bold text-red-600">{timeLeft.days}</div>
                  <div className="text-[10px] text-gray-600 font-medium">Days</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg px-2 py-1 shadow-sm border border-orange-200 min-w-[40px]">
                  <div className="text-lg font-bold text-orange-600">{timeLeft.hours}</div>
                  <div className="text-[10px] text-gray-600 font-medium">Hours</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg px-2 py-1 shadow-sm border border-yellow-200 min-w-[40px]">
                  <div className="text-lg font-bold text-yellow-600">{timeLeft.minutes}</div>
                  <div className="text-[10px] text-gray-600 font-medium">Mins</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg px-2 py-1 shadow-sm border border-green-200 min-w-[40px]">
                  <div className="text-lg font-bold text-green-600">{timeLeft.seconds}</div>
                  <div className="text-[10px] text-gray-600 font-medium">Secs</div>
                </div>
              </div>
            </div>
            
            <Link
              href="/recruitment"
              className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:shadow-lg transition-all whitespace-nowrap"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
