(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    document.documentElement.classList.add('js');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  }

  const filters = document.querySelectorAll('[data-filter]');
  const projects = document.querySelectorAll('[data-category]');
  const status = document.getElementById('filter-status');
  filters.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    projects.forEach(project => {
      project.hidden = category !== 'all' && project.dataset.category !== category;
      if (!project.hidden) {
        count++;
        project.classList.add('visible');
      }
    });
    status.textContent = category === 'all' ? `Showing all ${count} projects.` : `Showing ${count} ${category} projects.`;
  }));

  const artwork = document.querySelector('.hero-art');
  if (artwork && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    artwork.addEventListener('pointermove', event => {
      if (reducedMotion.matches) return;
      const bounds = artwork.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      artwork.style.setProperty('--rx', `${-y * 9}deg`);
      artwork.style.setProperty('--ry', `${x * 9}deg`);
    });
    artwork.addEventListener('pointerleave', () => {
      artwork.style.setProperty('--rx', '0deg');
      artwork.style.setProperty('--ry', '0deg');
    });
  }
})();
