// Terminal commands
const commands = {
    help: () => {
        return `Available commands:
help - Show this help message
whoami - Display user information
ls - List files and directories
cd - Change directory
cat - Display file contents
clear - Clear terminal
date - Show current date and time
echo - Display a line of text
pwd - Print working directory
projects - List all projects
skills - Show technical skills
contact - Display contact information
about - Show about me information
github - Open GitHub profile
linkedin - Open LinkedIn profile
resume - View resume
education - Show educational background
certifications - List certifications
achievements - Show achievements
languages - Show language proficiencies`;
    },

    whoami: () => {
        return `User Information:
Name: ${portfolioData.personal.name}
Role: ${portfolioData.personal.role}
Location: ${portfolioData.personal.location}
Status: ${portfolioData.personal.status}
Focus: ${portfolioData.personal.focus}
Education: ${portfolioData.personal.education}
Current: ${portfolioData.personal.current}`;
    },

    ls: () => `projects/
resume/
skills/
about/
education/
certifications/
achievements/
contact.txt
languages.txt
README.md
github.txt
linkedin.txt`,

    cd: (dir) => {
        if (!dir) return 'Please specify a directory';
        if (dir === 'secret') {
            triggerMatrixRain();
            return 'Access denied. Initiating security protocol...';
        }
        return `Changed directory to ${dir}`;
    },

    cat: (args) => {
        if (!args[0]) return 'Usage: cat <filename>';
        
        const file = args[0].toLowerCase();
        switch(file) {
            case 'resume.txt':
                return `Resume Information:
Name: ${portfolioData.personal.name}
Role: ${portfolioData.personal.role}
Contact: ${portfolioData.personal.email} | ${portfolioData.personal.phone}

Experience:
${portfolioData.personal.current}

Education:
${portfolioData.education.map(edu => 
    `${edu.degree} - ${edu.institution} (${edu.duration || edu.year})`
).join('\n')}

Skills:
${Object.entries(portfolioData.skills).map(([category, skills]) => 
    `${category}: ${Array.isArray(skills) ? skills.join(', ') : 
        Object.entries(skills).map(([subcat, items]) => 
            `${subcat}: ${items.join(', ')}`
        ).join('\n')}`
).join('\n')}`;

            case 'projects.txt':
            case 'skills.txt':
            case 'education.txt':
            case 'certifications.txt':
            case 'achievements.txt':
            case 'contact.txt':
            case 'about.txt':
            case 'languages.txt':
                // Read from the actual file
                return fetch(`assets/files/${file}`)
                    .then(response => response.text())
                    .catch(error => `Error reading file: ${error}`);

            case 'github.txt':
                return `GitHub Profile:
Username: ${portfolioData.personal.github.split('/').pop()}
URL: ${portfolioData.personal.github}

Projects:
${portfolioData.projects.map(project => 
    `• ${project.name}${project.status ? ` (${project.status})` : ''}`
).join('\n')}`;

            case 'linkedin.txt':
                return `LinkedIn Profile:
URL: ${portfolioData.personal.linkedin}

Current Position: ${portfolioData.personal.current}
Education: ${portfolioData.personal.education}
Location: ${portfolioData.personal.location}`;

            case 'readme.md':
                return `# ${portfolioData.personal.name}'s Portfolio

## About
${portfolioData.about.summary}

## Skills
${Object.entries(portfolioData.skills).map(([category, skills]) => 
    `### ${category}
${Array.isArray(skills) ? skills.join(', ') : 
    Object.entries(skills).map(([subcat, items]) => 
        `${subcat}: ${items.join(', ')}`
    ).join('\n')}`
).join('\n\n')}

## Contact
Email: ${portfolioData.personal.email}
Phone: ${portfolioData.personal.phone}
GitHub: ${portfolioData.personal.github}
LinkedIn: ${portfolioData.personal.linkedin}`;

            default:
                return `File not found: ${file}`;
        }
    },

    projects: () => {
        return `Featured Projects:
${portfolioData.projects.map(project => 
    `• ${project.name}${project.status ? ` (${project.status})` : ''}
  Description: ${project.description}
  Tech Stack: ${project.techStack ? project.techStack.join(', ') : 'N/A'}
  Features: ${project.features.join(', ')}`
).join('\n\n')}`;
    },

    skills: () => {
        return `Technical Skills Overview:
Programming Languages: ${portfolioData.skills.programming.join(', ')}

Web Development:
Frontend: ${portfolioData.skills.web.frontend.join(', ')}
Backend: ${portfolioData.skills.web.backend.join(', ')}
Full Stack: ${portfolioData.skills.web.fullstack.join(', ')}

App Development: ${portfolioData.skills.app.join(', ')}
Database: ${portfolioData.skills.database.join(', ')}

Cybersecurity: ${portfolioData.skills.cybersecurity.join(', ')}

Tools & Technologies: ${portfolioData.skills.tools.join(', ')}`;
    },

    contact: () => {
        return `Contact Information:
Email: ${portfolioData.personal.email}
Phone: ${portfolioData.personal.phone}
GitHub: ${portfolioData.personal.github}
LinkedIn: ${portfolioData.personal.linkedin}`;
    },

    about: () => {
        return `About Me:
${portfolioData.about.summary}

Key Strengths:
${portfolioData.about.strengths.map(strength => `• ${strength}`).join('\n')}

Interests:
${portfolioData.about.interests.map(interest => `• ${interest}`).join('\n')}`;
    },

    education: () => {
        return `Educational Background:
${portfolioData.education.map(edu => 
    `• ${edu.degree}
  Institution: ${edu.institution}
  ${edu.duration ? `Duration: ${edu.duration}` : `Year: ${edu.year}`}
  ${edu.cgpa ? `CGPA: ${edu.cgpa}` : ''}
  ${edu.percentage ? `Percentage: ${edu.percentage}` : ''}
  ${edu.achievement ? `Achievement: ${edu.achievement}` : ''}`
).join('\n\n')}`;
    },

    certifications: () => {
        return `Certifications:
${portfolioData.certifications.map(cert => 
    `• ${cert.name} (${cert.year})`
).join('\n')}`;
    },

    achievements: () => {
        return `Achievements:
${portfolioData.achievements.map(achievement => 
    `• ${achievement.title}${achievement.details ? ` - ${achievement.details}` : ''} (${achievement.year})`
).join('\n')}`;
    },

    languages: () => {
        return `Language Proficiencies:
${portfolioData.languages.map(lang => 
    `• ${lang.name}: ${lang.proficiency}`
).join('\n')}`;
    },

    github: () => {
        window.open(portfolioData.personal.github, '_blank');
        return 'Opening GitHub profile...';
    },

    linkedin: () => {
        window.open(portfolioData.personal.linkedin, '_blank');
        return 'Opening LinkedIn profile...';
    },

    resume: () => {
        // Check if it's a Google Drive link
        if (portfolioData.personal.resume.includes('drive.google.com')) {
            window.open(portfolioData.personal.resume, '_blank');
            return 'Opening resume from Google Drive...';
        } else {
            // Fallback to local file
            window.open(portfolioData.personal.resume, '_blank');
            return 'Opening resume...';
        }
    },

    clear: () => {
        terminalOutput.innerHTML = '';
        return '';
    },

    matrix: () => {
        triggerMatrixRain();
        return 'Matrix mode activated. System compromised.';
    },

    hack: () => {
        const hackerbot = document.createElement('div');
        hackerbot.className = 'hackerbot';
        document.body.appendChild(hackerbot);
        
        setTimeout(() => {
            hackerbot.remove();
            return 'Hacking sequence completed. System vulnerable.';
        }, 3000);
        
        return 'Initiating hacking sequence...';
    },

    sudo: (command) => {
        if (!command) return 'Please specify a command to run as superuser';
        if (command === 'rm -rf /') {
            triggerMatrixRain();
            return 'Access denied. Initiating security protocol...';
        }
        
        // Execute the command that follows sudo
        const [cmd, ...args] = command.toLowerCase().split(' ');
        if (commands[cmd]) {
            const result = commands[cmd](...args);
            return `[sudo] Executing: ${command}\n${result}`;
        } else {
            return `[sudo] Command not found: ${cmd}. Type 'help' for available commands.`;
        }
    },

    neofetch: () => `OS: Kali Linux Portfolio
Host: ctrlalthack
Kernel: 5.15.0-kali3-amd64
Shell: /bin/bash
Terminal: xterm-256color
CPU: Intel i7-10700K
Memory: 16GB
Theme: Dark
Icons: Font Awesome
Resolution: 1920x1080`,

    date: () => new Date().toLocaleString(),

    echo: (...args) => args.join(' '),

    pwd: () => '/home/root/portfolio'
};

