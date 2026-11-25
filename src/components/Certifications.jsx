import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

const certificates = [
  {
    id: 1,
    title: 'IT Specialist - Databases',
    issuer: 'Certiport, a Pearson VUE business',
    date: 'September 2026',
    image: '/assets/certificates/pearson-databases.webp',
    category: 'Industry Certification',
    credentialId: 'wBaeX-2FvB',
    credlyUrl: 'https://www.credly.com/badges/2e0e9a3c-cb53-4965-b35d-c4796afaebf8',
    verifyUrl: 'https://verify.certiport.com',
    description: 'Demonstrates foundational knowledge and proficiency in relational database design, SQL querying, indexing, and data security.',
  },
  {
    id: 2,
    title: 'IT Specialist - HTML and CSS',
    issuer: 'Certiport, a Pearson VUE business',
    date: 'June 2026',
    image: '/assets/certificates/pearson-html-css.webp',
    category: 'Industry Certification',
    credentialId: 'w96Mw-FaSY',
    credlyUrl: 'https://www.credly.com/badges/9bf319b3-1277-4959-85bc-e7f748cb6ea1',
    verifyUrl: 'https://verify.certiport.com',
    description: 'Demonstrates expertise in structuring web pages using HTML elements and applying styles using CSS.',
  },
  {
    id: 3,
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: 'June 2026',
    image: '/assets/certificates/freecodecamp-responsive-web-design.webp',
    category: 'Developer Certification',
    description: 'Developer Certification representing approximately 300 hours of coursework in modern responsive web design.',
  },
  {
    id: 4,
    title: 'TechAll Day 3 - Full Stack Web & Database',
    issuer: 'JPCS NU-Dasmariñas Chapter',
    date: 'February 2025',
    image: '/assets/certificates/jpcs-techall-day3.webp',
    category: 'Certificate of Participation',
    description: 'Participation certificate for Full Stack Web Development and Database Integration workshop.',
  },
  {
    id: 5,
    title: 'eGOVPh Super App Orientation',
    issuer: 'DICT Region IV-A',
    date: 'May 2024',
    image: '/assets/certificates/egovph-orientation.webp',
    category: 'Certificate of Participation',
    description: 'Conducted by the Department of Information and Communications Technology Region IV-A at National University - Dasmariñas.',
  },
];

// How the papers sit inside the closed folder (slight fan so they read as a stack).
const PILE = [
  { x: -0.16, r: -5, lift: 0.0 },
  { x: 0.14, r: 4, lift: 0.05 },
  { x: -0.05, r: -2, lift: 0.1 },
  { x: 0.2, r: 6, lift: 0.07 },
  { x: -0.22, r: -7, lift: 0.04 },
];

