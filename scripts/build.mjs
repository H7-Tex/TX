// Builds h7tex.com into ./out. No dependencies.
//
//   src/      hand-written pages; index.html carries a {{data}} placeholder
//   static/   copied as-is (fonts, favicon, og.png, robots.txt, .well-known/, CNAME)
//   data/     CTFtime snapshot, used for anything the live API can't provide
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'out');
const TEAM = 281844;
const OFFLINE = process.argv.includes('--offline');

function get(url, timeout = 90_000) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'h7tex.com build', Accept: 'application/json' } }, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (c) => (body += c));
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.setTimeout(timeout, () => req.destroy(new Error('timeout')));
    req.on('error', reject);
  });
}

async function data() {
  const snap = JSON.parse(await readFile(path.join(ROOT, 'data/ctftime.json'), 'utf8'));
  const rating = { ...snap.team.rating };
  // snapshot rows are newest first within a year: [id, title, place, points, rating]
  const years = Object.keys(snap.results).sort();
  const events = years.flatMap((y) => [...snap.results[y]].reverse().map((r) => ({ id: r[0], title: r[1], place: r[2], y })));

  if (!OFFLINE) {
    try {
      const team = await get(`https://ctftime.org/api/v1/teams/${TEAM}/`);
      for (const [y, r] of Object.entries(team.rating ?? {})) if (r && Object.keys(r).length) rating[y] = { ...rating[y], ...r };
      const y = String(new Date().getUTCFullYear());
      const known = new Set(events.map((e) => e.id));
      const all = await get(`https://ctftime.org/api/v1/results/${y}/`);
      const fresh = Object.entries(all)
        .map(([id, ev]) => ({ id: Number(id), title: ev.title, time: ev.time, s: (ev.scores ?? []).find((s) => s.team_id === TEAM) }))
        .filter((e) => e.s && e.s.place > 0 && !known.has(e.id))
        .sort((a, b) => a.time - b.time);
      for (const e of fresh) events.push({ id: e.id, title: e.title, place: e.s.place, y });
      console.log(`ctftime: rating merged, ${fresh.length} new event(s)`);
    } catch (e) {
      console.warn(`ctftime: results unavailable (${e.message}), using the snapshot`);
    }
  }

  const count = (y) => events.filter((e) => e.y === y).length;
  const seasons = Object.keys(rating)
    .filter((y) => rating[y]?.rating_place)
    .sort()
    .map((y) => ({ y, world: rating[y].rating_place, india: rating[y].country_place, n: count(y) }));

  return { events: events.map((e) => [e.title, e.place]), seasons };
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await cp(path.join(ROOT, 'static'), OUT, { recursive: true });
await cp(path.join(ROOT, 'src'), OUT, { recursive: true });

const home = path.join(OUT, 'index.html');
// JSON inside <script>: escape "<" so no title can close the tag
const json = JSON.stringify(await data()).replace(/</g, '\\u003c');
await writeFile(home, (await readFile(home, 'utf8')).replace('{{data}}', json));
console.log(`built out/ (index.html ${Math.round((await readFile(home)).length / 1024)} KB)`);
