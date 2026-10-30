/* GuitarBox build log. Plain JS, no dependencies. */
(() => {
  /* Copy buttons: each copies the code block it names. */
  document.querySelectorAll('[data-copy]').forEach((button) => {
    const code = document.getElementById(button.dataset.copy);
    let reset = 0;
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        button.textContent = 'Copied';
        button.classList.add('is-done');
      } catch (err) {
        button.textContent = 'Select the code to copy it';
      }
      clearTimeout(reset);
      reset = setTimeout(() => {
        button.textContent = 'Copy code';
        button.classList.remove('is-done');
      }, 2400);
    });
  });

  /* Contents: mark the section being read. */
  const links = [...document.querySelectorAll('.toc__list a')];
  const sections = links.map((a) => document.querySelector(a.getAttribute('href')));
  if (!('IntersectionObserver' in window) || !links.length) return;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const i = sections.indexOf(e.target);
      links.forEach((a, k) => {
        if (k === i) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach((s) => s && io.observe(s));
})();
