(() => {
  'use strict';
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  const toggle = document.querySelector('.motion-toggle');
  let paused = preference.matches;
  let observer;
  const sections = [...document.querySelectorAll('.section-heading, .featured, .project, .role, .about > div, .contact')];
  function revealAll() {
    observer?.disconnect();
    sections.forEach(el => el.classList.remove('reveal-pending'));
  }
  function sync() {
    root.classList.toggle('motion-paused', paused);
    toggle.textContent = preference.matches ? 'Reduced motion enabled' : paused ? 'Enable animations' : 'Pause animations';
    toggle.disabled = preference.matches;
    toggle.setAttribute('aria-pressed', String(paused));
    if (paused) revealAll();
  }
  toggle.hidden = false;
  toggle.addEventListener('click', () => { paused = !paused; sync(); });
  preference.addEventListener('change', event => { paused = event.matches; sync(); });
  sync();
  if (!paused && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('reveal-pending');
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -28px 0px' });
    sections.forEach(el => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('reveal-pending');
        observer.observe(el);
      }
    });
    // Keyboard navigation must never land in visually hidden content.
    document.addEventListener('focusin', event => {
      const parent = event.target.closest('.reveal-pending');
      if (parent) { parent.classList.remove('reveal-pending'); observer.unobserve(parent); }
    });
  }
  document.addEventListener('visibilitychange', () => {
    root.classList.toggle('motion-paused', paused || document.hidden);
  });
})();
