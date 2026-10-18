import React, { useState, useEffect, useCallback } from 'react';

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('document'); // 'document' (white paper view) or 'pdf'
  const resumePdfPath = '/assets/resume/Jesenhower_Nachor_Resume.pdf';

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    const onOpenEvent = () => handleOpen();
    const onCloseEvent = () => handleClose();

    window.addEventListener('open-resume-modal', onOpenEvent);
    window.addEventListener('close-resume-modal', onCloseEvent);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-resume-modal', onOpenEvent);
      window.removeEventListener('close-resume-modal', onCloseEvent);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 transition-opacity duration-200 animate-fadeIn"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0b100b] border border-lime-500/25 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-200 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
        style={{ contain: 'content' }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-800 bg-[#060a06] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-lime-400/10 border border-lime-500/30 flex items-center justify-center text-lime-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 id="resume-modal-title" className="text-sm sm:text-lg font-bold text-white tracking-tight flex items-center gap-1.5 sm:gap-2">
                <span className="hidden sm:inline">Jesenhower A. Nachor</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-lime-950/80 text-lime-400 border border-lime-500/30 font-medium">
                  RESUME / CV
                </span>
              </h3>
              <p className="text-xs text-gray-400 font-mono hidden sm:block">
                Original Document Preview
              </p>
            </div>
          </div>

          {/* Top Controls & Close Button */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-900 p-0.5 sm:p-1 rounded-lg border border-gray-800 text-[11px] sm:text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('document')}
                className={`px-2.5 sm:px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeTab === 'document'
                    ? 'bg-lime-400 text-black font-semibold shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Paper
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pdf')}
                className={`px-2.5 sm:px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeTab === 'pdf'
                    ? 'bg-lime-400 text-black font-semibold shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                PDF
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 hover:border-gray-700 transition-all cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body (Smooth Hardware Accelerated Scrolling) */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain p-2 sm:p-6 bg-[#121612] min-h-[50vh] max-h-[calc(92vh-130px)]"
          style={{ WebkitOverflowScrolling: 'touch', willChange: 'scroll-position' }}
        >
          {activeTab === 'document' ? (
            /* Original White Paper Resume Document View */
            <div className="max-w-3xl mx-auto bg-white text-gray-900 rounded-sm shadow-2xl p-4 sm:p-10 md:p-12 space-y-5 sm:space-y-6 font-sans text-xs sm:text-sm leading-normal border border-gray-300">
              
              {/* Name & Contact Header */}
              <div className="text-center border-b border-gray-300 pb-5 space-y-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-wider uppercase font-sans">
                  JESENHOWER A. NACHOR
                </h1>
                <p className="text-xs sm:text-sm text-gray-700 font-sans flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
                  <span>Cavite, Philippines</span>
                  <span>|</span>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jesenhowernachor711@gmail.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors">
                    jesenhowernachor711@gmail.com
                  </a>
                </p>
                <p className="text-xs sm:text-sm text-gray-700 font-sans flex flex-wrap justify-center items-center gap-x-2">
                  <a href="https://www.linkedin.com/in/jesenhower-nachor-5096b33aa/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors">
                    linkedin.com/in/jesenhower-nachor
                  </a>
                  <span>|</span>
                  <a href="https://github.com/Senje711" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors">
                    github.com/Senje711
                  </a>
                </p>
              </div>

              {/* Education */}
              <div className="space-y-2">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-400 pb-0.5">
                  EDUCATION
                </h2>

                <div className="space-y-3 pt-1">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-0.5">
                    <div>
                      <h3 className="font-bold text-gray-900">NATIONAL UNIVERSITY - DASMARINAS</h3>
                      <p className="text-xs font-semibold text-gray-800">BS INFORMATION TECHNOLOGY</p>
                      <p className="text-xs text-gray-700">Major in Mobile and Web Application</p>
                      <p className="text-xs text-gray-700 font-medium">3-Time Dean's Lister</p>
                    </div>
                    <div className="text-left sm:text-right text-xs font-bold text-gray-800">
                      <div>DASMARINAS CAVITE</div>
                      <div>2023-PRESENT</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-0.5 pt-1">
                    <div>
                      <h3 className="font-bold text-gray-900">MANGATAREM NATIONAL HIGH SCHOOL</h3>
                      <p className="text-xs text-gray-700">Senior High School</p>
                    </div>
                    <div className="text-left sm:text-right text-xs font-bold text-gray-800">
                      <div>MANGATAREM</div>
                      <div>2021-2023</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-0.5 pt-1">
                    <div>
                      <h3 className="font-bold text-gray-900">MANGATAREM NATIONAL HIGH SCHOOL</h3>
                      <p className="text-xs text-gray-700">Junior High School</p>
                    </div>
                    <div className="text-left sm:text-right text-xs font-bold text-gray-800">
                      <div>MANGATAREM</div>
                      <div>2017-2020</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="space-y-2">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-400 pb-0.5">
                  WORK EXPERIENCE
                </h2>

                <div className="space-y-1.5 pt-1">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-0.5">
                    <div>
                      <h3 className="font-bold text-gray-900">CCTV INSTALLATION TRAINEE (OJT)</h3>
                      <p className="text-xs italic text-gray-800">Mangatarem National High School Program</p>
                    </div>
                    <div className="text-left sm:text-right text-xs font-bold text-gray-800">
                      <div>MANGATAREM</div>
                      <div>March 2023 - July 2023</div>
                    </div>
                  </div>
                  <ul className="list-disc list-outside ml-4 text-xs text-gray-800 space-y-1 pt-0.5">
                    <li>Installed CCTV security systems at high elevation locations (rice mills, utility poles) using both coaxial fiber optic cables.</li>
                    <li>Collaborated with a team to ensure proper hardware installation, cable routing, and overall system functionality.</li>
                  </ul>
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-2">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-400 pb-0.5">
                  PROJECTS
                </h2>

                <div className="space-y-3 pt-1">
                  <div>
                    <h3 className="font-bold text-gray-900 uppercase text-xs sm:text-sm">WEATHER APP (WEB APPLICATION)</h3>
                    <ul className="list-disc list-outside ml-4 text-xs text-gray-800 space-y-1 pt-0.5">
                      <li>Developed a React-based weather application focused on real-time data fetching.</li>
                      <li>Practiced and implemented seamless external API integration to retrieve and display accurate meteorological conditions.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 uppercase text-xs sm:text-sm">RISKY AI (VOICE-INTERACTIVE AI)</h3>
                    <ul className="list-disc list-outside ml-4 text-xs text-gray-800 space-y-1 pt-0.5">
                      <li>Engineered a basic voice-interactive AI application using Python.</li>
                      <li>Programmed the system to accurately process spoken input and deliver corresponding responses through synthesized voice output.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Additional */}
              <div className="space-y-2">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b border-gray-400 pb-0.5">
                  ADDITIONAL
                </h2>

                <div className="space-y-1.5 text-xs text-gray-800 pt-1 leading-normal">
                  <p>
                    <strong className="text-gray-900 font-bold">Technical Skills:</strong> React.js, JavaScript, Python, Flutter, Dart, HTML/CSS, Tailwind CSS, MySQL, Firebase, Git, GitHub, VS Code, Figma.
                  </p>
                  <p>
                    <strong className="text-gray-900 font-bold">Certifications:</strong> IT Specialist - Databases (Pearson); IT Specialist - HTML and CSS (Pearson); Responsive Web Design (freeCodeCamp); TechAll Day 3 - Full Stack Web Development and Database Integration (JPCS); eGOVPh Super App Orientation (DICT).
                  </p>
                  <p>
                    <strong className="text-gray-900 font-bold">Soft Skills:</strong> Critical thinking, Time Management, Teamwork and Collaboration, Active Listening, Problem-solving.
                  </p>
                  <p>
                    <strong className="text-gray-900 font-bold">Languages:</strong> Filipino (Native), English (Intermediate)
                  </p>
                </div>
              </div>

            </div>
          ) : (
            /* PDF View Container */
            <div className="w-full h-[65vh] rounded-xl overflow-hidden border border-gray-800 bg-gray-950 flex flex-col">
              <iframe
                src={`${resumePdfPath}#toolbar=0`}
                title="Jesenhower Nachor Resume PDF"
                className="w-full h-full border-0"
              />
            </div>
          )}
        </div>

        {/* Modal Footer / Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 border-t border-gray-800 bg-[#060a06] shrink-0 text-xs">
          <div className="flex items-center gap-2 text-gray-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
            <span>Jesenhower_Nachor_Resume.pdf</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={resumePdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 rounded-xl font-medium text-gray-300 glass-panel border border-gray-700 hover:text-white hover:bg-gray-800 transition-all gap-1.5 cursor-pointer"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open PDF in New Tab
            </a>

            <a
              href={resumePdfPath}
              download="Jesenhower_Nachor_Resume.pdf"
              className="flex-1 sm:flex-none inline-flex items-center justify-center px-5 py-2 rounded-xl font-semibold text-black bg-lime-400 hover:bg-lime-300 shadow-lg shadow-lime-500/20 transition-all hover:scale-[1.02] gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
