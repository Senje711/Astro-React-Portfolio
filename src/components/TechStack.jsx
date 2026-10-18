import React, { useState } from 'react';

const TECH_ITEMS = [
  {
    id: 'html',
    name: 'HTML',
    category: 'frontend',
    desc: 'Semantic HTML5 structure, accessibility standards (a11y), SEO tags, and DOM element layout.',
    color: '#E44D26',
    icon: (
      <img src="/assets/html.png" alt="HTML" className="w-11 h-11 sm:w-12 sm:h-12 object-contain" />
    )
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'frontend',
    desc: 'Modern CSS3 layout, Flexbox, Grid, keyframe animations, custom properties, & responsive design.',
    color: '#1572B6',
    icon: (
      <img src="/assets/css.png" alt="CSS" className="w-11 h-11 sm:w-12 sm:h-12 object-contain" />
    )
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'frontend',
    desc: 'Component architecture, custom hooks, virtual DOM, reactive state & modern web application development.',
    color: '#61DAFB',
    icon: (
      <svg viewBox="0 0 100 100" className="w-11 h-11 sm:w-12 sm:h-12">
        <circle cx="50" cy="50" r="8" fill="#61DAFB"/>
        <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#61DAFB" strokeWidth="4.5"/>
        <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#61DAFB" strokeWidth="4.5" transform="rotate(60 50 50)"/>
        <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#61DAFB" strokeWidth="4.5" transform="rotate(120 50 50)"/>
      </svg>
    )
  },
  {
    id: 'js',
    name: 'JavaScript',
    category: 'frontend',
    desc: 'ES6+ programming, asynchronous control flow, DOM manipulation, APIs & core client-side logic.',
    color: '#F7DF1E',
    icon: (
      <img src="/assets/js.png" alt="JavaScript" className="w-11 h-11 sm:w-12 sm:h-12 object-contain" />
    )
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'frontend',
    desc: 'Cross-platform mobile application development for Android & iOS using Dart and high-performance reactive UI widgets.',
    color: '#54C5F8',
    icon: (
      <svg viewBox="0 0 128 128" className="w-11 h-11 sm:w-12 sm:h-12">
        <path fill="#47C5FB" d="M70.7 0L12 58.7l17.7 17.7L88.4 17.7z"/>
        <path fill="#47C5FB" d="M88.4 53.1L53.1 88.4l35.3 35.3h35.3L88.4 88.4l35.3-35.3z"/>
        <path fill="#00569E" d="M53.1 88.4l17.7 17.7 17.6-17.7-17.6-17.7z"/>
      </svg>
    )
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    desc: 'Backend scripting, data structures, automation, web APIs & machine learning workflows.',
    color: '#3776AB',
    icon: (
      <svg viewBox="0 0 128 128" className="w-11 h-11 sm:w-12 sm:h-12">
        <path fill="#3776AB" d="M62.6 7.5c-23.7 0-22.2 10.3-22.2 10.3l.1 10.7h22.7v3.2H31.7S18 30.2 18 54.1s12 23.3 12 23.3h7.1v-10c0-11.3 9.8-11.3 9.8-11.3h22.2s9.4.2 9.4-9.1V18.1s1.6-10.6-20.9-10.6zm-11.4 6.9c2.3 0 4.1 1.9 4.1 4.1s-1.9 4.1-4.1 4.1-4.1-1.9-4.1-4.1 1.8-4.1 4.1-4.1z"/>
        <path fill="#FFD43B" d="M65.4 120.5c23.7 0 22.2-10.3 22.2-10.3l-.1-10.7H64.8v-3.2h31.5s13.7 1.5 13.7-22.4-12-23.3-12-23.3h-7.1v10c0 11.3-9.8 11.3-9.8 11.3H53.4s-9.4-.2-9.4 9.1v28.4s-1.6 10.6 20.9 10.6zm11.4-6.9c-2.3 0-4.1-1.9-4.1-4.1s1.9-4.1 4.1-4.1 4.1 1.9 4.1 4.1-1.8 4.1-4.1 4.1z"/>
      </svg>
    )
  },
  {
    id: 'tailwind',
    name: 'tailwind',
    category: 'frontend',
    desc: 'Utility-first CSS framework for rapid custom UI design, dark mode styling & responsive components.',
    color: '#38BDF8',
    icon: (
      <img src="/assets/tailwind.png" alt="tailwind" className="w-11 h-11 sm:w-12 sm:h-12 object-contain" />
    )
  },
  {
    id: 'mysql',
    name: 'My SQL',
    category: 'backend',
    desc: 'Relational database design, SQL querying, indexing, foreign keys & relational schema architecture.',
    color: '#00758F',
    icon: (
      <img src="/assets/mysql.png" alt="My SQL" className="w-11 h-11 sm:w-12 sm:h-12 object-contain" />
    )
  },
  {
    id: 'firebase',
    name: 'Firebase',
    category: 'backend',
    desc: 'Backend-as-a-Service, Firestore realtime database, cloud authentication & serverless functions.',
    color: '#D32F2F',
    icon: (
      <svg viewBox="0 0 100 120" className="w-11 h-11 sm:w-12 sm:h-12">
        <path fill="#FFC107" d="M26.5 46.5C10.5 46.5 0 59.5 0 75C0 99.8 20.2 120 45 120C54.8 120 63.8 116.8 71 111.4C44 111.4 26.5 87 26.5 46.5Z"/>
        <path fill="#D32F2F" d="M53 0C53 0 100 36 100 74C100 99.4 79.4 120 54 120C38 120 26.5 98 26.5 72C26.5 42 53 0 53 0Z"/>
        <path fill="#FF8F00" d="M26.5 72C26.5 87 35 103.5 54 116.5C61 112 66.5 105 69.5 96.5C53.5 96.5 38 84 26.5 72Z" opacity="0.5"/>
      </svg>
    )
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'tools',
    desc: 'Advanced IDE configuration, extensions, workspace customization & integrated debugging tools.',
    color: '#007ACC',
    icon: (
      <svg viewBox="0 0 128 128" className="w-11 h-11 sm:w-12 sm:h-12">
        <path fill="#007ACC" d="M96 11l26 12v82L96 117 48 76 18 97l-12-6 24-27L6 37l12-6 30 21L96 11zM96 38L65 64l31 26V38z"/>
      </svg>
    )
  },
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    desc: 'Distributed version control system, branching strategies, commit history & code merge management.',
    color: '#F05032',
    icon: (
      <svg viewBox="0 0 128 128" className="w-11 h-11 sm:w-12 sm:h-12">
        <path fill="#F05032" d="M122.7 57.5L70.5 5.3c-3-3-7.9-3-10.9 0L47.4 17.6l13.8 13.8c3.2-1.1 6.9-.3 9.4 2.2 2.5 2.5 3.3 6.2 2.2 9.4l13.3 13.3c3.2-1.1 6.9-.3 9.4 2.2 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-2.6-2.6-3.4-6.3-2.2-9.6L67.8 49.3v30.4c.8.4 1.5 1 2.1 1.7 3.6 3.6 3.6 9.4 0 13-3.6 3.6-9.4 3.6-13 0-3.6-3.6-3.6-9.4 0-13 .9-.9 2.1-1.6 3.3-2V48.5c-1.2-.4-2.4-1.1-3.3-2-2.6-2.6-3.4-6.4-2.1-9.6L41.3 23.6 5.3 59.7c-3 3-3 7.9 0 10.9l52.2 52.2c3 3 7.9 3 10.9 0l54.3-54.3c3-3.1 3-8.1 0-11z"/>
      </svg>
    )
  },
  {
    id: 'github',
    name: 'Github',
    category: 'tools',
    desc: 'Version control, Git repository hosting, pull requests, collaboration & automated CI/CD pipelines.',
    color: '#FFFFFF',
    icon: (
      <svg viewBox="0 0 128 128" className="w-11 h-11 sm:w-12 sm:h-12">
        <path fill="#FFF" fillRule="evenodd" clipRule="evenodd" d="M64 5.3C29.7 5.3 2 33 2 67.3c0 27.5 17.8 50.8 42.6 59 3.1.6 4.2-1.3 4.2-3 0-1.5-.1-6.5-.1-12.7-17.3 3.8-20.9-7.3-20.9-7.3-2.8-7.2-6.9-9.1-6.9-9.1-5.6-3.9.4-3.8.4-3.8 6.3.4 9.6 6.5 9.6 6.5 5.5 9.5 14.5 6.8 18 5.2.6-4 2.2-6.8 4-8.3-13.8-1.6-28.3-6.9-28.3-30.8 0-6.8 2.4-12.4 6.4-16.7-.6-1.6-2.8-7.9.6-16.5 0 0 5.2-1.7 17.2 6.4 5-1.4 10.3-2.1 15.6-2.1 5.3 0 10.6.7 15.6 2.1 12-8.1 17.2-6.4 17.2-6.4 3.4 8.6 1.3 14.9.6 16.5 4 4.3 6.4 9.9 6.4 16.7 0 24-14.6 29.2-28.5 30.7 2.3 2 4.3 5.9 4.3 11.9 0 8.6-.1 15.6-.1 17.7 0 1.7 1.1 3.7 4.3 3C108.2 118.1 126 94.8 126 67.3 126 33 98.3 5.3 64 5.3z"/>
      </svg>
    )
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'tools',
    desc: 'UI/UX interface design, wireframing, interactive prototyping, vector assets & design token systems.',
    color: '#F24E1E',
    icon: (
      <img src="/assets/figma.png" alt="Figma" className="w-11 h-11 sm:w-12 sm:h-12 object-contain" />
    )
  },
  {
    id: 'antigravity',
    name: 'antigravity',
    category: 'tools',
    desc: 'Google DeepMind Antigravity AI pair programming engine & intelligent developer assistant.',
    color: '#3B82F6',
    icon: (
      <img 
        src="/assets/antigravity.png" 
        alt="antigravity" 
        className="w-11 h-11 sm:w-12 sm:h-12 object-contain drop-shadow-[0_0_12px_rgba(59,130,246,0.3)]" 
      />
    )
  },
  {
    id: 'codex',
    name: 'Codex',
    category: 'tools',
    desc: 'AI cloud workspace & command prompt interface for intelligent code generation & refactoring.',
    color: '#5E72F9',
    icon: (
      <svg viewBox="0 0 100 100" className="w-11 h-11 sm:w-12 sm:h-12">
        <defs>
          <linearGradient id="codexCloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7F94FF"/>
            <stop offset="50%" stopColor="#5E72F9"/>
            <stop offset="100%" stopColor="#3D4EEA"/>
          </linearGradient>
        </defs>
        <path fill="url(#codexCloudGrad)" d="M50 15c-11 0-20 7-23.5 17-2.5-.6-5.1-1-7.8-1-12 0-21.7 9.7-21.7 21.7 0 9.8 6.5 18 15.5 20.7 2.2 8.6 10 14.8 19.2 14.8 4 0 7.7-1.2 10.8-3.2 3.8 6 10.5 10 18.2 10 12 0 21.7-9.7 21.7-21.7 0-2.2-.3-4.3-.9-6.3 8.3-2.7 14.3-10.4 14.3-19.5 0-11.4-9.2-20.7-20.7-20.7-2.7 0-5.3.5-7.7 1.4C71 21.6 61.3 15 50 15z"/>
        <path fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" d="M32 42l11 11-11 11M51 64h18"/>
      </svg>
    )
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'tools',
    desc: 'Frontend cloud hosting platform, instant serverless deployments, global CDN & CI/CD workflow.',
    color: '#FFFFFF',
    icon: (
      <svg viewBox="0 0 100 100" className="w-11 h-11 sm:w-12 sm:h-12">
        <rect width="100" height="100" rx="24" fill="#FFFFFF"/>
        <path fill="#000000" d="M50 20L84 78H16Z"/>
      </svg>
    )
  }
];

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTech, setSelectedTech] = useState(null);

  const filteredItems = activeCategory === 'all' 
    ? TECH_ITEMS 
    : TECH_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 select-none">
      {/* Section Heading */}
      <div className="text-center space-y-3 mb-10">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Tech Stack
        </h2>
        <p className="text-gray-400 text-sm sm:text-base font-medium font-sans">
          Tools I build with
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {[
            { id: 'all', label: 'All Technologies' },
            { id: 'frontend', label: 'Frontend & Mobile' },
            { id: 'backend', label: 'Backend & Database' },
            { id: 'tools', label: 'Tools & AI' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-lime-400 text-black shadow-lg shadow-lime-500/20 scale-105'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Tech Cards (Matching reference screenshot styling) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
        {filteredItems.map(item => (
          <div
            key={item.id}
            onClick={() => setSelectedTech(item)}
            className="group relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#0e1628]/80 via-[#0a0f1d]/70 to-[#070a14]/90 border border-slate-800/80 hover:border-blue-500/40 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center justify-center gap-3.5 cursor-pointer overflow-hidden backdrop-blur-md"
          >
            {/* Top Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Brand Color Ambient Glow */}
            <div 
              className="absolute -inset-2 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
              style={{ backgroundColor: item.color }}
            />

            {/* Tech SVG Icon */}
            <div className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              {item.icon}
            </div>

            {/* Tech Name Label */}
            <span className="relative z-10 text-xs sm:text-sm font-medium text-gray-200 group-hover:text-white transition-colors text-center tracking-wide">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedTech && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedTech(null)}
        >
          <div 
            className="relative max-w-sm w-full bg-[#0a0f1d] border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-4 text-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTech(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg font-bold w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              ✕
            </button>

            <div className="flex justify-center">
              <div 
                className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-inner"
                style={{ boxShadow: `0 0 20px ${selectedTech.color}25` }}
              >
                {selectedTech.icon}
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white tracking-wide">
                {selectedTech.name}
              </h3>
              <span className="inline-block px-3 py-0.5 text-xs font-mono font-medium text-lime-400 bg-lime-950/60 rounded-full border border-lime-500/30 uppercase tracking-wider">
                {selectedTech.category}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
              {selectedTech.desc}
            </p>

            <button
              onClick={() => setSelectedTech(null)}
              className="w-full py-2.5 rounded-xl font-semibold text-xs text-black bg-lime-400 hover:bg-lime-300 shadow-lg shadow-lime-500/20 transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