// Terminal functionality
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

// Add command history and autocomplete
let commandHistory = [];
let currentHistoryIndex = -1;
const availableCommands = Object.keys(commands);

// Add command separator
function addCommandSeparator() {
    const separator = document.createElement('div');
    separator.className = 'command-separator';
    terminalOutput.appendChild(separator);
}

// Create prompt
function createPrompt() {
    const prompt = document.createElement('div');
    prompt.className = 'terminal-line';
    prompt.innerHTML = '<span class="prompt">root@kali$</span>';
    return prompt;
}

// Handle tab completion
function handleTabCompletion(input) {
    const partial = input.toLowerCase();
    const matches = availableCommands.filter(cmd => cmd.startsWith(partial));
    
    if (matches.length === 1) {
        terminalInput.value = matches[0];
        terminalInput.setSelectionRange(matches[0].length, matches[0].length);
    } else if (matches.length > 1) {
        // Show all possible matches in a single line
        const output = document.createElement('div');
        output.className = 'terminal-line';
        output.textContent = matches.join('  ');
        terminalOutput.appendChild(output);
    }
}

// Handle command history navigation
function handleHistoryNavigation(direction) {
    if (commandHistory.length === 0) return;
    
    if (direction === 'up') {
        if (currentHistoryIndex < commandHistory.length - 1) {
            currentHistoryIndex++;
        }
    } else {
        if (currentHistoryIndex > 0) {
            currentHistoryIndex--;
        } else {
            currentHistoryIndex = -1;
            terminalInput.value = '';
            return;
        }
    }
    
    terminalInput.value = commandHistory[currentHistoryIndex];
    terminalInput.setSelectionRange(terminalInput.value.length, terminalInput.value.length);
}

terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        handleTabCompletion(terminalInput.value);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleHistoryNavigation('up');
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleHistoryNavigation('down');
    }
});

terminalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const command = terminalInput.value.trim();
        if (command) {
            // Add command to history
            commandHistory.unshift(command);
            currentHistoryIndex = -1;
            
            // Add command separator
            addCommandSeparator();
            
            // Create command line with prompt
            const commandLine = document.createElement('div');
            commandLine.className = 'terminal-line';
            commandLine.innerHTML = `<span class="prompt">root@kali$</span> ${command}`;
            terminalOutput.appendChild(commandLine);
            
            // Execute command
            const [cmd, ...args] = command.toLowerCase().split(' ');
            if (commands[cmd]) {
                const result = commands[cmd](...args);
                if (result) {
                    const output = document.createElement('div');
                    output.className = 'terminal-line';
                    output.textContent = result;
                    terminalOutput.appendChild(output);
                }
            } else if (cmd) {
                const output = document.createElement('div');
                output.className = 'terminal-line';
                output.textContent = `Command not found: ${cmd}. Type 'help' for available commands.`;
                terminalOutput.appendChild(output);
            }
            
            // Clear input
            terminalInput.value = '';
            
            // Scroll to bottom with smooth animation
            terminalOutput.scrollTo({
                top: terminalOutput.scrollHeight,
                behavior: 'smooth'
            });
        }
    }
});

// Window management
function makeDraggable(element) {
    const header = element.querySelector('.terminal-header, .explorer-header');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        if (e.target === header) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            setTranslate(currentX, currentY, element);
        }
    }

    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
}

// Initialize draggable windows
document.querySelectorAll('.terminal-window, .file-explorer').forEach(makeDraggable);

// Window controls
function openWindow(windowId) {
    const window = document.getElementById(`${windowId}-window`);
    if (window) {
        window.style.display = 'block';
        bringToFront(windowId);
        updateTaskbar(windowId);
    }
}

function minimizeWindow(windowId) {
    const window = document.getElementById(`${windowId}-window`);
    if (window) {
        window.style.display = 'none';
        updateTaskbar(windowId);
    }
}

function maximizeWindow(windowId) {
    const window = document.getElementById(`${windowId}-window`);
    if (window) {
        if (window.style.width === '100%') {
            window.style.width = '800px';
            window.style.height = '500px';
        } else {
            window.style.width = '100%';
            window.style.height = '100%';
        }
    }
}

function closeWindow(windowId) {
    const window = document.getElementById(`${windowId}-window`);
    if (window) {
        window.style.display = 'none';
        removeFromTaskbar(windowId);
    }
}

