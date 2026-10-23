import React from 'react';
import { SERVICES } from '../data/portfolioData';
import { Shield, Bug, Search, Terminal, ArrowRight } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface ServicesProps {
  lang: 'vi' | 'en';
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ lang, onSelectService }) => {
  const getIcon = (code: string) => {
    switch (code) {
      case '01':
        return <Shield className="w-5 h-5 text-amber-400" />;
      case '02':
        return <Bug className="w-5 h-5 text-amber-400" />;
      case '03':
        return <Terminal className="w-5 h-5 text-amber-400" />;
      default:
        return <Search className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-[#040404] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-2xl">
          <div className="text-amber-500 font-mono text-xs uppercase tracking-wider mb-2">
            Services & Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {lang === 'vi' ? 'Năng lực & Dịch vụ Chuyên sâu' : 'Specialized Security Services'}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            {lang === 'vi'
              ? 'Giải pháp toàn diện từ phòng thủ giám sát SOC đến kiểm thử thâm nhập ứng dụng và kiểm thử bảo mật tự động.'
              : 'End-to-end security engineering covering active SOC defense, offensive pentesting, and automated QA gates.'}
          </p>
        </div>

        {/* 4 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="p-6 sm:p-7 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                      {getIcon(srv.code)}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">{srv.code} //</span>
                  </div>
                  <span className="text-xs font-mono text-amber-400/90 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                    {srv.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-5">{srv.summary}</p>

                <div className="space-y-2 mb-6">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
                    {lang === 'vi' ? 'Hạng mục bàn giao chính:' : 'Key Deliverables:'}
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {srv.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectService(srv.title);
                  soundFX.playClick();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors pt-3 border-t border-zinc-800/80 w-fit"
              >
                <span>{lang === 'vi' ? 'Trao đổi về dịch vụ này' : 'Consult on this service'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
