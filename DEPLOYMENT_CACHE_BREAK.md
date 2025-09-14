# Deployment Cache Break

This file exists to force Cloudflare Pages to invalidate its cache and use the latest package.json without the postinstall script.

Deployment timestamp: 2025-09-14T05:51:00Z
Commit: 8bdeb66 (postinstall script removed)

## Issue
Cloudflare Pages was caching an old version of package.json that still contained:
```json
"postinstall": "npm run security:audit"
```

## Fix
- postinstall script completely removed from package.json
- This cache-breaking file forces fresh deployment
- NPM_CONFIG_AUDIT=false added to wrangler.toml