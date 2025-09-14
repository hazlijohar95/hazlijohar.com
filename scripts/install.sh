#!/bin/bash

# Force npm installation for Cloudflare Pages
echo "🔧 Forcing npm installation..."

# Remove any bun-related files
rm -f bun.lockb
rm -f bun.lock

# Ensure npm is used
echo "📦 Installing with npm..."
npm install --legacy-peer-deps

echo "✅ npm installation completed"