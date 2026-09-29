import { readFile } from 'node:fs/promises';

const html = await readFile('index.html', 'utf8');

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const paperList = html.match(/<div class="paper-list"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/)?.[0] ?? '';
const itemIndexes = [...paperList.matchAll(/class="paper-item__index">([^<]+)/g)].map((match) => match[1]);
const itemTitles = [...paperList.matchAll(/class="paper-item__title">([^<]+)/g)].map((match) => match[1]);

assert(itemIndexes.join('|') === '02|03|04|05|06|07|08|09|10|11', `Bibliography numbering mismatch: ${itemIndexes.join('|')}`);
assert(itemTitles[0] === 'Agents Catching Agents: Shortcut Cascades and Benchmark Gaming in Clinical Multi-Agent Systems', 'The requested second article is not first in the bibliography additions');
assert(itemTitles[1] === 'ModaLens: Measuring Image Sensitivity in Report-Conditioned Medical VLMs', 'ModaLens is missing or out of order');
assert(itemTitles[2] === 'Towards a Deterministic Math Solver for Clinical Language Models', 'The deterministic math solver paper is missing or out of order');

for (const url of [
  'https://arxiv.org/abs/2608.03744',
  'https://arxiv.org/abs/2609.15635',
  'https://arxiv.org/html/2609.10728',
]) {
  assert(paperList.includes(url), `Missing bibliography URL: ${url}`);
}

assert((html.match(/<details class="paper-item"/g) ?? []).length === 10, 'Bibliography should contain ten expandable additions after the DOJO paper');
console.log('PASS bibliography order, titles, URLs, and count assertions');
