import React, { useState } from 'react';

const designArts = [
  {
    id: '01',
    number: '01 / 04',
    title: 'PAPA BANANA CATSUP',
    category: 'Vintage Poster Design',
    year: '2025',
    software: 'ADOBE PHOTOSHOP',
    subcategory: 'BRANDING & ADVERTISING',
    tags: ['Adobe Photoshop', 'Photo Manipulation', 'Vintage Advertising', 'Branding'],
    description:
      'A nostalgic vintage-style advertisement poster for Papa Banana Catsup created in Adobe Photoshop. Features custom photo manipulation blending a cute Pikachu character, retro typography, authentic product bottle isolation, and classic 1950s Filipino radio broadcast references.',
    image: '/assets/design/papa-banana-catsup.webp',
  },
  {
    id: '02',
    number: '02 / 04',
    title: 'SARI-SARI STORIES',
    category: 'Creative Photo Composition',
    year: '2025',
    software: 'ADOBE PHOTOSHOP',
    subcategory: 'PHOTO MANIPULATION',
    tags: ['Adobe Photoshop', 'Photo Composition', 'Digital Art', 'Filipino Culture'],
    description:
      'A creative Filipino cultural poster composition combining paper-cutout portrait head manipulations with textured sari-sari store imagery in Adobe Photoshop. Integrates custom lighting, atmospheric smoke effects, and distressed paper texture overlays.',
    image: '/assets/design/sari-sari-stories.webp',
  },
  {
    id: '03',
    number: '03 / 04',
    title: 'BEAUTIFUL THINGS',
    category: 'Typography & Sunset Poster Art',
    year: '2025',
    software: 'ADOBE PHOTOSHOP',
    subcategory: 'TYPOGRAPHY & DIGITAL ART',
    tags: ['Adobe Photoshop', 'Typography Design', 'Visual Effects', 'Digital Art'],
    description:
      'An evocative visual poster combining custom warped 3D typography, chromatic blending, drop shadow depth, and dramatic mountain cross sunset photography engineered with Adobe Photoshop layer styles and blending tools.',
    image: '/assets/design/beautiful-things-poster.webp',
  },
  {
    id: '04',
    number: '04 / 04',
    title: 'PIKACHU PIXEL ART',
    category: 'Digital Character Illustration',
    year: '2025',
    software: 'ADOBE PHOTOSHOP',
    subcategory: 'PIXEL ART & ILLUSTRATION',
    tags: ['Adobe Photoshop', 'Pixel Art', 'Character Design', 'Digital Illustration'],
    description:
      'A retro pixel art character illustration crafted grid-by-grid using Adobe Photoshop pixel pencil and symmetry tools, featuring clean outline geometry, precise highlight placement, and vibrant color shading.',
    image: '/assets/design/pikachu-pixel-art.webp',
  },
];

export default function GraphicDesignDeck() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="design" className="py-24 relative bg-[#050805] border-t border-gray-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-lime-400">
                MULTIMEDIA & GRAPHIC ARTS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Photoshop <span className="text-lime-400">Design Works</span>
            </h2>
          </div>
          <p className="text-sm text-gray-400 max-w-md font-mono">
            Creative poster compositions, photo manipulations, typography, and pixel art designed with Adobe Photoshop.
          </p>
        </div>

        {/* Sticky Stacking Deck Container */}
        <div className="relative space-y-12 pb-20">
          {designArts.map((art, index) => {
            const zIndex = (index + 1) * 10;
            const topOffset = 100 + index * 18; // 100px, 118px, 136px, 154px top offset for stacked card header peeking

            return (
              <div
                key={art.id}
                style={{
                  '--card-top': `${topOffset}px`,
                  zIndex: zIndex,
                }}
                className="group relative lg:sticky lg:top-[var(--card-top)] rounded-[1.75rem] sm:rounded-[2.5rem] bg-[#0c110c] border border-gray-800 hover:border-lime-500/50 p-5 sm:p-8 md:p-10 transition-all duration-300 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden"
              >
                {/* Subtle Ambient Card Glow */}
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-lime-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-lime-500/15 transition-all duration-500"></div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Content Column */}
                  <div className="lg:col-span-6 space-y-6 flex flex-col justify-between h-full">
                    <div className="space-y-4">
                      {/* Index Number Badge & Category */}
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-gray-400 font-bold tracking-wider">{art.number}</span>
                        <span className="px-3.5 py-1 text-[11px] font-semibold text-lime-400 bg-lime-950/80 border border-lime-500/30 rounded-full uppercase tracking-wider">
                          {art.category}
                        </span>
                      </div>

                      {/* Title */}
                      <div className="space-y-1">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-sans uppercase group-hover:text-lime-400 transition-colors">
                          {art.title}
                        </h3>
                        <div className="text-xs font-mono text-gray-400 tracking-wide flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-lime-300 font-semibold">{art.year}</span>
                          <span>•</span>
                          <span className="text-gray-300">[{art.software}]</span>
                          <span>—</span>
                          <span className="text-gray-400">[{art.subcategory}]</span>
                        </div>
                      </div>

                      {/* Software & Skill Tag Pills */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {art.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3.5 py-1 text-xs font-mono font-medium text-gray-300 bg-gray-900/90 border border-gray-700/80 rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-300 leading-relaxed font-sans pt-2">
                        {art.description}
                      </p>
                    </div>

                    {/* Action Button to Open Lightbox Zoom */}
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => setSelectedImage(art)}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-mono font-bold text-black bg-lime-400 hover:bg-lime-300 shadow-lg shadow-lime-500/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                        View Full Artwork
                      </button>
                    </div>
                  </div>

                  {/* Right Artwork Preview Container */}
                  <div className="lg:col-span-6 flex items-center justify-center">
                    <div
                      onClick={() => setSelectedImage(art)}
                      className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-black/60 border border-gray-800 group-hover:border-lime-500/40 transition-all duration-300 cursor-pointer shadow-xl flex items-center justify-center"
                    >
                      <img
                        src={art.image}
                        alt={art.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="px-4 py-2 bg-lime-400 text-black font-mono font-bold text-xs rounded-xl shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                          Click to Expand 🔍
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Artwork Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] bg-[#0c110c] border border-lime-500/30 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col items-center overflow-y-auto animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="w-full flex items-center justify-between pb-4 border-b border-gray-800">
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-white font-sans uppercase">
                  {selectedImage.title}
                </h4>
                <p className="text-xs text-lime-400 font-mono">
                  {selectedImage.category} — {selectedImage.software}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-900 border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 transition-all cursor-pointer"
                aria-label="Close image lightbox"
              >
                ✕
              </button>
            </div>

            {/* Expanded Image View */}
            <div className="w-full max-h-[70vh] flex items-center justify-center p-2 my-4 overflow-hidden rounded-xl bg-black/80 border border-gray-900">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[68vh] max-w-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Modal Footer Description */}
            <div className="w-full text-center space-y-1 pt-2 border-t border-gray-800">
              <p className="text-xs sm:text-sm text-gray-300 font-sans max-w-2xl mx-auto">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
