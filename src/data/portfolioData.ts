import { IncidentAlert, SecurityProject, SecurityTool, ServiceItem } from '../types';

export const PERSONAL_INFO = {
  name: 'GIA HUY',
  brandName: 'Hy The Dev',
  title: 'Security IT · SOC 1 · Tester · Pentest',
  kicker: 'Security Operations & Offensive Security',
  statusBadge: 'Taking on security projects & SOC triage',
  location: 'Ho Chi Minh City, Vietnam',
  email: 'beshydz@gmail.com',
  github: 'https://github.com/23gihy',
  linkedin: 'https://linkedin.com/in/23gihy/',
  tryhackme: 'https://tryhackme.com',
  hackthebox: 'https://hackthebox.com',
  bio: `Chuyên viên An toàn thông tin (Security IT) & Phân tích viên SOC L1 với nền tảng vững chắc về giám sát cảnh báo SIEM, rà soát lỗ hổng và kiểm thử xâm nhập (Penetration Testing). Tôi tiếp cận an ninh mạng với tư duy phòng thủ chủ động (Blue Team) kết hợp góc nhìn thực chiến của kẻ tấn công (Red Team) nhằm phát hiện sớm các nguy cơ, kiểm thử bảo mật ứng dụng Web/API (OWASP Top 10) và tự động hóa quy trình Security QA.`,
  bioEn: `I protect infrastructure and uncover critical flaws before adversaries do. Specializing in Tier-1 SOC triage, SIEM threat monitoring, OWASP web/API penetration testing, and automated security QA pipelines, combining defensive rigor with offensive vulnerability hunting.`,
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'soc-triage',
    code: '01',
    title: 'SOC Tier-1 Monitoring & Incident Triage',
    summary: 'Giám sát 24/7 cảnh báo bảo mật qua SIEM (Splunk, Wazuh), phân tích log truy cập, phát hiện bất thường và xử lý sự cố cấp độ 1.',
    deliverables: [
      'Phân loại mức độ nghiêm trọng cảnh báo (Alert Triage)',
      'Truy vết IP độc hại & phân tích mã hash (Threat Intel)',
      'Cách ly máy trạm bị nghi nhiễm (Host Containment)',
      'Viết báo cáo sơ bộ sự cố & đề xuất vá lỗi (Incident Report)'
    ],
    badge: 'Defensive Ops'
  },
  {
    id: 'pentest-web',
    code: '02',
    title: 'Web & API Penetration Testing',
    summary: 'Đánh giá an ninh ứng dụng Web và API theo phương pháp luận OWASP Top 10 và PTES, phát hiện các lỗ hổng logic và injection nguy hiểm.',
    deliverables: [
      'Kiểm thử SQLi, XSS, SSRF, CSRF & Broken Auth',
      'Đánh giá kiểm soát quyền truy cập (BOLA / IDOR / PrivEsc)',
      'Phân tích luồng nghiệp vụ kinh doanh (Business Logic Flaws)',
      'PoC (Bằng chứng khai thác) chi tiết & giải pháp khắc phục'
    ],
    badge: 'Offensive Security'
  },
  {
    id: 'sec-tester',
    code: '03',
    title: 'Security Testing & QA Automation',
    summary: 'Tích hợp kiểm thử an toàn thông tin vào quy trình phát triển phần mềm (DevSecOps), tự động hóa quét DAST/SAST trong CI/CD.',
    deliverables: [
      'Tự động quét lỗ hổng DAST qua OWASP ZAP & Nuclei',
      'Rà soát mã nguồn tĩnh (SAST) phát hiện secrets & lỗi cấu hình',
      'Viết test case kiểm thử phân quyền và dữ liệu nhạy cảm',
      'Đảm bảo tiêu chuẩn an ninh trước khi release sản phẩm'
    ],
    badge: 'Quality & DevSecOps'
  },
  {
    id: 'vuln-assessment',
    code: '04',
    title: 'Vulnerability Assessment & Hardening',
    summary: 'Rà soát bề mặt tấn công mạng nội bộ, quét điểm yếu dịch vụ và hỗ trợ gia cố hệ thống máy chủ (Linux, Windows Server).',
    deliverables: [
      'Quét quét cổng và dịch vụ với Nmap, Nessus, OpenVAS',
      'Đánh giá cấu hình sai sót trên tường lửa & router',
      'Gia cố an toàn máy chủ Linux theo chuẩn CIS Benchmarks',
      'Báo cáo xếp hạng mức độ rủi ro theo chuẩn CVSS v3.1'
    ],
    badge: 'System Hardening'
  }
];

