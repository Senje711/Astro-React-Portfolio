import React, { useState, useEffect } from 'react';

export default function FloatingSocialDock() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hide on initial page load top hero area, show once scrolled down > 200px
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-[9980] hidden lg:flex flex-col gap-3 transition-all duration-500 ease-out ${
        isVisible
          ? 'opacity-100 translate-x-0 pointer-events-auto'
          : 'opacity-0 translate-x-12 pointer-events-none'
      }`}
    >
      {/* GitHub Button */}
      <div className="relative group flex items-center justify-end">
        <span className="absolute right-14 px-3 py-1 bg-black/90 text-white text-xs font-mono rounded-lg border border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-lg">
          GitHub Profile
        </span>
        <a
          href="https://github.com/Senje711"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/95 border border-gray-800 text-white hover:text-lime-400 hover:border-lime-500/50 hover:scale-110 shadow-2xl shadow-black/80 flex items-center justify-center transition-all duration-300 cursor-pointer"
          aria-label="GitHub Profile"
        >
          {/* GitHub Cat Icon */}
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
      </div>

      {/* LinkedIn Button */}
      <div className="relative group flex items-center justify-end">
        <span className="absolute right-14 px-3 py-1 bg-black/90 text-white text-xs font-mono rounded-lg border border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-lg">
          LinkedIn Profile
        </span>
        <a
          href="https://www.linkedin.com/in/jesenhower-nachor-5096b33aa/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/95 border border-gray-800 text-white hover:text-lime-400 hover:border-lime-500/50 hover:scale-110 shadow-2xl shadow-black/80 flex items-center justify-center transition-all duration-300 cursor-pointer"
          aria-label="LinkedIn Profile"
        >
          {/* LinkedIn Icon */}
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
        </a>
      </div>

      {/* Email Button */}
      <div className="relative group flex items-center justify-end">
        <span className="absolute right-14 px-3 py-1 bg-black/90 text-white text-xs font-mono rounded-lg border border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-lg">
          Email Me
        </span>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=jesenhowernachor26@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/95 border border-gray-800 text-white hover:text-lime-400 hover:border-lime-500/50 hover:scale-110 shadow-2xl shadow-black/80 flex items-center justify-center transition-all duration-300 cursor-pointer"
          aria-label="Send Email"
        >
          {/* Email Envelope Icon */}
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>
      </div>

      {/* Resume Button */}
      <div className="relative group flex items-center justify-end">
        <span className="absolute right-14 px-3 py-1 bg-black/90 text-lime-400 text-xs font-mono font-bold rounded-lg border border-lime-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-lg">
          Open Resume
        </span>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent('open-resume-modal'))}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/95 border border-gray-800 text-white hover:text-lime-400 hover:border-lime-500/50 hover:scale-110 shadow-2xl shadow-black/80 flex items-center justify-center transition-all duration-300 cursor-pointer"
          aria-label="Open Resume Modal"
        >
          {/* Document File Icon */}
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
