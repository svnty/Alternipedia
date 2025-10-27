// /pages/api/wiki-proxy.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slug = req.query.slug as string;
  const lang = req.query.lang || 'en';
  const url = `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(slug)}`;

  const html = await fetch(url).then(r => r.text());
  const $ = cheerio.load(html);

  $('link[rel="stylesheet"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href?.startsWith('/w/')) {
      $(el).attr('href', `https://${lang}.wikipedia.org${href}`);
    }
  });

  $('a[href^="/wiki/"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) {
      const slug = href.replace('/wiki/', '');
      $(el).attr('href', `/${lang}/wiki/${slug}/wikipedia`);
      $(el).attr('target', '_parent'); // make sure it opens in the parent window
    }
  });
  $('script').each((_, el) => {
    const src = $(el).attr('src');
    if (src?.startsWith('/w/')) {
      $(el).attr('src', `https://${lang}.wikipedia.org${src}`);
    }
  });

  $('img').each((_, el) => {
    const src = $(el).attr('src');
    if (src?.startsWith('/w/')) {
      $(el).attr('src', `https://${lang}.wikipedia.org${src}`);
    }
  });

  $('.navbox').remove();
  $('.vector-body-before-content').remove();
  $('.mwe-popups').remove();

  // Keep head for CSS/JS
  $('head').append(`
  <style>
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      overflow-x: hidden !important;
      max-width: 100% !important;
            background: transparent !important;
      color: inherit !important;
    }
    body {
      box-sizing: border-box;
    }
    img, table, pre {
      max-width: 100%;
      height: auto;
    }
  </style>
`);

  $('head').append(`
    <script>
function sendHeight() {
  const body = document.getElementById("bodyContent") || document.body;
  if (!body) return; // fail-safe
  const height = body.scrollHeight;
  window.parent.postMessage({ type: "wiki-height", height }, "*");
}

function setupObserver() {
  const body = document.getElementById("bodyContent") || document.body;
  if (!body) return;

  sendHeight(); // initial height

  const observer = new MutationObserver(sendHeight);
  observer.observe(body, { childList: true, subtree: true });
}

window.addEventListener("load", setupObserver);
</script>
  `);

  const head = $('head').html();
  const bodyContent = $('#bodyContent').html(); // includes parent for safety


  // Build stripped HTML
  const minimalHtml = `
    <!DOCTYPE html>
    <html lang="${lang}">
      <head>${head}</head>
      <body>
        <div id="bodyContentWrapper">
          ${bodyContent}
        </div>
      </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.send(minimalHtml);
}