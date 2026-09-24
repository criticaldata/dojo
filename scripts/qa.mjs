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

console.log('PASS structural section and navigation assertions');
