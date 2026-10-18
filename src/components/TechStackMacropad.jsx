import React, { useState, useEffect, useRef, useCallback } from 'react';
import Spline from '@splinetool/react-spline';
import gsap from 'gsap';

const SKILLS = {
  react: { name: 'react', label: 'REACT JS', category: 'Frontend Library', level: 80, desc: 'Building scalable component architectures, state management & reactive web applications.', color: '#61dafb', key: 'R' },
  html: { name: 'html', label: 'HTML & CSS', category: 'Frontend Core', level: 90, desc: 'Expert in semantic markup, modern CSS layouts, Flexbox, Grid & responsive design.', color: '#e34c26', key: 'H' },
  css: { name: 'css', label: 'HTML & CSS', category: 'Frontend Core', level: 90, desc: 'Expert in semantic markup, modern CSS layouts, Flexbox, Grid & responsive design.', color: '#563d7c', key: 'C' },
  js: { name: 'js', label: 'JavaScript', category: 'Core Language', level: 70, desc: 'Asynchronous programming, ES6+ logic, DOM manipulation & client-side engineering.', color: '#f0db4f', key: 'J' },
  ts: { name: 'ts', label: 'TypeScript', category: 'Typed Language', level: 75, desc: "JavaScript's overachieving cousin with static typing.", color: '#007acc', key: 'T' },
  vue: { name: 'vue', label: 'Flutter', category: 'Mobile Framework', level: 40, desc: 'Cross-platform mobile application development for Android & iOS with Dart.', color: '#41b883', key: 'F' },
  python: { name: 'python', label: 'Python', category: 'Backend & AI', level: 50, desc: 'Scripting, backend automation, data structures, and web development with Python.', color: '#3776ab', key: 'Y' },
  postgres: { name: 'postgres', label: 'MySQL', category: 'Relational Database', level: 80, desc: 'Relational database design, SQL querying, indexing, and data modeling.', color: '#336791', key: 'M' },
  firebase: { name: 'firebase', label: 'Firebase', category: 'BaaS Platform', level: 65, desc: 'Realtime database, authentication, Firestore, and cloud serverless functions.', color: '#ffca28', key: 'E' },
  vim: { name: 'vim', label: 'VS Code', category: 'Development IDE', level: 95, desc: 'Advanced code editing, extension ecosystems, debugging, and workspace setup.', color: '#019833', key: 'V' },
  github: { name: 'github', label: 'GitHub', category: 'Version Control', level: 55, desc: 'Version control, Git branching strategies, pull requests & code collaboration.', color: '#ffffff', key: 'G' },
  prettier: { name: 'prettier', label: 'Figma', category: 'UI/UX Design', level: 95, desc: 'User interface design, interactive prototyping, design systems, and wireframing.', color: '#f7b93a', key: 'A' },
  nextjs: { name: 'nextjs', label: 'Next.js', category: 'Full-Stack React', level: 75, desc: 'SSR, static generation & server components.', color: '#ffffff', key: 'X' },
  tailwind: { name: 'tailwind', label: 'Tailwind CSS', category: 'Utility CSS', level: 85, desc: 'Utility-first CSS framework for rapid component styling.', color: '#38bdf8', key: 'U' },
  nodejs: { name: 'nodejs', label: 'Node.js', category: 'JS Runtime', level: 75, desc: 'Event-driven asynchronous JavaScript backend runtime.', color: '#6cc24a', key: 'S' },
  express: { name: 'express', label: 'Express.js', category: 'Backend Framework', level: 70, desc: 'Minimalist web framework for Node.js REST APIs.', color: '#ffffff', key: 'E' },
  mongodb: { name: 'mongodb', label: 'MongoDB', category: 'NoSQL Database', level: 70, desc: 'Document database for modern flexible web applications.', color: '#47a248', key: 'O' },
  git: { name: 'git', label: 'Git', category: 'Version Control', level: 60, desc: 'Distributed source control system for tracking code changes.', color: '#f1502f', key: 'B' },
  npm: { name: 'npm', label: 'NPM', category: 'Package Manager', level: 80, desc: 'JavaScript package manager ecosystem.', color: '#cb3837', key: 'K' },
  wordpress: { name: 'wordpress', label: 'WordPress', category: 'CMS Platform', level: 65, desc: 'Open-source content management system.', color: '#007acc', key: 'W' },
  linux: { name: 'linux', label: 'Linux', category: 'Server OS', level: 70, desc: 'Unix terminal navigation, server administration & shell scripting.', color: '#ffffff', key: 'L' },
  docker: { name: 'docker', label: 'Docker', category: 'Containerization', level: 65, desc: 'Containerization platform for isolated application environments.', color: '#2496ed', key: 'D' },
  nginx: { name: 'nginx', label: 'NginX', category: 'Web Server', level: 60, desc: 'High-performance reverse proxy & HTTP web server.', color: '#008000', key: 'N' },
  aws: { name: 'aws', label: 'AWS', category: 'Cloud Services', level: 60, desc: 'Cloud computing platform for serverless scale.', color: '#ff9900', key: 'W' },
  gcp: { name: 'gcp', label: 'Google Cloud', category: 'Cloud Computing', level: 55, desc: 'Google Cloud platform services & infrastructure.', color: '#4285f4', key: 'O' },
  vercel: { name: 'vercel', label: 'Vercel', category: 'Cloud Deployment', level: 80, desc: 'Frontend cloud deployment & serverless hosting.', color: '#ffffff', key: 'Z' }
};