// Taskbar management
function updateTaskbar(windowId) {
    const taskbarCenter = document.querySelector('.taskbar-center');
    const existingItem = taskbarCenter.querySelector(`[data-window="${windowId}"]`);
    
    if (!existingItem) {
        const taskbarItem = document.createElement('div');
        taskbarItem.className = 'taskbar-item';
        taskbarItem.setAttribute('data-window', windowId);
        taskbarItem.onclick = () => openWindow(windowId);
        
        const icon = document.createElement('i');
        icon.className = getWindowIcon(windowId);
        taskbarItem.appendChild(icon);
        
        taskbarCenter.appendChild(taskbarItem);
    }
}

function removeFromTaskbar(windowId) {
    const taskbarItem = document.querySelector(`.taskbar-item[data-window="${windowId}"]`);
    if (taskbarItem) {
        taskbarItem.remove();
    }
}

function getWindowIcon(windowId) {
    const icons = {
        terminal: 'fas fa-terminal',
        files: 'fas fa-folder',
        projects: 'fas fa-code',
        skills: 'fas fa-tools',
        contact: 'fas fa-envelope',
        settings: 'fas fa-cog'
    };
    return icons[windowId] || 'fas fa-window-maximize';
}

// Start menu
function toggleStartMenu() {
    const startMenu = document.querySelector('.start-menu');
    startMenu.style.display = startMenu.style.display === 'none' ? 'block' : 'none';
}

// Matrix rain effect
function triggerMatrixRain() {
    const canvas = document.querySelector('.matrix-rain');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = canvas.classList;
    matrix.add('active');
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const interval = setInterval(draw, 33);
    
    setTimeout(() => {
        clearInterval(interval);
        matrix.remove('active');
    }, 5000);
}

// Auto boot functionality
function autoBoot() {
    const bootLines = document.querySelectorAll('.boot-line');
    bootLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
        }, index * 500);
    });

    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('desktop').style.display = 'block';
        showNotification('System booted successfully');
    }, 2500);
}

// Call autoBoot when page loads
document.addEventListener('DOMContentLoaded', autoBoot);

// Shutdown functionality
function showShutdownDialog() {
    const dialog = document.querySelector('.shutdown-dialog');
    dialog.style.display = 'block';
}

function hideShutdownDialog() {
    const dialog = document.querySelector('.shutdown-dialog');
    dialog.style.display = 'none';
}

function triggerShutdown() {
    triggerMatrixRain();
    
    setTimeout(() => {
        document.getElementById('desktop').style.display = 'none';
        document.getElementById('splash-screen').style.display = 'flex';
        hideShutdownDialog();
        autoBoot();
    }, 3000);
}

// Sound effects
function playSound(type) {
    const sounds = {
        login: 'assets/sounds/login.mp3',
        error: 'assets/sounds/error.mp3',
        shutdown: 'assets/sounds/shutdown.mp3'
    };
    
    if (sounds[type]) {
        const audio = new Audio(sounds[type]);
        audio.play().catch(() => {
            console.log('Sound playback prevented by browser');
        });
    }
}

// Add styled content display function
function displayStyledContent(title, content, icon) {
    const windowId = `content-${title.toLowerCase().replace(/\s+/g, '-')}`;
    
    if (!document.getElementById(`${windowId}-window`)) {
        const window = document.createElement('div');
        window.id = `${windowId}-window`;
        window.className = 'terminal-window content-window';
        window.innerHTML = `
            <div class="terminal-header">
                <div class="terminal-title">
                    <i class="${icon}" style="color: var(--kali-purple);"></i>
                    <span>${title}</span>
                </div>
                <div class="terminal-controls">
                    <div class="terminal-control minimize" onclick="minimizeWindow('${windowId}')"></div>
                    <div class="terminal-control maximize" onclick="maximizeWindow('${windowId}')"></div>
                    <div class="terminal-control close" onclick="closeWindow('${windowId}')"></div>
                </div>
            </div>
            <div class="terminal-content styled-content">
                ${content}
            </div>
        `;
        document.body.appendChild(window);
        makeDraggable(window);
    }
    
    openWindow(windowId);
    bringToFront(windowId);
}

