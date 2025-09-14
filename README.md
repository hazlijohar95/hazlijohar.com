# HJC Chartered Accountants Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-site-id/deploy-status.svg)](https://app.netlify.com/sites/your-site-name/deploys)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.20-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Professional website for HJC Chartered Accountants** - A modern, responsive web application delivering exceptional user experience for Malaysia's leading financial services firm.

## ✨ Features

### 🏢 **Professional Services**
- **Corporate Identity** with modern branding
- **Service Showcase** with interactive galleries
- **Client Portal** with secure authentication
- **Contact Management** with automated workflows
- **SEO Optimized** for search engine visibility

### 📱 **Mobile Excellence**
- **Responsive Design** from mobile to desktop
- **Touch-Optimized** interfaces and interactions
- **Fast Loading** with optimized performance
- **Progressive Web App** capabilities
- **Auto-Sliding Galleries** with smooth animations

### 🔐 **Security & Privacy**
- **Secure Authentication** with Supabase
- **Data Protection** with encryption
- **Privacy Compliant** with Malaysian regulations
- **Security Headers** and CSP protection
- **Regular Security Audits**

## 🚀 Quick Start

### Prerequisites
- **Node.js** 20+ and npm 10+
- **Git** for version control
- **Modern browser** with ES2022 support

### Installation

```bash
# Clone the repository
git clone https://github.com/hjc-malaysia/hazlijohar.com.git
cd hazlijohar.com

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Configure your Supabase credentials in .env

# Start development server
npm run dev
```

Visit **http://localhost:5173** to see your application running.

## 🛠️ Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite 5 for fast development and builds
- **Styling:** Tailwind CSS with custom components
- **UI Components:** Radix UI primitives
- **Animations:** Framer Motion for smooth interactions
- **Forms:** React Hook Form with Zod validation
- **State Management:** TanStack Query for server state
- **Backend:** Supabase (Authentication & Database)
- **Deployment:** Netlify with automatic deployments

## 📦 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # TypeScript type checking
npm run format       # Format code with Prettier
npm run prebuild     # Pre-build quality checks
```

### Testing
```bash
npm test             # Run tests in watch mode
npm run test:run     # Run all tests once
npm run test:coverage # Generate coverage report
npm run test:ui      # Run tests with UI
```

### Deployment
```bash
npm run deploy:netlify  # Deploy to Netlify production
npm run deploy:preview  # Deploy preview to Netlify
npm run deploy:build    # Build and deploy in one command
```

## 🌐 Deployment on Netlify

This project is optimized for **Netlify** deployment with automatic builds and deployments.

### Automatic Deployment (Recommended)

1. **Connect Repository to Netlify:**
   - Fork this repository to your GitHub account
   - Log in to [Netlify](https://netlify.com) and click "New site from Git"
   - Connect your GitHub account and select the forked repository

2. **Build Configuration:**
   Netlify will automatically detect the settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** `20`

3. **Environment Variables:**
   In Netlify Dashboard → Site settings → Environment variables, add:
   ```
   NODE_ENV=production
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Deploy:**
   - Push to `main` branch triggers automatic deployment
   - Preview deployments for pull requests
   - Rollback capability for quick recovery

### Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to your account
netlify login

# Build the project
npm run build

# Deploy to production
npm run deploy:netlify
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base components (buttons, inputs)
│   └── sections/       # Page sections and layouts
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
├── styles/             # Global styles and Tailwind config
├── types/              # TypeScript type definitions
└── assets/             # Static assets (images, icons)

public/
├── _headers            # Netlify security headers
├── _redirects          # SPA redirect rules
└── ...                # Static files

netlify.toml           # Netlify configuration
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Application Settings
VITE_APP_ENV=development
NODE_ENV=development
```

### Netlify Configuration

The `netlify.toml` file includes:
- **Build settings** for optimal performance
- **Redirect rules** for SPA routing
- **Security headers** for protection
- **Caching policies** for static assets

## 🧪 Testing

Comprehensive testing setup with Vitest:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test files
npm test src/components/ui/Button.test.tsx

# Run tests in CI mode
npm run test:run
```

## 📊 Performance

### Core Web Vitals
- **Largest Contentful Paint (LCP):** < 2.5s
- **First Input Delay (FID):** < 100ms
- **Cumulative Layout Shift (CLS):** < 0.1
- **First Contentful Paint (FCP):** < 1.8s

### Optimization Features
- **Code Splitting** for reduced bundle size
- **Image Optimization** with WebP support
- **Lazy Loading** for images and components
- **Tree Shaking** for minimal bundle size
- **Compression** (Gzip & Brotli)

## 🔒 Security

Security features implemented:

- **Content Security Policy** (CSP)
- **XSS Protection** headers
- **HTTPS Enforcement**
- **Secure Authentication** with Supabase
- **Input Validation** and sanitization
- **Regular Dependency Updates**

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Make** your changes following our coding standards
4. **Test** your changes: `npm run test && npm run type-check`
5. **Commit** with conventional format: `git commit -m "feat: add amazing feature"`
6. **Push** to your fork: `git push origin feature/amazing-feature`
7. **Create** a Pull Request

### Development Standards
- TypeScript strict mode enabled
- ESLint + Prettier for code quality
- Unit tests for new features
- Mobile-first responsive design
- Accessibility compliance (WCAG 2.1 AA)

## 📚 Documentation

- **[Architecture Guide](ARCHITECTURE.md)** - System design and patterns
- **[API Documentation](API.md)** - Complete API reference
- **[Security Policy](SECURITY.md)** - Security implementation
- **[Performance Guide](PERFORMANCE.md)** - Optimization strategies
- **[Testing Guide](TESTING.md)** - Testing approach

## 🆘 Support

For support and questions:

- 📧 **Email:** support@hazlijohar.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/hjc-malaysia/hazlijohar.com/issues)
- 📖 **Documentation:** Check the `/docs` folder

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🏢 About HJC Chartered Accountants

**Professional accounting services in Malaysia** since 2019. We are a registered chartered accountants firm providing:

- Financial statement preparation and auditing
- Tax compliance and advisory services
- Business advisory and consulting
- Corporate secretarial services
- Digital transformation solutions

**Contact:** [info@hjc-malaysia.com](mailto:info@hjc-malaysia.com)
**Location:** Kuala Lumpur, Malaysia
**Website:** [hazlijohar.com](https://hazlijohar.com)

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://hazlijohar.com">HJC Chartered Accountants</a></sub>
</div>