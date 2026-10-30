# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Internship recruiters and engineers** in robotics and software, screening Gavin for internships. They arrive from a résumé, LinkedIn or an application and give the site a short, judging look.
- **Research labs and professors**: faculty, PhD students and labs Gavin may want to research with, and later grad programs. They read more closely and care whether the work is real, technical and his own.

## Product Purpose

A personal portfolio for Gavin Lim, a Cornell computer science student (class of 2028, robotics minor) in Ithaca, New York. It shows his robotics research, combat robots and hardware projects.

Success: a visitor leaves **remembering Gavin**. They should come away with a distinct impression of who he is and how he works, beyond what a résumé line carries. Reaching out, opening the résumé and reading the code or papers follow from that, but being memorable is the primary goal.

## Positioning

The work is hands-on and verifiable: robots that run, physics checked against published data, and a guitar tuner you can play in the browser. Every claim is backed by a specific, measured result and a link to the code, paper or photos. A generic student portfolio cannot copy that.

## Operating Context

- Visitors typically come from LinkedIn, a résumé PDF or a job or lab application, often on a phone.
- The home page (`index.html`) holds experience, combat robots, GuitarBox, about and contact. It includes "Play GuitarBox", an in-browser recreation of the tuner's six string pitches and OLED messages.
- `guitarbox.html` is the long-form build log for GuitarBox (2024): circuitry, code, the press-fit enclosure, the 3D-printed amplifier and the final product.
- PDFs: résumé (`Gavin_Lim_Resume_2026.pdf`), the piano-string paper and the California Roll final report (`docs/`).

## Capabilities and Constraints

- **Stack:** static HTML, CSS and JS with no build step. GSAP and ScrollTrigger are vendored in `js/vendor/`, and fonts are self-hosted in `fonts/`.
- **Hosting:** deployed by GitHub Pages from `main` through a Jekyll workflow. The repo is public, so every committed file is publicly reachable.
- **Stable URLs:** `index.html`, `guitarbox.html` and the résumé path may already be shared and must keep working. `about.html` is a redirect to `index.html#about`.
- **GuitarBox build log:** it should be brought into the site's current design, keeping all its text, photos, code and downloads (DXF, STL). Today it still uses its 2024 Bootstrap styling.

## Brand Commitments

- First-person voice, warm and plain-spoken, with specific numbers rather than adjectives (e.g. "20 runs end to end with no human input").
- Real names of people, labs and teams are used as they are on the site: HRC² Lab (Prof. Guy Hoffman), Combat Robotics at Cornell, Dr. LaNell Williams (Princeton).

## Evidence on Hand

- **HRC² Lab (2026–now):** ROS 2 pick-and-place pipeline on a Hello Robot Stretch, with 20 end-to-end runs with no human input and depth perception to under 1 cm. Now building datasets to fine-tune a π0.5 VLA policy. Code: github.com/gavinnlimm/stretch-picknplace. Photos: `img/stretch-can.jpg`, `img/stretch-rviz.jpg`.
- **Combat Robotics at Cornell (2025–now):** mechanical subteam, CV teleoperation sub-lead (YOLOv11-Pose body-to-controls pipeline with a failsafe), new-member trainer. California Roll is a 1 lb vertical drum spinner for NHRL (spring 2026), with a final report in `docs/`. Photos: `img/crc-*.jpg`, `img/california-roll.png`.
- **Piano-string physics, Princeton (2024):** stiffness model from Hooke's Law and SHM, tested against published measurements. Paper in `docs/`.
- **GuitarBox (2024):** Arduino guitar tuner, six buttons covering 82–330 Hz, ten built and given to guitarists in Cambridge. Build log photos are in `guitarbox/`, with the demo video and poster in `img/`.
- **Portraits:** `img/gavin-portrait.jpg`, `img/gavin-snow.jpg`.
- **Absent:** no testimonials, quotes, awards or press. Do not invent them, or any metric beyond those above.

## Product Principles

1. **Be remembered, not just scanned.** Favor what makes Gavin distinct over generic portfolio structure.
2. **Every claim is checkable.** Pair results with a number and a link to code, a paper or photos.
3. **Show the thing working.** Real photos, demos and playable artifacts outrank descriptions.
4. **Respect a short first look.** A recruiter should grasp who Gavin is and what he builds within seconds, and a professor should be able to go deep.
