# DOJO Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first public DOJO landing page in `criticaldata/dojo` as a responsive, research-oriented static website inspired by BODHI.

**Architecture:** Use a single semantic HTML document with stable anchor sections, one stylesheet for the visual system, and a small progressive-enhancement script for navigation and reveal behavior. Keep all important content visible without JavaScript and avoid a framework or build step so the site can be served directly by GitHub Pages.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, GitHub Pages, browser-based manual QA, and shell smoke checks.

**Spec:** `docs/superpowers/specs/2026-09-24-dojo-website-design.md`

## Global Constraints

- The site is a single-page, public, research-oriented website for researchers and clinicians working with health AI.
- The initial implementation uses static HTML, CSS, and JavaScript with no framework and no build step.
- The page must remain understandable and navigable with JavaScript disabled.
- The visual system uses a warm ivory background, charcoal text, terracotta and muted green accents, serif display typography, and sans-serif body typography.
- The page must expose the sections in this order: Home, Problem, What is DOJO, How it works, Evaluation Planes, Evidence & Readiness, Research, Team, Get Involved, Contact.
- Claims, metrics, publications, affiliations, and contact details must come from confirmed project material; no invented people, results, or regulatory claims may be added.
- The first release excludes accounts, live clinical-data access, MCP execution, model uploads, a CMS, and a contact-form backend.
- The page must provide visible focus states, practical contrast, keyboard access, responsive behavior, and a reduced-motion fallback.

## Review Focus

- At a 320px-wide viewport, long headings, cards, and diagrams must wrap without horizontal overflow; test this in the responsive browser view.
- With JavaScript disabled, every section, link, and evaluation-plane explanation must remain readable; test by disabling JavaScript and reloading the page.
- Keyboard-only users must be able to open and close the mobile menu and move through every link and expandable evaluation card; test with Tab, Enter, and Escape.
- When `prefers-reduced-motion: reduce` is enabled, reveal transitions must be disabled or shortened to an immediate state; test with the browser emulation setting.
- Unconfirmed team data, contact details, and external publication links must not appear; test the final content against `Contexto/Contexto_reuniones.md` and the approved design spec.

---

### Task 1: Create the semantic page shell and approved content sections

**Files:**
- Create: `index.html`
- Create: `README.md`

**Interfaces:**
- Produces the stable section IDs `home`, `problem`, `what-is-dojo`, `how-it-works`, `evaluation-planes`, `evidence-readiness`, `research`, `team`, `get-involved`, and `contact`.
- Produces navigation links whose `href` values exactly match those IDs.
- Produces evaluation-plane cards using native `<details>` elements so their content remains usable without JavaScript.

- [ ] **Step 1: Create the page skeleton with semantic landmarks and the approved anchor contract**

  Add a `<header>` with a logo/title link, a `<nav aria-label="Primary navigation">`, a `<main>`, ten ordered `<section>` elements, and a `<footer>`. Use this exact navigation order:

  ```html
  <a href="#home">Home</a>
  <a href="#problem">Problem</a>
  <a href="#what-is-dojo">What is DOJO</a>
  <a href="#how-it-works">How it works</a>
  <a href="#evaluation-planes">Evaluation Planes</a>
  <a href="#evidence-readiness">Evidence &amp; Readiness</a>
  <a href="#research">Research</a>
  <a href="#team">Team</a>
  <a href="#get-involved">Get Involved</a>
  <a href="#contact">Contact</a>
  ```

- [ ] **Step 2: Add first-release copy from the approved project context**

  Use concise English copy that explains the benchmark-to-clinical-readiness gap, DOJO's three planes, local-first execution, human oversight, evidence traceability, and the community contribution model. The hero must include the full name `Distributed Open Justice Oversight` and links to `https://github.com/criticaldata/dojo`.

  Keep the Team section role-based rather than listing unconfirmed people: explain that DOJO brings together clinical researchers, machine-learning practitioners, engineers, and community reviewers. Use the GitHub repository and confirmed publication URLs as the initial contact and research destinations.

- [ ] **Step 3: Add progressive-enhancement hooks without hiding content**

  Add `data-mobile-menu`, `data-mobile-menu-toggle`, `data-reveal`, and `data-plane-card` attributes only where the script will enhance behavior. Keep the mobile navigation links in the DOM and avoid using `hidden` on content that must work without JavaScript.

- [ ] **Step 4: Add local preview instructions to `README.md`**

  Document the repository purpose and this exact preview command:

  ```bash
  python3 -m http.server 4173
  ```

  Explain that the site is available at `http://127.0.0.1:4173/` and that the command should be run from the repository root.

