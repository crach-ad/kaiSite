# Build Steps for kai-site

1. Cloned project from /Users/crachadlaing/Downloads/kai site to /Users/crachadlaing/CascadeProjects/kai-site.
2. Ran `npm install --legacy-peer-deps` to resolve dependency conflicts (date-fns vs. react-day-picker).
3. Started development server with `npm run dev`.
4. Site is available for preview at http://localhost:3000.
5. Integrated RotatingGallery component into Portfolio section
6. Installed lucide-react for icons
7. Cleaned up portfolio.tsx: removed all legacy animation, category, Dialog, and stray JSX code. Now only the RotatingGallery integration and required data/types remain.
8. Updated Portfolio to use all portfolioItems as projects for the carousel.
9. Added required carousel CSS styles to app/globals.css.
10. Installed lucide-react (with --legacy-peer-deps).

Update this file with each major build or setup step.
