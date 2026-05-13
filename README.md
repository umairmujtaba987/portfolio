# Portfolio Website

A modern, responsive portfolio website showcasing professional work and projects. Built with vanilla HTML, CSS, and JavaScript for optimal performance and fast loading times.

## 📋 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## ✨ Features

- **Responsive Design** - Fully responsive layout that works seamlessly across all devices (mobile, tablet, desktop)
- **Modern UI/UX** - Clean and professional interface with smooth animations and transitions
- **Fast Performance** - Optimized for speed with vanilla JavaScript (no heavy frameworks)
- **SEO Optimized** - Proper semantic HTML structure for better search engine visibility
- **Accessibility** - WCAG compliant with proper ARIA labels and keyboard navigation
- **Cross-browser Compatible** - Works across all modern browsers
- **GitHub Pages Ready** - Pre-configured for easy deployment on GitHub Pages

## 🎬 Demo

View the live portfolio: [https://umairmujtaba987.github.io/portfolio](https://umairmujtaba987.github.io/portfolio)

## 📦 Prerequisites

Before getting started, ensure you have the following installed:

- **Git** - For version control. [Download Git](https://git-scm.com/)
- **A modern web browser** - Chrome, Firefox, Safari, or Edge (latest versions recommended)
- **A text editor** (optional) - VS Code, Sublime Text, or any code editor of your choice
- **Live Server extension** (optional) - For local development with live reload

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/umairmujtaba987/portfolio.git
cd portfolio
```

### 2. Local Development Setup

#### Option A: Using Live Server (Recommended)

If you have VS Code installed:

1. Install the **Live Server** extension by Ritwick Dey
2. Right-click on `index.html` and select **"Open with Live Server"**
3. The browser will open automatically at `http://localhost:5500`

#### Option B: Using Python (Built-in)

If Python is installed on your system:

```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```

Then open your browser and navigate to `http://localhost:8000`

#### Option C: Using Node.js

If Node.js is installed:

```bash
# Install http-server globally (one-time setup)
npm install -g http-server

# Start the server
http-server

# Server runs at http://localhost:8080
```

#### Option D: Direct Browser Opening

Simply open `index.html` directly in your browser:

```bash
# On macOS
open index.html

# On Windows
start index.html

# On Linux
xdg-open index.html
```

## 📖 Usage

### Viewing the Portfolio

1. Navigate to the project directory
2. Open `index.html` in your web browser using one of the methods above
3. Use the navigation menu to explore different sections
4. Click on project cards to view detailed information

### Local Development Workflow

```bash
# 1. Clone and setup
git clone https://github.com/umairmujtaba987/portfolio.git
cd portfolio

# 2. Start a local server (choose one method above)
python -m http.server 8000

# 3. Open in browser
# Navigate to http://localhost:8000

# 4. Make changes and refresh to see updates
# Edit HTML/CSS/JS files and save
```

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── assets/                 # Static assets directory
│   ├── css/
│   │   ├── style.css      # Main stylesheet
│   │   └── responsive.css # Media queries for responsiveness
│   ├── js/
│   │   ├── main.js        # Main JavaScript file
│   │   └── utils.js       # Utility functions
│   └── images/            # Images and icons
│       ├── hero.jpg
│       ├── projects/      # Project screenshots
│       └── icons/         # Social media icons
├── README.md              # This file
├── LICENSE                # License information
└── .gitignore             # Git ignore rules
```

## 🛠️ Technologies

| Technology | Purpose | Percentage |
|-----------|---------|-----------|
| **HTML5** | Structure & Markup | 76.1% |
| **CSS3** | Styling & Responsive Design | 12.2% |
| **JavaScript (Vanilla)** | Interactivity & Animations | 11.7% |

### Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## ⚙️ Configuration

### Customization Guide

#### Update Personal Information

Edit `index.html` and update:
- Name and title in the hero section
- Contact information (email, phone)
- Social media links
- Project descriptions

#### Modify Styling

Edit `assets/css/style.css` to customize:
- Color scheme
- Fonts and typography
- Spacing and layout
- Component styles

#### Add Interactivity

Edit `assets/js/main.js` to add:
- Form submissions
- Smooth scrolling
- Dynamic content loading
- Analytics tracking

### Color Palette

The portfolio uses the following color scheme (customizable in CSS):

```css
--primary-color: #007bff;      /* Primary Blue */
--secondary-color: #6c757d;    /* Secondary Gray */
--accent-color: #28a745;       /* Accent Green */
--text-color: #333333;         /* Dark Text */
--bg-color: #ffffff;           /* White Background */
```

## 🌐 Deployment

### Deploy to GitHub Pages

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Select `main` branch as source
   - Click Save

2. **Access Your Live Portfolio**
   - Your site will be available at: `https://umairmujtaba987.github.io/portfolio`
   - Changes push automatically after committing to main branch

### Deploy to Other Platforms

#### Netlify
```bash
# Connect your GitHub repo to Netlify
# https://app.netlify.com
# Select your portfolio repository
# Netlify auto-deploys on push to main
```

#### Vercel
```bash
# Connect your GitHub repo to Vercel
# https://vercel.com
# Select your portfolio repository
# Vercel auto-deploys on push to main
```

#### Traditional Hosting
1. Build files locally
2. Upload `index.html`, `assets/` directory to your web host
3. Access via your domain

## 📝 Making Changes & Updates

### Adding New Projects

1. Open `index.html`
2. Locate the projects section
3. Add new project card using existing HTML structure
4. Add corresponding styles if needed
5. Commit and push changes

### Updating About Section

1. Edit the about section in `index.html`
2. Update your bio, skills, and experience
3. Save and refresh to preview
4. Commit changes

### Performance Optimization

- Compress images using [TinyPNG](https://tinypng.com/) or [ImageOptim](https://imageoptim.com/)
- Minify CSS and JavaScript for production
- Use lazy loading for images
- Enable caching in server configuration

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit with clear messages (`git commit -m 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Umair Mujtaba**

- GitHub: [@umairmujtaba987](https://github.com/umairmujtaba987)
- Portfolio: [https://umairmujtaba987.github.io/portfolio](https://umairmujtaba987.github.io/portfolio)
- Email: your-email@example.com

## 🙏 Acknowledgments

- Thanks to the open-source community
- Inspiration from modern portfolio designs
- Contributors and feedback providers

---

**Last Updated:** May 2026

For more information or questions, please open an [issue](https://github.com/umairmujtaba987/portfolio/issues) on GitHub.
