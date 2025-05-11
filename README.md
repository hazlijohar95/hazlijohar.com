
# HJC - Chartered Accountants Malaysia

<p align="center">
  <img src="public/favicon.svg" alt="HJC Logo" width="120">
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT"></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
</p>

This is the official website repository for HJC, a leading chartered accountancy firm in Malaysia.

## Overview

HJC helps modern businesses in Malaysia grow with clarity and confidence through our professional financial services.

## ✨ Features

- Modern, responsive design optimized for all devices
- Client dashboard for secure document management
- Comprehensive financial services overview
- Team and leadership profiles
- Interactive contact and booking system using Cal.com integration
- Secure document vault for client file storage

## 🛠️ Tech Stack

This project is built with:

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **State Management**: React Context API and TanStack Query
- **Backend**: Supabase (Auth, Storage, Database)
- **Booking**: Cal.com integration
- **Charts**: Recharts

## 🚀 Development

### Prerequisites

- Node.js 18+ & npm (or Bun)
- Supabase account (for backend features)

### Getting Started

```sh
# Clone the repository
git clone https://github.com/hjc-malaysia/website.git

# Navigate to the project directory
cd hjc-website

# Install dependencies
npm install
# or
bun install

# Start the development server
npm run dev
# or
bun dev
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Project Structure

- `/src` - Source code
  - `/components` - Reusable React components
  - `/pages` - Page components
  - `/hooks` - Custom React hooks
  - `/context` - React context providers
  - `/data` - Static data files
  - `/types` - TypeScript type definitions
  - `/styles` - Global styles
  - `/lib` - Utility functions
  - `/integrations` - Third-party service integrations

## 📦 Building for Production

```sh
# Build for production
npm run build
# or
bun run build

# Preview the production build
npm run preview
# or
bun run preview
```

## 🤝 Contributing

We welcome contributions to improve the website! See our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For any inquiries, please reach out to us at [contact@hjc-malaysia.com](mailto:contact@hjc-malaysia.com).

---

Made with ❤️ by the HJC team and contributors
