import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectModal from './ProjectModal.jsx';

/**
 * Horizontal, scroll-driven project slider (inspired by oryzo.ai).
 * The section pins and vertical scroll moves the panels sideways until the last one is shown.
 * Image parallax / headline reveals are skipped when the user prefers reduced motion.
 * Without JavaScript it falls back to a native swipeable carousel.
 *
 * @param {Object} props
 * @param {{ title: string, description: string, longDescription?: string, tags?: string[], category?: string, image?: string, demoUrl?: string, githubUrl?: string }[]} props.projects
 * @param {string} [props.moreUrl] Link for the closing "more on GitHub" panel.
 */

// Panel widths on desktop — varied like the reference so the strip feels editorial, not like a grid.
const WIDTHS = ['md:w-[58vw]', 'md:w-[40vw]', 'md:w-[52vw]', 'md:w-[44vw]', 'md:w-[56vw]'];
// Colour wash per panel, shown behind/over the screenshot.
const TINTS = ['#c2410c', '#57534e', '#3730a3', '#0369a1', '#14532d'];

const pad = (n) => String(n).padStart(2, '0');

export default function FeaturedProjects({ projects = [], moreUrl = 'https://github.com/Senje711' }) {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const counterRef = useRef(null);
  const [active, setActive] = useState(null);

  const total = projects.length;

  const setProgress = (p) => {
    const clamped = Math.min(1, Math.max(0, p));
    if (barRef.current) barRef.current.style.transform = `scaleX(${clamped})`;
    if (counterRef.current) {
      counterRef.current.textContent = pad(Math.min(total, Math.floor(clamped * total) + 1));
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const track = trackRef.current;
    const pin = pinRef.current;
    if (!track || !pin) return;

    // Fallback progress for the native swipe carousel.
    const onNativeScroll = () => {
      const max = track.scrollWidth - track.clientWidth;
      setProgress(max > 0 ? track.scrollLeft / max : 0);
    };
    track.addEventListener('scroll', onNativeScroll, { passive: true });

    const mm = gsap.matchMedia();
    // Always pin: the section holds in place until every project has slid past,
    // then the page continues to the next section. Reduced-motion only drops the extra effects.
    mm.add({ motion: '(prefers-reduced-motion: no-preference)', any: 'all' }, (ctx) => {
      const { motion } = ctx.conditions;
      // Switch from native scroller to pinned, transform-driven strip.
      gsap.set(track, { overflow: 'visible', scrollSnapType: 'none' });
      gsap.set(pin, { height: '100vh', overflow: 'hidden' });

      const distance = () => track.scrollWidth - track.clientWidth;

      const slide = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
        },
      });

      if (!motion) return;

      // Image parallax inside each panel.
      gsap.utils.toArray('[data-parallax]', track).forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -7 },
          {
            xPercent: 7,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              containerAnimation: slide,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        );
      });

      // Headlines rise in as their panel enters.
      gsap.utils.toArray('[data-reveal]', track).forEach((el) => {
        gsap.from(el, {
          yPercent: 60,
          opacity: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el.closest('[data-panel]'),
            containerAnimation: slide,
            start: 'left 90%',
            end: 'left 45%',
            scrub: true,
          },
        });
      });
    });

    // Sections below hydrate lazily and change page height; keep pin positions accurate.
    let t;
    const ro = new ResizeObserver(() => {
      clearTimeout(t);
      t = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    ro.observe(document.body);

    return () => {
      clearTimeout(t);
      ro.disconnect();
      track.removeEventListener('scroll', onNativeScroll);
      mm.revert();
    };
  }, [total]);

  return (
    <section id="projects" ref={sectionRef} className="relative">
      <div ref={pinRef} className="relative flex flex-col justify-center pt-20 pb-8 md:pt-24 md:pb-10">
        {/* Top bar: label, counter, progress */}
        <div className="px-4 sm:px-6 lg:px-10 mb-5 flex items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-lime-400">
              Portfolio Showcase
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 md:sr-only">
              Featured <span className="text-lime-400">Projects</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs text-gray-400 w-48 sm:w-64">
            <span className="text-white tabular-nums">
              <span ref={counterRef}>01</span>
              <span className="text-gray-500"> / {pad(total)}</span>
            </span>
            <div className="relative h-px flex-1 bg-white/15 overflow-hidden">
              <div ref={barRef} className="absolute inset-0 bg-lime-400 origin-left" style={{ transform: 'scaleX(0)' }} />
            </div>
          </div>
        </div>

        {/* Horizontal strip */}
        <div
          ref={trackRef}
          className="no-scrollbar flex gap-3 md:gap-4 px-4 sm:px-6 lg:px-10 overflow-x-auto snap-x snap-mandatory will-change-transform"
        >
          {/* Intro panel */}
          <div
            data-panel
            className="snap-start shrink-0 w-[80vw] md:w-[34vw] h-[68vh] min-h-[420px] max-h-[860px] rounded-sm bg-[#0d120d] border border-white/5 p-6 md:p-10 flex flex-col justify-between"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-gray-500">({pad(total)}) Selected work</p>
            <div>
              <h2 className="hidden md:block text-[clamp(3rem,6vw,7rem)] font-extrabold leading-[0.88] tracking-[-0.04em] text-[#f5ead8]">
                Featured
                <br />
                <span className="text-lime-400">Projects</span>
              </h2>
              <p className="mt-6 max-w-sm text-sm text-gray-400 leading-relaxed">
                A selection of web applications and interactive builds — from family-safety platforms to voice AI.
              </p>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest text-gray-400 flex items-center gap-3">
              <span className="hidden md:inline">Scroll</span>
              <span className="md:hidden">Swipe</span>
              <span className="inline-block w-10 h-px bg-gray-500" />
              <span aria-hidden="true">→</span>
            </p>
          </div>

          {/* Project panels */}
          {projects.map((project, i) => {
            const tint = TINTS[i % TINTS.length];
            const width = WIDTHS[i % WIDTHS.length];
            return (
              <article
                key={project.title}
                data-panel
                className={`group snap-start shrink-0 w-[85vw] ${width} h-[68vh] min-h-[420px] max-h-[860px] relative overflow-hidden rounded-sm`}
                style={{ backgroundColor: tint }}
              >
                {project.image ? (
                  <>
                    <img
                      data-parallax
                      src={project.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute top-0 -left-[10%] w-[120%] max-w-none h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(115deg, ${tint}f2 0%, ${tint}b3 30%, transparent 65%), linear-gradient(to top, rgba(0,0,0,0.75), transparent 45%)`,
                      }}
                    />
                  </>
                ) : (
                  // No screenshot: oversized title bleeding off the edge, like the "Alwa…" panel.
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1f3d1f,transparent_70%)]">
                    <span
                      data-parallax
                      aria-hidden="true"
                      className="absolute top-1/2 -translate-y-1/2 left-[6%] whitespace-nowrap text-[clamp(8rem,22vw,22rem)] font-extrabold leading-none tracking-[-0.06em] text-[#f5ead8]"
                    >
                      {project.title}
                    </span>
                  </div>
                )}

                {/* Copy */}
                <div className="relative z-10 h-full p-6 md:p-10 flex flex-col justify-between text-[#f5ead8]">
                  <div className="flex items-start justify-between gap-4 font-mono text-[11px] uppercase tracking-widest">
                    <span>
                      {pad(i + 1)} — {project.category}
                    </span>
                  </div>

                  <div className={project.image ? '' : 'sr-only'}>
                    <h3
                      data-reveal
                      className="text-[clamp(2.5rem,5vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.04em] max-w-[12ch]"
                    >
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-md text-sm text-[#f5ead8]/80 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-wider">
                      {(project.tags || []).join(' · ')}.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActive(project)}
                        className="px-4 py-2 rounded-full text-xs font-semibold border border-[#f5ead8]/40 hover:bg-[#f5ead8] hover:text-black transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full text-xs font-extrabold text-black bg-lime-400 hover:bg-lime-300 transition-colors"
                      >
                        View Code ↗
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {/* Outro panel */}
          <a
            data-panel
            href={moreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group snap-start shrink-0 w-[70vw] md:w-[26vw] h-[68vh] min-h-[420px] max-h-[860px] rounded-sm bg-lime-400 text-black p-6 md:p-10 flex flex-col justify-between"
          >
            <p className="font-mono text-xs uppercase tracking-widest">More work</p>
            <p className="text-[clamp(2.25rem,3.6vw,4.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
              See everything on GitHub
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-2">→</span>
            </p>
          </a>

          {/* Trailing spacer so the last panel keeps right padding */}
          <div aria-hidden="true" className="shrink-0 w-px" />
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}
