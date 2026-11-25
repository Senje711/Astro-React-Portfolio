import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    id: 'claude-code',
    name: 'Claude Code',
    category: 'tools',
    desc: 'Agentic AI coding assistant in the terminal & IDE for exploring codebases, building features, debugging & refactoring.',
    color: '#D97757',
    icon: (
      <svg viewBox="0 0 100 100" className="w-11 h-11 sm:w-12 sm:h-12">
        <g fill="#D97757" transform="translate(50 50)">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
            <rect
              key={deg}
              x="-4"
              y={i % 2 ? -40 : -46}
              width="8"
              height={i % 2 ? 32 : 38}
              rx="4"
              transform={`rotate(${deg})`}
            />
          ))}
          <circle r="10" />
        </g>
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

const CATEGORIES = [
  { id: 'all', label: 'All Technologies' },
  { id: 'frontend', label: 'Frontend & Mobile' },
  { id: 'backend', label: 'Backend & Database' },
  { id: 'tools', label: 'Tools & AI' },
];

// Ring order: each category sits together so a filter can bring the whole group to the front.
const CATEGORY_ORDER = ['frontend', 'backend', 'tools'];
const RING = [...TECH_ITEMS].sort(
  (a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category)
);

const TAU = Math.PI * 2;
const FRONT = Math.PI / 2; // bottom of the ellipse = closest to the viewer

/** Position/depth for a card at ring angle θ (percent units, so it also renders correctly server-side). */
function place(theta) {
  const depth = (Math.sin(theta) + 1) / 2; // 0 = back, 1 = front
  return {
    left: 50 + 40 * Math.cos(theta),
    top: 50 + 30 * Math.sin(theta),
    depth,
    scale: 0.55 + 0.55 * depth,
    tilt: Math.cos(theta) * 9,
  };
}

function cardStyle(theta, dimmed) {
  const p = place(theta);
  return {
    left: `${p.left}%`,
    top: `${p.top}%`,
    zIndex: Math.round(p.depth * 100),
    opacity: (0.3 + 0.7 * p.depth) * (dimmed ? 0.2 : 1),
    filter: `blur(${((1 - p.depth) * 3).toFixed(1)}px)${dimmed ? ' grayscale(1)' : ''}`,
    transform: `translate(-50%, -50%) scale(${p.scale.toFixed(3)}) rotate(${p.tilt.toFixed(2)}deg)`,
  };
}

