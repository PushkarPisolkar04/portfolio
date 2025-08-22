// Portfolio Data
const portfolioData = {
    personal: {
        name: "Pushkar Pisolkar",
        role: "Final Year Computer Engineering Student",
        location: "India",
        status: "Active",
        focus: "Cybersecurity",
        education: "B.Tech in Computer Engineering",
        current: "Student",
        email: "pushkarppisolkar@gmail.com",
        github: "https://github.com/PushkarPisolkar04",
        linkedin: "https://linkedin.com/in/pushkar-pisolkar",
        portfolio: "https://whois-pushkar.vercel.app",
        resume: "https://drive.google.com/file/d/1H0396vYliUi_zuVjAwCTk7CK6Un1l_E4/view?usp=sharing"
    },

    about: {
        summary: "Computer Engineering student specializing in Cybersecurity with interest in Full-Stack and Mobile Development. Proven ability to build secure, innovative applications through 3+ major projects including a secure e-voting system and vulnerability scanner. Gold Medallist at state-level Aavishkar innovation competition.",
        strengths: [
            "Cybersecurity & Ethical Hacking",
            "Penetration Testing & Vulnerability Assessment",
            "Problem-solving and analytical thinking",
            "Secure Application Development",
            "Team Collaboration"
        ],
        interests: [
            "Cybersecurity",
            "Full-Stack Development",
            "Mobile Development",
            "Cloud Computing (AWS)",
            "DevOps"
        ]
    },

    education: [
        {
            degree: "B.Tech in Computer Engineering",
            institution: "Bajaj Institute of Technology, Wardha",
            duration: "2022–2026",
            cgpa: "7.23",
            focus: "Cybersecurity"
        },
        {
            degree: "Higher Secondary Education",
            institution: "Sudhakar Naik College, Akola",
            board: "Maharashtra State Board",
            year: "2022",
            percentage: "82%"
        },
        {
            degree: "Secondary School Education",
            institution: "School of Scholars, Akola",
            board: "CBSE",
            year: "2020",
            percentage: "95.6%",
            achievement: "100/100 in Mathematics"
        }
    ],

    skills: {
        programming: ["Python", "Java", "C++", "JavaScript", "TypeScript", "Dart", "SQL"],
        web: {
            frontend: ["React.js", "HTML5", "CSS3", "TailwindCSS", "Chakra UI"],
            backend: ["Node.js", "Express.js", "JWT", "RESTful APIs"],
            fullstack: ["Full Stack Development", "Vite", "npm/yarn"]
        },
        app: ["Flutter", "Dart", "Firebase", "Google APIs"],
        database: ["MySQL", "Firebase Firestore", "Supabase (PostgreSQL)", "MongoDB"],
        cybersecurity: [
            "Penetration Testing",
            "Vulnerability Assessment",
            "Nmap",
            "Burp Suite",
            "Metasploit",
            "Ethical Hacking",
            "OWASP Top 10",
            "Security Incident Response",
            "Cisco Junior Cybersecurity Analyst"
        ],
        cloud: [
            "AWS Cloud Foundations",
            "AWS Services (Learning)",
            "Cloud Security",
            "Firebase",
            "Supabase"
        ],
        devops: [
            "Git & GitHub",
            "Docker (Basic)",
            "CI/CD (GitHub Actions)",
            "Version Control"
        ],
        tools: [
            "Figma",
            "API Testing (Postman)",
            "Game Development (Basic)"
        ]
    },

    projects: [
        {
            name: "Cryptonix",
            status: "In Progress",
            description: "Vulnerability Scanner & Penetration Testing Tool",
            techStack: ["Python", "Nmap", "Burp Suite", "Shodan", "Exploit-DB"],
            features: [
                "Command-line toolkit for security professionals",
                "Automates vulnerability discovery and assessment",
                "Integrates 3+ industry-standard utilities",
                "Accelerates initial security audits"
            ],
            image: "assets/images/cryptonix.png",
            github: "https://github.com/PushkarPisolkar04/cryptonix",
            live: null
        },
        {
            name: "eMatdaan",
            description: "Secure Organizational Voting Platform",
            techStack: ["React.js", "TypeScript", "Node.js", "Express.js", "Supabase (PostgreSQL)", "TailwindCSS", "Vite", "Nodemailer", "JWT"],
            features: [
                "Full-stack digital voting platform",
                "End-to-end encryption and digital signatures",
                "Complete voter anonymity",
                "Designed for organizational elections"
            ],
            image: "assets/images/ematdaan.png",
            github: "https://github.com/PushkarPisolkar04/ematdaan",
            live: "https://ematdaan.vercel.app/"
        },
        {
            name: "IPlay",
            description: "Gamified IPR Awareness Application",
            techStack: ["Flutter", "Dart", "Firebase"],
            features: [
                "Award-winning mobile app",
                "7 interactive games for IPR learning",
                "Teaches complex concepts in engaging way",
                "Designed for students"
            ],
            image: "assets/images/iplay.png",
            github: "https://github.com/PushkarPisolkar04/iplay",
            live: null
        },
        {
            name: "ByteMe",
            description: "Universal Data Converter",
            techStack: ["React.js", "Node.js", "Express.js", "Vite"],
            features: [
                "60+ different data formats and number systems",
                "Binary, hexadecimal, decimal, octal conversions",
                "IEEE 754 floating point, Base64/32, Hamming codes",
                "Real-time conversion with configurable precision"
            ],
            image: "assets/images/bytime.png",
            github: "https://github.com/PushkarPisolkar04/ByteMe",
            live: null
        }
    ],

    certifications: [
        {
            name: "Cisco Junior Cybersecurity Analyst Career Path",
            year: "2024"
        },
        {
            name: "Google Cybersecurity Professional Certificate",
            year: "2024"
        },
        {
            name: "IBM Cybersecurity Certification",
            year: "2023"
        },
        {
            name: "Python Essentials – Cisco Networking Academy",
            year: "2024"
        },
        {
            name: "AWS Cloud Foundations (In Progress)",
            year: "2024"
        },
        {
            name: "HTML, CSS, JS for Web Developers – Coursera",
            year: "2023"
        },
        {
            name: "Figma UI/UX Design – Value Added Program",
            year: "2023"
        }
    ],

    experience: [
        {
            role: "Cybersecurity Intern",
            company: "Sure Trust ProEd",
            duration: "Dec 2024 – June 2025 (6 months)",
            description: [
                "Completed comprehensive training program on industry-standard cybersecurity practices and tools",
                "Conducted end-to-end VAPT on 32+ IPs and web applications (e.g., DVWA, bWAPP)",
                "Identified multiple CVEs and generated structured remediation reports",
                "Gained hands-on experience with penetration testing methodologies"
            ]
        }
    ],

    achievements: [
        {
            title: "Gold Medalist (Zonal) – Aavishkar",
            details: "State-level innovation competition",
            year: "2024"
        },
        {
            title: "Semi-Finalist – Flipkart Grid 6.0",
            details: "National software development hackathon hosted by Flipkart",
            year: "2024"
        },
        {
            title: "100/100 in CBSE Class 10 Mathematics",
            year: "2020"
        }
    ],

    languages: [
        {
            name: "Marathi",
            proficiency: "Native"
        },
        {
            name: "Hindi",
            proficiency: "Professional"
        },
        {
            name: "English",
            proficiency: "Professional"
        }
    ]
}; 