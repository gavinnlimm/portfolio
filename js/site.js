/* Gavin Lim portfolio. Plain JS, no dependencies. */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Reveal on scroll, once, with a short stagger inside each section. */
  const reveals = document.querySelectorAll('[data-reveal]');
  const groups = new Map();
  reveals.forEach((el) => {
    const parent = el.closest('section') || document.body;
    const n = groups.get(parent) || 0;
    el.style.setProperty('--rd', Math.min(n, 3) * 70 + 'ms');
    groups.set(parent, n + 1);
  });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* Experience. "Current" (full ink + its picture) follows hover, focus and scroll;
     "open" (the description) changes only on click or Enter, so nothing reflows under the pointer. */
  const rows = [...document.querySelectorAll('.row')];
  const plates = [...document.querySelectorAll('.plate')];
  let lastTouch = 0;
  let hoverQuietUntil = 0;

  function setCurrent(i) {
    rows.forEach((row, k) => row.classList.toggle('is-current', k === i));
    plates.forEach((p) => p.classList.toggle('is-active', Number(p.dataset.for) === i));
  }
  function setOpen(i) {
    rows.forEach((row, k) => {
      const on = k === i;
      row.classList.toggle('is-active', on);
      row.querySelector('.row__head').setAttribute('aria-expanded', String(on));
    });
    setCurrent(i);
  }

  rows.forEach((row, i) => {
    const head = row.querySelector('.row__head');
    head.addEventListener('click', () => { lastTouch = performance.now(); hoverQuietUntil = lastTouch + 600; setOpen(i); });
    head.addEventListener('focus', () => { lastTouch = performance.now(); setCurrent(i); });
    head.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse' && performance.now() > hoverQuietUntil) { lastTouch = performance.now(); setCurrent(i); } });
  });
  const list = document.querySelector('.rows');
  if (list) list.addEventListener('pointerleave', () => {
    const open = rows.findIndex((r) => r.classList.contains('is-active'));
    if (open >= 0) setCurrent(open);
  });

  if ('IntersectionObserver' in window && rows.length) {
    const middle = new IntersectionObserver((entries) => {
      if (performance.now() - lastTouch < 1500) return;
      for (const e of entries) if (e.isIntersecting) setCurrent(rows.indexOf(e.target));
    }, { rootMargin: '-46% 0px -46% 0px' });
    rows.forEach((r) => middle.observe(r));
  }

  /* The one moving picture: plays only while on screen, never under reduced motion. */
  const loops = document.querySelectorAll('video[data-loop]');
  if ('IntersectionObserver' in window) {
    const vio = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const v = e.target;
        if (e.isIntersecting && !reduce.matches && !document.hidden) {
          if (v.preload === 'none') { v.preload = 'auto'; v.load(); }
          v.play().catch(() => {});
        } else { v.pause(); }
      }
    }, { threshold: 0.2 });
    loops.forEach((v) => vio.observe(v));
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) loops.forEach((v) => v.pause()); });

  /* GuitarBox: six square-wave pitches, as the Arduino played them. */
  const box = document.querySelector('.box');
  if (!box) return;
  const noteEl = box.querySelector('.box__note');
  const stringEl = box.querySelector('.box__string');
  const canvas = box.querySelector('.box__wave');
  const ctx2d = canvas.getContext('2d');
  const keys = [...box.querySelectorAll('.key')];
  let audio = null;
  let voice = null;
  let hz = 82;
  let playingUntil = 0;
  let phase = 0;
  let raf = 0;

  function drawWave(moving) {
    const w = canvas.width, h = canvas.height;
    ctx2d.clearRect(0, 0, w, h);
    ctx2d.strokeStyle = '#dfe9ff';
    ctx2d.lineWidth = 3;
    ctx2d.beginPath();
    const period = Math.max(18, 9000 / hz);      // higher pitch, tighter wave
    const hi = h * 0.22, lo = h * 0.78;
    for (let x = 0; x <= w; x += 1) {
      const u = ((x + phase) % period) / period;
      const y = u < 0.5 ? hi : lo;
      if (x === 0) ctx2d.moveTo(x, y); else ctx2d.lineTo(x, y);
    }
    ctx2d.stroke();
    if (moving) phase += period / 14;
  }

  function loop() {
    const on = performance.now() < playingUntil;
    drawWave(on && !reduce.matches);
    if (on) raf = requestAnimationFrame(loop);
    else { raf = 0; keys.forEach((k) => k.classList.remove('is-on')); }
  }

  function play(key) {
    hz = Number(key.dataset.hz);
    noteEl.textContent = key.dataset.note;
    stringEl.textContent = 'String ' + key.dataset.string + ', ' + hz + ' Hz';
    keys.forEach((k) => k.classList.toggle('is-on', k === key));

    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      if (audio.state === 'suspended') audio.resume();
      const now = audio.currentTime;
      if (voice) { voice.gain.gain.cancelScheduledValues(now); voice.gain.gain.setTargetAtTime(0, now, 0.02); voice.osc.stop(now + 0.1); }
      const osc = audio.createOscillator();
      const filter = audio.createBiquadFilter();
      const gain = audio.createGain();
      osc.type = 'square';
      osc.frequency.value = hz;
      filter.type = 'lowpass';
      filter.frequency.value = 2400;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.012);
      gain.gain.setValueAtTime(0.09, now + 1.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
      osc.connect(filter).connect(gain).connect(audio.destination);
      osc.start(now);
      osc.stop(now + 2.3);
      voice = { osc, gain };
    } catch (err) { /* no audio: the screen still shows the pitch */ }

    playingUntil = performance.now() + 2200;
    if (!raf) raf = requestAnimationFrame(loop);
  }

  keys.forEach((k) => k.addEventListener('click', () => play(k)));
  drawWave(false);
})();
