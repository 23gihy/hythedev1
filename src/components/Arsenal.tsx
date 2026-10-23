import React, { useState } from 'react';
import { SECURITY_TOOLS } from '../data/portfolioData';
import { Terminal, Copy, Check, Wrench } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface ArsenalProps {
  lang: 'vi' | 'en';
}

export const Arsenal: React.FC<ArsenalProps> = ({ lang }) => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Pentesting', 'SOC & SIEM', 'Network', 'Automation'];

  const filteredTools = SECURITY_TOOLS.filter((tool) => {
    if (activeCategory === 'All') return true;
    return tool.category === activeCategory;
  });

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    soundFX.playClick();
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <section id="arsenal" className="py-20 bg-[#040404]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-amber-500 font-mono text-xs uppercase tracking-wider mb-2">
              Toolkit & Technical Arsenal
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {lang === 'vi' ? 'Công cụ & Kỹ thuật Thực chiến' : 'Security Toolkit & Methodologies'}
            </h2>
            <p className="text-zinc-400 text-sm mt-2 max-w-xl">
              {lang === 'vi'
                ? 'Các bộ công cụ tiêu chuẩn ngành được sử dụng trong đánh giá lỗ hổng, rà soát mã nguồn và săn lùng mối đe dọa.'
                : 'Industry-standard utilities utilized for threat triage, network auditing, and exploit testing.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-950 rounded-xl border border-zinc-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  soundFX.playClick();
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  activeCategory === cat
                    ? 'bg-zinc-800 text-white font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredTools.map((tool) => (
            <div
              key={tool.name}
              className="p-5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-amber-400/90 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    {tool.category}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400 font-medium">
                    {tool.level}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{tool.name}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">{tool.description}</p>
              </div>

              {/* Command Snippet */}
              <div className="mt-2 pt-3 border-t border-zinc-900">
                <div className="flex items-center justify-between bg-black px-2.5 py-1.5 rounded-lg border border-zinc-800 text-[11px] font-mono text-zinc-300">
                  <span className="truncate pr-2 text-zinc-400">{tool.commandExample}</span>
                  <button
                    onClick={() => handleCopy(tool.commandExample)}
                    className="text-zinc-500 hover:text-amber-400 transition-colors shrink-0"
                    title="Sao chép lệnh"
                  >
                    {copiedCmd === tool.commandExample ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
