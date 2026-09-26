# DOJO Website

The public DOJO website explains Distributed Open Justice Oversight, an open and community-driven platform for adversarial evaluation of clinical AI systems.

The single-page site presents DOJO through three compact ideas: what it is, how its data/model/clinical-workflow architecture works, and the disciplines that shape the project. Research links and contribution routes stay available without turning the page into a long technical document.

The complete public website is live at [criticaldata.github.io/dojo](https://criticaldata.github.io/dojo/).

## Run locally

From the repository root, run:

```bash
python3 -m http.server 4173
```

Then open [http://127.0.0.1:4173/](http://127.0.0.1:4173/).

This is a static HTML, CSS, and JavaScript website. It does not contain clinical data, credentials, API keys, or live evaluation services. Never commit those materials to this repository.

The live site is a static HTML, CSS, and JavaScript website. It describes the evaluation concept and contribution model; it does not claim regulatory approval, universal clinical safety, or patient-outcome benefit.

## GitHub Pages

GitHub Pages publishes the repository root from the `feat/dojo-website-native` branch. Pushing updates to that branch updates the public site. The root `index.html`, `.nojekyll`, `404.html`, and `robots.txt` files support this deployment.
