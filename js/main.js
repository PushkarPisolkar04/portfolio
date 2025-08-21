// Terminal commands
const commands = {
    help: () => {
        return `Available Commands:
help         - Show this help message
whoami       - Display user information
ls           - List available portfolio sections
cd           - Navigate to portfolio section
cat          - Open portfolio section or external links
clear        - Clear terminal
date         - Show current date and time
echo         - Display a line of text
pwd          - Print working directory
hack         - Initiate hacking sequence

Portfolio Commands:
projects     - Open projects window
skills       - Open skills window
contact      - Open contact window
about        - Open about me window
experience   - Open experience window
github       - Open GitHub profile
linkedin     - Open LinkedIn profile
resume       - View resume
education    - Open education window
certifications - Open certifications window
achievements - Open achievements window
languages    - Open languages window

Examples:
• ls                    - List all available sections
• cd projects           - Open projects section
• cat resume            - Open resume
• cat github            - Open GitHub profile`;
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

    ls: () => {
        return `Available Portfolio Sections:
📁 projects/     - View my projects
📁 skills/       - View my skills
📁 about/        - About me information
📁 experience/   - Work experience
📁 education/    - Educational background
📁 certifications/ - Professional certifications
📁 achievements/ - Awards and achievements
📁 languages/    - Language proficiencies
📁 contact/      - Contact information

Quick Access Commands:
• projects     - Open projects window
• skills       - Open skills window
• about        - Open about window
• experience   - Open experience window
• education    - Open education window
• certifications - Open certifications window
• achievements - Open achievements window
• languages    - Open languages window
• contact      - Open contact window
• github       - Open GitHub profile
• linkedin     - Open LinkedIn profile
• resume       - View resume`;
    },

    cd: (dir) => {
        if (!dir) return 'Usage: cd <section>\nAvailable sections: projects, skills, about, experience, education, certifications, achievements, languages, contact';
        
        const validDirs = ['projects', 'skills', 'about', 'experience', 'education', 'certifications', 'achievements', 'languages', 'contact'];
        if (validDirs.includes(dir.toLowerCase())) {
            openWindow(dir.toLowerCase());
            return `Opening ${dir} section...`;
        } else if (dir === 'secret') {
            return 'Access denied. Initiating security protocol...';
        } else {
            return `Directory not found: ${dir}\nAvailable: ${validDirs.join(', ')}`;
        }
    },

    cat: (args) => {
        if (!args[0]) return 'Usage: cat <section>\nAvailable sections: projects, skills, about, experience, education, certifications, achievements, languages, contact, resume, github, linkedin';
        
        const section = args[0].toLowerCase();
        switch(section) {
            case 'resume':
                window.open(portfolioData.personal.resume, '_blank');
                return 'Opening resume...';
                
            case 'github':
                window.open(portfolioData.personal.github, '_blank');
                return 'Opening GitHub profile...';
                
            case 'linkedin':
                window.open(portfolioData.personal.linkedin, '_blank');
                return 'Opening LinkedIn profile...';
                
            case 'projects':
            case 'skills':
            case 'about':
            case 'experience':
            case 'education':
            case 'certifications':
            case 'achievements':
            case 'languages':
            case 'contact':
                openWindow(section);
                return `Opening ${section} window...`;
                
            default:
                return `Section not found: ${section}\nAvailable: projects, skills, about, experience, education, certifications, achievements, languages, contact, resume, github, linkedin`;
        }
    },

    projects: () => {
        openWindow('projects');
        return `Opening Projects window...`;
    },

    skills: () => {
        openWindow('skills');
        return `Opening Skills window...`;
    },

    contact: () => {
        openWindow('contact-form');
        return `Opening Contact window...`;
    },

    about: () => {
        openWindow('about');
        return `Opening About Me window...`;
    },

    education: () => {
        openWindow('education');
        return `Opening Education window...`;
    },

    certifications: () => {
        openWindow('certifications');
        return `Opening Certifications window...`;
    },

    achievements: () => {
        openWindow('achievements');
        return `Opening Achievements window...`;
    },

    languages: () => {
        openWindow('languages');
        return `Opening Languages window...`;
    },

    experience: () => {
        openWindow('experience');
        return `Opening Experience window...`;
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
            
            // Create command line with prompt and timestamp
            const commandLine = document.createElement('div');
            commandLine.className = 'terminal-line command';
            const timestamp = new Date().toLocaleTimeString();
            commandLine.innerHTML = `<span class="prompt">[${timestamp}] root@kali:~#</span> ${command}`;
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

    if (!header) return; // Exit if no header found

    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        if (e.target.closest('.terminal-controls')) return; // Don't drag when clicking controls
        
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        if (e.target === header || header.contains(e.target)) {
            isDragging = true;
            element.style.transition = 'none'; // Disable transition during drag
            element.style.cursor = 'grabbing';
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
        if (isDragging) {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
            element.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'; // Re-enable transition
            element.style.cursor = 'default';
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
}

// Initialize draggable windows
document.querySelectorAll('.terminal-window, .file-explorer').forEach(makeDraggable);

// Window controls
let currentZIndex = 1000;

function getNextZIndex() {
    return ++currentZIndex;
}

// Function to handle file clicks
function openFile(filename) {
    const terminalOutput = document.getElementById('terminal-output');
    if (terminalOutput) {
        const output = document.createElement('div');
        output.className = 'terminal-line';
        
        switch(filename) {
            case 'resume.pdf':
                window.open(portfolioData.personal.resume, '_blank');
                output.textContent = `[+] Opening resume from Google Drive...`;
                break;
            case 'about.txt':
                output.textContent = commands.about();
                break;
            case 'experience.txt':
                output.textContent = commands.experience();
                break;
            case 'education.txt':
                output.textContent = commands.education();
                break;
            case 'certifications.txt':
                output.textContent = commands.certifications();
                break;
            case 'achievements.txt':
                output.textContent = commands.achievements();
                break;
            case 'languages.txt':
                output.textContent = commands.languages();
                break;
            case 'github.txt':
                output.textContent = commands.github();
                break;
            case 'linkedin.txt':
                output.textContent = commands.linkedin();
                break;
            default:
                output.textContent = `[!] File not found: ${filename}`;
        }
        
        terminalOutput.appendChild(output);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
}

// Function to show file categories
function showFileCategory(category) {
    const fileGrid = document.querySelector('.file-grid');
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    // Remove active class from all sidebar items
    sidebarItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to clicked item
    event.target.closest('.sidebar-item').classList.add('active');
    
    if (!fileGrid) return;
    
    const allFiles = `
        <div class="file-item" onclick="openFile('resume.pdf')">
            <i class="fas fa-file-pdf" style="color: var(--kali-red);"></i>
            <span>Resume</span>
            <small class="file-info">PDF</small>
        </div>
        <div class="file-item" onclick="openWindow('projects')">
            <i class="fas fa-code" style="color: var(--kali-orange);"></i>
            <span>Projects</span>
        </div>
        <div class="file-item" onclick="openWindow('skills')">
            <i class="fas fa-brain" style="color: var(--kali-cyan);"></i>
            <span>Skills</span>
        </div>
        <div class="file-item" onclick="openWindow('contact-form')">
            <i class="fas fa-envelope" style="color: var(--kali-pink);"></i>
            <span>Contact</span>
        </div>
        <div class="file-item" onclick="openWindow('terminal')">
            <i class="fas fa-terminal" style="color: var(--kali-green);"></i>
            <span>Terminal</span>
        </div>
        <div class="file-item" onclick="openWindow('about')">
            <i class="fas fa-user" style="color: var(--kali-orange);"></i>
            <span>About Me</span>
        </div>
        <div class="file-item" onclick="openWindow('experience')">
            <i class="fas fa-briefcase" style="color: var(--kali-purple);"></i>
            <span>Experience</span>
        </div>
        <div class="file-item" onclick="openWindow('education')">
            <i class="fas fa-graduation-cap" style="color: var(--kali-cyan);"></i>
            <span>Education</span>
        </div>
        <div class="file-item" onclick="openWindow('certifications')">
            <i class="fas fa-certificate" style="color: var(--kali-yellow);"></i>
            <span>Certifications</span>
        </div>
        <div class="file-item" onclick="openWindow('achievements')">
            <i class="fas fa-trophy" style="color: var(--kali-orange);"></i>
            <span>Achievements</span>
        </div>
        <div class="file-item" onclick="openWindow('languages')">
            <i class="fas fa-language" style="color: var(--kali-pink);"></i>
            <span>Languages</span>
        </div>
        <div class="file-item" onclick="window.open('${portfolioData.personal.github}', '_blank')">
            <i class="fab fa-github" style="color: var(--kali-purple);"></i>
            <span>GitHub</span>
        </div>
        <div class="file-item" onclick="window.open('${portfolioData.personal.linkedin}', '_blank')">
            <i class="fab fa-linkedin" style="color: var(--kali-blue);"></i>
            <span>LinkedIn</span>
        </div>
    `;
    
    const personalFiles = `
        <div class="file-item" onclick="openFile('resume.pdf')">
            <i class="fas fa-file-pdf" style="color: var(--kali-red);"></i>
            <span>Resume</span>
            <small class="file-info">PDF</small>
        </div>
        <div class="file-item" onclick="openWindow('about')">
            <i class="fas fa-user" style="color: var(--kali-orange);"></i>
            <span>About Me</span>
        </div>
        <div class="file-item" onclick="openWindow('languages')">
            <i class="fas fa-language" style="color: var(--kali-pink);"></i>
            <span>Languages</span>
        </div>
    `;
    
    const professionalFiles = `
        <div class="file-item" onclick="openWindow('experience')">
            <i class="fas fa-briefcase" style="color: var(--kali-purple);"></i>
            <span>Experience</span>
        </div>
        <div class="file-item" onclick="openWindow('education')">
            <i class="fas fa-graduation-cap" style="color: var(--kali-cyan);"></i>
            <span>Education</span>
        </div>
        <div class="file-item" onclick="openWindow('certifications')">
            <i class="fas fa-certificate" style="color: var(--kali-yellow);"></i>
            <span>Certifications</span>
        </div>
        <div class="file-item" onclick="openWindow('achievements')">
            <i class="fas fa-trophy" style="color: var(--kali-orange);"></i>
            <span>Achievements</span>
        </div>
    `;
    
    const socialFiles = `
        <div class="file-item" onclick="window.open('${portfolioData.personal.github}', '_blank')">
            <i class="fab fa-github" style="color: var(--kali-purple);"></i>
            <span>GitHub</span>
        </div>
        <div class="file-item" onclick="window.open('${portfolioData.personal.linkedin}', '_blank')">
            <i class="fab fa-linkedin" style="color: var(--kali-blue);"></i>
            <span>LinkedIn</span>
        </div>
        <div class="file-item" onclick="openWindow('contact-form')">
            <i class="fas fa-envelope" style="color: var(--kali-pink);"></i>
            <span>Contact</span>
        </div>
    `;
    
    const toolsFiles = `
        <div class="file-item" onclick="openWindow('projects')">
            <i class="fas fa-code" style="color: var(--kali-orange);"></i>
            <span>Projects</span>
        </div>
        <div class="file-item" onclick="openWindow('skills')">
            <i class="fas fa-brain" style="color: var(--kali-cyan);"></i>
            <span>Skills</span>
        </div>
        <div class="file-item" onclick="openWindow('terminal')">
            <i class="fas fa-terminal" style="color: var(--kali-green);"></i>
            <span>Terminal</span>
        </div>
    `;
    
    switch(category) {
        case 'all':
            fileGrid.innerHTML = allFiles;
            break;
        case 'personal':
            fileGrid.innerHTML = personalFiles;
            break;
        case 'professional':
            fileGrid.innerHTML = professionalFiles;
            break;
        case 'social':
            fileGrid.innerHTML = socialFiles;
            break;
        case 'tools':
            fileGrid.innerHTML = toolsFiles;
            break;
        default:
            fileGrid.innerHTML = allFiles;
    }
}

function openWindow(windowId) {
    const window = document.getElementById(`${windowId}-window`);
    if (window) {
        window.style.display = 'block';
        window.style.zIndex = getNextZIndex();
        
        // Populate content for specific windows
        if (windowId === 'projects') {
            populateProjectsWindow();
        } else if (windowId === 'skills') {
            populateSkillsWindow();
        } else if (windowId === 'about') {
            populateAboutWindow();
        } else if (windowId === 'experience') {
            populateExperienceWindow();
        } else if (windowId === 'education') {
            populateEducationWindow();
        } else if (windowId === 'certifications') {
            populateCertificationsWindow();
        } else if (windowId === 'achievements') {
            populateAchievementsWindow();
        } else if (windowId === 'languages') {
            populateLanguagesWindow();
        }
        
        // Add to taskbar
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
        if (window.classList.contains('maximized')) {
            // Restore
            window.classList.remove('maximized');
            window.style.width = '';
            window.style.height = '';
            window.style.top = '';
            window.style.left = '';
            window.style.transform = '';
            window.style.borderRadius = '';
            window.style.maxHeight = '';
        } else {
            // Maximize
            window.classList.add('maximized');
            window.style.width = '100vw';
            window.style.height = 'calc(100vh - 40px)';
            window.style.top = '0';
            window.style.left = '0';
            window.style.transform = 'none';
            window.style.borderRadius = '0';
            window.style.maxHeight = 'none';
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
        about: 'fas fa-user',
        contact: 'fas fa-envelope',

    };
    return icons[windowId] || 'fas fa-window-maximize';
}

// Start menu
function toggleStartMenu() {
    const startMenu = document.querySelector('.start-menu');
    startMenu.style.display = startMenu.style.display === 'none' ? 'block' : 'none';
}



// Auto boot functionality - optimized for performance
function autoBoot() {
    const bootLines = document.querySelectorAll('.boot-line');
    bootLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
        }, index * 300); // Reduced from 500ms to 300ms
    });

    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('desktop').style.display = 'block';
        showNotification('System booted successfully');
    }, 1800); // Reduced from 2500ms to 1800ms
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

// Optimized clock update - only update every 5 seconds to reduce performance overhead
setInterval(updateClock, 5000);
updateClock();

// Close windows when clicking outside
document.addEventListener('click', (e) => {
    const startMenu = document.querySelector('.start-menu');
    if (!e.target.closest('.start-menu') && !e.target.closest('.taskbar-item')) {
        startMenu.style.display = 'none';
    }
});





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
    experience: {
        icon: 'fas fa-briefcase',
        color: '#10b981'
    },
    education: {
        icon: 'fas fa-graduation-cap',
        color: '#06b6d4'
    },
    certifications: {
        icon: 'fas fa-certificate',
        color: '#fbbf24'
    },
    achievements: {
        icon: 'fas fa-trophy',
        color: '#ff6b35'
    },
    languages: {
        icon: 'fas fa-language',
        color: '#ec4899'
    },
    contact: {
        icon: 'fas fa-envelope',
        color: '#ff922b'
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

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-message success';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                Message sent successfully! I will get back to you soon.
            `;
            contactForm.insertBefore(successMessage, contactForm.firstChild);
            
            // Clear form
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
            
            // Log the message in terminal
            const terminalOutput = document.getElementById('terminal-output');
            if (terminalOutput) {
                const output = document.createElement('div');
                output.className = 'terminal-line';
                output.textContent = `[+] New message received from ${formData.name} (${formData.email}) - Subject: ${formData.subject}`;
                terminalOutput.appendChild(output);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
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
                <i class="fas fa-file-pdf" style="color: var(--kali-red);"></i>
                <span>Resume</span>
                <small class="file-info">PDF</small>
            </div>
            <div class="file-item" onclick="openWindow('projects')">
                <i class="fas fa-code" style="color: var(--kali-orange);"></i>
                <span>Projects</span>
            </div>
            <div class="file-item" onclick="openWindow('skills')">
                <i class="fas fa-brain" style="color: var(--kali-cyan);"></i>
                <span>Skills</span>
            </div>
            <div class="file-item" onclick="openWindow('contact-form')">
                <i class="fas fa-envelope" style="color: var(--kali-pink);"></i>
                <span>Contact</span>
            </div>
            <div class="file-item" onclick="openWindow('terminal')">
                <i class="fas fa-terminal" style="color: var(--kali-green);"></i>
                <span>Terminal</span>
            </div>
            <div class="file-item" onclick="openWindow('about')">
                <i class="fas fa-user" style="color: var(--kali-orange);"></i>
                <span>About Me</span>
            </div>
            <div class="file-item" onclick="openWindow('experience')">
                <i class="fas fa-briefcase" style="color: var(--kali-purple);"></i>
                <span>Experience</span>
            </div>
            <div class="file-item" onclick="openWindow('education')">
                <i class="fas fa-graduation-cap" style="color: var(--kali-cyan);"></i>
                <span>Education</span>
            </div>
            <div class="file-item" onclick="openWindow('certifications')">
                <i class="fas fa-certificate" style="color: var(--kali-yellow);"></i>
                <span>Certifications</span>
            </div>
            <div class="file-item" onclick="openWindow('achievements')">
                <i class="fas fa-trophy" style="color: var(--kali-orange);"></i>
                <span>Achievements</span>
            </div>
            <div class="file-item" onclick="openWindow('languages')">
                <i class="fas fa-language" style="color: var(--kali-pink);"></i>
                <span>Languages</span>
            </div>
            <div class="file-item" onclick="window.open('${portfolioData.personal.github}', '_blank')">
                <i class="fab fa-github" style="color: var(--kali-purple);"></i>
                <span>GitHub</span>
            </div>
            <div class="file-item" onclick="window.open('${portfolioData.personal.linkedin}', '_blank')">
                <i class="fab fa-linkedin" style="color: var(--kali-blue);"></i>
                <span>LinkedIn</span>
            </div>
        `;
    }
});

