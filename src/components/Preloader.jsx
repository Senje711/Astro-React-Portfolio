import React, { useState, useEffect } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsDone(true), 400);
          setTimeout(() => setIsHidden(true), 1300);
          return 100;
        }
        const step = Math.floor(Math.random() * 3) + 1;
        return Math.min(prev + step, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#070a07] text-white flex flex-col justify-between p-6 sm:p-10 select-none transition-transform duration-1000 ease-[cubic-bezier(0.87,0,0.13,1)] ${
        isDone ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-lime-400 rounded-xs inline-block animate-pulse"></span>
          <span className="text-gray-200 font-semibold tracking-wider">JN</span>
        </div>
        <div className="text-gray-500">
          ©{new Date().getFullYear()}
        </div>
      </div>

      {/* Giant Center Counter */}
      <div className="flex-grow flex items-center justify-center">
        <span className="font-extrabold text-[28vw] sm:text-[22vw] md:text-[200px] leading-none tracking-tighter text-white font-sans">
          {progress}
        </span>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-end justify-between font-mono text-[10px] tracking-widest text-gray-400">
        <div className="space-y-1.5">
          <div className="text-lime-400 font-semibold uppercase flex items-center gap-1.5">
            <span>LOADING</span>
            <span className="animate-ping w-1 h-1 bg-lime-400 rounded-full inline-block"></span>
          </div>
          {/* Subtle thin progress track */}
          <div className="w-24 sm:w-32 h-[1px] bg-gray-800 overflow-hidden">
            <div
              className="h-full bg-lime-400 transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="text-gray-400 uppercase tracking-widest">
          JESEN.DEV
        </div>
      </div>
    </div>
  );
}
