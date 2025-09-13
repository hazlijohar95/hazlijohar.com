# Deployment Guide

## 🚀 Quick Start

### Development
```bash
npm run dev
```
Access at: `http://localhost:8080`

### Production Build
```bash
npm run build:prod
```
Files will be in: `dist/` folder

### Preview Production Build
```bash
npm run preview:prod
```
Access at: `http://localhost:4173`

## 📋 Pre-Deployment Checklist

### 1. Environment Setup
- [ ] `.env` file configured with production values
- [ ] Supabase project configured
- [ ] Database migrations applied
- [ ] Storage buckets configured

### 2. Security Audit
```bash
npm run security:full
```
- [ ] No security vulnerabilities
- [ ] Type checking passes
- [ ] Linting passes
- [ ] Code formatting correct

### 3. Build Test
```bash
npm run build:prod
npm run preview:prod
```
- [ ] Build completes successfully
- [ ] Application loads correctly
- [ ] All features work as expected

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Configure Environment Variables**
   - Go to Vercel Dashboard
   - Add all variables from `.env` file

4. **Custom Domain**
   - Add your domain in Vercel Dashboard
   - Configure DNS records

### Option 2: Netlify

1. **Build Command**
   ```bash
   npm run build:prod
   ```

2. **Publish Directory**
   ```
   dist
   ```

3. **Environment Variables**
   - Add in Netlify Dashboard

### Option 3: Traditional Hosting

1. **Build the application**
   ```bash
   npm run build:prod
   ```

2. **Upload files**
   - Upload `dist/` folder contents to your web server

3. **Configure server**
   - Set up HTTPS
   - Configure security headers
   - Set up caching

## 🔧 Server Configuration

### Nginx Configuration

```nginx
# Rate limiting
limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;
limit_req_zone $binary_remote_addr zone=api:10m rate=100r/m;

server {
    listen 80;
    server_name hazlijohar.com www.hazlijohar.com;
    return 301 https://hazlijohar.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.hazlijohar.com;
    return 301 https://hazlijohar.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name hazlijohar.com;

    # SSL Configuration with Let's Encrypt
    ssl_certificate /etc/letsencrypt/live/hazlijohar.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/hazlijohar.com/privkey.pem;
    ssl_certificate /etc/letsencrypt/live/hazlijohar.com/chain.pem;

    # Modern SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://app.cal.com https://cdn.gpteng.co https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://*.supabase.co https://app.cal.com https://www.google-analytics.com; frame-src https://app.cal.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;" always;

    # Root directory
    root /var/www/hazlijohar.com/dist;
    index index.html;

    # Logging
    access_log /var/log/nginx/hazlijohar.access.log;
    error_log /var/log/nginx/hazlijohar.error.log;

    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;

        # Security headers for HTML files
        location ~* \.html$ {
            add_header Cache-Control "no-cache, no-store, must-revalidate";
            add_header Pragma "no-cache";
            add_header Expires "0";
        }
    }

    # API rate limiting
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        limit_req_status 429;
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Authentication endpoints with stricter rate limiting
    location /auth/ {
        limit_req zone=login burst=3 nodelay;
        limit_req_status 429;
        proxy_pass http://localhost:3000;
    }

    # Static assets with long-term caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header Access-Control-Allow-Origin "*";

        # Brotli compression
        location ~* \.(js|css)$ {
            gzip_static on;
            brotli_static on;
        }
    }

    # Manifest and service worker
    location ~* \.(webmanifest|manifest\.json)$ {
        expires 1d;
        add_header Cache-Control "public";
    }

    location /sw.js {
        expires 0;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Security.txt for responsible disclosure
    location = /.well-known/security.txt {
        return 200 "Contact: hazli@hazlijohar.my\nExpires: 2025-12-31T23:59:59.000Z\n";
        add_header Content-Type text/plain;
    }

    # Block access to sensitive files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    location ~ ~$ {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json
        application/xml
        image/svg+xml;

    # Brotli compression (if module available)
    brotli on;
    brotli_comp_level 6;
    brotli_types
        text/plain
        text/css
        application/json
        application/javascript
        text/xml
        application/xml
        application/xml+rss
        text/javascript;
}
```

### Apache Configuration
```apache
<VirtualHost *:80>
    ServerName hjc-malaysia.com
    ServerAlias www.hjc-malaysia.com
    Redirect permanent / https://hjc-malaysia.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName hjc-malaysia.com
    ServerAlias www.hjc-malaysia.com
    
    DocumentRoot /var/www/hjc-malaysia.com
    
    # SSL Configuration
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
    
    # Security Headers
    Header always set X-Frame-Options "DENY"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://app.cal.com https://cdn.gpteng.co; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://ekgglnhnitrffayubchl.supabase.co https://app.cal.com; frame-src https://app.cal.com;"
    
    # SPA Routing
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ /index.html [QSA,L]
    
    # Cache static assets
    <FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
        Header set Cache-Control "public, immutable"
    </FilesMatch>
    
    # Gzip compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/plain
        AddOutputFilterByType DEFLATE text/html
        AddOutputFilterByType DEFLATE text/xml
        AddOutputFilterByType DEFLATE text/css
        AddOutputFilterByType DEFLATE application/xml
        AddOutputFilterByType DEFLATE application/xhtml+xml
        AddOutputFilterByType DEFLATE application/rss+xml
        AddOutputFilterByType DEFLATE application/javascript
        AddOutputFilterByType DEFLATE application/x-javascript
    </IfModule>
</VirtualHost>
```

## 🔒 Security Configuration

### Environment Variables
```bash
# Production .env
VITE_SUPABASE_URL=https://ekgglnhnitrffayubchl.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_key_here
VITE_APP_ENVIRONMENT=production
VITE_ENABLE_DEBUG_MODE=false
VITE_ENABLE_ANALYTICS=true
```

### SSL Certificate
- Use Let's Encrypt for free SSL certificates
- Configure automatic renewal
- Use HSTS headers

### CDN Configuration
- Set up Cloudflare or similar CDN
- Configure caching rules
- Enable DDoS protection

## 📊 Monitoring & Analytics

### Error Tracking
- Set up Sentry for error monitoring
- Configure error alerts
- Monitor performance metrics

### Analytics
- Google Analytics 4
- Configure privacy settings
- Set up conversion tracking

### Performance Monitoring
- Web Vitals monitoring
- Core Web Vitals tracking
- Performance budgets

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run security audit
      run: npm run security:full
    
    - name: Build application
      run: npm run build:prod
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'
```

## 🚨 Troubleshooting

### Common Issues

1. **Build fails**
   - Check environment variables
   - Run `npm run security:full`
   - Check for TypeScript errors

2. **App doesn't load**
   - Check browser console for errors
   - Verify Supabase connection
   - Check network requests

3. **Performance issues**
   - Run bundle analysis: `npm run build:analyze`
   - Check Core Web Vitals
   - Optimize images and assets

4. **Security warnings**
   - Run security audit: `npm run security:audit`
   - Update dependencies: `npm run update:security`
   - Check for vulnerabilities

### Support
For deployment issues, contact:
- Email: hazli@hazlijohar.my
- Phone: +6016-3889123

---

**Last Updated**: December 2024
**Version**: 1.0.0 