// Function to populate projects window
function populateProjectsWindow() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = portfolioData.projects.map(project => `
        <div class="project-card">
            <div class="project-header">
                <div class="project-icon">
                    <i class="fas fa-code"></i>
                </div>
                <h3 class="project-title">${project.name}</h3>
                ${project.status ? `<span class="project-status">${project.status}</span>` : ''}
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <ul class="project-features">
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <div class="project-links">
                ${project.github ? `<a href="${project.github}" target="_blank" class="project-link">
                    <i class="fab fa-github"></i> GitHub
                </a>` : ''}
                ${project.live ? `<a href="${project.live}" target="_blank" class="project-link">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>` : ''}
            </div>
        </div>
    `).join('');
}

// Function to populate skills window
function populateSkillsWindow() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) return;

    const skillCategories = [
        {
            name: 'Programming Languages',
            icon: 'fas fa-code',
            skills: portfolioData.skills.programming,
            class: 'programming'
        },
        {
            name: 'Cybersecurity',
            icon: 'fas fa-shield-alt',
            skills: portfolioData.skills.cybersecurity,
            class: 'cybersecurity'
        },
        {
            name: 'Web Development',
            icon: 'fas fa-globe',
            skills: [...portfolioData.skills.web.frontend, ...portfolioData.skills.web.backend, ...portfolioData.skills.web.fullstack],
            class: 'web'
        },
        {
            name: 'Cloud Computing',
            icon: 'fas fa-cloud',
            skills: portfolioData.skills.cloud,
            class: 'cloud'
        },
        {
            name: 'Mobile Development',
            icon: 'fas fa-mobile-alt',
            skills: portfolioData.skills.app,
            class: 'mobile'
        },
        {
            name: 'Database',
            icon: 'fas fa-database',
            skills: portfolioData.skills.database,
            class: 'database'
        },
        {
            name: 'DevOps',
            icon: 'fas fa-cogs',
            skills: portfolioData.skills.devops,
            class: 'devops'
        },
        {
            name: 'Tools',
            icon: 'fas fa-tools',
            skills: portfolioData.skills.tools,
            class: 'tools'
        }
    ];

    skillsGrid.innerHTML = skillCategories.map(category => `
        <div class="skill-category ${category.class}">
            <div class="skill-header">
                <i class="${category.icon}"></i>
                <span>${category.name}</span>
            </div>
            <div class="skill-list">
                ${category.skills.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// Function to populate about window
function populateAboutWindow() {
    const aboutContent = document.querySelector('.about-content');
    if (!aboutContent) return;

    aboutContent.innerHTML = `
        <div class="about-section">
            <div class="about-header">
                <div class="about-avatar">
                    <img src="assets/avatar.jpg" alt="Pushkar Pisolkar">
                </div>
                <div class="about-info">
                    <h2>${portfolioData.personal.name}</h2>
                    <p class="about-role">${portfolioData.personal.role}</p>
                    <p class="about-focus">Focus: ${portfolioData.personal.focus}</p>
                    <p class="about-location">📍 ${portfolioData.personal.location}</p>
                </div>
            </div>
            
            <div class="about-summary">
                <h3>About Me</h3>
                <p>${portfolioData.about.summary}</p>
            </div>
            
            <div class="about-details">
                <div class="about-column">
                    <div class="about-card">
                        <h3><i class="fas fa-star"></i> Key Strengths</h3>
                        <ul>
                            ${portfolioData.about.strengths.map(strength => `<li>${strength}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="about-card">
                        <h3><i class="fas fa-heart"></i> Interests</h3>
                        <ul>
                            ${portfolioData.about.interests.map(interest => `<li>${interest}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="about-column">
                    <div class="about-card">
                        <h3><i class="fas fa-graduation-cap"></i> Education</h3>
                        <div class="education-item">
                            <h4>${portfolioData.education[0].degree}</h4>
                            <p>${portfolioData.education[0].institution}</p>
                            <p>${portfolioData.education[0].duration} | CGPA: ${portfolioData.education[0].cgpa}/10.0</p>
                        </div>
                    </div>
                    
                    <div class="about-card">
                        <h3><i class="fas fa-trophy"></i> Achievements</h3>
                        <ul>
                            <li>Gold Medalist (Zonal) - Aavishkar State-level Innovation Competition</li>
                            <li>Semi-Finalist - Flipkart Grid 6.0 National Hackathon</li>
                            <li>100/100 in CBSE Class 10 Mathematics</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="about-contact">
                <h3><i class="fas fa-envelope"></i> Get In Touch</h3>
                <div class="contact-links">
                    <a href="mailto:${portfolioData.personal.email}" class="contact-link">
                        <i class="fas fa-envelope"></i> ${portfolioData.personal.email}
                    </a>
                    <a href="${portfolioData.personal.github}" target="_blank" class="contact-link">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <a href="${portfolioData.personal.linkedin}" target="_blank" class="contact-link">
                        <i class="fab fa-linkedin"></i> LinkedIn
                    </a>
                    <a href="${portfolioData.personal.portfolio}" target="_blank" class="contact-link">
                        <i class="fas fa-globe"></i> Portfolio
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Function to populate experience window
function populateExperienceWindow() {
    const experienceContent = document.querySelector('.experience-content');
    if (!experienceContent) return;

    experienceContent.innerHTML = `
        <div class="experience-timeline">
            ${portfolioData.experience.map(exp => `
                <div class="experience-card">
                    <div class="experience-header">
                        <div class="experience-icon">
                            <i class="fas fa-briefcase"></i>
                        </div>
                        <div>
                            <h3 class="experience-title">${exp.role}</h3>
                            <p class="experience-company">${exp.company}</p>
                            <p class="experience-duration">${exp.duration}</p>
                        </div>
                    </div>
                    <div class="experience-description">
                        <ul>
                            ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Function to populate education window
function populateEducationWindow() {
    const educationContent = document.querySelector('.education-content');
    if (!educationContent) return;

    educationContent.innerHTML = `
        <div class="education-timeline">
            ${portfolioData.education.map(edu => `
                <div class="education-card">
                    <div class="education-header">
                        <div class="education-icon">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <div>
                            <h3 class="education-degree">${edu.degree}</h3>
                            <p class="education-institution">${edu.institution}</p>
                            <p class="education-duration">${edu.duration || edu.year}</p>
                        </div>
                    </div>
                    <div class="education-details">
                        ${edu.cgpa ? `<p><span class="highlight">CGPA:</span> ${edu.cgpa}/10.0</p>` : ''}
                        ${edu.percentage ? `<p><span class="highlight">Percentage:</span> ${edu.percentage}</p>` : ''}
                        ${edu.board ? `<p><span class="highlight">Board:</span> ${edu.board}</p>` : ''}
                        ${edu.achievement ? `<p><span class="highlight">Achievement:</span> ${edu.achievement}</p>` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Function to populate certifications window
function populateCertificationsWindow() {
    const certificationsContent = document.querySelector('.certifications-content');
    if (!certificationsContent) return;

    certificationsContent.innerHTML = `
        <div class="certifications-grid">
            ${portfolioData.certifications.map(cert => `
                <div class="certification-card">
                    <div class="certification-icon">
                        <i class="fas fa-certificate"></i>
                    </div>
                    <div class="certification-details">
                        <h3>${cert.name}</h3>
                        <p>${cert.year}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Function to populate achievements window
function populateAchievementsWindow() {
    const achievementsContent = document.querySelector('.achievements-content');
    if (!achievementsContent) return;

    achievementsContent.innerHTML = `
        <div class="achievements-list">
            ${portfolioData.achievements.map(achievement => `
                <div class="achievement-item">
                    <div class="achievement-icon">
                        <i class="fas fa-trophy"></i>
                    </div>
                    <div class="achievement-details">
                        <h3>${achievement.title}</h3>
                        ${achievement.details ? `<p>${achievement.details}</p>` : ''}
                        <span class="year">${achievement.year}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Function to populate languages window
function populateLanguagesWindow() {
    const languagesContent = document.querySelector('.languages-content');
    if (!languagesContent) return;

    languagesContent.innerHTML = `
        <div class="languages-list">
            ${portfolioData.languages.map(lang => `
                <div class="language-item">
                    <div class="language-icon">
                        <i class="fas fa-language"></i>
                    </div>
                    <div class="language-details">
                        <h3>${lang.name}</h3>
                        <p>${lang.proficiency}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

 