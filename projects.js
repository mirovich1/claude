/* ── Projects page: filter logic ── */
(function () {
  'use strict';

  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const cats = card.dataset.category || '';
        const show = filter === 'all' || cats.includes(filter);
        card.classList.toggle('hidden', !show);
        // re-trigger reveal for newly shown cards
        if (show && !card.classList.contains('visible')) {
          card.classList.add('visible');
        }
      });
    });
  });
})();
