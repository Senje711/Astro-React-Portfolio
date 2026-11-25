import React, { useState } from 'react';
import ProjectModal from './ProjectModal.jsx';

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

      {showModal && (
        <ProjectModal
          project={{ title, description, longDescription, tags, category, image, githubUrl }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
