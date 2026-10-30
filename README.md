# Portfolio

Source for my personal site: robotics research, combat robots, and a playable copy of GuitarBox, the Arduino guitar tuner I built in 2024.

**Live site:** https://gavinnlimm.github.io/portfolio/

## Structure

- `index.html` — the portfolio (experience, builds, GuitarBox, about, contact)
- `css/`, `js/` — styles, scroll scenes and behavior; GSAP is vendored in `js/vendor/`, no build step
- `img/` — web-sized photos and the GuitarBox demo loop
- `docs/` — my piano-string physics paper and the California Roll final report
- `fonts/` — Work Sans, self-hosted (SIL Open Font License, see `fonts/OFL.txt`)
- `guitarbox.html` — build log for GuitarBox, my 2024 Harvard final project
- `guitarbox/` — build-log photos, video and CAD files (DXF, STL); the page's own styles and script are `css/guitarbox.css` and `js/guitarbox.js`

## Deployment

GitHub Pages builds from the `main` branch.
