import React, { useState, useEffect, useRef } from 'react';

const topicResponses = {
  about: {
    question: 'About Jesenhower',
    text: "👋 Hi there! I'm **Jesenhower A. Nachor**, an aspiring Software Engineer & Full-Stack Developer currently pursuing BS Information Technology (Major in Mobile and Web Application) at National University - Dasmariñas. I'm a 3-Time Dean's Lister who loves merging technical performance with modern UI design!",
  },
  experience: {
    question: 'Work Experience',
    text: "🛠️ **Work Experience:**\n\n• **CCTV Installation Trainee (OJT)** — Mangatarem National High School Program (March 2023 - July 2023)\n- Installed CCTV security systems at high-elevation locations using coaxial and fiber optic cables.\n- Worked with a technical team on hardware routing, system testing, and operational deployment.",
  },
  projects: {
    question: 'Featured Projects',
    text: "💻 **Key Projects:**\n\n1. **SafeLink** — Family safety platform with real-time disaster alerts (React.js & React Native).\n2. **Room Reservation System** — Classroom & lab scheduling platform.\n3. **MyPC E-Commerce** — Web store for PC components & accessories.\n4. **Weather App** — Real-time weather dashboard fetching live API data.\n5. **Risky AI** — Voice-interactive AI assistant built with Python.",
  },
  design: {
    question: 'Graphic Design',
    text: "🎨 **Adobe Photoshop Artworks:**\n\n• **Papa Banana Catsup** — Vintage 1950s advertisement poster.\n• **Sari-Sari Stories** — Cultural photo manipulation & composition.\n• **Beautiful Things** — Warped 3D typography & sunset poster art.\n• **Pikachu Pixel Art** — Retro digital character illustration.",
  },
  skills: {
    question: 'Tech Stack',
    text: "⚡ **Core Skills & Technologies:**\n\n• **Frontend & Mobile:** React.js, Astro, Next.js, JavaScript, Python, Flutter, Dart, Tailwind CSS, HTML/CSS.\n• **Backend & DB:** MySQL, Firebase, REST APIs, SQL.\n• **Design & Tools:** Git, GitHub, Figma, VS Code, Adobe Photoshop.",
  },
  certifications: {
    question: 'Certifications',
    text: "📜 **Verified Certifications:**\n\n1. **IT Specialist - Databases** — Certiport / Pearson VUE Official Certification\n2. **IT Specialist - HTML & CSS** — Certiport / Pearson VUE Official Certification\n3. **Responsive Web Design** — freeCodeCamp Developer Certification\n4. **TechAll Day 3** — Full Stack Web & DB (JPCS NU-Dasmariñas)\n5. **eGOVPh Orientation** — DICT Region IV-A",
  },
  contact: {
    question: 'Get in Touch',
    text: "📬 **Let's Connect!**\n\n• **Gmail:** jesenhowernachor26@gmail.com\n• **LinkedIn:** linkedin.com/in/jesenhower-nachor\n• **GitHub:** github.com/Senje711\n\nFeel free to reach out for web engineering, full-stack projects, or collaboration opportunities!",
  },
};