export default function TechStackMacropad() {
  const splineAppRef = useRef(null);
  const [selectedSkill, setSelectedSkill] = useState(SKILLS.react);
  const [isLoading, setIsLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Audio Playback for Press & Release Sounds
  const playSound = useCallback((type = 'press') => {
    if (!soundEnabled) return;
    try {
      const audio = new Audio(`/assets/keycap-sounds/${type}.mp3`);
      audio.volume = 0.4;
      audio.play().catch(() => {});
    } catch (e) {}
  }, [soundEnabled]);

  // Synchronize keycap scales and Y position to match keyboard chassis position
  const syncKeycaps = useCallback((splineApp, scaleVal, targetY) => {
    if (!splineApp) return;

    Object.keys(SKILLS).forEach((skillName) => {
      const keycap = splineApp.findObjectByName(skillName);
      if (keycap && keycap.position) {
        keycap.visible = true;

        if (keycap.scale) {
          keycap.scale.set(scaleVal, scaleVal, scaleVal);
        }

        gsap.to(keycap.position, {
          y: targetY,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'all'
        });
      }
    });
  }, []);

  // Spline Load Handler
  const handleSplineLoad = (splineApp) => {
    splineAppRef.current = splineApp;
    setIsLoading(false);

    const isMobile = window.innerWidth < 768;
    const scaleVal = isMobile ? 0.15 : 0.20;
    const kbdY = -40;
    const targetKeycapY = kbdY + 5;

    try {
      const kbd = splineApp.findObjectByName('keyboard');
      if (kbd) {
        kbd.visible = true;

        gsap.to(kbd.scale, {
          x: scaleVal,
          y: scaleVal,
          z: scaleVal,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'all'
        });

        gsap.to(kbd.position, {
          x: 0,
          y: kbdY,
          z: 0,
          duration: 0.8,
          overwrite: 'all'
        });

        gsap.to(kbd.rotation, {
          x: 0,
          y: Math.PI / 12,
          z: 0,
          duration: 0.8,
          overwrite: 'all'
        });
      }
    } catch (err) {
      console.error('Keyboard transform error:', err);
    }

    // Force synchronize keycaps scale and target Y position
    syncKeycaps(splineApp, scaleVal, targetKeycapY);
    setTimeout(() => syncKeycaps(splineApp, scaleVal, targetKeycapY), 150);
    setTimeout(() => syncKeycaps(splineApp, scaleVal, targetKeycapY), 500);
    setTimeout(() => syncKeycaps(splineApp, scaleVal, targetKeycapY), 1200);

    // Event Listeners for Hover and Click on 3D keycaps
    splineApp.addEventListener('mouseHover', (e) => {
      if (!e.target || !e.target.name) return;
      const name = e.target.name.toLowerCase();
      if (SKILLS[name]) {
        setSelectedSkill(SKILLS[name]);
        playSound('press');
      }
    });

    splineApp.addEventListener('mouseDown', (e) => {
      if (!e.target || !e.target.name) return;
      const name = e.target.name.toLowerCase();
      if (SKILLS[name]) {
        setSelectedSkill(SKILLS[name]);
        playSound('press');
      }
    });

    splineApp.addEventListener('mouseUp', () => {
      playSound('release');
    });

    splineApp.addEventListener('keyDown', (e) => {
      if (!e.target || !e.target.name) return;
      const name = e.target.name.toLowerCase();
      if (SKILLS[name]) {
        setSelectedSkill(SKILLS[name]);
        playSound('press');
      }
    });

    splineApp.addEventListener('keyUp', () => {
      playSound('release');
    });
  };

  // Keyboard Listener for Physical Keypresses
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      const char = e.key.toUpperCase();
      const matchedKey = Object.values(SKILLS).find((s) => s.key === char);

      if (matchedKey) {
        setSelectedSkill(matchedKey);
        playSound('press');

        if (splineAppRef.current) {
          try {
            const keycapObj = splineAppRef.current.findObjectByName(matchedKey.name);
            if (keycapObj && keycapObj.position) {
              gsap.to(keycapObj.position, {
                y: -35,
                duration: 0.08,
                onComplete: () => {
                  gsap.to(keycapObj.position, {
                    y: -35 + 5,
                    duration: 0.1,
                    onComplete: () => playSound('release')
                  });
                }
              });
            }
          } catch (err) {}
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playSound]);

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-radial from-lime-500/10 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center relative z-20 mb-4">
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-lime-400">
          TECHNICAL CAPABILITY
        </span>
        <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md mt-1">
          Tech <span className="text-gradient-lime">Stack</span>
        </h2>
        <div className="mt-2 flex items-center justify-center gap-3">
          <span className="text-xs sm:text-sm font-mono text-gray-400 animate-pulse tracking-wider">
            (hint: press a key or click 3D keycaps)
          </span>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-2.5 py-1 rounded-full text-xs font-mono border transition-all flex items-center gap-1.5 cursor-pointer ${
              soundEnabled
                ? 'bg-lime-950/80 border-lime-500/40 text-lime-400'
                : 'bg-gray-900 border-gray-800 text-gray-500'
            }`}
          >
            {soundEnabled ? '🔊 SFX ON' : '🔇 SFX OFF'}
          </button>
        </div>
      </div>

      {/* Sized 3D Spline Scene Viewport */}
      <div
        className="relative w-full max-w-4xl h-[460px] sm:h-[540px] flex items-center justify-center rounded-3xl overflow-hidden my-2 border border-gray-800/40 bg-black/40 shadow-2xl"
        onMouseEnter={() => splineAppRef.current && syncKeycaps(splineAppRef.current, 0.20, -35)}
      >
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 backdrop-blur-md z-20">
            <div className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono text-lime-400 tracking-wider">
              Loading 3D Keyboard Scene...
            </span>
          </div>
        )}

        <Spline
          scene="/assets/skills-keyboard.spline"
          onLoad={handleSplineLoad}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        />
      </div>

      {/* Active Selected Skill Card with Glowing Gradient Progress Bar */}
      {selectedSkill && (
        <div className="w-full max-w-2xl mt-6 glass-panel p-6 sm:p-7 rounded-3xl border border-lime-500/30 shadow-2xl relative overflow-hidden transition-all duration-300">
          <div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-full shadow-lg"
                style={{ backgroundColor: selectedSkill.color }}
              />
              <h3 className="text-xl font-black text-white tracking-wide">
                {selectedSkill.label}
              </h3>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-lime-950 text-lime-400 border border-lime-500/30">
                KEY [{selectedSkill.key}]
              </span>
            </div>
            <span className="text-sm font-mono font-bold text-lime-400">
              {selectedSkill.level}% PROFICIENCY
            </span>
          </div>

          {/* Glowing Purple-Pink-Orange Gradient Progress Bar */}
          <div className="w-full h-3.5 bg-gray-900 rounded-full overflow-hidden mt-4 border border-gray-800 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 shadow-[0_0_14px_rgba(236,72,153,0.7)] transition-all duration-500"
              style={{ width: `${selectedSkill.level}%` }}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-4">
            <p className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed max-w-md">
              {selectedSkill.desc}
            </p>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider bg-gray-900/80 px-3 py-1 rounded-lg border border-gray-800">
              {selectedSkill.category}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
