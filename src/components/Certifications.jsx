import React, { useState } from 'react';

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

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certifications" className="py-16 relative bg-[#050805] border-t border-gray-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-lime-400">
                VERIFIED CREDENTIALS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Certifications & <span className="text-lime-400">Badges</span>
            </h2>
          </div>
          <p className="text-sm text-gray-400 max-w-md font-mono">
            Industry certifications and official credentials earned during my technical journey.
          </p>
        </div>

        {/* Small Certificate Box Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              onClick={() => {
                if (cert.credlyUrl) {
                  window.open(cert.credlyUrl, '_blank', 'noopener,noreferrer');
                } else {
                  setSelectedCert(cert);
                }
              }}
              className="group relative bg-[#0b100b] border border-gray-800/90 hover:border-lime-500/50 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-lime-500/10 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              {/* Image Preview Container */}
              <div className="relative w-full h-40 rounded-xl overflow-hidden bg-black/80 border border-gray-900 group-hover:border-lime-500/30 transition-colors flex items-center justify-center p-1">
                <img
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-2">
                  {cert.credlyUrl ? (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(cert.credlyUrl, '_blank', 'noopener,noreferrer');
                        }}
                        className="px-3.5 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-mono font-bold text-xs rounded-xl shadow-lg shadow-orange-500/30 flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
                      >
                        <span>Verify on Credly ↗</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCert(cert);
                        }}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white font-mono text-[11px] rounded-lg border border-white/20 transition-colors cursor-pointer"
                      >
                        Preview Certificate 🔍
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCert(cert);
                      }}
                      className="px-3 py-1 bg-lime-400 hover:bg-lime-300 text-black font-mono font-bold text-[11px] rounded-lg shadow-md cursor-pointer transition-colors"
                    >
                      View Certificate 🔍
                    </button>
                  )}
                </div>
              </div>

              {/* Box Details */}
              <div className="pt-4 space-y-2 flex-grow flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono font-semibold text-lime-400 bg-lime-950/80 border border-lime-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                      {cert.category}
                    </span>
                    {cert.credlyUrl && (
                      <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                        Credly Badge ↗
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-lime-300 transition-colors line-clamp-2 pt-1 font-sans">
                    {cert.title}
                  </h3>
                </div>

                <div className="pt-2 border-t border-gray-800/60 flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span className="truncate max-w-[150px]">{cert.issuer}</span>
                  <span className="text-gray-500 shrink-0">{cert.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
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
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between pb-4 border-b border-gray-800">
              <div>
                <span className="text-[10px] font-mono font-semibold text-lime-400 bg-lime-950/80 border border-lime-500/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-1">
                  {selectedCert.category}
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-white font-sans">
                  {selectedCert.title}
                </h4>
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

            {/* Certificate High-Res Image View */}
            <div className="w-full max-h-[68vh] flex items-center justify-center p-2 my-4 overflow-hidden rounded-xl bg-black/80 border border-gray-900">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="max-h-[65vh] max-w-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Modal Description & Verification Link */}
            <div className="w-full text-center pt-3 border-t border-gray-800 space-y-3">
              <p className="text-xs sm:text-sm text-gray-300 font-sans max-w-xl mx-auto">
                {selectedCert.description}
              </p>

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
