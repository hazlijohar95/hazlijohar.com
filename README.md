# HJC Chartered Accountants - Client Portal

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-2.49-green.svg)](https://supabase.com/)

A modern, secure client portal for chartered accountants built with React, TypeScript, and Supabase. Features document management, secure authentication, and a professional dashboard for financial services.

## ✨ Features

- 🔐 **Secure Authentication** - Supabase Auth with role-based access
- 📁 **Document Management** - Upload, organize, and share financial documents
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🔒 **Security First** - Comprehensive security measures and best practices
- 📱 **Mobile Responsive** - Works perfectly on all devices
- ⚡ **Performance Optimized** - Fast loading with code splitting and compression
- 🛡️ **Type Safe** - Full TypeScript support for better development experience

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+ or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/hjc-chartered-accountants.git
   cd hjc-chartered-accountants
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```bash
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── dashboard/      # Dashboard-specific components
│   ├── layout/         # Layout components
│   ├── routing/        # Routing components
│   ├── security/       # Security components
│   └── ui/            # Reusable UI components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── integrations/       # Third-party integrations
│   └── supabase/      # Supabase configuration
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # Global styles
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `VITE_APP_NAME` | Application name | No |
| `VITE_ENABLE_DEBUG_MODE` | Enable debug mode | No |
| `VITE_MAX_FILE_SIZE_MB` | Maximum file upload size | No |

### Supabase Setup

1. Create a new Supabase project
2. Set up authentication (Email/Password)
3. Create the following tables:

```sql
-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  company TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents table
CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  service_type TEXT NOT NULL,
  file_type TEXT NOT NULL,
  size BIGINT NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own documents" ON documents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents" ON documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents" ON documents
  FOR DELETE USING (auth.uid() = user_id);
```

4. Set up storage bucket for documents:
   - Create a bucket named `client_documents`
   - Set up storage policies for user access

## 📜 Available Scripts

### Development
```bash
npm run dev              # Start development server
npm run build:dev        # Build for development
npm run preview          # Preview production build
```

### Production
```bash
npm run build:prod       # Build for production
npm run preview:prod     # Build and preview production
npm run deploy:prod      # Deploy to production
```

### Code Quality
```bash
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting issues
npm run type-check       # Run TypeScript checking
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
```

### Security
```bash
npm run security:audit   # Run security audit
npm run security:full    # Full security check
npm run test:security    # Security testing
```

### Utilities
```bash
npm run clean            # Clean build artifacts
npm run update           # Update dependencies
npm run build:analyze    # Analyze bundle size
```

## 🚀 Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Configure environment variables in Vercel dashboard

### Netlify

1. Build command: `npm run build:prod`
2. Publish directory: `dist`
3. Add environment variables in Netlify dashboard

### Traditional Hosting

1. Build the application:
   ```bash
   npm run build:prod
   ```

2. Upload `dist/` folder contents to your web server

3. Configure server (see `DEPLOYMENT.md` for detailed instructions)

## 🔒 Security Features

- **Input Validation** - Comprehensive validation with Zod schemas
- **XSS Prevention** - Input sanitization and CSP headers
- **CSRF Protection** - Built-in protection with Supabase
- **Rate Limiting** - Configurable rate limiting for API endpoints
- **Secure Headers** - Comprehensive security headers
- **File Upload Security** - Strict file type and size validation
- **Authentication** - Secure session management with Supabase Auth

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run test:full`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
- **Security**: [SECURITY.md](SECURITY.md) for security information
- **Issues**: [GitHub Issues](https://github.com/your-username/hjc-chartered-accountants/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/hjc-chartered-accountants/discussions)

## 🙏 Acknowledgments

- [Supabase](https://supabase.com/) for the backend infrastructure
- [Vite](https://vitejs.dev/) for the build tool
- [React](https://reactjs.org/) for the UI framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://www.radix-ui.com/) for accessible components

## 📊 Project Status

- ✅ Core functionality implemented
- ✅ Security measures in place
- ✅ Documentation complete
- ✅ Ready for production deployment
- 🔄 Continuous improvements

---

**Built with ❤️ for the accounting community**
