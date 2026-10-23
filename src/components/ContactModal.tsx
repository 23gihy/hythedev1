import React, { useState } from 'react';
import { X, Send, Download, CheckCircle, Shield, FileText, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/audio';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  initialMode: 'project' | 'cv';
  prefilledService?: string;
  lang: 'vi' | 'en';
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  initialMode,
  prefilledService,
  lang,
  onClose,
}) => {
  const [mode, setMode] = useState<'project' | 'cv'>(initialMode);
  const [service, setService] = useState(prefilledService || 'Web & API Penetration Testing');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    soundFX.playSuccess();
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#ffffff', '#10b981'],
      });
    } catch {
      // Ignore confetti errors
    }
  };

  const handlePrintCV = () => {
    soundFX.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0b0b0b] border border-zinc-800 rounded-2xl max-w-xl w-full p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMode('project');
                soundFX.playClick();
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                mode === 'project'
                  ? 'bg-amber-500 text-black'
                  : 'text-zinc-400 hover:text-white bg-zinc-900'
              }`}
            >
              {lang === 'vi' ? 'Khởi tạo Dự án / Audit' : 'Start a Project'}
            </button>
            <button
              onClick={() => {
                setMode('cv');
                soundFX.playClick();
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                mode === 'cv'
                  ? 'bg-amber-500 text-black'
                  : 'text-zinc-400 hover:text-white bg-zinc-900'
              }`}
            >
              {lang === 'vi' ? 'Xem & Tải CV' : 'View & Download CV'}
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              soundFX.playClick();
            }}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Inquiry Mode */}
        {mode === 'project' && (
          <div>
            {isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {lang === 'vi' ? 'Yêu cầu kiểm thử đã được gửi!' : 'Security Request Dispatched!'}
                </h3>
                <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  {lang === 'vi'
                    ? `Cảm ơn bạn, tôi sẽ phản hồi trong vòng 24 giờ qua email ${email || 'của bạn'}.`
                    : 'Thank you. I will review the audit scope and get back to you within 24 hours.'}
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg"
                >
                  {lang === 'vi' ? 'Hoàn tất' : 'Close'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-mono text-zinc-400 mb-1.5 uppercase">
                    {lang === 'vi' ? 'Dịch vụ cần triển khai' : 'Service Scope'}
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:border-amber-500 outline-none"
                  >
                    <option value="Web & API Penetration Testing">Web & API Penetration Testing</option>
                    <option value="SOC Tier-1 Monitoring & Triage">SOC Tier-1 Monitoring & Triage</option>
                    <option value="Security Testing & QA Automation">Security Testing & QA Automation</option>
                    <option value="Vulnerability Assessment & Hardening">Vulnerability Assessment & Hardening</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-zinc-400 mb-1.5 uppercase">
                      {lang === 'vi' ? 'Tên của bạn / Tổ chức' : 'Your Name / Org'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Nguyen"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:border-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-zinc-400 mb-1.5 uppercase">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:border-amber-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-zinc-400 mb-1.5 uppercase">
                    {lang === 'vi' ? 'Mô tả mục tiêu / Yêu cầu bảo mật' : 'Project Scope & Requirements'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={
                      lang === 'vi'
                        ? 'Số lượng endpoint API, ứng dụng web hoặc hệ thống cần rà soát an ninh...'
                        : 'Web application URL, API endpoint count, or SOC monitoring needs...'
                    }
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:border-amber-500 outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500 font-mono">
                    Cam kết bảo mật thông tin (NDA standard)
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg shadow-sm transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{lang === 'vi' ? 'Gửi Yêu cầu' : 'Submit Scope'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* CV Mode */}
        {mode === 'cv' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-3 font-mono">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <div>
                  <h4 className="text-base font-bold text-white font-sans">{PERSONAL_INFO.name}</h4>
                  <p className="text-amber-400 text-[11px]">{PERSONAL_INFO.title}</p>
                </div>
                <Shield className="w-5 h-5 text-amber-500" />
              </div>

              <div className="space-y-2 text-zinc-300">
                <div>
                  <span className="text-zinc-500 block text-[10px]">CAREER OBJECTIVE:</span>
                  <p className="text-xs leading-relaxed font-sans">{PERSONAL_INFO.bioEn}</p>
                </div>

                <div>
                  <span className="text-zinc-500 block text-[10px]">CORE SKILLS:</span>
                  <p className="text-xs">
                    SIEM (Splunk, Wazuh), Web Pentest (Burp Suite, OWASP Top 10), Security QA Automation (DAST/SAST), Linux Hardening, Network Analysis (Wireshark).
                  </p>
                </div>

                <div>
                  <span className="text-zinc-500 block text-[10px]">CERTIFICATIONS:</span>
                  <p className="text-xs">
                    CompTIA Security+ · eJPT · Splunk Core Certified Power User · TryHackMe Top 2% Global.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-zinc-500 font-mono text-[11px]">Direct Contact: {PERSONAL_INFO.email}</span>
              <button
                onClick={handlePrintCV}
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? 'In / Lưu PDF' : 'Print / Save PDF'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
