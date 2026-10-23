import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { SecurityProject } from '../types';
import { ExternalLink, ShieldCheck, X, FileText, CheckCircle2 } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface ProjectsProps {
  lang: 'vi' | 'en';
}

export const Projects: React.FC<ProjectsProps> = ({ lang }) => {
  const [filter, setFilter] = useState<'All' | 'Pentest' | 'SOC Triage' | 'Security QA'>('All');
  const [activeProject, setActiveProject] = useState<SecurityProject | null>(null);

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === 'All') return true;
    return p.category === filter;
  });

  const getCvssColor = (score: number) => {
    if (score >= 9.0) return 'text-red-400 bg-red-950/60 border-red-800';
    if (score >= 7.0) return 'text-orange-400 bg-orange-950/60 border-orange-800';
    return 'text-amber-400 bg-amber-950/60 border-amber-800';
  };

  return (
    <section id="projects" className="py-20 bg-[#060606] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-amber-500 font-mono text-xs uppercase tracking-wider mb-2">
              Featured Case Studies & Pentest Writeups
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {lang === 'vi' ? 'Báo cáo Kiểm thử & Dự án Tiêu biểu' : 'Security Assessments & Writeups'}
            </h2>
            <p className="text-zinc-400 text-sm mt-2 max-w-xl">
              {lang === 'vi'
                ? 'Các lỗ hổng thực tế đã được phát hiện, khai thác PoC có trách nhiệm và hỗ trợ khắc phục an toàn.'
                : 'Real-world vulnerabilities identified, responsibly disclosed, and hardened.'}
            </p>
          </div>

          {/* Segmented Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-950 rounded-xl border border-zinc-800">
            {(['All', 'Pentest', 'SOC Triage', 'Security QA'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  soundFX.playClick();
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  filter === cat
                    ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => {
                setActiveProject(proj);
                soundFX.playClick();
              }}
              className="p-6 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-500/40 hover:bg-zinc-900/40 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                    <span>{proj.category}</span>
                    <span>·</span>
                    <span>{proj.date}</span>
                  </div>

                  <span
                    className={`text-xs font-mono px-2.5 py-0.5 rounded border font-semibold ${getCvssColor(
                      proj.cvss
                    )}`}
                  >
                    CVSS {proj.cvss} ({proj.severity})
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                  {proj.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
                  {proj.overview}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {proj.tools.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-medium text-amber-400">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  {lang === 'vi' ? 'Xem chi tiết PoC & Khắc phục' : 'View PoC & Remediation'}
                </span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0c0c0c] border border-zinc-800 rounded-2xl max-w-2xl w-full p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono text-amber-400">{activeProject.category}</span>
                  <span className="text-zinc-600">·</span>
                  <span
                    className={`text-xs font-mono px-2 py-0.5 rounded border ${getCvssColor(
                      activeProject.cvss
                    )}`}
                  >
                    CVSS {activeProject.cvss} ({activeProject.severity})
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{activeProject.title}</h3>
                <p className="text-xs font-mono text-zinc-400 mt-1">Target: {activeProject.target}</p>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-zinc-200 mb-1">
                  {lang === 'vi' ? 'Tổng quan lỗ hổng' : 'Vulnerability Overview'}
                </h4>
                <p className="text-zinc-400 leading-relaxed">{activeProject.overview}</p>
              </div>

              <div>
                <h4 className="font-semibold text-red-300 mb-1">
                  {lang === 'vi' ? 'Tác động tiềm tàng (Impact)' : 'Potential Impact'}
                </h4>
                <p className="text-zinc-300 leading-relaxed bg-red-950/20 border border-red-900/30 p-3 rounded-lg">
                  {activeProject.impact}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-emerald-300 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {lang === 'vi' ? 'Giải pháp khắc phục (Remediation)' : 'Remediation Applied'}
                </h4>
                <p className="text-zinc-300 leading-relaxed bg-emerald-950/20 border border-emerald-900/30 p-3 rounded-lg">
                  {activeProject.remediation}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-zinc-300 mb-2">
                  {lang === 'vi' ? 'Công cụ sử dụng' : 'Tools & Frameworks'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-zinc-900 border border-zinc-800 text-zinc-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setActiveProject(null)}
                className="px-5 py-2 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
