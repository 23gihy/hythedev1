import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SocLab } from './components/SocLab';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Arsenal } from './components/Arsenal';
import { Certifications } from './components/Certifications';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'project' | 'cv'>('project');
  const [prefilledService, setPrefilledService] = useState<string | undefined>();

  const handleOpenContact = (mode: 'project' | 'cv' = 'project') => {
    setModalMode(mode);
    setPrefilledService(undefined);
    setIsContactOpen(true);
  };

  const handleSelectService = (serviceTitle: string) => {
    setModalMode('project');
    setPrefilledService(serviceTitle);
    setIsContactOpen(true);
  };

  const handleExploreLab = () => {
    const el = document.getElementById('soc-lab');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLang = () => {
    setLang((prev) => (prev === 'vi' ? 'en' : 'vi'));
  };

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col selection:bg-amber-500/25 selection:text-amber-200">
      {/* Top Navbar */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLang}
        onOpenContact={handleOpenContact}
      />

      <main className="flex-1">
        {/* Hero Section with 360-degree Character (Image 1 & 2) */}
        <Hero
          lang={lang}
          onOpenContact={handleOpenContact}
          onExploreLab={handleExploreLab}
        />

        {/* Interactive SOC 1 Lab / Incident Triage Simulator */}
        <SocLab lang={lang} />

        {/* Core Services: SOC 1, Pentest, QA Security, Hardening */}
        <Services lang={lang} onSelectService={handleSelectService} />

        {/* Penetration Testing Case Studies & Writeups */}
        <Projects lang={lang} />

        {/* Technical Arsenal & Tools */}
        <Arsenal lang={lang} />

        {/* Certifications & Roadmap */}
        <Certifications lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Interactive Contact & CV Download Modal */}
      <ContactModal
        isOpen={isContactOpen}
        initialMode={modalMode}
        prefilledService={prefilledService}
        lang={lang}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