// Update file handling
function openFile(filename) {
    const file = filename.toLowerCase();
    if (file === 'resume.pdf') {
        // Use Google Drive link from portfolioData
        window.open(portfolioData.personal.resume, '_blank');
        return;
    }
    
    // Generate content dynamically based on file type
    const fileType = file.replace('.txt', '');
    let content = '';
    let icon = '';
    
    switch(fileType) {
        case 'projects':
            content = formatProjects(portfolioData.projects);
            icon = 'fas fa-code';
            break;
        case 'skills':
            content = formatSkills(portfolioData.skills);
            icon = 'fas fa-brain';
            break;
        case 'education':
            content = formatEducation(portfolioData.education);
            icon = 'fas fa-graduation-cap';
            break;
        case 'certifications':
            content = formatCertifications(portfolioData.certifications);
            icon = 'fas fa-certificate';
            break;
        case 'achievements':
            content = formatAchievements(portfolioData.achievements);
            icon = 'fas fa-trophy';
            break;
        case 'contact':
            content = formatContact(portfolioData.personal);
            icon = 'fas fa-address-card';
            break;
        case 'about':
            content = formatAbout(portfolioData.about);
            icon = 'fas fa-user';
            break;
        case 'languages':
            content = formatLanguages(portfolioData.languages);
            icon = 'fas fa-language';
            break;
        default:
            content = 'File not found';
            icon = 'fas fa-file-alt';
    }
    
    displayStyledContent(fileType.charAt(0).toUpperCase() + fileType.slice(1), content, icon);
}

