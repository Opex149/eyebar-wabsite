import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

const dist = resolve('dist');
const cache = resolve('node_modules/.cache');
await mkdir(cache, { recursive: true });
const temporary = await mkdtemp(join(cache, 'eyebar-prerender-'));

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

try {
  await build({
    logLevel: 'warn',
    publicDir: false,
    build: { ssr: 'src/entry-server.tsx', outDir: temporary, copyPublicDir: false },
  });
  const { render, content, localePaths, siteUrl } = await import(pathToFileURL(join(temporary, 'entry-server.js')));
  const template = await readFile(join(dist, 'index.html'), 'utf8');
  const locales = Object.keys(localePaths);
  const pageUrl = (locale) => new URL(localePaths[locale], siteUrl).href;
  const alternateLinks = locales.map((locale) => `<link rel="alternate" hreflang="${locale}" href="${pageUrl(locale)}" />`);

  for (const locale of locales) {
    const { title, description } = content[locale];
    const image = `${siteUrl}media/social-${locale}.jpg`;
    const head = [
      `<title>${escapeHtml(title)}</title>`,
      `<meta name="description" content="${escapeHtml(description)}" />`,
      `<link rel="canonical" href="${pageUrl(locale)}" />`,
      ...alternateLinks,
      `<link rel="alternate" hreflang="x-default" href="${siteUrl}" />`,
      '<meta property="og:type" content="website" />',
      '<meta property="og:site_name" content="EyeBar" />',
      `<meta property="og:locale" content="${locale === 'ru' ? 'ru_RU' : 'en_US'}" />`,
      `<meta property="og:locale:alternate" content="${locale === 'ru' ? 'en_US' : 'ru_RU'}" />`,
      `<meta property="og:title" content="${escapeHtml(title)}" />`,
      `<meta property="og:description" content="${escapeHtml(description)}" />`,
      `<meta property="og:url" content="${pageUrl(locale)}" />`,
      `<meta property="og:image" content="${image}" />`,
      '<meta property="og:image:width" content="1200" />',
      '<meta property="og:image:height" content="630" />',
      '<meta property="og:image:alt" content="EyeBar · Classic Blue" />',
      '<meta name="twitter:card" content="summary_large_image" />',
      `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
      `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
      `<meta name="twitter:image" content="${image}" />`,
    ].join('\n    ');
    const html = template
      .replace('<html lang="ru">', `<html lang="${locale}">`)
      .replace(/<!--page-meta:start-->[\s\S]*?<!--page-meta:end-->/, () => head)
      .replace('<!--app-html-->', () => render(locale));
    const directory = join(dist, localePaths[locale]);
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, 'index.html'), html);
  }

  // A real standalone entry point for the installed iPhone/Android web app.
  const appDir = join(dist, 'app');
  await mkdir(appDir, { recursive: true });
  const appHtml = template
    .replace('<!--app-html-->', '')
    .replace('<title>EyeBar — твой рабочий стол. По-новому.</title>', '<title>EyeBar Web</title>');
  await writeFile(join(appDir, 'index.html'), appHtml);

  const urlSet = locales.map((locale) => `  <url><loc>${pageUrl(locale)}</loc></url>`).join('\n');
  await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlSet}\n</urlset>\n`);
  console.log(`Prerendered ${locales.join(' and ')} pages in dist/.`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