export const INITIAL_INCIDENTS: IncidentAlert[] = [
  {
    id: 'SEC-8941',
    timestamp: '14:28:19 UTC',
    title: 'SSH Brute-Force Attack Detected',
    sourceIp: '185.220.101.5',
    destination: '10.0.4.12:22 (Auth-Server)',
    severity: 'HIGH',
    mitreTechnique: 'T1110.001 - Brute Force: Password Guessing',
    status: 'PENDING',
    description: '1,420 failed SSH authentication attempts within 60 seconds against administrative root account from known Tor exit relay.',
    ruleTrigger: 'wazuh_rule_5712: Multiple failed SSH authentications threshold exceeded',
    payload: 'pam_unix(sshd:auth): authentication failure; logname= uid=0 euid=0 tty=ssh ruser= rhost=185.220.101.5 user=root'
  },
  {
    id: 'SEC-8942',
    timestamp: '14:31:02 UTC',
    title: 'SQL Injection in User Profile Endpoint',
    sourceIp: '198.51.100.42',
    destination: 'app.internal.domain/api/v1/user?id=',
    severity: 'CRITICAL',
    mitreTechnique: 'T1190 - Exploit Public-Facing Application',
    status: 'PENDING',
    description: 'Suspicious stacked query and UNION SELECT attempt detected against backend MySQL database.',
    ruleTrigger: 'modsec_rule_942100: SQL Injection Attack Detected via libinjection',
    payload: `GET /api/v1/user?id=1%27%20UNION%20SELECT%20null,schema_name,3%20FROM%20information_schema.schemata-- -`
  },
  {
    id: 'SEC-8943',
    timestamp: '14:35:45 UTC',
    title: 'Potential Cobalt Strike C2 Beaconing',
    sourceIp: '10.0.8.44 (Workstation-Finance)',
    destination: '91.215.85.17:443',
    severity: 'CRITICAL',
    mitreTechnique: 'T1071.001 - Web Protocols Beaconing',
    status: 'PENDING',
    description: 'Periodic HTTPS POST requests with high jitter (60s ± 15%) to unregistered external IP with self-signed certificate.',
    ruleTrigger: 'zeek_notice: Recurring periodic TLS session to anomalous external domain',
    payload: 'TLS SNI: update-microsoft-cdn.online [JA3: 72a589da586844d7f0818ce684948eea]'
  },
  {
    id: 'SEC-8944',
    timestamp: '14:39:10 UTC',
    title: 'Suspicious PowerShell Encoded Command',
    sourceIp: '10.0.4.88 (HR-Laptop-02)',
    destination: 'Local Execution',
    severity: 'MEDIUM',
    mitreTechnique: 'T1059.001 - PowerShell Execution',
    status: 'PENDING',
    description: 'Process created powershell.exe with Base64 encoded argument attempting to download remote staging script.',
    ruleTrigger: 'sysmon_event_1: Process Creation - Encoded Command Flag Detected',
    payload: 'powershell.exe -NoP -NonI -W Hidden -Enc SQBFAFgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQ...'
  }
];