const FOLDER_BLUE = '#3d8bff';

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);
  const pinRef = useRef(null);
  const arenaRef = useRef(null);
  const folderRef = useRef(null);
  const backRef = useRef(null);
  const frontRef = useRef(null);
  const cardRefs = useRef([]);
  const triggerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    const pin = pinRef.current;
    const folder = folderRef.current;
    const back = backRef.current;
    const front = frontRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!pin || !folder || !cards.length) return;

    const ctx = gsap.context(() => {
      // Untransformed layout boxes (offset* ignores transforms) relative to the arena.
      const box = (el) => ({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight });
      const cardBox = (el) => {
        const grid = el.offsetParent === arenaRef.current ? { x: 0, y: 0 } : box(el.offsetParent);
        const b = box(el);
        return { ...b, x: b.x + grid.x, y: b.y + grid.y };
      };

      // The folder starts centred in the arena, then settles into its spot below the row of certificates.
      const folderShift = () => {
        const a = arenaRef.current;
        const f = box(folder);
        return a.offsetHeight / 2 - (f.y + f.h / 2);
      };

      // Transform that puts a card inside the (settled) folder as part of the paper stack.
      const inFolder = (el, i) => {
        const f = box(folder);
        const c = cardBox(el);
        const p = PILE[i % PILE.length];
        const scale = Math.min((f.w * 0.6) / c.w, (f.h * 0.82) / c.h);
        const cx = f.x + f.w / 2 + p.x * f.w * 0.5;
        const bottom = f.y + f.h - f.h * 0.1 - p.lift * f.h;
        const cy = bottom - (c.h * scale) / 2;
        return {
          x: cx - (c.x + c.w / 2),
          y: cy - (c.y + c.h / 2),
          scale,
          rotation: p.r,
        };
      };

      gsap.set(front, { transformPerspective: 1100, transformOrigin: '50% 100%' });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${window.innerHeight * (1.2 + cards.length * 0.45)}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      triggerRef.current = tl.scrollTrigger;

      // Closed state: folder centred, papers tucked inside it.
      tl.set([back, front], { y: folderShift }, 0);
      cards.forEach((el, i) => {
        tl.set(el, {
          x: () => inFolder(el, i).x,
          y: () => inFolder(el, i).y + folderShift(),
          scale: () => inFolder(el, i).scale,
          rotation: PILE[i % PILE.length].r,
          zIndex: 2,
        }, 0);
      });

      // 1. Folder opens (front panel drops toward the viewer) and settles lower.
      tl.to(front, { rotationX: -62, duration: 1, ease: 'power2.inOut' }, 0.15)
        .to('[data-folder-cta]', { opacity: 0, duration: 0.4 }, 0.15)
        .to([back, front], { y: 0, duration: 1, ease: 'power2.inOut' }, 0.15);
      cards.forEach((el, i) => {
        tl.to(el, { y: () => inFolder(el, i).y, duration: 1, ease: 'power2.inOut' }, 0.15);
      });

      // 2. Certificates come out one by one and land in their aligned slot.
      const start = 1.3;
      cards.forEach((el, i) => {
        const at = start + i * 0.7;
        tl.set(el, { zIndex: 10 + i }, at)
          .to(el, { y: () => inFolder(el, i).y - box(folder).h * 0.75, duration: 0.35, ease: 'power1.out' }, at)
          .to(el, { x: 0, y: 0, scale: 1, rotation: 0, duration: 0.65, ease: 'power2.inOut' }, at + 0.35);
      });

      tl.to({}, { duration: 0.4 }); // brief hold once everything is aligned
    }, pin);

    return () => ctx.revert();
  }, []);

  // "Show all" plays the same reveal by scrolling through the pinned section.
  const showAll = () => {
    const st = triggerRef.current;
    if (!st) return;
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto'; // CSS smooth-scroll fights GSAP's scroll tween
    gsap.to(window, {
      scrollTo: st.end,
      duration: 3.2,
      ease: 'power1.inOut',
      onComplete: () => { root.style.scrollBehavior = prev; },
      onInterrupt: () => { root.style.scrollBehavior = prev; },
    });
  };

  useEffect(() => {
    if (!selectedCert) return;
    const onKey = (e) => e.key === 'Escape' && setSelectedCert(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedCert]);

  return (
    <section
      id="certifications"
      className="relative border-t border-gray-800/80"
      style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(37,99,235,0.12), transparent 45%), #050805' }}
    >
      <div ref={pinRef} className="relative h-screen flex flex-col pt-20 sm:pt-24 pb-6 overflow-hidden">
        {/* Heading */}
        <div className="text-center px-4 shrink-0">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-widest text-lime-400">
              Verified Credentials
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2">
            Certifications & <span className="text-lime-400">Badges</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto mt-3 font-mono">
            Industry certifications and official credentials earned during my technical journey.
          </p>
        </div>

        {/* Arena: aligned certificate row on top, folder underneath */}
        <div
          ref={arenaRef}
          className="relative flex-1 min-h-0 flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8"
        >
          {/* Final aligned layout — the cards' natural positions */}
          <div className="w-full max-w-6xl flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-5">
            {certificates.map((cert, i) => (
              <button
                key={cert.id}
                ref={(el) => { cardRefs.current[i] = el; }}
                type="button"
                onClick={() => setSelectedCert(cert)}
                className="w-[calc(33.333%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(20%-1rem)] relative text-left bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.55)] ring-1 ring-black/10 hover:ring-lime-400 hover:-translate-y-0.5 transition-shadow cursor-pointer will-change-transform"
                aria-label={`View ${cert.title} certificate`}
              >
                <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img src={cert.image} alt="" loading="lazy" decoding="async" className="w-full h-full object-contain" />
                </div>
                <div className="px-2 py-1.5 sm:px-3 sm:py-2.5 space-y-0.5">
                  <span className="hidden sm:block text-[9px] lg:text-[10px] font-mono font-bold uppercase tracking-wider text-lime-700 truncate">
                    {cert.credlyUrl ? 'Credly Badge · ' : ''}{cert.category}
                  </span>
                  <strong className="block text-[10px] sm:text-xs lg:text-sm font-extrabold text-gray-900 leading-tight line-clamp-2">
                    {cert.title}
                  </strong>
                  <span className="hidden sm:block text-[10px] lg:text-[11px] font-mono text-gray-500 truncate">
                    {cert.issuer} · {cert.date}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* 3D folder — no transform on this wrapper so the papers can sit between its back and front */}
          <div
            ref={folderRef}
            className="relative shrink-0 w-[min(78vw,30rem)] h-[min(24vh,16rem)] min-h-[140px]"
          >
            {/* Back panel with tab */}
            <div ref={backRef} className="absolute inset-0 z-[1]">
              <div
                className="absolute -top-[12%] right-[8%] w-[34%] h-[18%] rounded-t-xl"
                style={{ background: `linear-gradient(180deg, #5a9dff, ${FOLDER_BLUE})` }}
              />
              <div
                className="absolute inset-0 rounded-xl sm:rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                style={{ background: `linear-gradient(180deg, #2f74e0, #1e4fa8)` }}
              />
            </div>

            {/* Front panel (hinges open toward the viewer) */}
            <div
              ref={frontRef}
              className="absolute left-0 right-0 bottom-0 h-[80%] z-[3] rounded-xl sm:rounded-2xl flex items-center justify-center border-t border-white/40"
              style={{
                background: `linear-gradient(180deg, #6aa8ff 0%, ${FOLDER_BLUE} 45%, #2b6fe0 100%)`,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.45), 0 -8px 24px rgba(0,0,0,0.25)',
              }}
            >
              <span className="absolute left-4 top-3 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/80">
                Certifications
              </span>
              <span className="absolute right-4 top-3 font-mono text-[10px] sm:text-xs text-white/70">
                {String(certificates.length).padStart(2, '0')} files
              </span>
              <button
                type="button"
                data-folder-cta
                onClick={showAll}
                className="inline-flex items-center gap-2 px-4 sm:px-5 h-10 sm:h-11 rounded-full border border-white/80 bg-gradient-to-br from-white to-blue-100 text-[#15376e] font-mono text-xs sm:text-[13px] font-bold shadow-[0_6px_18px_rgba(18,54,117,0.35)] hover:-translate-y-0.5 transition-transform cursor-pointer"
              >
                <span aria-hidden="true">✦</span>
                Show all certifications
              </button>
            </div>
          </div>
        </div>

        <p className="shrink-0 text-center font-mono text-[11px] text-gray-500">
          Scroll to open the folder · click a certificate to view it
        </p>
      </div>

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-[#0c110c] border border-lime-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col items-center overflow-y-auto animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-4 border-b border-gray-800">
              <div>
                <span className="text-[10px] font-mono font-semibold text-lime-400 bg-lime-950/80 border border-lime-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-1">
                  {selectedCert.category}
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-white font-sans">{selectedCert.title}</h4>
                <p className="text-xs text-gray-400 font-mono">
                  Issued by {selectedCert.issuer} • {selectedCert.date}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-900 border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 transition-all cursor-pointer shrink-0"
                aria-label="Close certificate lightbox"
              >
                ✕
              </button>
            </div>

            <div className="w-full max-h-[68vh] flex items-center justify-center p-2 my-4 overflow-hidden rounded-xl bg-black/80 border border-gray-900">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="max-h-[65vh] max-w-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            <div className="w-full text-center pt-3 border-t border-gray-800 space-y-3">
              <p className="text-xs sm:text-sm text-gray-300 font-sans max-w-xl mx-auto">{selectedCert.description}</p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                {selectedCert.credlyUrl && (
                  <a
                    href={selectedCert.credlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 shadow-xl shadow-orange-500/25 hover:scale-[1.02] transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    <span>View & Verify Badge on Credly ↗</span>
                  </a>
                )}
                {selectedCert.credentialId && (
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-gray-400">Credential ID:</span>
                    <span className="px-2.5 py-1 rounded-lg bg-gray-900 border border-gray-700 text-lime-400 font-semibold tracking-wider">
                      {selectedCert.credentialId}
                    </span>
                    {selectedCert.verifyUrl && (
                      <a
                        href={selectedCert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-lime-400 hover:text-lime-300 underline font-medium transition-colors ml-1"
                      >
                        Certiport Verify ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
