import { readFile } from 'node:fs/promises';

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

const html = await readFile('index.html', 'utf8');
const css = await readFile('styles.css', 'utf8');
const script = await readFile('script.js', 'utf8');
const sectionIds = [...html.matchAll(/<section[^>]*\bid="([^"]+)"/g)].map((match) => match[1]);
const internalLinks = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);

if (sectionIds.join('|') !== expectedSections.join('|')) {
  throw new Error(`Section order mismatch: ${sectionIds.join(', ')}`);
}

for (const id of expectedSections) {
  if (!internalLinks.includes(id)) {
    throw new Error(`Missing navigation target: #${id}`);
  }
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
  if (!css.includes(token)) {
    throw new Error(`Missing visual token: ${token}`);
  }
}

if (!css.includes('html.js-enabled [data-reveal]')) {
  throw new Error('Reveal styles must be gated behind html.js-enabled');
}

if (!css.includes('html.js-enabled [data-reveal].is-visible')) {
  throw new Error('Reveal styles must restore visible state with .is-visible');
}

for (const hook of [
  'function initMobileMenu',
  'function initScrollReveal',
  "classList.add('js-enabled')",
  'IntersectionObserver',
  "addEventListener('DOMContentLoaded'",
]) {
  if (!script.includes(hook)) {
    throw new Error(`Missing progressive enhancement hook: ${hook}`);
  }
}

console.log('PASS structure, visual tokens, and progressive enhancement assertions');
