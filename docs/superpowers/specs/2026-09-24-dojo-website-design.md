# DOJO Website Design

## Summary

DOJO will launch with a single-page, public, research-oriented website that explains Distributed Open Justice Oversight as a community-driven platform for adversarial evaluation of clinical AI systems. The page will use the existing BODHI site as a visual reference while giving DOJO its own information architecture, language, and evaluation-focused visual vocabulary.

The first release is a static HTML, CSS, and JavaScript site suitable for GitHub Pages. It will be easy to edit as the project evolves and will not include a backend, authentication, live clinical-data access, or an interactive evaluation platform.

## Audience and success criteria

The primary audience is researchers and clinicians working with health AI. Secondary audiences are open-source contributors, institutional partners, and funders.

The site succeeds when a first-time visitor can quickly understand:

- the gap between benchmark performance and clinical readiness;
- what DOJO evaluates and how its three evaluation planes fit together;
- why evidence, human oversight, and evaluator assurance matter;
- how to find the research, code, team, and contact paths.

## Information architecture

The site is one page with stable anchor sections in this order:

1. Home
2. Problem
3. What is DOJO
4. How it works
5. Evaluation Planes
6. Evidence & Readiness
7. Research
8. Team
9. Get Involved
10. Contact

The navigation will expose these sections as concise labels, remain usable on small screens through a menu toggle, and provide clear calls to action from the hero and closing sections.

## Content and interaction design

- Home introduces DOJO with the full name, a one-sentence value proposition, and links to explore the framework and view the GitHub repository.
- Problem explains the limits of static benchmarks, aggregate metrics, and model-only evaluation.
- What is DOJO describes the local-first, open-source, modality-agnostic evaluation layer.
- How it works presents the evaluation lifecycle as a visual sequence: intake and threat modeling, data assessment, model stress testing, clinical workflow assessment, remediation, and release assurance.
- Evaluation Planes presents Data, Model, and Clinical Workflow as three expandable cards with concise descriptions.
- Evidence & Readiness introduces the Evidence Object, multidimensional readiness profile, and PASS/WARN/FAIL/INSUFFICIENT EVIDENCE states.
- Research links to confirmed publications, results, and active research directions.
- Team displays only confirmed people and affiliations; no names or credentials will be invented.
- Get Involved links to the repository, contribution guidance, evaluator/challenge participation, and future installation documentation.
- Contact provides confirmed institutional contact routes only.

Interactions remain lightweight: anchor scrolling, a responsive navigation toggle, expandable evaluation cards, the lifecycle diagram, and restrained scroll-in transitions. All important information remains available without JavaScript.

## Visual direction

The visual system will be inspired by BODHI without copying its text, assets, or implementation:

- warm ivory background with charcoal body text;
- terracotta and muted green as functional accents;
- serif display typography for major headings and sans-serif typography for sustained reading;
- generous spacing, thin borders, and editorial card layouts;
- subtle network, node, and evidence motifs rather than decorative medical stock imagery;
- clear contrast, readable type, visible focus states, and a reduced-motion fallback.

DOJO-specific visual motifs should communicate challenge, traceability, and readiness: paired clean/stressed states, connected evidence objects, and a three-plane evaluation system.

## Technical shape

The initial implementation will use:

- `index.html` for semantic page structure and content;
- `styles.css` for responsive layout, typography, color tokens, cards, diagrams, and motion;
- `script.js` only for navigation, progressive enhancement, and small interactions;
- `assets/` for confirmed logos, diagrams, and optimized imagery.

The site will avoid a framework and build step in the first release. It should be deployable as static files from the repository's main branch through GitHub Pages. Any later migration to a component framework remains optional and should be driven by actual content or interaction complexity.

## Content integrity and scope boundaries

All claims, metrics, publications, affiliations, and contact details must come from confirmed DOJO source material or approved project information. The website will not expose clinical data, credentials, API keys, private team information, or unsupported claims of regulatory approval or universal clinical safety.

The first release does not include user accounts, a live evaluation dashboard, MCP execution, M3/M4 data access, model uploads, a CMS, or a contact form backend. External links and mailto links are sufficient for the initial contact and contribution paths.

## Acceptance criteria

- The page renders correctly on desktop and mobile widths.
- Every navigation item reaches the intended section and the mobile menu is keyboard accessible.
- The page remains understandable with JavaScript disabled.
- Text and controls meet practical contrast and focus-visibility requirements.
- Reduced-motion preferences are respected.
- The three evaluation planes and the readiness model are understandable without reading the technical source documents.
- External links point only to confirmed repositories, publications, or institutional destinations.
- No sensitive data, invented team details, or unverified performance claims are committed.