const normalize = (a) => ((((a + Math.PI) % TAU) + TAU) % TAU) - Math.PI;

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTech, setSelectedTech] = useState(null);

  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const motion = useRef({ scroll: 0, offset: 0, current: 0, visible: false, paused: false, velocity: 0, dragging: false, dragged: false });
  const dimRef = useRef(() => false);

  const N = RING.length;
  const step = TAU / N;
  const isDimmed = (item) => activeCategory !== 'all' && item.category !== activeCategory;
  dimRef.current = isDimmed;
  motion.current.paused = !!selectedTech || activeCategory !== 'all';

  const applyLayout = () => {
    const angle = motion.current.current;
    RING.forEach((item, i) => {
      const el = cardRefs.current[i];
      if (el) Object.assign(el.style, cardStyle(angle + i * step, dimRef.current(item)));
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const stage = stageRef.current;
    if (!stage) return;
    const m = motion.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Page scroll drives the wheel: one full turn while the section crosses the viewport.
    const st = ScrollTrigger.create({
      trigger: stage,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => { m.scroll = self.progress * TAU; },
    });

    const io = new IntersectionObserver(([e]) => { m.visible = e.isIntersecting; });
    io.observe(stage);

    // Click-and-drag (mouse or touch) spins the wheel, with momentum on release.
    const RAD_PER_PX = 0.006;
    let startX = 0;
    let lastX = 0;
    let pointerId = null;
    const onDown = (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      m.dragging = true;
      m.dragged = false;
      m.velocity = 0;
      startX = lastX = e.clientX;
      pointerId = e.pointerId;
    };
    const onMove = (e) => {
      if (!m.dragging || e.pointerId !== pointerId) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      if (!m.dragged && Math.abs(e.clientX - startX) > 6) {
        m.dragged = true;
        stage.setPointerCapture(pointerId);
        stage.classList.add('cursor-grabbing');
      }
      if (m.dragged) {
        m.offset -= dx * RAD_PER_PX;
        m.velocity = -dx * RAD_PER_PX;
      }
    };
    const onUp = () => {
      if (!m.dragging) return;
      m.dragging = false;
      stage.classList.remove('cursor-grabbing');
      if (pointerId !== null && stage.hasPointerCapture(pointerId)) stage.releasePointerCapture(pointerId);
      pointerId = null;
    };
    const noNativeDrag = (e) => e.preventDefault();
    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerup', onUp);
    stage.addEventListener('pointercancel', onUp);
    stage.addEventListener('dragstart', noNativeDrag);

    let last = null;
    const tick = () => {
      if (!m.visible) return;
      if (!m.dragging && Math.abs(m.velocity) > 0.00005) {
        m.offset += m.velocity; // momentum after release
        m.velocity *= 0.94;
      }
      if (!reduce && !m.paused && !m.dragging) m.offset += 0.0012; // gentle idle drift
      const target = m.scroll + m.offset;
      m.current += (target - m.current) * 0.08;
      if (last !== null && Math.abs(m.current - last) < 0.00005) return;
      last = m.current;
      applyLayout();
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      stage.removeEventListener('pointerdown', onDown);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerup', onUp);
      stage.removeEventListener('pointercancel', onUp);
      stage.removeEventListener('dragstart', noNativeDrag);
      st.kill();
      io.disconnect();
    };
  }, [N, step]);

  // Re-apply dimming immediately when the filter changes.
  useEffect(applyLayout, [activeCategory]);

  useEffect(() => {
    if (!selectedTech) return;
    const onKey = (e) => e.key === 'Escape' && setSelectedTech(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedTech]);

  const filterBy = (id) => {
    setActiveCategory(id);
    setSelectedTech(null);
    if (id === 'all') return;
    // Spin so the middle of that category's arc lands at the front.
    const idx = RING.reduce((acc, item, i) => (item.category === id ? [...acc, i] : acc), []);
    const centre = (idx[0] + idx[idx.length - 1]) / 2;
    const m = motion.current;
    m.velocity = 0;
    m.offset += normalize(FRONT - centre * step - (m.scroll + m.offset));
  };

  const select = (item, i) => {
    // Spin the wheel so the clicked card lands at the front, then show its description.
    const m = motion.current;
    if (m.dragged) return; // that was a drag, not a click
    const desired = FRONT - i * step;
    m.offset += normalize(desired - (m.scroll + m.offset));
    setSelectedTech(item);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 select-none">
      {/* Section Heading */}
      <div className="text-center space-y-3 mb-4">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          <span className="text-lime-400">Tech</span> Stack
        </h2>
        <p className="text-gray-400 text-sm sm:text-base font-medium font-sans">
          Tools I build with — scroll or drag to spin, click to learn more
        </p>

        <div className="relative z-[300] flex flex-wrap items-center justify-center gap-2 pt-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => filterBy(cat.id)}
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

      {/* Image wheel */}
      <div ref={stageRef} className="relative h-[380px] sm:h-[480px] md:h-[600px] cursor-grab touch-pan-y">
        <div className="absolute inset-0 -rotate-12 pointer-events-none">
          {RING.map((item, i) => {
            const selected = selectedTech?.id === item.id;
            const glowing = activeCategory !== 'all' && item.category === activeCategory;
            return (
              <button
                key={item.id}
                ref={(el) => { cardRefs.current[i] = el; }}
                onClick={() => select(item, i)}
                aria-label={`${item.name} — show description`}
                className="pointer-events-auto absolute w-24 h-32 sm:w-28 sm:h-36 md:w-36 md:h-44 rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col items-center justify-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.7)] border transition-[border-color,box-shadow] duration-300 hover:border-white/50"
                style={{
                  ...cardStyle(i * step, isDimmed(item)),
                  background: `radial-gradient(circle at 30% 20%, ${item.color}66, ${item.color}1f 45%, #070a07 85%)`,
                  borderColor: selected || glowing ? item.color : 'rgba(255,255,255,0.1)',
                  boxShadow: glowing
                    ? `0 0 24px ${item.color}cc, 0 0 70px ${item.color}66, inset 0 0 28px ${item.color}55`
                    : selected
                      ? `0 0 40px ${item.color}80`
                      : undefined,
                }}
              >
                {glowing && (
                  <>
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 animate-pulse pointer-events-none"
                      style={{ background: `radial-gradient(circle at 50% 40%, ${item.color}55, transparent 70%)` }}
                    />
                    <span aria-hidden="true" className="tech-shine absolute inset-0 pointer-events-none" />
                  </>
                )}
                <span className="relative scale-110 md:scale-125 drop-shadow-[0_6px_16px_rgba(0,0,0,0.5)]">{item.icon}</span>
                <span className="relative text-[10px] sm:text-xs font-semibold text-white/90 tracking-wide">{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Description: centre of the wheel on md+ */}
        {selectedTech && (
          <div className="hidden md:flex absolute inset-0 z-[200] items-center justify-center pointer-events-none">
            <DetailCard key={selectedTech.id} tech={selectedTech} onClose={() => setSelectedTech(null)} />
          </div>
        )}
      </div>

      {/* Description: below the wheel on mobile */}
      {selectedTech && (
        <div className="md:hidden flex justify-center mt-2">
          <DetailCard key={selectedTech.id} tech={selectedTech} onClose={() => setSelectedTech(null)} />
        </div>
      )}
    </div>
  );
}

function DetailCard({ tech, onClose }) {
  return (
    <div
      className="pointer-events-auto relative w-full max-w-xs bg-[#0a0f0a]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-3 text-center animate-fadeIn"
      style={{ boxShadow: `0 0 60px ${tech.color}30` }}
      role="dialog"
      aria-label={`${tech.name} description`}
    >
      <button
        onClick={onClose}
        aria-label="Close description"
        className="absolute top-3 right-3 text-gray-400 hover:text-white text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer"
      >
        ✕
      </button>
      <div className="flex items-center justify-center gap-3">
        {tech.icon}
        <div className="text-left">
          <h3 className="text-lg font-bold text-white tracking-wide">{tech.name}</h3>
          <span className="inline-block px-2.5 py-0.5 text-[10px] font-mono font-medium text-lime-400 bg-lime-950/60 rounded-full border border-lime-500/30 uppercase tracking-wider">
            {tech.category}
          </span>
        </div>
      </div>
      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{tech.desc}</p>
    </div>
  );
}
