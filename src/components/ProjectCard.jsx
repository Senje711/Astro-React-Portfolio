import React, { useState } from 'react';

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} [props.longDescription]
 * @param {string[]} [props.tags]
 * @param {string} [props.demoUrl]
 * @param {string} [props.githubUrl]
 * @param {string} [props.category]
 * @param {string} [props.image]
 */
export default function ProjectCard({
  title,
  description,
  longDescription,
  tags = [],
  demoUrl = '#',
  githubUrl = '#',
  category = 'Full Stack',
  image = ''
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="group relative rounded-3xl bg-[#18181c] border border-gray-800/90 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden shadow-2xl select-none">
        
        {/* Top Preview Image Container */}
        <div className="relative w-full h-56 sm:h-64 bg-[#090d16] overflow-hidden">
          {image ? (
            <img 
              src={image} 
              alt={title} 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" 
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 flex items-center justify-center">
              <span className="text-white font-bold text-xl">{title}</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between gap-5">
          <div className="space-y-3">
            {/* Title & Category Badge Header */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white group-hover:text-lime-400 transition-colors font-sans">
                {title}
              </h3>
              <span className="px-3.5 py-1 text-xs font-mono font-semibold text-lime-400 bg-lime-950/60 border border-lime-500/30 rounded-full tracking-wider shrink-0 uppercase">
                {category}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              {description}
            </p>

            {/* Tech Badges Row */}
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1.5 text-xs font-medium text-gray-200 bg-[#27272a]/90 border border-white/10 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/2 py-3 px-4 rounded-xl text-sm font-extrabold text-black bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-400 hover:from-lime-300 hover:to-teal-300 shadow-lg shadow-lime-500/20 hover:scale-[1.02] transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View Code</span>
              <span className="text-base">→</span>
            </a>

            <button
              onClick={() => setShowModal(true)}
              className="w-1/2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-transparent border border-gray-700 hover:border-gray-500 hover:bg-white/5 transition-all text-center cursor-pointer"
            >
              Details
            </button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="relative max-w-xl sm:max-w-2xl w-full max-h-[85vh] sm:max-h-[90vh] bg-[#18181c] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 overflow-y-auto my-auto scrollbar-thin"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header Bar with Title, Category Badge, and Close Button */}
            <div className="flex items-start justify-between gap-4 border-b border-gray-800/80 pb-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {title}
                  </h3>
                  <span className="px-3.5 py-1 text-xs font-mono font-semibold text-lime-400 bg-lime-950/60 border border-lime-500/30 rounded-full uppercase tracking-wider">
                    {category}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                  {description}
                </p>
              </div>

              {/* Dedicated Close Button */}
              <button
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
                className="w-9 h-9 bg-gradient-to-tr from-purple-600 to-fuchsia-500 hover:from-purple-500 hover:to-fuchsia-400 text-white font-bold text-base rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0 mt-0.5"
              >
                ✕
              </button>
            </div>

            {/* Banner Image */}
            {image && (
              <div className="rounded-2xl overflow-hidden h-44 sm:h-56 border border-white/10 shrink-0">
                <img 
                  src={image} 
                  alt={title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top" 
                />
              </div>
            )}

            {/* Architecture Details */}
            {longDescription && (
              <div className="space-y-2 pt-2 border-t border-gray-800/60">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-lime-400">
                  Project Details & Architecture
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {longDescription}
                </p>
              </div>
            )}

            {/* Tech Badges */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-lime-400">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1 text-xs font-medium text-gray-200 bg-[#27272a] border border-white/10 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="flex gap-3 pt-2">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl font-extrabold text-sm text-black bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-400 hover:from-lime-300 hover:to-teal-300 shadow-lg shadow-lime-500/20 hover:scale-[1.01] transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
              >
                View on GitHub →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
