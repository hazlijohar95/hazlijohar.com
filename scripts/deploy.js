#!/usr/bin/env node

/**
 * HJC Chartered Accountants - Deployment Script
 * 
 * Usage:
 *   node scripts/deploy.js [environment] [options]
 * 
 * Environments:
 *   - development
 *   - staging
 *   - production
 * 
 * Options:
 *   --analyze    - Run bundle analysis
 *   --preview    - Start preview server
 *   --clean      - Clean build directory
 */

import { execSync } from 'child_process';
import { existsSync, rmSync } from 'fs';
import { join } from 'path';

const args = process.argv.slice(2);
const environment = args[0] || 'development';
const options = {
  analyze: args.includes('--analyze'),
  preview: args.includes('--preview'),
  clean: args.includes('--clean'),
};

console.log(`🚀 Deploying to ${environment} environment...`);

// Validate environment
const validEnvironments = ['development', 'staging', 'production'];
if (!validEnvironments.includes(environment)) {
  console.error(`❌ Invalid environment: ${environment}`);
  console.error(`Valid environments: ${validEnvironments.join(', ')}`);
  process.exit(1);
}

// Clean build directory if requested
if (options.clean) {
  console.log('🧹 Cleaning build directory...');
  const distPath = join(process.cwd(), 'dist');
  if (existsSync(distPath)) {
    rmSync(distPath, { recursive: true, force: true });
    console.log('✅ Build directory cleaned');
  }
}

// Run security audit
console.log('🔒 Running security audit...');
try {
  execSync('npm run security:audit', { stdio: 'inherit' });
  console.log('✅ Security audit passed');
} catch (error) {
  console.error('❌ Security audit failed');
  process.exit(1);
}

// Run type checking
console.log('🔍 Running type checking...');
try {
  execSync('npm run type-check', { stdio: 'inherit' });
  console.log('✅ Type checking passed');
} catch (error) {
  console.error('❌ Type checking failed');
  process.exit(1);
}

// Run linting
console.log('📝 Running linting...');
try {
  execSync('npm run lint', { stdio: 'inherit' });
  console.log('✅ Linting passed');
} catch (error) {
  console.error('❌ Linting failed');
  process.exit(1);
}

// Build the application
console.log(`🏗️ Building for ${environment}...`);
try {
  const buildCommand = environment === 'production' ? 'npm run build:prod' : 'npm run build:dev';
  execSync(buildCommand, { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
}

// Run bundle analysis if requested
if (options.analyze) {
  console.log('📊 Running bundle analysis...');
  try {
    execSync('npx vite-bundle-analyzer dist/stats.html', { stdio: 'inherit' });
  } catch (error) {
    console.log('Bundle analyzer not available, skipping...');
  }
}

// Start preview server if requested
if (options.preview) {
  console.log('🌐 Starting preview server...');
  try {
    execSync('npm run preview', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Failed to start preview server');
    process.exit(1);
  }
}

// Deployment completed
console.log(`🎉 Deployment to ${environment} completed successfully!`);

// Show next steps
console.log('\n📋 Next steps:');
if (environment === 'production') {
  console.log('1. Upload dist/ folder to your hosting provider');
  console.log('2. Configure environment variables on your hosting platform');
  console.log('3. Set up SSL certificate');
  console.log('4. Configure CDN and caching');
  console.log('5. Set up monitoring and analytics');
} else if (environment === 'staging') {
  console.log('1. Deploy to staging server');
  console.log('2. Run integration tests');
  console.log('3. Perform user acceptance testing');
} else {
  console.log('1. Development server is running at http://localhost:8080');
  console.log('2. Make changes and see them live');
  console.log('3. Use npm run dev to restart the server');
}

console.log('\n🔗 Useful commands:');
console.log('- npm run dev          - Start development server');
console.log('- npm run build:prod   - Build for production');
console.log('- npm run preview      - Preview production build');
console.log('- npm run security:audit - Run security audit');
console.log('- npm run type-check   - Run TypeScript checking');
console.log('- npm run lint         - Run ESLint'); 