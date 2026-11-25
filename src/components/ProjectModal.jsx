import React, { useEffect } from 'react';

/**
 * Details modal shared by the project cards and the featured projects slider.
 * @param {Object} props
 * @param {{ title: string, description: string, longDescription?: string, tags?: string[], category?: string, image?: string, githubUrl?: string }} props.project
 * @param {() => void} props.onClose
 */
export default function ProjectModal({ project, onClose }) {
  const { title, description, longDescription, tags = [], category, image, githubUrl = '#' } = project;

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} details`}
    >
      <div
        className="relative max-w-xl sm:max-w-2xl w-full max-h-[85vh] sm:max-h-[90vh] bg-[#18181c] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 overflow-y-auto my-auto scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-gray-800/80 pb-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{title}</h3>
              {category && (
                <span className="px-3.5 py-1 text-xs font-mono font-semibold text-lime-400 bg-lime-950/60 border border-lime-500/30 rounded-full uppercase tracking-wider">
                  {category}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">{description}</p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 bg-gradient-to-tr from-purple-600 to-fuchsia-500 hover:from-purple-500 hover:to-fuchsia-400 text-white font-bold text-base rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0 mt-0.5"
          >
            ✕
          </button>
        </div>

        {image && (
          <div className="rounded-2xl overflow-hidden h-44 sm:h-56 border border-white/10 shrink-0">
            <img src={image} alt={title} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
          </div>
        )}

        {longDescription && (
          <div className="space-y-2 pt-2 border-t border-gray-800/60">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-lime-400">
              Project Details & Architecture
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{longDescription}</p>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-lime-400">Technologies Used</h4>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1 text-xs font-medium text-gray-200 bg-[#27272a] border border-white/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

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
  );
}
