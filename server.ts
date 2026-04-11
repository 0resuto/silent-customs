import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createServer() {
  const app = express();
  app.use(express.json());

  app.get('/robots.txt', (req, res) => {
    const siteUrl = process.env.SITE_URL || 'https://your-domain.ru';
    res.type('text/plain');
    res.send(`User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml`);
  });

  app.get('/sitemap.xml', (req, res) => {
    const siteUrl = process.env.SITE_URL || 'https://your-domain.ru';
    res.type('application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist'), { index: false }));
    app.get('*', (req, res) => {
      const indexPath = path.resolve(__dirname, 'dist', 'index.html');
      if (fs.existsSync(indexPath)) {
        let html = fs.readFileSync(indexPath, 'utf-8');
        const siteUrl = process.env.SITE_URL || 'https://your-domain.ru';
        const phone = process.env.PHONE || 'телефон';
        const phoneLink = process.env.PHONE_LINK || 'tel:#';
        const email = process.env.EMAIL || 'электронная почта';
        html = html.replace(/__SITE_URL__/g, siteUrl)
                   .replace(/__PHONE__/g, phone)
                   .replace(/__PHONE_LINK__/g, phoneLink)
                   .replace(/__EMAIL__/g, email);
        res.send(html);
      } else {
        res.status(404).send('Not found');
      }
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(req.originalUrl, template);
        const siteUrl = process.env.SITE_URL || 'https://your-domain.ru';
        const phone = process.env.PHONE || 'телефон';
        const phoneLink = process.env.PHONE_LINK || 'tel:#';
        const email = process.env.EMAIL || 'электронная почта';
        template = template.replace(/__SITE_URL__/g, siteUrl)
                           .replace(/__PHONE__/g, phone)
                           .replace(/__PHONE_LINK__/g, phoneLink)
                           .replace(/__EMAIL__/g, email);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${port}`);
  });
}

createServer();