export default function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! Select any suggested topic below to learn more about Jesenhower.',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSelectTopic = (key) => {
    if (isTyping) return;

    if (key === 'resume') {
      window.dispatchEvent(new CustomEvent('open-resume-modal'));
      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: 'Open Resume' },
        { sender: 'bot', text: '📄 Opening Jesenhower’s resume popup modal...' },
      ]);
      return;
    }

    const topicData = topicResponses[key];
    if (!topicData) return;

    // Add User Question Message
    setMessages((prev) => [...prev, { sender: 'user', text: topicData.question }]);
    setIsTyping(true);

    // Simulate Bot Response Delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', text: topicData.text }]);
    }, 400);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-[9990]">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-lime-400 via-emerald-500 to-teal-500 p-0.5 shadow-2xl shadow-lime-500/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer group"
          aria-label="Toggle Assistant Chatbot"
        >
          <div className="w-full h-full rounded-full bg-[#080d08] flex items-center justify-center relative">
            {isOpen ? (
              <svg className="w-6 h-6 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <div className="relative flex items-center justify-center">
                {/* Bot Icon */}
                <svg className="w-7 h-7 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                {/* Pulsing Dot */}
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
                </span>
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Chatbot Popup Container */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-[9999] w-[calc(100vw-32px)] sm:w-[380px] h-[520px] max-h-[80vh] bg-[#0c110c] border border-gray-800/90 rounded-3xl shadow-2xl shadow-lime-500/10 flex flex-col overflow-hidden animate-scaleUp">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#070b07] border-b border-gray-800/80 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-lime-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-lime-400 rounded-full border-2 border-[#070b07]"></span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5 font-sans">
                  Jesen's Assistant
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-lime-950/80 text-lime-400 border border-lime-500/30 font-medium">
                    AI GUIDE
                  </span>
                </h3>
                <p className="text-[11px] text-gray-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse"></span>
                  Active • Safe Guided Mode
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-all cursor-pointer"
              aria-label="Close Chat"
            >
              ✕
            </button>
          </div>

          {/* Conversation Messages Viewport */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#090d09] text-xs font-sans">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-lime-400 shrink-0 mt-0.5">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-4 py-3 rounded-2xl leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-lime-400 text-black font-semibold rounded-br-xs shadow-md'
                      : 'bg-[#131a13] text-gray-200 border border-gray-800/80 rounded-bl-xs shadow-inner'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-lime-400 shrink-0">
                  🤖
                </div>
                <div className="px-4 py-3 bg-[#131a13] border border-gray-800/80 rounded-2xl rounded-bl-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Topics Action Panel (No typing input to prevent prompt injection!) */}
          <div className="p-3 bg-[#070b07] border-t border-gray-800/80 space-y-2 shrink-0">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-gray-400 px-1 block">
              SUGGESTED TOPICS:
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
              <button
                type="button"
                onClick={() => handleSelectTopic('about')}
                className="px-3 py-1.5 text-[11px] font-mono font-medium bg-gray-900 hover:bg-gray-800 text-gray-200 hover:text-white border border-gray-800 hover:border-lime-500/50 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                About Jesen
              </button>
              <button
                type="button"
                onClick={() => handleSelectTopic('experience')}
                className="px-3 py-1.5 text-[11px] font-mono font-medium bg-gray-900 hover:bg-gray-800 text-gray-200 hover:text-white border border-gray-800 hover:border-lime-500/50 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Work Experience
              </button>
              <button
                type="button"
                onClick={() => handleSelectTopic('projects')}
                className="px-3 py-1.5 text-[11px] font-mono font-medium bg-gray-900 hover:bg-gray-800 text-gray-200 hover:text-white border border-gray-800 hover:border-lime-500/50 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Projects
              </button>
              <button
                type="button"
                onClick={() => handleSelectTopic('skills')}
                className="px-3 py-1.5 text-[11px] font-mono font-medium bg-gray-900 hover:bg-gray-800 text-gray-200 hover:text-white border border-gray-800 hover:border-lime-500/50 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Tech Stack
              </button>
              <button
                type="button"
                onClick={() => handleSelectTopic('design')}
                className="px-3 py-1.5 text-[11px] font-mono font-medium bg-gray-900 hover:bg-gray-800 text-gray-200 hover:text-white border border-gray-800 hover:border-lime-500/50 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Graphic Design
              </button>
              <button
                type="button"
                onClick={() => handleSelectTopic('certifications')}
                className="px-3 py-1.5 text-[11px] font-mono font-medium bg-gray-900 hover:bg-gray-800 text-gray-200 hover:text-white border border-gray-800 hover:border-lime-500/50 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Certifications
              </button>
              <button
                type="button"
                onClick={() => handleSelectTopic('contact')}
                className="px-3 py-1.5 text-[11px] font-mono font-medium bg-gray-900 hover:bg-gray-800 text-gray-200 hover:text-white border border-gray-800 hover:border-lime-500/50 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Contact
              </button>
              <button
                type="button"
                onClick={() => handleSelectTopic('resume')}
                className="px-3 py-1.5 text-[11px] font-mono font-bold bg-lime-950/80 hover:bg-lime-900/80 text-lime-400 border border-lime-500/40 rounded-xl transition-all cursor-pointer shadow-xs"
              >
                📄 Open Resume
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