export const PROJECTS: SecurityProject[] = [
  {
    id: 'proj-1',
    title: 'FinTech Payment Gateway BOLA/IDOR Vulnerability',
    category: 'Pentest',
    target: 'Banking Microservice API',
    severity: 'Critical',
    cvss: 9.1,
    overview: 'Phát hiện lỗ hổng Broken Object Level Authorization (BOLA) cho phép người dùng thay đổi transaction ID để xem và hủy giao dịch chuyển tiền của tài khoản khác.',
    impact: 'Khả năng rò rỉ dữ liệu tài chính của hơn 45.000 khách hàng và can thiệp quy trình đối soát số dư.',
    remediation: 'Áp dụng kiểm tra quyền sở hữu ID phiên tại tầng API Gateway middleware trước khi xử lý truy vấn dữ liệu.',
    tools: ['Burp Suite Pro', 'Postman', 'Python Scripting', 'OWASP API Security Top 10'],
    date: 'Tháng 02, 2026'
  },
  {
    id: 'proj-2',
    title: 'Wazuh & Splunk Automated SOC L1 Triage Pipeline',
    category: 'SOC Triage',
    target: 'Enterprise Hybrid SIEM Infrastructure',
    severity: 'High',
    cvss: 7.8,
    overview: 'Xây dựng bot tự động hóa nhận cảnh báo từ Wazuh/Splunk, đối soát IP với VirusTotal & AbuseIPDB, tự động gán nhãn và tạo ticket trên Jira Service Management.',
    impact: 'Giảm thời gian phản hồi trung bình (MTTR) từ 25 phút xuống dưới 90 giây cho hơn 80% cảnh báo giả lập.',
    remediation: 'Chuẩn hóa định dạng log JSON và thiết lập playbook phản ứng tự động theo chuẩn NIST SP 800-61.',
    tools: ['Splunk', 'Wazuh SIEM', 'Python 3', 'Docker', 'VirusTotal API', 'TheHive'],
    date: 'Tháng 01, 2026'
  },
  {
    id: 'proj-3',
    title: 'Automated DAST & SAST Security Gate in GitLab CI',
    category: 'Security QA',
    target: 'E-commerce React/Node.js Monorepo',
    severity: 'High',
    cvss: 8.2,
    overview: 'Triển khai pipeline kiểm thử bảo mật tự động: chạy Semgrep cho mã nguồn, Gitleaks quét secrets bị lộ và OWASP ZAP DAST quét dynamic endpoint staging.',
    impact: 'Ngăn chặn 14 lỗ hổng XSS và rò rỉ JWT Secret key lọt vào môi trường Production trong 3 sprint liên tiếp.',
    remediation: 'Thiết lập threshold chặn merge request nếu phát hiện lỗ hổng từ mức High trở lên.',
    tools: ['OWASP ZAP', 'Semgrep', 'Gitleaks', 'GitLab CI', 'Docker'],
    date: 'Tháng 11, 2025'
  },
  {
    id: 'proj-4',
    title: 'Active Directory Lab: Kerberoasting & Privilege Escalation',
    category: 'Research',
    target: 'Windows Domain Environment Lab',
    severity: 'Critical',
    cvss: 8.8,
    overview: 'Mô phỏng chuỗi tấn công nội bộ từ người dùng Domain User thông thường, trích xuất Service Principal Name (SPN) tickets, bẻ khóa offline và nâng quyền Domain Admin.',
    impact: 'Xác định các tài khoản dịch vụ có mật khẩu yếu và cấu hình Kerberos pre-authentication bị tắt.',
    remediation: 'Triển khai Group Managed Service Accounts (gMSA), nâng độ dài mật khẩu SPN lên >25 ký tự và bật Giám sát Event ID 4769.',
    tools: ['Impacket', 'Mimikatz', 'BloodHound', 'Hashcat', 'Active Directory'],
    date: 'Tháng 09, 2025'
  }
];

