import React from 'react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { Award, CheckCircle, ExternalLink } from 'lucide-react';

interface CertificationsProps {
  lang: 'vi' | 'en';
}

export const Certifications: React.FC<CertificationsProps> = ({ lang }) => {
  return (
    <section id="certifications" className="py-20 bg-[#060606] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <div className="text-amber-500 font-mono text-xs uppercase tracking-wider mb-2">
            Credentials & Proven Competencies
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {lang === 'vi' ? 'Chứng chỉ & Xếp hạng Bảo mật' : 'Certifications & Continuous Learning'}
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            {lang === 'vi'
              ? 'Nền tảng kiến thức chuẩn mực kết hợp rèn luyện thực tế trên các nền tảng CTF và phòng lab an ninh quốc tế.'
              : 'Demonstrated mastery across industry standards, practical attack simulations, and threat defense.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.title}
              className="p-6 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400">
                    <Award className="w-5 h-5" />
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400/90 flex items-center gap-1 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-800/40">
                    <CheckCircle className="w-3 h-3" />
                    <span>{cert.status}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1">{cert.title}</h3>
                <span className="text-xs font-mono text-zinc-500 block mb-4">{cert.issuer}</span>

                <ul className="space-y-1.5 text-xs text-zinc-400">
                  {cert.topics.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400">·</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