- [ ] **Step 5: Run the shell smoke checks**

  Run:

  ```bash
  test -f index.html
  rg -n 'id="(home|problem|what-is-dojo|how-it-works|evaluation-planes|evidence-readiness|research|team|get-involved|contact)"' index.html
  rg -n 'href="#(home|problem|what-is-dojo|how-it-works|evaluation-planes|evidence-readiness|research|team|get-involved|contact)"' index.html
  git diff --check
  ```

  Expected: all commands exit successfully and every approved section ID and navigation target is present.

- [ ] **Step 6: Commit the page shell**

  ```bash
  git add index.html README.md
  git commit -m "feat: add DOJO website page shell"
  ```

### Task 2: Implement the BODHI-inspired responsive visual system

**Files:**
- Create: `styles.css`
- Modify: `index.html`

**Interfaces:**
- `index.html` loads `styles.css` from the repository root and uses the class names defined in this task.
- `styles.css` defines the visual tokens, layout primitives, section treatments, card styles, focus states, and responsive breakpoints used by all sections.

- [ ] **Step 1: Add the stylesheet link and global visual tokens**

  Link the stylesheet in `<head>` and define these tokens in `:root`: `--color-ivory: #f5f1eb`, `--color-paper: #fffdf9`, `--color-ink: #25221f`, `--color-muted: #6e6861`, `--color-terracotta: #b6533e`, `--color-sage: #4e8068`, `--color-line: #d8d0c7`, `--font-display: Georgia, 'Times New Roman', serif`, and `--font-body: Inter, ui-sans-serif, system-ui, sans-serif`.

- [ ] **Step 2: Build the desktop layout and section hierarchy**

  Implement a centered content container capped at `1120px`, a restrained sticky header, generous section spacing, large serif display headings, readable body measure, terracotta primary buttons, sage status accents, and bordered cards. Use CSS grid for the three evaluation-plane cards and the evidence/readiness presentation.

- [ ] **Step 3: Add DOJO-specific visual motifs**

  Create the lifecycle diagram with CSS nodes and connectors, a clean-versus-stressed comparison block, and a readiness vector display. Keep these as semantic HTML with decorative pseudo-elements so they do not depend on image assets or canvas rendering.

- [ ] **Step 4: Add responsive behavior**

  At widths below `760px`, collapse the navigation, switch multi-column cards to one column, reduce display type size, keep buttons full-width where needed, and allow diagrams to scroll or reflow without clipping. At widths below `420px`, tighten horizontal padding to `20px` while keeping body text at a readable size.

