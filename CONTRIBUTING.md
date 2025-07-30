
# Contributing to HJC Chartered Accountants

Thank you for your interest in contributing to our project! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

We welcome contributions from the community! Here are the main ways you can help:

### 🐛 Reporting Bugs

1. **Check existing issues** - Search the [Issues](https://github.com/your-username/hjc-chartered-accountants/issues) to see if the bug has already been reported
2. **Create a new issue** - Use the bug report template and provide:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/OS information
   - Screenshots if applicable

### 💡 Suggesting Features

1. **Check existing discussions** - Look through [Discussions](https://github.com/your-username/hjc-chartered-accountants/discussions) for similar ideas
2. **Create a feature request** - Use the feature request template and include:
   - Clear description of the feature
   - Use cases and benefits
   - Implementation suggestions (if any)
   - Mockups or examples (if applicable)

### 🔧 Code Contributions

1. **Fork the repository**
2. **Create a feature branch** from `main`
3. **Make your changes** following our coding standards
4. **Test your changes** thoroughly
5. **Submit a pull request**

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- npm 9+ or yarn
- Git

### Getting Started

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/hjc-chartered-accountants.git
   cd hjc-chartered-accountants
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Run tests and checks**
   ```bash
   npm run test:full
   ```

## 📝 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode in `tsconfig.json`
- Use proper type annotations
- Avoid `any` type - use `unknown` instead
- Use interfaces for object shapes
- Use enums for constants

### React

- Use functional components with hooks
- Use TypeScript for props and state
- Follow React best practices
- Use proper error boundaries
- Implement proper loading states

### Code Style

- Use Prettier for formatting
- Follow ESLint rules
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Keep functions small and focused

### File Organization

```
src/
├── components/          # Reusable components
│   ├── ui/             # Basic UI components
│   ├── layout/         # Layout components
│   └── feature/        # Feature-specific components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript definitions
├── constants/          # Application constants
└── styles/             # Global styles
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test:full

# Run security tests
npm run test:security

# Run type checking
npm run type-check

# Run linting
npm run lint

# Run formatting check
npm run format:check
```

### Writing Tests

- Write tests for new features
- Ensure good test coverage
- Use descriptive test names
- Test both success and error cases
- Mock external dependencies

## 🔒 Security Guidelines

### Code Security

- Never commit sensitive information (API keys, passwords, etc.)
- Use environment variables for configuration
- Validate and sanitize all user inputs
- Follow OWASP security guidelines
- Use HTTPS for all external requests

### Security Checklist

- [ ] No hardcoded secrets
- [ ] Input validation implemented
- [ ] XSS protection in place
- [ ] CSRF protection enabled
- [ ] Rate limiting configured
- [ ] Security headers set
- [ ] Dependencies updated

## 📦 Pull Request Process

### Before Submitting

1. **Ensure tests pass**
   ```bash
   npm run test:full
   ```

2. **Check code quality**
   ```bash
   npm run lint
   npm run format:check
   npm run type-check
   ```

3. **Update documentation** if needed

4. **Test in different browsers** if UI changes

### Pull Request Guidelines

1. **Use descriptive titles** - "Add user authentication" not "Fix bug"
2. **Provide clear description** of changes
3. **Include screenshots** for UI changes
4. **Link related issues** using keywords
5. **Keep PRs focused** - one feature/fix per PR
6. **Respond to review comments** promptly

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Security review** for sensitive changes
4. **Testing** in staging environment
5. **Approval** from at least one maintainer

## 🏷️ Issue Labels

We use the following labels to organize issues:

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `security` - Security-related issues
- `performance` - Performance improvements
- `ui/ux` - User interface improvements

## 🎯 Good First Issues

If you're new to the project, look for issues labeled with `good first issue`. These are typically:

- Documentation improvements
- Simple bug fixes
- UI enhancements
- Test additions
- Code refactoring

## 📚 Resources

### Documentation

- [React Documentation](https://reactjs.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Supabase Documentation](https://supabase.com/docs)

### Tools

- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting
- [TypeScript](https://www.typescriptlang.org/) - Type checking

## 🆘 Getting Help

If you need help with your contribution:

1. **Check existing issues** and discussions
2. **Search documentation** and README
3. **Ask in Discussions** - Use the Q&A category
4. **Join our community** - Links in README

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:

- Project README
- Release notes
- Contributor hall of fame
- GitHub contributors page

---

Thank you for contributing to HJC Chartered Accountants! 🎉
