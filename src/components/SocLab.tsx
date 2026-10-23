import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Radio, Terminal, Lock, RefreshCw, Filter, ArrowUpRight } from 'lucide-react';
import { INITIAL_INCIDENTS } from '../data/portfolioData';
import { IncidentAlert } from '../types';
import { soundFX } from '../utils/audio';

interface SocLabProps {
  lang: 'vi' | 'en';
}

export const SocLab: React.FC<SocLabProps> = ({ lang }) => {
  const [incidents, setIncidents] = useState<IncidentAlert[]>(INITIAL_INCIDENTS);
  const [selectedId, setSelectedId] = useState<string>(INITIAL_INCIDENTS[0].id);
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');

  const selectedIncident = incidents.find((inc) => inc.id === selectedId) || incidents[0];

  const handleAction = (status: IncidentAlert['status']) => {
    soundFX.playSuccess();
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === selectedId ? { ...inc, status } : inc))
    );
  };

  const handleReset = () => {
    soundFX.playClick();
    setIncidents(INITIAL_INCIDENTS);
  };

  const filteredIncidents = incidents.filter((inc) => {
    if (filterSeverity === 'ALL') return true;
    return inc.severity === filterSeverity;
  });

  const getSeverityBadge = (sev: IncidentAlert['severity']) => {
    switch (sev) {
      case 'CRITICAL':
        return 'text-red-400 bg-red-950/60 border-red-800/60';
      case 'HIGH':
        return 'text-orange-400 bg-orange-950/60 border-orange-800/60';
      case 'MEDIUM':
        return 'text-amber-400 bg-amber-950/60 border-amber-800/60';
      default:
        return 'text-blue-400 bg-blue-950/60 border-blue-800/60';
    }
  };

  const getStatusBadge = (status: IncidentAlert['status']) => {
    switch (status) {
      case 'BLOCKED':
        return <span className="text-emerald-400 font-mono text-xs">BLOCKED (FIREWALL)</span>;
      case 'CONTAINED':
        return <span className="text-cyan-400 font-mono text-xs">HOST CONTAINED</span>;
      case 'ESCALATED':
        return <span className="text-purple-400 font-mono text-xs">ESCALATED TIER-2</span>;
      case 'FALSE_POSITIVE':
        return <span className="text-zinc-400 font-mono text-xs">CLOSED (FP)</span>;
      default:
        return <span className="text-amber-400 font-mono text-xs animate-pulse">PENDING TRIAGE</span>;
    }
  };

  return (
    <section id="soc-lab" className="py-20 bg-[#060606] border-y border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-amber-500 font-mono text-xs tracking-wider uppercase mb-1 flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>SOC Level-1 Operations Sandbox</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {lang === 'vi' ? 'Mô phỏng Xử lý Sự cố & Phân tích SIEM' : 'Interactive SOC Incident & Log Triage'}
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-2xl">
              {lang === 'vi'
                ? 'Trải nghiệm quy trình điều tra thực tế của SOC Analyst L1: Phân loại cảnh báo, phân tích dấu hiệu xâm phạm (IoC) và thực thi biện pháp ngăn chặn.'
                : 'Experience real-world Tier-1 SOC workflows: Alert inspection, payload analysis, and instant mitigation countermeasures.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter segmented buttons */}
            <div className="flex items-center p-1 bg-zinc-900 rounded-lg border border-zinc-800 text-xs">
              {(['ALL', 'CRITICAL', 'HIGH'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    setFilterSeverity(lvl);
                    soundFX.playClick();
                  }}
                  className={`px-2.5 py-1 rounded font-mono transition-colors ${
                    filterSeverity === lvl
                      ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <button
              onClick={handleReset}
              className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg border border-zinc-800 transition-colors"
              title="Đặt lại các sự cố"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SOC Workbench Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Incident Queue List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider px-1 flex justify-between">
              <span>{lang === 'vi' ? 'Hàng đợi cảnh báo SIEM' : 'SIEM Alert Stream'}</span>
              <span>{filteredIncidents.length} ALERTS</span>
            </div>

            <div className="space-y-2.5">
              {filteredIncidents.map((inc) => {
                const isSelected = inc.id === selectedId;
                return (
                  <div
                    key={inc.id}
                    onClick={() => {
                      setSelectedId(inc.id);
                      soundFX.playClick();
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-zinc-900/90 border-amber-500/50 shadow-md shadow-amber-500/5'
                        : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="font-mono text-xs font-semibold text-zinc-300">{inc.id}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-medium ${getSeverityBadge(
                          inc.severity
                        )}`}
                      >
                        {inc.severity}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-white truncate mb-1">{inc.title}</h4>

                    <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                      <span>{inc.sourceIp}</span>
                      <div>{getStatusBadge(inc.status)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Incident Details & Analyst Mitigation Deck */}
          <div className="lg:col-span-7 bg-[#0b0b0b] rounded-xl border border-zinc-800 p-5 sm:p-6 space-y-5">
            {/* Header info */}
            <div className="border-b border-zinc-800 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-amber-400">{selectedIncident.id}</span>
                  <span className="text-zinc-500">·</span>
                  <span className="text-xs font-mono text-zinc-400">{selectedIncident.timestamp}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono px-2.5 py-0.5 rounded border ${getSeverityBadge(
                      selectedIncident.severity
                    )}`}
                  >
                    {selectedIncident.severity}
                  </span>
                  {getStatusBadge(selectedIncident.status)}
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{selectedIncident.title}</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">{selectedIncident.description}</p>
            </div>

            {/* MITRE ATT&CK & Trigger Rule */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800/80">
                <span className="text-zinc-500 block text-[11px] mb-1">MITRE ATT&CK</span>
                <span className="text-zinc-200">{selectedIncident.mitreTechnique}</span>
              </div>
              <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800/80">
                <span className="text-zinc-500 block text-[11px] mb-1">SOURCE & DESTINATION</span>
                <span className="text-amber-300/90">
                  {selectedIncident.sourceIp} → {selectedIncident.destination}
                </span>
              </div>
            </div>

            {/* Raw Log Payload */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                  RAW EVIDENCE & LOG PAYLOAD
                </span>
                <span className="text-zinc-600 text-[10px]">{selectedIncident.ruleTrigger}</span>
              </div>
              <div className="p-3 bg-black rounded-lg border border-zinc-800 font-mono text-xs text-emerald-400/90 overflow-x-auto leading-relaxed">
                <code>{selectedIncident.payload}</code>
              </div>
            </div>

            {/* SOC Tier-1 Countermeasures (Working action handlers) */}
            <div className="pt-2 border-t border-zinc-800 space-y-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                {lang === 'vi' ? 'Biện pháp can thiệp (SOC L1 Playbook)' : 'Triage Playbook Actions'}
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => handleAction('BLOCKED')}
                  className="px-3 py-2 text-xs font-mono font-medium rounded-lg bg-red-950/40 hover:bg-red-900/50 border border-red-800/60 text-red-300 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Block IP</span>
                </button>

                <button
                  onClick={() => handleAction('CONTAINED')}
                  className="px-3 py-2 text-xs font-mono font-medium rounded-lg bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/60 text-cyan-300 transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Isolate Host</span>
                </button>

                <button
                  onClick={() => handleAction('ESCALATED')}
                  className="px-3 py-2 text-xs font-mono font-medium rounded-lg bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/60 text-purple-300 transition-colors flex items-center justify-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Escalate T2</span>
                </button>

                <button
                  onClick={() => handleAction('FALSE_POSITIVE')}
                  className="px-3 py-2 text-xs font-mono font-medium rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 transition-colors flex items-center justify-center gap-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Close FP</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
