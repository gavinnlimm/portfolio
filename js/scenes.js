/* The scroll scene on the Taste Skill stage (js/stage.js). Native scroll, scrubbed by position.
   Without script, under reduced motion, or if GSAP fails to load, each section shows its finished
   composition (see .scene:not(.is-live) in css/site.css). */
(() => {
  window.Scenes = window.Scenes || {};

  /* Four numbers: each figure arrives with its own photograph, holds, and leaves upward. */
  Scenes.figures = (root, opts = {}) => Stage.scene(root, {
    hold: opts.hold ?? 3,
    scrub: true,
    beats: 4,
    phone: 'rest',   // the phone gets the finished four-up composition
    build(tl, { q }) {
      const figs = q('.fig');
      const n = figs.length;
      const seg = 1 / n;
      figs.forEach((fig, i) => {
        const num = fig.querySelector('.fig__num span');
        const cap = fig.querySelector('.fig__cap');
        const pic = fig.querySelector('.fig__pic');
        const img = fig.querySelector('.fig__pic img');
        const t0 = i * seg;
        // the photo wipes up from below as its number rises; both leave upward before the next arrives
        if (i > 0) {
          tl.fromTo(pic, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: seg * 0.3, ease: 'power3.inOut' }, t0 - seg * 0.36);
          tl.fromTo(img, { scale: 1.18 }, { scale: 1, duration: seg * 0.5, ease: 'power2.out' }, t0 - seg * 0.36);
          tl.fromTo(num, { yPercent: 110 }, { yPercent: 0, duration: seg * 0.26, ease: 'power3.out' }, t0 - seg * 0.16);
          tl.fromTo(cap, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: seg * 0.22, ease: 'power2.out' }, t0 - seg * 0.1);
        }
        if (i < n - 1) {
          tl.to(pic, { clipPath: 'inset(0% 0% 100% 0%)', duration: seg * 0.3, ease: 'power3.inOut' }, t0 + seg * 0.64);
          tl.to(num, { yPercent: -110, duration: seg * 0.2, ease: 'power2.in' }, t0 + seg * 0.62);
          tl.to(cap, { autoAlpha: 0, y: -18, duration: seg * 0.14, ease: 'power1.in' }, t0 + seg * 0.62);
        }
      });
    },
  });

  document.addEventListener('DOMContentLoaded', () => {
    if (!window.Stage) return;
    Stage.init();
  });
})();
