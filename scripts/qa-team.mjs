import { access, readFile } from 'node:fs/promises';

const html = (await readFile('index.html', 'utf8')).replaceAll('&amp;', '&');
const teamSection = html.match(/<section[^>]*id="team"[\s\S]*?<\/section>/)?.[0] ?? '';

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

for (const marker of [
  'Research Team',
  'Principal Investigator',
  'Leo Celi',
  'Julie CHASSERIAUD',
  'Sebastian Cajas',
  'Yehudhah Rodriguez',
  'assets/team/leo-celi.jpg',
  'assets/team/julie-chasseriaud.jpeg',
  'assets/team/sebastian-cajas.jpg',
  'assets/team/yehudhah-rodriguez.jpeg',
  'https://www.linkedin.com/in/leo-anthony-celi-b25131/',
  'https://scholar.google.com/citations?user=kssA7YwAAAAJ&hl=en',
  'https://www.linkedin.com/in/julie-chasseriaud-007886227',
  'https://scholar.google.com/citations?user=j1aZ9oYAAAAJ&hl=en',
  'https://www.linkedin.com/in/sebasmos777?originalSubdomain=ie',
  'https://scholar.google.com/citations?hl=en&user=lNl9qGAAAAAJ',
  'https://www.linkedin.com/in/yehudhah-kennedy-rodriguez-moran-27910b3b6?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
]) {
  assert(teamSection.includes(marker), `Missing team marker: ${marker}`);
}

assert(!teamSection.includes('Individual profiles'), 'Team section still contains the unconfirmed-profile placeholder');
assert((teamSection.match(/class="team-profile(?: team-profile--principal)?"/g) ?? []).length === 4, 'Team section should contain four profile cards');
assert(!teamSection.includes('team-card'), 'Team section should use profile cards instead of the old role cards');

for (const asset of [
  'assets/team/leo-celi.jpg',
  'assets/team/julie-chasseriaud.jpeg',
  'assets/team/sebastian-cajas.jpg',
  'assets/team/yehudhah-rodriguez.jpeg',
]) {
  await access(asset);
}

for (const anchor of teamSection.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
  assert(/rel="[^"]*noopener[^\"]*noreferrer[^\"]*"/.test(anchor[0]), 'Unsafe new-tab team link: ' + anchor[0]);
}
console.log('PASS team profile content and link assertions');
