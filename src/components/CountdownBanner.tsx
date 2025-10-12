"use client";

import { useState, useEffect } from "react";

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
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
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
    <div className="bg-gray-200 py-1 border-black border-y-[1.5px]">
      <div className="px-6 lg:px-8 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
            <span className="font-medium text-sm text-black">
              Core Team Recruitment Closes Soon!
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-8">
            <div className="flex gap-2">
              <div className="text-center">
                <div className="flex items-end rounded-lg py-1">
                  <div className="text-lg font-bold">{timeLeft.days}</div>
                  <div className=" text-gray-500 font-medium">d</div>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-end rounded-lg py-1">
                  <div className="text-lg font-bold animate-">
                    {timeLeft.hours}
                  </div>
                  <div className=" text-gray-500 font-medium">h</div>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-end rounded-lg py-1">
                  <div className="text-lg font-bold">{timeLeft.minutes}</div>
                  <div className=" text-gray-500 font-medium">m</div>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-end rounded-lg py-1">
                  <div className="text-lg font-bold">{timeLeft.seconds}</div>
                  <div className=" text-gray-500 font-medium">s</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