export const SECURITY_TOOLS: SecurityTool[] = [
  {
    name: 'Burp Suite Professional',
    category: 'Pentesting',
    level: 'Expert',
    description: 'Chặn bắt gói tin HTTP/HTTPS, Repeater, Intruder, phân tích request websockets và phát hiện lỗ hổng web.',
    commandExample: 'burpsuite --project-file=audit.burp'
  },
  {
    name: 'Wazuh & Splunk SIEM',
    category: 'SOC & SIEM',
    level: 'Expert',
    description: 'Giám sát file integrity (FIM), thu thập log syslog, viết truy vấn SPL tìm kiếm bất thường và cấu hình rule cảnh báo.',
    commandExample: 'index=firewall action=blocked | stats count by src_ip | sort -count'
  },
  {
    name: 'Nmap & Masscan',
    category: 'Network',
    level: 'Expert',
    description: 'Quét cổng tốc độ cao, nhận diện phiên bản dịch vụ và chạy kịch bản NSE kiểm tra cấu hình yếu.',
    commandExample: 'nmap -sV -sC -T4 -p- 10.0.4.0/24 -oA network_scan'
  },
  {
    name: 'Wireshark & Tcpdump',
    category: 'Network',
    level: 'Proficient',
    description: 'Bắt gói tin mạng trực tiếp, phân tích luồng TCP handshake, giải mã giao thức và phát hiện tấn công DDoS/Exfiltration.',
    commandExample: 'tcpdump -i eth0 -nn "tcp[tcpflags] & (tcp-syn) != 0 and dst port 80"'
  },
  {
    name: 'Metasploit Framework',
    category: 'Pentesting',
    level: 'Proficient',
    description: 'Khai thác PoC lỗ hổng đã xác nhận, tạo payload meterpreter và kiểm thử khả năng phòng vệ của EDR.',
    commandExample: 'msfconsole -q -x "use exploit/multi/handler; set PAYLOAD ..."'
  },
  {
    name: 'OWASP ZAP & Nuclei',
    category: 'Automation',
    level: 'Expert',
    description: 'Tự động quét lỗ hổng theo template YAML của cộng đồng, tích hợp kiểm thử an ninh vào CI/CD pipeline.',
    commandExample: 'nuclei -u https://target.com -tags cve,auth,exposure -severity high,critical'
  },
  {
    name: 'Python & Bash Automation',
    category: 'Automation',
    level: 'Expert',
    description: 'Tự động hóa crawl endpoints, viết script bruteforce có kiểm soát, phân tích log pcap và kết nối webhook SIEM.',
    commandExample: 'python3 -m soc_bot --parse-zeek /var/log/zeek/conn.log --alert-slack'
  },
  {
    name: 'Linux Hardening & Sysmon',
    category: 'SOC & SIEM',
    level: 'Proficient',
    description: 'Cấu hình iptables/UFW, auditd, Sysmon for Linux và rà soát quyền sudoers chống leo thang đặc quyền.',
    commandExample: 'auditctl -w /etc/shadow -p wa -k identity_changes'
  }
];

export const CERTIFICATIONS = [
  {
    title: 'CompTIA Security+ (SY0-701)',
    issuer: 'CompTIA',
    status: 'Certified / Verified',
    topics: ['Threats, Attacks & Vulnerabilities', 'Security Architecture', 'Operations & Incident Response']
  },
  {
    title: 'eJPT (eLearnSecurity Junior Penetration Tester)',
    issuer: 'INE Security',
    status: 'Practical Hands-on Assessment',
    topics: ['Assessment Methodologies', 'Host & Network Auditing', 'Web App Pentesting']
  },
  {
    title: 'Splunk Core Certified Power User',
    issuer: 'Splunk',
    status: 'Certified',
    topics: ['SPL Searching', 'Knowledge Objects', 'Correlation Searches & Alerts']
  },
  {
    title: 'TryHackMe & HackTheBox Security Ranked',
    issuer: 'TryHackMe / HTB',
    status: 'Top 2% Global Contender',
    topics: ['SOC Analyst Path', 'Junior Pentester Path', 'Active Directory Labs']
  }
];