- [ ] **Step 5: Add accessibility and motion rules**

  Define `:focus-visible` outlines, visible link states, sufficient line height, `scroll-margin-top` for sections, and this reduced-motion rule:

  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }
  ```

- [ ] **Step 6: Run visual smoke checks**

  Start the server with `python3 -m http.server 4173`, inspect the page at desktop width and at `320px`, `420px`, and `760px`, and verify that the header, hero, cards, lifecycle diagram, and footer have no clipping or horizontal overflow. Run `git diff --check`.

- [ ] **Step 7: Commit the visual system**

  ```bash
  git add index.html styles.css
  git commit -m "feat: add DOJO visual system and responsive layout"
  ```

### Task 3: Add progressive navigation and accessible interactions

**Files:**
- Create: `script.js`
- Modify: `index.html`
- Modify: `styles.css`

**Interfaces:**
- `initMobileMenu()` controls the mobile navigation through `data-mobile-menu` and `data-mobile-menu-toggle`.
- `initScrollReveal()` enhances elements marked with `data-reveal` without hiding them before initialization.
- Native `<details>` elements handle evaluation-plane expansion; JavaScript must not be required for their operation.

- [ ] **Step 1: Add the script reference with `defer`**

  Add `<script src="script.js" defer></script>` at the end of the document head.

- [ ] **Step 2: Implement keyboard-safe mobile navigation**

  Implement:

  ```js
  function initMobileMenu() {}
  ```

  The function must toggle `aria-expanded`, add/remove an `is-open` class, close the menu after a navigation link is activated, close it on `Escape`, and leave the menu usable if JavaScript is unavailable. The toggle button must have an accessible label and `aria-controls` pointing to the navigation container.

- [ ] **Step 3: Implement progressive scroll reveal**

  Implement:

  ```js
  function initScrollReveal() {}
  ```

  Add an `is-visible` class using `IntersectionObserver` when available. If the API is unavailable or the user requests reduced motion, add `is-visible` immediately. Do not remove content from the accessibility tree while it is waiting to reveal.

- [ ] **Step 4: Initialize only after the document is ready**

  Use:

  ```js
  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollReveal();
  });
  ```

- [ ] **Step 5: Validate the script and interaction contract**

  Run:

  ```bash
  node --check script.js
  git diff --check
  ```

  In the browser, verify with keyboard only that the menu opens with Enter, closes with Escape, focus remains visible, links close the menu, and the evaluation cards expand through native keyboard behavior.

- [ ] **Step 6: Commit the progressive enhancements**

  ```bash
  git add index.html styles.css script.js
  git commit -m "feat: add accessible DOJO interactions"
  ```

### Task 4: Finalize research, team, contribution, and contact content

**Files:**
- Modify: `index.html`
- Modify: `README.md`

**Interfaces:**
- All external links in the site must have descriptive accessible labels and use confirmed destinations.
- The Team section must remain role-based until names and affiliations are explicitly supplied by the project owners.

- [ ] **Step 1: Replace draft copy with source-backed DOJO language**

  Use the approved context documents to state the evaluation gap, three evaluation planes, evidence-first architecture, human/community participation, local-first execution, and the distinction between Experimental Model, Technical System, and Clinical Solution. Keep the claims boundary visible: the site must not imply regulatory approval, universal clinical safety, or patient-outcome benefit from the pilot alone.

- [ ] **Step 2: Add research cards with confirmed links**

  Include cards for adversarial evaluation, clinical implementation/readiness, and human-AI oversight. Link only to URLs present in the approved context, including the SALIENT DOI, DECIDE-AI DOI, FUTURE-AI DOI, and the DOJO GitHub repository where relevant.

- [ ] **Step 3: Make Team and Contact accurate without inventing details**

  Use the role-based Team copy approved in Task 1. Use the GitHub organization/repository and confirmed institutional website as the initial contact routes. Do not add personal email addresses, profile photos, affiliations, or social links unless the project owners provide them.

- [ ] **Step 4: Update README with project navigation and scope**

  Add the site purpose, local preview command, the static deployment assumption, and a short note that clinical data and credentials must never be committed.

- [ ] **Step 5: Check content integrity and links**

  Run:

  ```bash
  rg -n 'TBD|TODO|PLACEHOLDER|lorem|example\.com' index.html README.md || true
  rg -n 'github\.com/criticaldata/dojo|criticaldata\.mit\.edu|doi\.org|nature\.com|bmj\.com|pubmed\.ncbi\.nlm\.nih\.gov' index.html
  git diff --check
  ```

  Expected: no placeholder content is found, and every research/contact destination is a confirmed project or publication URL.

- [ ] **Step 6: Commit the source-backed content**

  ```bash
  git add index.html README.md
  git commit -m "content: add source-backed DOJO website copy"
  ```

### Task 5: Perform release QA and prepare GitHub Pages publication

**Files:**
- Modify: `README.md`
- Create: `.nojekyll`

**Interfaces:**
- The repository root contains `index.html` as the GitHub Pages entry point.
- The README documents the local preview and the expected static hosting setup.

- [ ] **Step 1: Run structural checks from the repository root**

  Create an empty `.nojekyll` file so GitHub Pages serves the static files without applying Jekyll processing:

  ```bash
  touch .nojekyll
  ```

  Run:

  ```bash
  test -f index.html
  test -f styles.css
  test -f script.js
  node --check script.js
  rg -n 'href="#[^"]+"' index.html
  git diff --check
  ```

  Expected: all required files exist, JavaScript parses, anchor links are present, and Git reports no whitespace errors.

- [ ] **Step 2: Run the responsive and accessibility checklist**

  Serve the site with `python3 -m http.server 4173` and verify desktop, 760px, 420px, and 320px layouts. Test mouse and keyboard navigation, JavaScript-disabled rendering, reduced motion, focus visibility, native details expansion, external links, and the absence of horizontal overflow.

- [ ] **Step 3: Check the repository for sensitive or irrelevant files**

  Run:

  ```bash
  find . -maxdepth 3 -type f -not -path './.git/*' -print | sort
  rg -n 'API_KEY|SECRET|TOKEN|PASSWORD|PHI|patient_id|access[_-]?token' . -g '!docs/superpowers/**' || true
  ```

  Expected: only the intended static site, documentation, and approved assets are present; no secrets or clinical data are found.

- [ ] **Step 4: Document GitHub Pages setup**

  Add to `README.md` that GitHub Pages should serve the repository root from the `main` branch, then verify the resulting public URL after an organization owner enables Pages if the setting is not available to the current account.

- [ ] **Step 5: Commit the release-ready state**

  ```bash
  git add README.md .nojekyll
  git commit -m "docs: prepare DOJO website for GitHub Pages"
  ```

## Self-review result

- Spec coverage: every approved section, visual requirement, interaction, content rule, accessibility requirement, and scope boundary maps to Tasks 1–5.
- Placeholder scan: the plan contains no `TBD`, `TODO`, or unspecified implementation steps; Team and Contact behavior are explicitly role-based and source-backed.
- Interface consistency: the section IDs, data attributes, JavaScript function names, and file responsibilities are consistent across tasks.
- Review focus coverage: each of the five review risks appears in the global checklist and is tested by Tasks 1–5.
