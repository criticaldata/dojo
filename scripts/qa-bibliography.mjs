import { readFile } from 'node:fs/promises';

const html = await readFile('index.html', 'utf8');
const teamSection = html.match(/<section id="team"[\s\S]*?<\/section>/)?.[0] ?? '';
const contactSection = html.match(/<section id="contact"[\s\S]*?<\/section>/)?.[0] ?? '';

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const paperList = html.match(/<div class="paper-list"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/)?.[0] ?? '';
const itemIndexes = [...paperList.matchAll(/class="paper-item__index">([^<]+)/g)].map((match) => match[1]);
const itemTitles = [...paperList.matchAll(/class="paper-item__title">([^<]+)/g)].map((match) => match[1]);

assert(itemIndexes.join('|') === '02|03|04|05|06|07|08|09|10|11|12|13|14', `Bibliography numbering mismatch: ${itemIndexes.join('|')}`);
assert(itemTitles[0] === 'Agents Catching Agents: Shortcut Cascades and Benchmark Gaming in Clinical Multi-Agent Systems', 'The requested second article is not first in the bibliography additions');
assert(itemTitles[1] === 'ModaLens: Measuring Image Sensitivity in Report-Conditioned Medical VLMs', 'ModaLens is missing or out of order');
assert(itemTitles[2] === 'Towards a Deterministic Math Solver for Clinical Language Models', 'The deterministic math solver paper is missing or out of order');
assert(itemTitles[3] === 'Sources of bias in artificial intelligence that perpetuate healthcare disparities—A global review', 'The bias review is missing or out of order');
assert(itemTitles[4] === 'Clinical artificial intelligence quality improvement: towards continual monitoring and updating of AI algorithms in healthcare', 'The clinical AI quality improvement paper is missing or out of order');
assert(itemTitles[5] === 'The myth of generalisability in clinical research and machine learning in health care', 'The generalisability paper is missing or out of order');
assert(itemTitles[6] === 'Assessing the potential of GPT-4 to perpetuate racial and gender biases in health care: a model evaluation study', 'The GPT-4 bias paper is missing or out of order');
assert(itemTitles[7] === 'Ethics of large language models in medicine and medical research', 'The LLM ethics paper is missing or out of order');
assert(itemTitles[8] === 'Leveraging electronic health records for data science: common pitfalls and how to avoid them', 'The EHR pitfalls paper is missing or out of order');
assert(itemTitles[9] === 'Equity in essence: a call for operationalising fairness in machine learning for healthcare', 'The equity paper is missing or out of order');
assert(itemTitles[10] === 'The reproducibility crisis in the age of digital medicine', 'The reproducibility paper is missing or out of order');
assert(itemTitles[11] === 'The “inconvenient truth” about AI in healthcare', 'The inconvenient truth paper is missing or out of order');
assert(itemTitles[12] === 'An embedded ethics approach for AI development', 'The embedded ethics paper is missing or out of order');

for (const url of [
  'https://arxiv.org/abs/2608.03744',
  'https://arxiv.org/abs/2609.15635',
  'https://arxiv.org/html/2609.10728',
  'https://doi.org/10.1371/journal.pdig.0000022',
  'https://doi.org/10.1038/s41746-022-00611-y',
  'https://doi.org/10.1016/S2589-7500(20)30186-2',
  'https://doi.org/10.1016/S2589-7500(23)00225-X',
  'https://doi.org/10.1016/S2589-7500(23)00083-3',
  'https://doi.org/10.1016/S2589-7500(22)00154-6',
  'https://doi.org/10.1136/bmjhci-2020-100289',
  'https://doi.org/10.1038/s41746-019-0079-z',
  'https://doi.org/10.1038/s41746-019-0155-4',
  'https://doi.org/10.1038/s42256-020-0214-1',
]) {
  assert(paperList.includes(url), `Missing bibliography URL: ${url}`);
}

assert((html.match(/<details class="paper-item"/g) ?? []).length === 13, 'Bibliography should contain thirteen expandable additions after the DOJO paper');
assert(html.includes('Selected publications from MIT Critical Data / DOJO'), 'Selected publications label is missing');
for (const removedTitle of [
  'Machine learning in medicine',
  'Ethical machine learning in healthcare',
  'Dissecting racial bias in an algorithm used to manage the health of populations',
  'AI recognition of patient race in medical imaging',
  'Underdiagnosis bias of AI algorithms applied to chest radiographs',
  'Implementation frameworks for end-to-end clinical AI: the SALIENT framework',
  'Foundation models for generalist medical artificial intelligence',
]) {
  assert(!html.includes(removedTitle), `Unselected general reference remains: ${removedTitle}`);
}

assert(teamSection.includes('assets/team/isaac-gavilanes.jpeg'), 'Isaac Gavilanes photo is missing from the team section');
assert(teamSection.includes('<h3>Isaac Gavilanes</h3>'), 'Isaac Gavilanes profile is missing from the team section');
assert(teamSection.includes('https://scholar.google.com/citations?user=Ji1mE78AAAAJ&amp;hl=es&amp;authuser=1'), 'Isaac Gavilanes Google Scholar link is missing');
assert(teamSection.includes('https://www.linkedin.com/in/ACoAAFCatZYBoY-ysMaO68JsqcT9DlFLV0vs3gc'), 'Isaac Gavilanes LinkedIn link is missing');
assert(teamSection.indexOf('Isaac Gavilanes') < teamSection.indexOf('Julie CHASSERIAUD'), 'Multidisciplinary researchers are not alphabetized');

assert(contactSection.includes('class="contact-people"'), 'Contact people list is missing');
for (const contactMarker of [
  'Leo Celi',
  'mailto:lceli@mit.edu',
  'lceli@mit.edu',
  'Sebastian Cajas',
  'mailto:asebasmos@mit.edu',
  'asebasmos@mit.edu',
  'Yehudhah Rodriguez',
  'mailto:yehudhah.rodriguez@yachaytech.edu.ec',
  'yehudhah.rodriguez@yachaytech.edu.ec',
]) {
  assert(contactSection.includes(contactMarker), `Missing contact marker: ${contactMarker}`);
}
console.log('PASS bibliography order, titles, URLs, and count assertions');
