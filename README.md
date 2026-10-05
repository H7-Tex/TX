# h7tex.com

One hand-written page and one build script. No framework. Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `master` and once a week.

```
src/       index.html (the site), 404.html, ctf/ (redirect)
static/    copied as-is: fonts, favicon, og.png, robots.txt, .well-known/, CNAME
data/      CTFtime snapshot, used when the live API is unreachable
scripts/   build.mjs
```

## Build

```bash
node scripts/build.mjs             # fetch CTFtime, write ./out
node scripts/build.mjs --offline   # snapshot only
npm run preview                    # offline build, served on :8000
```

`build.mjs` replaces `{{data}}` in `src/index.html` with every rated event, the season ranks and the next weighted CTFs from CTFtime.

## Editing

- The sentence and the popovers are plain HTML in `src/index.html` (`<template id="t-...">`).
- Members, podiums and H7CTF editions are in those templates; CTFtime numbers update themselves.
- The 3D H7 is the canvas script at the bottom of `src/index.html`.

## House rules

- No em dashes or en dashes in copy. Use hyphens.
- No taglines.
