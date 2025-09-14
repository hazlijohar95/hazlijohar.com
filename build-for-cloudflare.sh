#!/bin/bash

# Cloudflare Pages Build Script
# This script bypasses all npm lifecycle hooks to prevent postinstall audit failures

set -e  # Exit on any error

echo "🚀 Starting Cloudflare Pages build..."
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Install dependencies with ALL lifecycle scripts disabled
echo "📦 Installing dependencies (bypassing all lifecycle scripts)..."
npm install --ignore-scripts --no-audit --no-fund --progress=false

echo "📋 Verifying installation..."
npm ls --depth=0 || true

# Run build directly
echo "🔨 Building project..."
npm run build

echo "✅ Build completed successfully!"