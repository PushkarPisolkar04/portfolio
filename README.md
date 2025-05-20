# Kali Linux Portfolio

A terminal-themed portfolio website inspired by Kali Linux, featuring a fully interactive terminal interface, file explorer, and system monitor.

## Live Demo

[View Live Portfolio](https://pushkarpisolkar04.github.io/portfolio)

## Features

- 🖥️ Interactive Terminal Interface
  - Command history
  - Tab completion
  - Custom commands
  - Matrix rain effect

- 📁 File Explorer
  - Dynamic file generation
  - Styled content display
  - Google Drive integration for resume

- 📊 System Monitor
  - CPU usage
  - RAM usage
  - Network stats
  - Uptime display

- ⚙️ Settings Panel
  - Theme customization
  - Font size adjustment
  - Cursor style options
  - Animation toggles

- 📱 Responsive Design
  - Mobile-friendly interface
  - Adaptive layouts
  - Touch support

## Setup

1. Clone the repository:
```bash
git clone https://github.com/pushkarpisolkar04/portfolio.git
cd portfolio
```

2. Customize the portfolio:
   - Open `js/data.js`
   - Edit the `portfolioData` object with your information
   - Update the following sections:
     - personal (name, role, contact info, etc.)
     - about (summary, strengths, interests)
     - education (degrees, institutions, etc.)
     - skills (programming, web, tools, etc.)
     - projects (name, description, tech stack, etc.)
     - certifications
     - achievements
     - languages
   - For resume, upload to Google Drive and update the link in `data.js`

3. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome 6
- Google Fonts
- Google Drive API (for resume)

## Available Commands

- `help` - Show available commands
- `whoami` - Display user information
- `ls` - List files and directories
- `cd` - Change directory
- `cat` - Display file contents
- `clear` - Clear terminal
- `date` - Show current date and time
- `echo` - Display a line of text
- `pwd` - Print working directory
- `projects` - List all projects
- `skills` - Show technical skills
- `contact` - Display contact information
- `about` - Show about me information
- `github` - Open GitHub profile
- `linkedin` - Open LinkedIn profile
- `resume` - View resume
- `education` - Show educational background
- `certifications` - List certifications
- `achievements` - Show achievements
- `languages` - Show language proficiencies

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Kali Linux
- Font Awesome for icons
- Google Fonts for typography
- Matrix rain effect inspiration 