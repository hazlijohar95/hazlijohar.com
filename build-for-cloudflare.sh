#!/bin/bash

# AGGRESSIVE Cloudflare Pages Build Script v2.0
# This script FORCES fresh installation bypassing ALL npm lifecycle hooks

set -e  # Exit on any error

echo "🚀 AGGRESSIVE Cloudflare Pages build v2.0..."
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Project: hazlijohar-website-v2 @ 2.0.0"

# Remove any existing installations
echo "🧹 Cleaning any existing installations..."
rm -rf node_modules package-lock.json || true

# Set aggressive npm config to disable ALL lifecycle scripts
echo "⚙️ Configuring npm for aggressive bypass..."
export NPM_CONFIG_IGNORE_SCRIPTS=true
export NPM_CONFIG_AUDIT=false
export NPM_CONFIG_FUND=false
export NPM_CONFIG_UPDATE_NOTIFIER=false

# Install dependencies with MAXIMUM script disabling
echo "📦 Installing dependencies (MAXIMUM bypass mode)..."
if [ -f "package-lock.json" ]; then
  npm ci --ignore-scripts --no-audit --no-fund --omit=optional --progress=false --loglevel=warn
else
  npm install --ignore-scripts --no-audit --no-fund --omit=optional --progress=false --loglevel=warn
fi

echo "📋 Verifying installation..."
npm ls --depth=0 || true

# Run build directly
echo "🔨 Building project..."
npm run build

echo "✅ AGGRESSIVE build completed successfully!"