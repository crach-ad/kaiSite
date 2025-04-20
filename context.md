# Project Context: kai-site

- Project cloned from: /Users/crachadlaing/Downloads/kai site
- Framework: Next.js 15.2.4 (React 19)
- Dependency issue (date-fns vs. react-day-picker) resolved for npm by using `npm install --legacy-peer-deps`.
- User prefers npm over pnpm for this project.
- Dev server runs at: http://localhost:3000
- Directory for all future work: /Users/crachadlaing/CascadeProjects/kai-site
- Please keep this file updated with major context or project changes.

---

## 2025-04-20: 3D RotatingGallery Integration (Previous)
- Integrated RotatingGallery and removed old animation code from Portfolio component.

## Portfolio Component Cleanup (2025-04-20)
- Fully removed all legacy animation, category, Dialog, and stray JSX code from portfolio.tsx.
- Now only contains imports, type definitions, portfolioItems, and a clean Portfolio export rendering RotatingGallery.
- This resolves all errors related to missing variables, stray JSX, and legacy animation/modal code.

## 2025-04-20: 3D RotatingGallery Integration
- Added `RotatingGallery.tsx` to components for a 3D rotating carousel.
- Replaced the Portfolio grid/list with the new RotatingGallery, using all portfolioItems as projects.
- Added carousel CSS styles to `app/globals.css`.
- Installed `lucide-react` (with `--legacy-peer-deps` due to dependency conflicts).
- No data mocking or stubbing used; all images/data come from real portfolioItems.
- All changes maintain modularity and code cleanliness.
