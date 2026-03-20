import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const BASE_URL = 'https://ninja-nexus-test-frontend.projectanddemoserver.com'
const TODAY = new Date().toISOString().split('T')[0]

// ── .htaccess ────────────────────────────────────────────────────────────────
const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
`
writeFileSync(join(__dirname, 'dist', '.htaccess'), htaccessContent)
console.log('.htaccess created in dist/')

// ── sitemap.xml ───────────────────────────────────────────────────────────────
const staticRoutes = [
  { path: '/',              priority: '1.0', changefreq: 'weekly'  },
  { path: '/destinations',  priority: '0.9', changefreq: 'weekly'  },
  { path: '/blog',          priority: '0.9', changefreq: 'daily'   },
  { path: '/services',      priority: '0.8', changefreq: 'monthly' },
  { path: '/gallery',       priority: '0.8', changefreq: 'weekly'  },
  { path: '/about',         priority: '0.7', changefreq: 'monthly' },
  { path: '/contact',       priority: '0.7', changefreq: 'monthly' },
  { path: '/testimonials',  priority: '0.7', changefreq: 'weekly'  },
  { path: '/faq',           priority: '0.6', changefreq: 'monthly' },
  { path: '/documents',     priority: '0.6', changefreq: 'monthly' },
  { path: '/booking',       priority: '0.6', changefreq: 'monthly' },
]

const destinationSlugs = [
  'bali-indonesia', 'paris-france', 'santorini-greece', 'safari-kenya',
  'machu-picchu-peru', 'tokyo-japan', 'new-york-usa', 'maldives',
  'iceland', 'amalfi-coast-italy',
]

const blogSlugs = [
  'best-time-to-visit-bali', 'paris-hidden-gems', 'packing-for-safari',
  'solo-travel-japan', 'greek-islands-guide', 'budget-travel-europe',
  'iceland-northern-lights', 'sustainable-travel-tips', 'maldives-ultimate-guide',
  'morocco-desert-adventure', 'new-zealand-road-trip', 'food-travel-italy',
  'vietnam-backpacker-guide',
]

const url = (path, priority, changefreq) => `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map(r => url(r.path, r.priority, r.changefreq)).join('')}
${destinationSlugs.map(s => url(`/destinations/${s}`, '0.8', 'weekly')).join('')}
${blogSlugs.map(s => url(`/blog/${s}`, '0.7', 'weekly')).join('')}
</urlset>
`

writeFileSync(join(__dirname, 'dist', 'sitemap.xml'), sitemapContent)
console.log('sitemap.xml created in dist/')
