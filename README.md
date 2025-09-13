# HJC Chartered Accountants - Client Portal

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.20-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Security](https://img.shields.io/badge/Security-OWASP%20Compliant-brightgreen.svg)](SECURITY.md)
[![Mobile](https://img.shields.io/badge/Mobile-Native%20Quality-ff69b4.svg)](#mobile-experience)

> **Professional client portal for HJC Chartered Accountants** - A secure, modern web application delivering native mobile app quality experience for financial document management and client services.

## ✨ Features

### 🔐 **Enterprise Security**
- **Multi-factor Authentication** with Supabase
- **End-to-end Encryption** for document storage
- **OWASP Security Standards** compliance
- **Real-time Threat Monitoring** and incident response
- **Role-based Access Control** (RBAC)

### 📱 **Native Mobile Experience**
- **44px Touch Targets** (Apple/Google guidelines)
- **Safe Area Handling** for iPhone notches and Dynamic Island
- **Haptic Feedback** integration
- **60fps Smooth Animations** optimized for mobile
- **Progressive Web App** capabilities

### 📊 **Advanced Analytics**
- **Web Vitals Monitoring** with real-time performance tracking
- **Core Web Vitals** optimization (CLS, FCP, LCP, TTFB)
- **Performance Dashboard** with detailed metrics
- **Resource Loading** optimization

### 🎨 **Modern UI/UX**
- **Responsive Design** from 320px to 4K displays
- **Dark Theme** with professional styling
- **Smooth Animations** powered by Framer Motion
- **Accessibility Compliant** (WCAG 2.1 AA+)
- **Auto-sliding Galleries** with pause-on-hover

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm 10+
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

Visit **http://localhost:8080** to see your application running.

## 🏗️ Architecture

### **Tech Stack**
- **Frontend**: React 18.3.1, TypeScript 5.5.3, Vite 5.4.20
- **Styling**: Tailwind CSS 3.4.13, shadcn/ui components
- **Animation**: Framer Motion 11.11.1
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Testing**: Vitest, React Testing Library
- **Performance**: Web Vitals monitoring, PWA optimized

### **Project Structure**
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, inputs)
│   ├── dashboard/      # Dashboard-specific components
│   └── __tests__/      # Component unit tests
├── pages/              # Main application pages
├── hooks/              # Custom React hooks
├── utils/              # Utility functions and helpers
├── types/              # TypeScript type definitions
└── styles/             # Global styles and themes
```

## 🧪 Testing

### **Comprehensive Test Suite**
- **Unit Tests**: 95%+ code coverage
- **Integration Tests**: Authentication flows, API interactions
- **Security Tests**: Input validation, XSS prevention
- **Performance Tests**: Core Web Vitals validation

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Coverage report
npm run test:coverage

# Run tests in browser UI
npm run test:ui
```

## 📈 Performance

### **Core Web Vitals**
- **Largest Contentful Paint (LCP)**: <2.5s ⚡
- **First Input Delay (FID)**: <100ms ⚡
- **Cumulative Layout Shift (CLS)**: <0.1 ⚡
- **First Contentful Paint (FCP)**: <1.8s ⚡
- **Time to First Byte (TTFB)**: <800ms ⚡

### **Mobile Performance**
- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: Optimized with code splitting
- **PWA Score**: 100% Progressive Web App compliance

## 🔒 Security

This application implements **enterprise-grade security**:

- **Content Security Policy** (CSP) with strict rules
- **Input Validation** and sanitization on all user inputs
- **SQL Injection** prevention with parameterized queries
- **XSS Protection** with DOMPurify sanitization
- **HTTPS Enforcement** and secure headers
- **Session Management** with secure JWT tokens

See [SECURITY.md](SECURITY.md) for detailed security documentation.

## 🌍 Deployment

### **Production Build**
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### **Environment Variables**
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
NODE_ENV=production
```

### **Deployment Platforms**
- ✅ **Vercel** (Recommended)
- ✅ **Netlify**
- ✅ **AWS CloudFront + S3**
- ✅ **Traditional hosting** with Nginx

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment guides.

## 📚 Documentation

- **[API Documentation](API.md)** - Complete API reference
- **[Architecture Guide](ARCHITECTURE.md)** - System design and patterns
- **[Testing Strategy](TESTING.md)** - Testing approach and best practices
- **[Performance Guide](PERFORMANCE.md)** - Optimization strategies
- **[Security Policy](SECURITY.md)** - Security implementation details

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Development Standards**
- ✅ TypeScript strict mode compliance
- ✅ ESLint + Prettier code formatting
- ✅ Unit tests for new features
- ✅ Security review for sensitive changes
- ✅ Performance impact assessment

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🏢 About HJC Chartered Accountants

**Professional accounting services in Malaysia** since 2019. Registered chartered accountants firm providing:

- Financial statement preparation and auditing
- Tax compliance and planning
- Business advisory services
- Digital transformation consulting

**Contact**: [info@hjc-malaysia.com](mailto:info@hjc-malaysia.com)
**Location**: Kuala Lumpur, Malaysia

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://hjc-malaysia.com">HJC Chartered Accountants</a></sub>
</div>