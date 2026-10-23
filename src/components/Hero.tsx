import React from 'react';
import { ArrowRight, ShieldCheck, Download, Github, Linkedin, ExternalLink, Mail, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Character3DViewer } from './Character3DViewer';
import { soundFX } from '../utils/audio';

interface HeroProps {
  lang: 'vi' | 'en';
  onOpenContact: (mode?: 'project' | 'cv') => void;
  onExploreLab: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenContact, onExploreLab }) => {
  return (
    <section id="top" className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background cyber starfield dots & ambient dust */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-amber-400/40 rounded-full blur-[1px]" />
        <div className="absolute top-1/3 left-1/2 w-1 h-1 bg-white/30 rounded-full" />
        <div className="absolute top-2/3 left-1/6 w-1.5 h-1.5 bg-amber-300/30 rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-amber-400/30 rounded-full" />
        <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-white/20 rounded-full" />
        <div className="absolute top-20 right-10 w-2 h-2 bg-amber-500/20 rounded-full blur-[1px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Profile Headline & Security Bio (Image 2 exact structure) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Status Pill with Glowing Green Dot */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-medium text-zinc-300 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>
                {lang === 'vi'
                  ? 'Sẵn sàng nhận dự án Pentest & SOC Triage'
                  : 'Taking on security projects & SOC triage'}
              </span>
            </div>

            {/* Sub-headline */}
            <div className="space-y-1">
              <p className="text-zinc-400 text-base sm:text-lg font-mono tracking-wide">
                {lang === 'vi' ? 'Xin chào, tôi là' : 'Hello, I am'}
              </p>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white uppercase font-sans">
                {PERSONAL_INFO.name}
              </h1>
            </div>

            {/* Role Accent Line in Amber (User prompt exact keywords: Security IT - SOC 1 - Tester - Pentest) */}
            <div className="text-amber-400 font-mono text-base sm:text-lg font-semibold tracking-wide flex items-center gap-2 flex-wrap">
              <span>Security IT</span>
              <span className="text-zinc-600">·</span>
              <span>SOC 1</span>
              <span className="text-zinc-600">·</span>
              <span>Tester</span>
              <span className="text-zinc-600">·</span>
              <span>Pentest</span>
            </div>

            {/* Bio Block with Amber Left Line (Exact match to Image 2 design) */}
            <div className="border-l-2 border-amber-500 pl-4 py-1">
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl">
                {lang === 'vi' ? PERSONAL_INFO.bio : PERSONAL_INFO.bioEn}
              </p>
            </div>

            {/* CTA Button Row (Image 2 style) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary Amber Button */}
              <button
                onClick={() => {
                  onOpenContact('project');
                  soundFX.playClick();
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-md shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{lang === 'vi' ? 'KHỞI TẠO DỰ ÁN' : 'START A PROJECT'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary Dark Button (Link to interactive SOC Lab) */}
              <button
                onClick={() => {
                  onExploreLab();
                  soundFX.playClick();
                }}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-zinc-950 hover:bg-zinc-900 text-zinc-200 hover:text-white font-medium text-xs sm:text-sm uppercase tracking-wider rounded-md border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{lang === 'vi' ? 'PHÒNG LAB SOC' : 'SECURITY LAB'}</span>
              </button>

              {/* Download CV Button */}
              <button
                onClick={() => {
                  onOpenContact('cv');
                  soundFX.playClick();
                }}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white font-medium text-xs sm:text-sm uppercase tracking-wider rounded-md border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>{lang === 'vi' ? 'TẢI CV' : 'DOWNLOAD CV'}</span>
              </button>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-4 pt-3 text-zinc-400">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400 transition-colors p-1"
                title="GitHub Repositories"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400 transition-colors p-1"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={PERSONAL_INFO.tryhackme}
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400 transition-colors p-1 font-mono text-xs font-bold px-1.5 py-0.5 rounded border border-zinc-700 hover:border-amber-400"
                title="TryHackMe Ranking"
              >
                THM
              </a>
              <a
                href={PERSONAL_INFO.hackthebox}
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400 transition-colors p-1 font-mono text-xs font-bold px-1.5 py-0.5 rounded border border-zinc-700 hover:border-amber-400"
                title="HackTheBox Profile"
              >
                HTB
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="hover:text-amber-400 transition-colors p-1"
                title="Send Security Dispatch"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: 360-Degree Interactive Character Mascot (Image 1 & 2 integration!) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="w-full relative">
              {/* The 360-Degree 3D Viewer */}
              <Character3DViewer />

              {/* Subtle caption matching the user request */}
              <div className="text-center mt-2">
                <span className="text-[12px] font-mono text-zinc-500">
                  {lang === 'vi'
                    ? 'Mô hình 3D Hy Dev (360°) · Kéo hoặc vuốt để xoay tự do'
                    : 'Hy Dev 3D Model (360°) · Drag or swipe for free rotation'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
