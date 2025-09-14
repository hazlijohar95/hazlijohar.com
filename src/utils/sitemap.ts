
export const generateSitemap = () => {
  const baseUrl = 'https://hjc-malaysia.com';
  const pages = [
    { url: '/', changefreq: 'weekly', priority: '1.0' },
    { url: '/contact', changefreq: 'monthly', priority: '0.8' },
    { url: '/culture', changefreq: 'monthly', priority: '0.7' },
    { url: '/#services', changefreq: 'weekly', priority: '0.9' },
    { url: '/#leadership', changefreq: 'monthly', priority: '0.8' },
    { url: '/#faq', changefreq: 'weekly', priority: '0.6' }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('')}
</urlset>`;

  return sitemap;
};

export const generateRobotsTxt = () => `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot  
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 1

User-agent: DuckDuckBot
Allow: /
Crawl-delay: 1

User-agent: Baiduspider
Allow: /
Crawl-delay: 2

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

User-agent: TelegramBot
Allow: /

Disallow: /api/
Disallow: /admin/
Disallow: /*.json$
Disallow: /*?*utm_*
Disallow: /*?*ref=*

Sitemap: https://hjc-malaysia.com/sitemap.xml
`;
