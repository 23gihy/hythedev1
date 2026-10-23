import React, { useState } from 'react';
import { ShieldCheck, Globe, Menu, X } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface NavbarProps {
  onOpenContact: (mode?: 'project' | 'cv') => void;
  lang: 'vi' | 'en';
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, lang, onToggleLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: lang === 'vi' ? 'Dịch vụ' : 'Services', href: '#services' },
    { label: lang === 'vi' ? 'Dự án Pentest' : 'Work', href: '#projects' },
    { label: 'SOC Lab', href: '#soc-lab' },
    { label: lang === 'vi' ? 'Công cụ' : 'Arsenal', href: '#arsenal' },
    { label: lang === 'vi' ? 'Chứng chỉ' : 'Docs & Certs', href: '#certifications' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#050505]/85 backdrop-blur-md border-b border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand title with new Security Shield logo */}
        <a
          href="#top"
          onClick={() => soundFX.playClick()}
          className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-amber-400 transition-colors flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 group-hover:border-amber-400 group-hover:bg-amber-500/25 transition-all shadow-sm shadow-amber-500/10">
            <ShieldCheck className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-mono tracking-wider font-semibold">Hy The Dev</span>
        </a>

        {/* Zone 2: 4–6 nav links, clean text with hover underline */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => soundFX.playClick()}
              className="hover:text-amber-400 transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Zone 3: 1–2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => {
              onToggleLang();
              soundFX.playClick();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-medium rounded-lg text-zinc-300 bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 transition-colors whitespace-nowrap"
            title="Đổi ngôn ngữ / Switch language"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => {
              onOpenContact('project');
              soundFX.playClick();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-black bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm transition-all whitespace-nowrap"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lang === 'vi' ? 'Liên hệ Pentest' : 'Start Audit'}</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-white/10 px-4 pt-2 pb-5 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setMobileMenuOpen(false);
                soundFX.playClick();
              }}
              className="block px-3 py-2 text-sm font-medium text-zinc-300 hover:text-amber-400 hover:bg-zinc-900 rounded-md"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact('project');
              soundFX.playClick();
            }}
            className="w-full mt-2 py-2 text-xs font-semibold text-black bg-amber-500 rounded-lg text-center"
          >
            {lang === 'vi' ? 'Liên hệ Pentest & Hợp tác' : 'Start a Project'}
          </button>
        </div>
      )}
    </header>
  );
};
