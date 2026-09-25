import { access, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const expectedSections = [
  'home',
  'problem',
  'what-is-dojo',
  'how-it-works',
  'evaluation-planes',
  'evidence-readiness',
  'research',
  'team',
  'get-involved',
  'contact',
];
const requiredFiles = ['index.html', 'styles.css', 'script.js', 'favicon.svg', '404.html', 'robots.txt'];
const html = await readFile('index.html', 'utf8');
const css = await readFile('styles.css', 'utf8');
const script = await readFile('script.js', 'utf8');

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

for (const file of requiredFiles) {
  await access(file);
}

const sectionIds = [...html.matchAll(/<section[^>]*\bid="([^"]+)"/g)].map((match) => match[1]);
const allIds = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const internalLinks = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = allIds.filter((id, index) => allIds.indexOf(id) !== index);

assert(sectionIds.join('|') === expectedSections.join('|'), `Section order mismatch: ${sectionIds.join(', ')}`);
assert(duplicateIds.length === 0, `Duplicate IDs found: ${duplicateIds.join(', ')}`);
for (const id of internalLinks) {
  assert(allIds.includes(id), `Missing internal anchor target: #${id}`);
}
assert(/<html\s+lang="en">/.test(html), 'Document language must be en');
assert(/<meta\s+name="viewport"\s+content="width=device-width, initial-scale=1">/.test(html), 'Viewport meta tag is missing');
assert(/<a\s+class="skip-link"\s+href="#main">/.test(html), 'Skip link is missing');
assert((html.match(/<details\b/g) ?? []).length === 3, 'Expected three native evaluation details cards');

for (const anchor of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
  assert(/rel="[^"]*noopener[^"]*noreferrer[^"]*"/.test(anchor[0]), `Unsafe new-tab link: ${anchor[0]}`);
}

for (const token of [
  '--color-ivory: #f5f1eb',
  '--color-paper: #fffdf9',
  '--color-ink: #25221f',
  '--color-muted: #6e6861',
  '--color-terracotta: #8f3f30',
  '--color-sage: #2f634e',
  '--color-line: #d8d0c7',
  '--font-display: Georgia',
  '--font-body: Inter',
]) {
  assert(css.includes(token), `Missing visual token: ${token}`);
}
assert(css.includes('html.js-enabled [data-reveal]'), 'Reveal styles must be gated behind html.js-enabled');
assert(css.includes('html.js-enabled [data-reveal].is-visible'), 'Reveal styles must restore visible state with .is-visible');

for (const hook of [
  'function initMobileMenu',
  'function initScrollReveal',
  "classList.add('js-enabled')",
  'IntersectionObserver',
  "addEventListener('DOMContentLoaded'",
]) {
  assert(script.includes(hook), `Missing progressive enhancement hook: ${hook}`);
}

for (const contentMarker of [
  'Experimental Model',
  'Technical System',
  'Clinical Solution',
  'https://doi.org/10.1136/bmj-2024-081554',
  'regulatory approval',
]) {
  assert(html.includes(contentMarker), `Missing source-backed content marker: ${contentMarker}`);
}

assert((html.match(/class="signal-orbit[^\"]*"/g) ?? []).length >= 3, 'Hero needs at least three orbital rings');
assert((css.match(/@keyframes signal-spin-/g) ?? []).length === 3, 'Hero needs three named orbital animations');
assert(/\.signal-core\s*\{[\s\S]*?background:\s*var\(--color-terracotta\)/.test(css), 'Hero core must use the Explore DOJO terracotta');
assert(css.includes('.signal-orbit::before'), 'Hero orbit needs additional satellite dots');
assert(/\.signal-orbit\s*\{\s*animation:\s*none !important;/.test(css), 'Reduced motion must disable orbital animation');

const anatomyMarks = [...html.matchAll(/data-anatomy-mark="([^"]+)"/g)].map((match) => match[1]);
for (const mark of ['brain', 'heart-lungs', 'spine', 'torso', 'hand', 'foot']) {
  assert(anatomyMarks.includes(mark), `Missing native anatomy mark: ${mark}`);
}
assert(anatomyMarks.length >= 6, 'Page needs a head-to-feet anatomy sequence');
assert((html.match(/<svg\b/g) ?? []).length >= 6, 'Anatomy marks must use native SVG');
assert(/\.anatomy-mark\s*\{[\s\S]*?position:\s*absolute/.test(css), 'Anatomy marks must be decorative positioned elements');
assert(css.includes('@keyframes anatomy-float'), 'Anatomy marks need a subtle float animation');
assert(/\.anatomy-mark\s*\{[\s\S]*?animation:\s*none !important;/.test(css), 'Reduced motion must disable anatomy animation');

console.log('PASS static structure, accessibility metadata, and anchor assertions');
console.log('PASS visual tokens, progressive enhancement, and source-backed content assertions');

let browser;
try {
  const localChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || (existsSync(localChrome) ? localChrome : undefined);
  browser = await chromium.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
  });
  const page = await browser.newPage({ viewport: { width: 320, height: 900 } });
  await page.goto(process.env.DOJO_QA_URL || 'http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded' });

  const pageState = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    viewport: document.querySelector('meta[name="viewport"]')?.content,
    skipLink: document.querySelector('.skip-link')?.getAttribute('href'),
    sections: [...document.querySelectorAll('section')].map((section) => section.id),
    ids: [...document.querySelectorAll('[id]')].map((element) => element.id),
    internalLinks: [...document.querySelectorAll('a[href^="#"]')].map((link) => link.getAttribute('href').slice(1)),
    details: document.querySelectorAll('details').length,
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    externalLinksSafe: [...document.querySelectorAll('a[target="_blank"]')].every((link) => {
      const rel = link.rel.split(/\s+/);
      return rel.includes('noopener') && rel.includes('noreferrer');
    }),
  }));
  assert(pageState.lang === 'en', 'Browser language assertion failed');
  assert(pageState.viewport === 'width=device-width, initial-scale=1', 'Browser viewport assertion failed');
  assert(pageState.skipLink === '#main', 'Browser skip-link assertion failed');
  assert(pageState.sections.join('|') === expectedSections.join('|'), 'Browser section order assertion failed');
  assert(new Set(pageState.ids).size === pageState.ids.length, 'Browser IDs are not unique');
  assert(pageState.internalLinks.every((id) => pageState.ids.includes(id)), 'Browser found a broken internal anchor');
  assert(pageState.details === 3, 'Browser details-card count failed');
  assert(pageState.externalLinksSafe, 'Browser found an unsafe new-tab link');
  assert(pageState.scrollWidth <= pageState.clientWidth, `Horizontal overflow at 320px: ${pageState.scrollWidth}px`);
  console.log('PASS browser structure and 320px overflow assertions');

  const toggle = page.locator('[data-mobile-menu-toggle]');
  const menu = page.locator('[data-mobile-menu]');
  await toggle.click();
  assert(await toggle.getAttribute('aria-expanded') === 'true', 'Mobile menu did not open');
  assert(await menu.isVisible(), 'Mobile menu is not visible after opening');
  await page.keyboard.press('Escape');
  assert(await toggle.getAttribute('aria-expanded') === 'false', 'Escape did not close mobile menu');
  assert(await page.evaluate(() => document.activeElement?.matches('[data-mobile-menu-toggle]')), 'Escape did not restore focus');
  console.log('PASS mobile-menu keyboard assertions');
} finally {
  await browser?.close();
}
