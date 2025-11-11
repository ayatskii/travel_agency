(() => {
  const skyline = document.querySelector('.skyline');
  const svg = skyline?.querySelector('.skyline-svg');
  const path = svg?.querySelector('#route');
  const plane = svg?.querySelector('#plane');
  if (!skyline || !svg || !path || !plane) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let length = 0, t = 0, v = 0.002, rafId = 0;

  function recalcLength() {
    try { length = path.getTotalLength(); } catch { length = 0; }
  }

  function tick() {
    if (reduced || length === 0) return;
    t += v;
    if (t > 1) t = 0;

    const p = path.getPointAtLength(length * t);
    const p2 = path.getPointAtLength(Math.min(length, length * (t + 0.001)));
    const angle = Math.atan2(p2.y - p.y, p2.x - p.x) * 180 / Math.PI;

    plane.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${angle})`);
    rafId = requestAnimationFrame(tick);
  }

  function onScroll() {
    const y = Math.max(0, Math.min(1, window.scrollY / 600));
    v = 0.001 + y * 0.006;
  }

  function navBoost() {
    const old = v;
    v = Math.max(v, 0.012);
    setTimeout(() => v = Math.max(0.003, old), 700);
  }

  function enter() {
    if (reduced) return;
    skyline.animate(
      [{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: .9, transform: 'translateY(0)' }],
      { duration: 600, easing: 'cubic-bezier(.22,.61,.36,1)' }
    );
  }

  function onResize() { recalcLength(); }


  recalcLength();
  if (!reduced) {
    tick();
    document.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    document.querySelectorAll('a, button, nav a').forEach(el => {
      el.addEventListener('click', navBoost, { passive: true });
    });
    enter();
  }
})();