// Content formatting functions
function formatProjects(projects) {
    return `
        <div class="projects-grid">
            ${projects.map(project => `
                <div class="project-card">
                    <h3>${project.name}${project.status ? ` (${project.status})` : ''}</h3>
                    <div class="project-details">
                        ${project.description ? `<p>${project.description}</p>` : ''}
                        ${project.techStack ? `<p>Tech Stack: ${project.techStack.join(', ')}</p>` : ''}
                        ${project.features ? `<p>Features: ${project.features.join(', ')}</p>` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function formatSkills(skills) {
    return `
        <div class="skills-container">
            ${Object.entries(skills).map(([category, categorySkills]) => `
                <div class="skills-section">
                    <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                    <div class="skills-grid">
                        ${Array.isArray(categorySkills) 
                            ? categorySkills.map(skill => `
                                <div class="skill-item">
                                    <i class="fas fa-check"></i>
                                    <span>${skill}</span>
                                </div>
                            `).join('')
                            : Object.entries(categorySkills).map(([subcat, items]) => `
                                <div class="skill-subcategory">
                                    <h4>${subcat.charAt(0).toUpperCase() + subcat.slice(1)}</h4>
                                    ${items.map(item => `
                                        <div class="skill-item">
                                            <i class="fas fa-check"></i>
                                            <span>${item}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            `).join('')
                        }
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function formatEducation(education) {
    return `
        <div class="education-timeline">
            ${education.map(edu => `
                <div class="education-card">
                    <h3>${edu.degree}</h3>
                    <div class="education-details">
                        ${edu.institution ? `<p>Institution: ${edu.institution}</p>` : ''}
                        ${edu.duration ? `<p>Duration: ${edu.duration}</p>` : edu.year ? `<p>Year: ${edu.year}</p>` : ''}
                        ${edu.cgpa ? `<p>CGPA: ${edu.cgpa}</p>` : ''}
                        ${edu.percentage ? `<p>Percentage: ${edu.percentage}</p>` : ''}
                        ${edu.achievement ? `<p>Achievement: ${edu.achievement}</p>` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function formatCertifications(certifications) {
    return `
        <div class="certifications-grid">
            ${certifications.map(cert => `
                <div class="certification-card">
                    <i class="fas fa-certificate"></i>
                    <div class="certification-details">
                        <h3>${cert.name}</h3>
                        <p>${cert.year}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function formatAchievements(achievements) {
    return `
        <div class="achievements-list">
            ${achievements.map(achievement => `
                <div class="achievement-item">
                    <i class="fas fa-trophy"></i>
                    <div class="achievement-details">
                        <h3>${achievement.title}</h3>
                        <p>${achievement.details ? achievement.details : ''}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function formatContact(personal) {
    return `
        <div class="contact-card">
            <div class="contact-header">
                <h2>Contact Information</h2>
            </div>
            <div class="contact-details">
                <div class="contact-item">
                    <i class="fas fa-user"></i>
                    <span>${personal.name}</span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <span>${personal.phone}</span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <span>${personal.email}</span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${personal.location}</span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-github"></i>
                    <span>${personal.github}</span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-linkedin"></i>
                    <span>${personal.linkedin}</span>
                </div>
            </div>
        </div>
    `;
}

function formatAbout(about) {
    return `
        <div class="about-container">
            <div class="about-header">
                <h2>${about.summary}</h2>
            </div>
            ${about.strengths.map(strength => `
                <div class="about-section">
                    <h3>Key Strength</h3>
                    <div class="about-details">
                        <div class="about-item">
                            <i class="fas fa-check"></i>
                            <span>${strength}</span>
                        </div>
                    </div>
                </div>
            `).join('')}
            ${about.interests.map(interest => `
                <div class="about-section">
                    <h3>Interest</h3>
                    <div class="about-details">
                        <div class="about-item">
                            <i class="fas fa-check"></i>
                            <span>${interest}</span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function formatLanguages(languages) {
    return `
        <div class="languages-list">
            ${languages.map(lang => `
                <div class="language-item">
                    <i class="fas fa-language"></i>
                    <div class="language-details">
                        <h3>${lang.name}</h3>
                        <p>${lang.proficiency}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Notifications
function showNotification(message) {
    const notifications = document.querySelector('.notifications');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notifications.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Update clock
function updateClock() {
    const clock = document.querySelector('.clock span');
    if (clock) {
        clock.textContent = new Date().toLocaleTimeString();
    }
}

setInterval(updateClock, 1000);
updateClock();

// Close windows when clicking outside
document.addEventListener('click', (e) => {
    const startMenu = document.querySelector('.start-menu');
    if (!e.target.closest('.start-menu') && !e.target.closest('.taskbar-item')) {
        startMenu.style.display = 'none';
    }
});

// System Monitor functionality
function updateSystemMonitor() {
    const cpuUsage = Math.floor(Math.random() * 100);
    document.getElementById('cpu-progress').style.width = `${cpuUsage}%`;
    document.getElementById('cpu-text').textContent = `${cpuUsage}%`;

    const ramUsage = Math.floor(Math.random() * 100);
    document.getElementById('ram-progress').style.width = `${ramUsage}%`;
    document.getElementById('ram-text').textContent = `${ramUsage}%`;

    const uploadSpeed = Math.floor(Math.random() * 1000);
    const downloadSpeed = Math.floor(Math.random() * 1000);
    document.getElementById('upload-speed').textContent = `${uploadSpeed} KB/s`;
    document.getElementById('download-speed').textContent = `${downloadSpeed} KB/s`;

    const uptimeElement = document.getElementById('uptime');
    if (uptimeElement) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        uptimeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// Update system monitor every second
setInterval(updateSystemMonitor, 1000);

// Settings functionality
function changeTheme(theme) {
    const root = document.documentElement;
    switch(theme) {
        case 'matrix':
            root.style.setProperty('--kali-purple', '#00ff00');
            root.style.setProperty('--kali-dark', '#000000');
            root.style.setProperty('--kali-darker', '#000000');
            break;
        case 'cyber':
            root.style.setProperty('--kali-purple', '#00ffff');
            root.style.setProperty('--kali-dark', '#1a1a1a');
            root.style.setProperty('--kali-darker', '#0a0a0a');
            break;
        default: // kali
            root.style.setProperty('--kali-purple', '#557C93');
            root.style.setProperty('--kali-dark', '#1a1a1a');
            root.style.setProperty('--kali-darker', '#0a0a0a');
    }
    showNotification(`Theme changed to ${theme}`);
}

function changeFontSize(size) {
    document.documentElement.style.setProperty('--base-font-size', `${size}px`);
    showNotification(`Font size changed to ${size}px`);
}

function changeCursorStyle(style) {
    const terminalInput = document.getElementById('terminal-input');
    switch(style) {
        case 'block':
            terminalInput.style.caretShape = 'block';
            break;
        case 'underline':
            terminalInput.style.caretShape = 'underline';
            break;
        case 'bar':
            terminalInput.style.caretShape = 'bar';
            break;
    }
    showNotification(`Cursor style changed to ${style}`);
}

function toggleMatrixRain(enabled) {
    if (enabled) {
        triggerMatrixRain();
    }
    showNotification(`Matrix rain ${enabled ? 'enabled' : 'disabled'}`);
}

function toggleAnimations(enabled) {
    document.body.style.setProperty('--enable-animations', enabled ? '1' : '0');
    showNotification(`Animations ${enabled ? 'enabled' : 'disabled'}`);
}

// Add new window types
const windowTypes = {
    terminal: {
        icon: 'fas fa-terminal',
        color: '#00ff00'
    },
    files: {
        icon: 'fas fa-folder',
        color: '#ffd700'
    },
    projects: {
        icon: 'fas fa-code',
        color: '#ff6b6b'
    },
    skills: {
        icon: 'fas fa-tools',
        color: '#4dabf7'
    },
    contact: {
        icon: 'fas fa-envelope',
        color: '#ff922b'
    },
    monitor: {
        icon: 'fas fa-chart-line',
        color: '#00ff00'
    },
    settings: {
        icon: 'fas fa-cog',
        color: '#339af0'
    }
};

// Update getWindowIcon function
function getWindowIcon(windowId) {
    return windowTypes[windowId]?.icon || 'fas fa-window-maximize';
}

// Bring window to front
function bringToFront(windowId) {
    const window = document.getElementById(`${windowId}-window`);
    if (window) {
        // Get all windows
        const allWindows = document.querySelectorAll('.terminal-window, .file-explorer');
        
        // Set a very high z-index for the target window
        window.style.zIndex = '1000';
        
        // Reset z-index for other windows
        allWindows.forEach(w => {
            if (w !== window) {
                w.style.zIndex = '800';
            }
        });
    }
}

// Execute command from desktop icons
function executeCommand(command) {
    openWindow('terminal');
    bringToFront('terminal');
    
    setTimeout(() => {
        const terminalInput = document.getElementById('terminal-input');
        terminalInput.value = command;
        
        const enterEvent = new KeyboardEvent('keypress', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true
        });
        
        terminalInput.dispatchEvent(enterEvent);
        terminalInput.value = '';
    }, 100);
}

// Update contact form handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            try {
                // Send to backend endpoint from environment variable
                const response = await fetch(process.env.CONTACT_FORM_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error('Failed to send message');
                }
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-message success';
                successMessage.textContent = 'Message sent successfully! I will get back to you soon.';
                contactForm.insertBefore(successMessage, contactForm.firstChild);
                
                // Clear form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
                
                // Log the message in terminal
                const output = document.createElement('div');
                output.className = 'terminal-line';
                output.textContent = `[+] New message received from ${formData.name} (${formData.email})`;
                terminalOutput.appendChild(output);
                
            } catch (error) {
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'form-message error';
                errorMessage.textContent = 'Failed to send message. Please try again later.';
                contactForm.insertBefore(errorMessage, contactForm.firstChild);
                
                // Remove error message after 5 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            }
        });
    }
});

// Update the file explorer HTML content
document.addEventListener('DOMContentLoaded', () => {
    const fileGrid = document.querySelector('.file-grid');
    if (fileGrid) {
        fileGrid.innerHTML = `
            <div class="file-item" onclick="openFile('resume.pdf')">
                <i class="fas fa-file-pdf" style="color: #ff0000;"></i>
                <span>resume.pdf</span>
                <small class="file-info">Google Drive</small>
            </div>
            <div class="file-item" onclick="openFile('projects.txt')">
                <i class="fas fa-code"></i>
                <span>projects.txt</span>
            </div>
            <div class="file-item" onclick="openFile('skills.txt')">
                <i class="fas fa-brain"></i>
                <span>skills.txt</span>
            </div>
            <div class="file-item" onclick="openFile('education.txt')">
                <i class="fas fa-graduation-cap"></i>
                <span>education.txt</span>
            </div>
            <div class="file-item" onclick="openFile('certifications.txt')">
                <i class="fas fa-certificate"></i>
                <span>certifications.txt</span>
            </div>
            <div class="file-item" onclick="openFile('achievements.txt')">
                <i class="fas fa-trophy"></i>
                <span>achievements.txt</span>
            </div>
            <div class="file-item" onclick="openFile('contact.txt')">
                <i class="fas fa-address-card"></i>
                <span>contact.txt</span>
            </div>
            <div class="file-item" onclick="openFile('about.txt')">
                <i class="fas fa-user"></i>
                <span>about.txt</span>
            </div>
            <div class="file-item" onclick="openFile('languages.txt')">
                <i class="fas fa-language"></i>
                <span>languages.txt</span>
            </div>
        `;
    }
}); 