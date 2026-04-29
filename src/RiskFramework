const FRAMEWORKS = {

  /* ══════════════════════════════════════════
     CIS Critical Security Controls v8
  ══════════════════════════════════════════ */
  "phishing": {
    id: "phishing",
    label: "Phishing",
    framework: "CIS",
    frameworkFull: "CIS Critical Security Controls v8",
    control: "Control 14 – Security Awareness & Skills Training",
    description: "A fraudulent attempt to trick staff into clicking malicious links or handing over sensitive information, usually via email.",
    howOptions: [
      "Deceptive email with a malicious link",
      "Fake login page used to steal passwords",
      "Malicious file attached to an email",
      "Phone call impersonating a trusted person (vishing)",
      "SMS text message with a malicious link (smishing)"
    ],
    countermeasures: [
      "Run regular phishing awareness training for all staff",
      "Enable multi-factor authentication (MFA) on all accounts",
      "Set up email filtering to block suspicious messages automatically",
      "Use a web filter to prevent access to known malicious websites",
      "Create a simple process for staff to report suspicious emails"
    ]
  },

  "malware": {
    id: "malware",
    label: "Malware",
    framework: "CIS",
    frameworkFull: "CIS Critical Security Controls v8",
    control: "Control 10 – Malware Defences",
    description: "Malicious software that can damage systems, steal data or give attackers control over a device without the user knowing.",
    howOptions: [
      "Staff member opens a malicious email attachment",
      "Infected software downloaded from the internet",
      "Malware installed silently when visiting a compromised website",
      "Malware spread via an infected USB drive",
      "Malware spreading from one device to others on the network"
    ],
    countermeasures: [
      "Install and keep up-to-date antivirus/anti-malware software on all devices",
      "Prevent staff from installing unapproved software",
      "Keep all operating systems and apps patched and updated promptly",
      "Block untrusted scripts and macros from running automatically",
      "Back up all important data regularly and test that it can be restored"
    ]
  },

  "unauthorised-access-cis": {
    id: "unauthorised-access-cis",
    label: "Unauthorised Access",
    framework: "CIS",
    frameworkFull: "CIS Critical Security Controls v8",
    control: "Control 6 – Access Control Management",
    description: "When a person gains access to systems, files or areas they are not permitted to use, often because access controls are too weak.",
    howOptions: [
      "Stolen or guessed login credentials used to log in",
      "Multiple staff sharing the same account or password",
      "A staff member given more access than their job requires",
      "A contractor or third-party account left active after their work ends",
      "Exploiting a software weakness to bypass the login screen"
    ],
    countermeasures: [
      "Only give staff access to systems and data they actually need (least privilege)",
      "Disable accounts immediately when staff leave or change roles",
      "Require strong, unique passwords and enforce MFA on all systems",
      "Review who has access to what on a regular basis",
      "Log and monitor all access attempts to sensitive systems"
    ]
  },

  "data-leakage": {
    id: "data-leakage",
    label: "Data Leakage",
    framework: "CIS",
    frameworkFull: "CIS Critical Security Controls v8",
    control: "Control 3 – Data Protection",
    description: "Sensitive information leaving the organisation without authorisation, whether accidentally or deliberately.",
    howOptions: [
      "Sensitive data emailed to the wrong person by mistake",
      "Confidential files saved on a personal device or USB drive",
      "Data shared using an unauthorised cloud storage service",
      "Printed documents left unattended or thrown away unsafely",
      "An internal document accidentally made public online"
    ],
    countermeasures: [
      "Label all data by sensitivity level and apply clear handling rules",
      "Encrypt sensitive data both when stored and when sent",
      "Use Data Loss Prevention (DLP) tools to detect and block leaks",
      "Train staff on safe data handling and what they must not share",
      "Restrict use of personal email and unapproved cloud services at work"
    ]
  },

  "misconfiguration": {
    id: "misconfiguration",
    label: "Misconfiguration",
    framework: "CIS",
    frameworkFull: "CIS Critical Security Controls v8",
    control: "Control 4 – Secure Configuration of Enterprise Assets & Software",
    description: "Security gaps caused by incorrect settings on systems, devices or software that leave them vulnerable to attack.",
    howOptions: [
      "Default factory passwords left unchanged on devices",
      "Unused ports or services left switched on and exposed",
      "Firewall rules that are too permissive",
      "Software that has not been updated or patched",
      "Cloud storage or databases accidentally made publicly accessible"
    ],
    countermeasures: [
      "Apply a secure, approved configuration to all devices and systems from the start",
      "Turn off or remove any services and ports that are not needed",
      "Run regular vulnerability scans and apply patches quickly",
      "Use automated tools to check and enforce correct settings",
      "Regularly review cloud service settings to check nothing is publicly exposed"
    ]
  },

  /* ══════════════════════════════════════════
     NIST SP 800-53 Rev. 5
  ══════════════════════════════════════════ */
  "ransomware": {
    id: "ransomware",
    label: "Ransomware",
    framework: "NIST",
    frameworkFull: "NIST SP 800-53 Rev. 5",
    control: "IR-4 – Incident Handling / SI-3 – Malicious Code Protection",
    description: "A type of attack where criminals encrypt an organisation's files and demand payment to unlock them, often causing serious disruption.",
    howOptions: [
      "Ransomware delivered through a phishing email",
      "Attackers exploiting Remote Desktop software (RDP) left exposed",
      "Malicious file downloaded from a compromised website",
      "Ransomware spreading across the internal network from one infected device",
      "A targeted Ransomware-as-a-Service (RaaS) attack by a criminal group"
    ],
    countermeasures: [
      "Keep regular, tested backups stored offline and away from the main network",
      "Create and practise an incident response plan so staff know what to do",
      "Disable Remote Desktop (RDP) if not needed; use a VPN with MFA if it is",
      "Segment the network so ransomware cannot spread easily between systems",
      "Deploy endpoint detection tools (EDR) to spot unusual behaviour early"
    ]
  },

  "insider-threat": {
    id: "insider-threat",
    label: "Insider Threat",
    framework: "NIST",
    frameworkFull: "NIST SP 800-53 Rev. 5",
    control: "PS-7 – External Personnel Security / AC-2 – Account Management",
    description: "A security risk that comes from within the organisation, such as a current or former employee, contractor or partner misusing their access.",
    howOptions: [
      "A disgruntled employee intentionally stealing or deleting data",
      "A staff member misusing their privileged system access",
      "A contractor who still has active access after their contract ends",
      "An employee leaking confidential information to a competitor",
      "A negligent staff member accidentally exposing sensitive data"
    ],
    countermeasures: [
      "Remove system access immediately when a staff member leaves or changes role",
      "Monitor the activity of users with privileged access and flag anything unusual",
      "Ensure no single person can complete a sensitive action alone (separation of duties)",
      "Carry out background checks on staff who handle sensitive information",
      "Provide a confidential way for staff to report concerns about colleagues"
    ]
  },

  "unauthorised-access-nist": {
    id: "unauthorised-access-nist",
    label: "Unauthorised Access",
    framework: "NIST",
    frameworkFull: "NIST SP 800-53 Rev. 5",
    control: "AC-3 – Access Enforcement / IA-2 – Identification & Authentication",
    description: "Gaining access to systems or data without permission, often by exploiting poor authentication practices.",
    howOptions: [
      "Exploiting a weak or reused password",
      "Using a stolen login session token to bypass the password screen",
      "Accessing a workstation that was left logged in and unattended",
      "Exploiting a software vulnerability to gain higher-level access",
      "Logging in with a former employee's account that was never disabled"
    ],
    countermeasures: [
      "Enable MFA on all systems, especially those accessed remotely",
      "Set screens to lock automatically after a short period of inactivity",
      "Use an identity and access management (IAM) system to control access centrally",
      "Review privileged accounts regularly and remove any that are no longer needed",
      "Set up alerts for unusual login times, locations or repeated failures"
    ]
  },

  "social-engineering": {
    id: "social-engineering",
    label: "Social Engineering",
    framework: "NIST",
    frameworkFull: "NIST SP 800-53 Rev. 5",
    control: "AT-2 – Literacy Training & Awareness / AT-3 – Role-Based Training",
    description: "Manipulating staff through conversation or deception to get them to hand over information, access or money.",
    howOptions: [
      "Someone pretending to be IT support and asking for a password",
      "A caller creating a convincing fake story to gain trust (pretexting)",
      "Leaving infected USB drives in public areas hoping staff will plug them in (baiting)",
      "Following a staff member through a secure door without scanning in (tailgating)",
      "An email pretending to be from a senior manager authorising an urgent payment (CEO fraud)"
    ],
    countermeasures: [
      "Train staff to always verify who they are speaking to before sharing any information",
      "Set clear procedures for password resets and access requests that cannot be bypassed over the phone",
      "Run regular simulated social engineering tests to see how staff respond",
      "Make it clear what IT staff will never ask for (e.g. passwords)",
      "Build a culture where staff feel safe questioning suspicious requests, even from managers"
    ]
  },

  "physical-breach": {
    id: "physical-breach",
    label: "Physical Security Breach",
    framework: "NIST",
    frameworkFull: "NIST SP 800-53 Rev. 5",
    control: "PE-3 – Physical Access Control / PE-6 – Monitoring Physical Access",
    description: "An unauthorised person gaining physical access to the workplace, devices or documents containing sensitive information.",
    howOptions: [
      "Slipping through a secure door behind an authorised person (tailgating)",
      "A laptop or mobile phone stolen from a desk or a bag",
      "A staff member leaving their workstation unlocked and unattended",
      "A visitor or contractor accessing a restricted area without supervision",
      "Sensitive documents left on a desk, in a bin or on a printer"
    ],
    countermeasures: [
      "Use keycards or PIN access on all areas that contain sensitive equipment or data",
      "Require all visitors to sign in, wear a badge and be accompanied at all times",
      "Train staff to politely challenge anyone they do not recognise in secure areas",
      "Enforce a clear desk policy — no sensitive documents left visible when away from the desk",
      "Encrypt all laptops and mobile devices so data is protected if a device is stolen"
    ]
  },

  /* ══════════════════════════════════════════
     MITRE ATT&CK
  ══════════════════════════════════════════ */
  "phishing-mitre": {
    id: "phishing-mitre",
    label: "Phishing",
    framework: "MITRE",
    frameworkFull: "MITRE ATT&CK",
    control: "T1566 – Phishing",
    description: "Attackers send malicious messages targeting specific individuals to steal credentials, deliver malware or gain a foothold in the organisation.",
    howOptions: [
      "Spear phishing email crafted to target a specific person or team",
      "A link leading to a fake login page designed to steal credentials",
      "A malicious attachment sent via email (T1566.001)",
      "Phishing via social media platforms such as LinkedIn or WhatsApp",
      "Watering hole attack — compromising a trusted website that staff regularly visit"
    ],
    countermeasures: [
      "Use an email gateway with sandboxing to detect and block malicious messages",
      "Set up DMARC, DKIM and SPF email authentication records to prevent spoofing",
      "Train staff to hover over links to check the real destination before clicking",
      "Use browser isolation for browsing activity that carries higher risk",
      "Monitor for staff credentials being exposed or sold on dark web forums"
    ]
  },

  "brute-force": {
    id: "brute-force",
    label: "Brute Force Attack",
    framework: "MITRE",
    frameworkFull: "MITRE ATT&CK",
    control: "T1110 – Brute Force",
    description: "Attackers use automated tools to repeatedly try different passwords until they find the right one and gain access to an account.",
    howOptions: [
      "Automated tool trying thousands of passwords against a login page",
      "Using a list of real usernames and passwords leaked in a previous data breach (credential stuffing)",
      "Trying a long list of common words as passwords (dictionary attack)",
      "Trying one very common password against thousands of accounts (password spraying)",
      "Targeting an internet-facing remote desktop or VPN login page"
    ],
    countermeasures: [
      "Lock accounts after a set number of failed login attempts",
      "Require passwords to be strong, complex and not reused across different services",
      "Enable MFA on all internet-facing services and applications",
      "Set up alerts for repeated failed login attempts on any account",
      "Add a CAPTCHA to all public-facing login pages"
    ]
  },

  "mitm": {
    id: "mitm",
    label: "Man-in-the-Middle Attack",
    framework: "MITRE",
    frameworkFull: "MITRE ATT&CK",
    control: "T1557 – Adversary-in-the-Middle",
    description: "An attacker secretly positions themselves between two parties to intercept, read or alter their communications without either person knowing.",
    howOptions: [
      "Intercepting traffic on an unsecured public Wi-Fi network",
      "ARP spoofing to redirect network traffic through an attacker's device",
      "Stripping the secure HTTPS connection and downgrading it to HTTP",
      "Redirecting users to a fake website by hijacking DNS settings",
      "Setting up a rogue Wi-Fi hotspot that mimics a legitimate network (evil twin)"
    ],
    countermeasures: [
      "Enforce HTTPS on all websites and internal tools — never allow plain HTTP",
      "Require all staff to connect via a VPN when working remotely or on public Wi-Fi",
      "Enable HTTP Strict Transport Security (HSTS) to prevent SSL stripping",
      "Use network monitoring to detect unusual ARP activity on the internal network",
      "Educate staff on the dangers of public Wi-Fi and using personal hotspots instead"
    ]
  },

  "removable-media": {
    id: "removable-media",
    label: "Removable Media",
    framework: "MITRE",
    frameworkFull: "MITRE ATT&CK",
    control: "T1091 – Replication Through Removable Media",
    description: "Malware or unauthorised data transfers carried out via USB drives, external hard drives or other removable storage devices.",
    howOptions: [
      "An infected USB drive plugged into a work device",
      "Malware set to run automatically when media is inserted (autorun)",
      "A staff member using a personal USB drive on an office computer",
      "Sensitive data copied onto a USB drive and taken off site",
      "An attacker deliberately leaving infected USB drives in the car park or reception"
    ],
    countermeasures: [
      "Disable autorun and autoplay for all removable media on every device",
      "Block or restrict the use of personal USB drives through group policy settings",
      "Automatically scan all removable media for malware before allowing access",
      "Only permit the use of encrypted, organisation-issued USB drives",
      "Train all staff never to plug in a USB drive they found or were given unexpectedly"
    ]
  },

  "supply-chain": {
    id: "supply-chain",
    label: "Supply Chain Attack",
    framework: "MITRE",
    frameworkFull: "MITRE ATT&CK",
    control: "T1195 – Supply Chain Compromise",
    description: "Attackers compromise a supplier, software update or piece of hardware to gain access to the target organisation indirectly.",
    howOptions: [
      "A software update containing hidden malicious code pushed to all users",
      "Malicious code injected into an open-source software library the organisation uses",
      "Tampered hardware or firmware delivered by a third-party supplier",
      "A third-party vendor with access to the organisation's systems being compromised",
      "A malicious browser extension or plugin installed by a staff member"
    ],
    countermeasures: [
      "Assess and regularly review the security practices of all third-party suppliers",
      "Verify the integrity of software updates before applying them across the organisation",
      "Apply least privilege to all third-party integrations — limit what they can access",
      "Maintain a list of all software and libraries in use (software bill of materials)",
      "Monitor network traffic for unusual or unexpected communications with external services"
    ]
  }

};
