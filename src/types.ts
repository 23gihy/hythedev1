export type CharacterMode = 'hologram' | 'anime' | 'wireframe';

export interface IncidentAlert {
  id: string;
  timestamp: string;
  title: string;
  sourceIp: string;
  destination: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  mitreTechnique: string;
  status: 'PENDING' | 'CONTAINED' | 'BLOCKED' | 'ESCALATED' | 'FALSE_POSITIVE';
  description: string;
  ruleTrigger: string;
  payload: string;
}

export interface SecurityProject {
  id: string;
  title: string;
  category: 'Pentest' | 'SOC Triage' | 'Security QA' | 'Research';
  target: string;
  severity: 'Critical' | 'High' | 'Medium';
  cvss: number;
  overview: string;
  impact: string;
  remediation: string;
  tools: string[];
  date: string;
}

export interface SecurityTool {
  name: string;
  category: 'SOC & SIEM' | 'Pentesting' | 'Network' | 'Automation';
  level: 'Expert' | 'Proficient' | 'Familiar';
  description: string;
  commandExample: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  code: string;
  summary: string;
  deliverables: string[];
  badge: string;
}
